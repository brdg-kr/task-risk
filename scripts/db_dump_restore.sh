#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
ENV_PATH="$ROOT_DIR/.env"

if [[ -f "$ENV_PATH" ]]; then
  set -a
  # shellcheck disable=SC1091
  source "$ENV_PATH"
  set +a
fi

usage() {
  cat <<'USAGE'
Usage:
  db_dump_restore.sh dump [--source-url URL] [--file PATH] [--format custom|plain]
  db_dump_restore.sh restore [--target-url URL] [--file PATH] [--format custom|plain] [--clean]

Env (optional):
  SOURCE_DATABASE_URL, TARGET_DATABASE_URL, DATABASE_URL
  POSTGRES_DB, POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_HOST, POSTGRES_PORT

Examples:
  ./scripts/db_dump_restore.sh dump
  ./scripts/db_dump_restore.sh dump --file ./db/backups/task_risk.dump
  ./scripts/db_dump_restore.sh restore --target-url postgresql://user:pass@host:5432/task_risk \
    --file ./db/backups/task_risk.dump --clean
USAGE
}

require_cmd() {
  local name="$1"
  if ! command -v "$name" >/dev/null 2>&1; then
    echo "Missing required command: $name" >&2
    exit 1
  fi
}

build_default_url() {
  if [[ -n "${DATABASE_URL:-}" ]]; then
    echo "$DATABASE_URL"
    return
  fi
  if [[ -n "${POSTGRES_DB:-}" && -n "${POSTGRES_USER:-}" && -n "${POSTGRES_PASSWORD:-}" ]]; then
    local host="${POSTGRES_HOST:-localhost}"
    local port="${POSTGRES_PORT:-5432}"
    echo "postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${host}:${port}/${POSTGRES_DB}"
    return
  fi
  echo ""
}

action="${1:-}"
if [[ -z "$action" || "$action" == "--help" || "$action" == "-h" ]]; then
  usage
  exit 0
fi
shift || true

format="custom"
file_path=""
clean="false"
source_url="${SOURCE_DATABASE_URL:-}"
target_url="${TARGET_DATABASE_URL:-}"

while [[ $# -gt 0 ]]; do
  case "$1" in
    --source-url)
      source_url="$2"
      shift 2
      ;;
    --target-url)
      target_url="$2"
      shift 2
      ;;
    --file)
      file_path="$2"
      shift 2
      ;;
    --format)
      format="$2"
      shift 2
      ;;
    --clean)
      clean="true"
      shift
      ;;
    --help|-h)
      usage
      exit 0
      ;;
    *)
      echo "Unknown option: $1" >&2
      usage
      exit 1
      ;;
  esac
done

if [[ "$format" != "custom" && "$format" != "plain" ]]; then
  echo "Invalid --format (use custom or plain)" >&2
  exit 1
fi

timestamp="$(date +%Y%m%d_%H%M%S)"
default_dir="$ROOT_DIR/db/backups"
default_ext="dump"
if [[ "$format" == "plain" ]]; then
  default_ext="sql"
fi

if [[ -z "$file_path" ]]; then
  file_path="$default_dir/task_risk_${timestamp}.${default_ext}"
fi

mkdir -p "$(dirname "$file_path")"

case "$action" in
  dump)
    require_cmd pg_dump
    if [[ -z "$source_url" ]]; then
      source_url="$(build_default_url)"
    fi
    if [[ -z "$source_url" ]]; then
      echo "SOURCE_DATABASE_URL or DATABASE_URL (or POSTGRES_*) must be set" >&2
      exit 1
    fi
    if [[ "$format" == "custom" ]]; then
      pg_dump --format=custom --no-owner --no-acl --file "$file_path" "$source_url"
    else
      pg_dump --format=plain --no-owner --no-acl --file "$file_path" "$source_url"
    fi
    echo "Dump complete: $file_path"
    ;;
  restore)
    if [[ -z "$file_path" ]]; then
      echo "--file is required for restore" >&2
      exit 1
    fi
    if [[ ! -f "$file_path" ]]; then
      echo "Dump file not found: $file_path" >&2
      exit 1
    fi
    if [[ -z "$target_url" ]]; then
      target_url="$(build_default_url)"
    fi
    if [[ -z "$target_url" ]]; then
      echo "TARGET_DATABASE_URL or DATABASE_URL (or POSTGRES_*) must be set" >&2
      exit 1
    fi
    if [[ "$format" == "custom" ]]; then
      require_cmd pg_restore
      restore_cmd=(pg_restore --no-owner --no-privileges --dbname "$target_url")
      if [[ "$clean" == "true" ]]; then
        restore_cmd+=(--clean --if-exists)
      fi
      restore_cmd+=("$file_path")
      "${restore_cmd[@]}"
    else
      require_cmd psql
      psql "$target_url" -f "$file_path"
    fi
    echo "Restore complete: $file_path"
    ;;
  *)
    echo "Unknown action: $action" >&2
    usage
    exit 1
    ;;
esac
