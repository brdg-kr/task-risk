import argparse
import json
import os
from typing import Any, Dict, List, Optional, Tuple

from api.db import get_conn


def resolve_active_scope(
    conn, data_version: str, requested_week: Optional[str]
) -> Tuple[Optional[str], Optional[str]]:
    with conn.cursor() as cur:
        if requested_week:
            cur.execute(
                """
                SELECT week, active_id
                FROM tech_progress_scope_active
                WHERE data_version = %s
                  AND week = %s
                  AND status = 'active'
                ORDER BY created_at DESC
                LIMIT 1
                """,
                (data_version, requested_week),
            )
        else:
            cur.execute(
                """
                SELECT week, active_id
                FROM tech_progress_scope_active
                WHERE data_version = %s
                  AND status = 'active'
                ORDER BY week DESC, created_at DESC
                LIMIT 1
                """,
                (data_version,),
            )
        row = cur.fetchone()
        if row:
            return row[0], row[1]
    return None, None


def _ensure_list(value: Any) -> List[Any]:
    if value is None:
        return []
    if isinstance(value, list):
        return value
    if isinstance(value, str):
        try:
            parsed = json.loads(value)
            if isinstance(parsed, list):
                return parsed
            return [parsed]
        except json.JSONDecodeError:
            return [value]
    return list(value)


def _truncate(text: str, max_chars: int) -> str:
    value = text.strip().replace("\n", " ")
    if len(value) <= max_chars:
        return value
    return value[: max_chars - 3].rstrip() + "..."


def _as_float(value: Any) -> Optional[float]:
    if value is None:
        return None
    try:
        return float(value)
    except (TypeError, ValueError):
        return None


def main():
    parser = argparse.ArgumentParser(description="Build LLM task cards for tech progress.")
    parser.add_argument(
        "--data-version",
        default=os.getenv("ONET_DATA_VERSION")
        or os.getenv("DEFAULT_DATA_VERSION")
        or "30.1",
        help="O*NET data version label",
    )
    parser.add_argument(
        "--week",
        default=os.getenv("TECH_PROGRESS_WEEK"),
        help="Tech progress week (YYYY-Www). Defaults to latest active scope week.",
    )
    parser.add_argument("--version", type=int, default=1)
    parser.add_argument("--max-changes", type=int, default=3)
    parser.add_argument("--max-evidence", type=int, default=3)
    parser.add_argument("--max-summary-chars", type=int, default=200)
    args = parser.parse_args()

    with get_conn() as conn:
        week, active_id = resolve_active_scope(conn, args.data_version, args.week)
        if not week or not active_id:
            print(
                "[llm-cards] no active scope",
                f"data_version={args.data_version}",
                f"week={args.week or 'latest'}",
                flush=True,
            )
            return

        with conn.cursor() as cur:
            cur.execute(
                """
                SELECT sat.task_id, ts.task_statement
                FROM tech_progress_scope_active_task sat
                JOIN task_statements ts
                  ON ts.data_version = sat.data_version
                 AND ts.task_id = sat.task_id
                WHERE sat.active_id = %s
                  AND sat.data_version = %s
                ORDER BY sat.task_id
                """,
                (active_id, args.data_version),
            )
            tasks = cur.fetchall()

        if not tasks:
            print(
                "[llm-cards] no tasks",
                f"data_version={args.data_version}",
                f"week={week}",
                f"active_id={active_id}",
                flush=True,
            )
            return

        task_ids = [task_id for task_id, _ in tasks]
        snapshots: Dict[int, Dict[str, Any]] = {}
        links_by_task: Dict[int, List[Dict[str, Any]]] = {}

        with conn.cursor() as cur:
            cur.execute(
                """
                SELECT task_id, progress_score, delta, top_changes_json, evidence_ids_json
                FROM tech_progress_weekly_snapshot
                WHERE data_version = %s
                  AND week = %s
                  AND task_id = ANY(%s)
                """,
                (args.data_version, week, task_ids),
            )
            for task_id, progress_score, delta, top_changes, evidence_ids in cur.fetchall():
                snapshots[int(task_id)] = {
                    "progress_score": _as_float(progress_score),
                    "delta": _as_float(delta),
                    "top_changes_json": top_changes,
                    "evidence_ids_json": evidence_ids,
                }

            cur.execute(
                """
                SELECT
                  l.task_id,
                  l.tech_id,
                  t.name AS tech_name,
                  l.link_type,
                  l.impact_score,
                  l.confidence,
                  l.evidence_id
                FROM tech_progress_task_link l
                JOIN tech_progress_technology t ON t.tech_id = l.tech_id
                WHERE l.data_version = %s
                  AND l.week = %s
                  AND l.task_id = ANY(%s)
                ORDER BY l.task_id, l.impact_score DESC
                """,
                (args.data_version, week, task_ids),
            )
            for (
                task_id,
                tech_id,
                tech_name,
                link_type,
                impact_score,
                confidence,
                evidence_id,
            ) in cur.fetchall():
                links_by_task.setdefault(int(task_id), []).append(
                    {
                        "tech_id": tech_id,
                        "tech_name": tech_name,
                        "link_type": link_type,
                        "impact_score": _as_float(impact_score),
                        "confidence": _as_float(confidence),
                        "evidence_id": evidence_id,
                    }
                )

        evidence_ids: List[str] = []
        for task_id in task_ids:
            for link in links_by_task.get(task_id, [])[: args.max_changes]:
                if link["evidence_id"] and link["evidence_id"] not in evidence_ids:
                    evidence_ids.append(link["evidence_id"])
            snapshot = snapshots.get(task_id, {})
            for evidence_id in _ensure_list(snapshot.get("evidence_ids_json")):
                if evidence_id and evidence_id not in evidence_ids:
                    evidence_ids.append(evidence_id)

        evidence_map: Dict[str, Dict[str, Any]] = {}
        if evidence_ids:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    SELECT evidence_id, summary, evidence_date
                    FROM tech_progress_evidence
                    WHERE evidence_id = ANY(%s)
                    ORDER BY evidence_date DESC
                    """,
                    (evidence_ids,),
                )
                for evidence_id, summary, evidence_date in cur.fetchall():
                    evidence_map[str(evidence_id)] = {
                        "summary": summary,
                        "date": evidence_date.isoformat() if evidence_date else None,
                    }

        stored = 0
        with conn.cursor() as cur:
            for task_id, task_statement in tasks:
                task_id = int(task_id)
                snapshot = snapshots.get(task_id, {})
                links = links_by_task.get(task_id, [])[: args.max_changes]

                changes = []
                for link in links:
                    changes.append(
                        {
                            "tech": link.get("tech_id"),
                            "tech_name": link.get("tech_name"),
                            "link_type": link.get("link_type"),
                            "impact": link.get("impact_score"),
                            "confidence": link.get("confidence"),
                            "evidence": link.get("evidence_id"),
                        }
                    )

                evidence_briefs = []
                evidence_order: List[str] = []
                for link in links:
                    evidence_id = link.get("evidence_id")
                    if evidence_id and evidence_id not in evidence_order:
                        evidence_order.append(evidence_id)
                for evidence_id in _ensure_list(snapshot.get("evidence_ids_json")):
                    if evidence_id and evidence_id not in evidence_order:
                        evidence_order.append(evidence_id)

                for evidence_id in evidence_order:
                    if len(evidence_briefs) >= args.max_evidence:
                        break
                    info = evidence_map.get(str(evidence_id))
                    if not info:
                        continue
                    summary = info.get("summary") or ""
                    evidence_briefs.append(
                        {
                            "evidence_id": evidence_id,
                            "summary": _truncate(summary, args.max_summary_chars),
                            "date": info.get("date"),
                        }
                    )

                payload = {
                    "week": week,
                    "task_id": str(task_id),
                    "task_text": task_statement,
                    "progress_score": snapshot.get("progress_score"),
                    "delta": snapshot.get("delta"),
                    "changes": changes,
                    "evidence_briefs": evidence_briefs,
                }

                cur.execute(
                    """
                    INSERT INTO tech_progress_llm_task_card
                      (data_version, week, task_id, version, payload_json)
                    VALUES (%s, %s, %s, %s, %s)
                    ON CONFLICT (data_version, week, task_id, version)
                    DO UPDATE SET payload_json = EXCLUDED.payload_json,
                                  created_at = NOW()
                    """,
                    (
                        args.data_version,
                        week,
                        task_id,
                        args.version,
                        json.dumps(payload, ensure_ascii=True),
                    ),
                )
                stored += 1

        conn.commit()
        print(
            "[llm-cards] done",
            f"data_version={args.data_version}",
            f"week={week}",
            f"tasks={stored}",
            flush=True,
        )


if __name__ == "__main__":
    main()
