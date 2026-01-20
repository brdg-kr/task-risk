BEGIN;

-- Seed tech progress mock data (PostgreSQL)
-- Assumes data_version '30.1' and task_statements are already loaded.

WITH sample_tasks AS (
  SELECT task_id, task_statement,
         ROW_NUMBER() OVER (ORDER BY task_id) AS rn
  FROM task_statements
  WHERE data_version = '30.1'
  ORDER BY task_id
  LIMIT 6
)
INSERT INTO tech_progress_technology (tech_id, name, domain, synonyms_json, status)
VALUES
  ('TECH-LLM-001', 'LLM Response Drafting', 'NLP', '["drafting","response assistant"]', 'active'),
  ('TECH-TRI-001', 'Ticket Triage Classifier', 'NLP', '["triage","classification"]', 'active'),
  ('TECH-OCR-001', 'Document OCR Extractor', 'Document AI', '["ocr","document parsing"]', 'active')
ON CONFLICT (tech_id) DO NOTHING;

INSERT INTO tech_progress_evidence_source (source_id, name, source_type, base_url, trust_score)
VALUES
  ('SRC-REL-001', 'Vendor Release Notes', 'product_release', NULL, 0.70),
  ('SRC-PAPER-001', 'Research Paper', 'paper', NULL, 0.85),
  ('SRC-REPO-001', 'Open-source Repo', 'repo', NULL, 0.60)
ON CONFLICT (source_id) DO NOTHING;

INSERT INTO tech_progress_evidence (evidence_id, source_id, evidence_date, summary, quality_score, raw_ref)
VALUES
  ('E2026W03-001', 'SRC-REL-001', '2026-01-13', 'Release improves response drafting accuracy for support workflows.', 0.78, 'rel-2026-01-13'),
  ('E2026W03-002', 'SRC-PAPER-001', '2026-01-15', 'Study shows automatic triage reduces handling time with minimal error.', 0.82, 'paper-2026-01-15'),
  ('E2026W04-001', 'SRC-REPO-001', '2026-01-20', 'OCR update improves table extraction for scanned forms.', 0.66, 'repo-2026-01-20'),
  ('E2026W04-002', 'SRC-REL-001', '2026-01-21', 'Updated classifier reduces false positives for routing.', 0.74, 'rel-2026-01-21'),
  ('E2026W05-001', 'SRC-PAPER-001', '2026-01-28', 'Benchmark shows better summarization for long conversations.', 0.81, 'paper-2026-01-28'),
  ('E2026W06-001', 'SRC-REL-001', '2026-02-03', 'Routing model update improves edge-case handling.', 0.76, 'rel-2026-02-03')
ON CONFLICT (evidence_id) DO NOTHING;

DO $$
DECLARE
  v_active_id TEXT;
BEGIN
  SELECT active_id
    INTO v_active_id
  FROM tech_progress_scope_active
  WHERE data_version = '30.1'
    AND week = '2026-W03'
    AND status = 'active'
  ORDER BY created_at DESC
  LIMIT 1;

  IF v_active_id IS NULL THEN
    v_active_id := 'ACTIVE-2026W03-MOCK';
    INSERT INTO tech_progress_scope_active (active_id, week, data_version, status, created_by)
    VALUES (v_active_id, '2026-W03', '30.1', 'active', 'seed')
    ON CONFLICT (active_id) DO NOTHING;
  END IF;

  INSERT INTO tech_progress_scope_active_task (active_id, week, data_version, task_id)
  SELECT v_active_id, '2026-W03', '30.1', task_id
  FROM (
    SELECT task_id
    FROM task_statements
    WHERE data_version = '30.1'
    ORDER BY task_id
    LIMIT 6
  ) AS sample_tasks
  ON CONFLICT DO NOTHING;
END $$;

DO $$
DECLARE
  v_active_id TEXT;
BEGIN
  SELECT active_id
    INTO v_active_id
  FROM tech_progress_scope_active
  WHERE data_version = '30.1'
    AND week = '2026-W04'
    AND status = 'active'
  ORDER BY created_at DESC
  LIMIT 1;

  IF v_active_id IS NULL THEN
    v_active_id := 'ACTIVE-2026W04-MOCK';
    INSERT INTO tech_progress_scope_active (active_id, week, data_version, status, created_by)
    VALUES (v_active_id, '2026-W04', '30.1', 'active', 'seed')
    ON CONFLICT (active_id) DO NOTHING;
  END IF;

  INSERT INTO tech_progress_scope_active_task (active_id, week, data_version, task_id)
  SELECT v_active_id, '2026-W04', '30.1', task_id
  FROM (
    SELECT task_id
    FROM task_statements
    WHERE data_version = '30.1'
    ORDER BY task_id
    LIMIT 6
  ) AS sample_tasks
  ON CONFLICT DO NOTHING;
END $$;

DO $$
DECLARE
  v_active_id TEXT;
BEGIN
  SELECT active_id
    INTO v_active_id
  FROM tech_progress_scope_active
  WHERE data_version = '30.1'
    AND week = '2026-W05'
    AND status = 'active'
  ORDER BY created_at DESC
  LIMIT 1;

  IF v_active_id IS NULL THEN
    v_active_id := 'ACTIVE-2026W05-MOCK';
    INSERT INTO tech_progress_scope_active (active_id, week, data_version, status, created_by)
    VALUES (v_active_id, '2026-W05', '30.1', 'active', 'seed')
    ON CONFLICT (active_id) DO NOTHING;
  END IF;

  INSERT INTO tech_progress_scope_active_task (active_id, week, data_version, task_id)
  SELECT v_active_id, '2026-W05', '30.1', task_id
  FROM (
    SELECT task_id
    FROM task_statements
    WHERE data_version = '30.1'
    ORDER BY task_id
    LIMIT 6
  ) AS sample_tasks
  ON CONFLICT DO NOTHING;
END $$;

DO $$
DECLARE
  v_active_id TEXT;
BEGIN
  SELECT active_id
    INTO v_active_id
  FROM tech_progress_scope_active
  WHERE data_version = '30.1'
    AND week = '2026-W06'
    AND status = 'active'
  ORDER BY created_at DESC
  LIMIT 1;

  IF v_active_id IS NULL THEN
    v_active_id := 'ACTIVE-2026W06-MOCK';
    INSERT INTO tech_progress_scope_active (active_id, week, data_version, status, created_by)
    VALUES (v_active_id, '2026-W06', '30.1', 'active', 'seed')
    ON CONFLICT (active_id) DO NOTHING;
  END IF;

  INSERT INTO tech_progress_scope_active_task (active_id, week, data_version, task_id)
  SELECT v_active_id, '2026-W06', '30.1', task_id
  FROM (
    SELECT task_id
    FROM task_statements
    WHERE data_version = '30.1'
    ORDER BY task_id
    LIMIT 6
  ) AS sample_tasks
  ON CONFLICT DO NOTHING;
END $$;

WITH sample_tasks AS (
  SELECT task_id, task_statement,
         ROW_NUMBER() OVER (ORDER BY task_id) AS rn
  FROM task_statements
  WHERE data_version = '30.1'
  ORDER BY task_id
  LIMIT 6
)
INSERT INTO tech_progress_task_link (
  week, data_version, task_id, tech_id, link_type, impact_score, confidence, evidence_id
)
SELECT
  '2026-W03',
  '30.1',
  task_id,
  CASE WHEN rn % 3 = 1 THEN 'TECH-LLM-001'
       WHEN rn % 3 = 2 THEN 'TECH-TRI-001'
       ELSE 'TECH-OCR-001'
  END AS tech_id,
  CASE WHEN rn % 2 = 0 THEN 'automates' ELSE 'augments' END AS link_type,
  0.45 + (rn * 0.05) AS impact_score,
  0.55 + (rn * 0.04) AS confidence,
  CASE WHEN rn % 3 = 1 THEN 'E2026W03-001'
       WHEN rn % 3 = 2 THEN 'E2026W03-002'
       ELSE 'E2026W04-001'
  END AS evidence_id
FROM sample_tasks
ON CONFLICT DO NOTHING;

WITH sample_tasks AS (
  SELECT task_id, task_statement,
         ROW_NUMBER() OVER (ORDER BY task_id) AS rn
  FROM task_statements
  WHERE data_version = '30.1'
  ORDER BY task_id
  LIMIT 6
)
INSERT INTO tech_progress_weekly_snapshot (
  week, data_version, task_id, progress_score, delta, top_changes_json, evidence_ids_json
)
SELECT
  '2026-W03',
  '30.1',
  task_id,
  0.40 + (rn * 0.05) AS progress_score,
  0.04 + (rn * 0.01) AS delta,
  jsonb_build_array(
    CASE WHEN rn % 3 = 1 THEN 'TECH-LLM-001 augments'
         WHEN rn % 3 = 2 THEN 'TECH-TRI-001 automates'
         ELSE 'TECH-OCR-001 augments'
    END
  ) AS top_changes_json,
  jsonb_build_array(
    CASE WHEN rn % 3 = 1 THEN 'E2026W03-001'
         WHEN rn % 3 = 2 THEN 'E2026W03-002'
         ELSE 'E2026W04-001'
    END
  ) AS evidence_ids_json
FROM sample_tasks
ON CONFLICT DO NOTHING;

WITH sample_tasks AS (
  SELECT task_id, task_statement,
         ROW_NUMBER() OVER (ORDER BY task_id) AS rn
  FROM task_statements
  WHERE data_version = '30.1'
  ORDER BY task_id
  LIMIT 6
)
INSERT INTO tech_progress_task_link (
  week, data_version, task_id, tech_id, link_type, impact_score, confidence, evidence_id
)
SELECT
  '2026-W04',
  '30.1',
  task_id,
  CASE WHEN rn % 3 = 1 THEN 'TECH-TRI-001'
       WHEN rn % 3 = 2 THEN 'TECH-LLM-001'
       ELSE 'TECH-OCR-001'
  END AS tech_id,
  CASE WHEN rn % 2 = 0 THEN 'augments' ELSE 'automates' END AS link_type,
  0.50 + (rn * 0.04) AS impact_score,
  0.60 + (rn * 0.03) AS confidence,
  CASE WHEN rn % 3 = 1 THEN 'E2026W04-002'
       WHEN rn % 3 = 2 THEN 'E2026W03-001'
       ELSE 'E2026W04-001'
  END AS evidence_id
FROM sample_tasks
ON CONFLICT DO NOTHING;

WITH sample_tasks AS (
  SELECT task_id, task_statement,
         ROW_NUMBER() OVER (ORDER BY task_id) AS rn
  FROM task_statements
  WHERE data_version = '30.1'
  ORDER BY task_id
  LIMIT 6
)
INSERT INTO tech_progress_weekly_snapshot (
  week, data_version, task_id, progress_score, delta, top_changes_json, evidence_ids_json
)
SELECT
  '2026-W04',
  '30.1',
  task_id,
  0.46 + (rn * 0.04) AS progress_score,
  0.02 + (rn * 0.01) AS delta,
  jsonb_build_array(
    CASE WHEN rn % 3 = 1 THEN 'TECH-TRI-001 automates'
         WHEN rn % 3 = 2 THEN 'TECH-LLM-001 augments'
         ELSE 'TECH-OCR-001 automates'
    END
  ) AS top_changes_json,
  jsonb_build_array(
    CASE WHEN rn % 3 = 1 THEN 'E2026W04-002'
         WHEN rn % 3 = 2 THEN 'E2026W03-001'
         ELSE 'E2026W04-001'
    END
  ) AS evidence_ids_json
FROM sample_tasks
ON CONFLICT DO NOTHING;

WITH sample_tasks AS (
  SELECT task_id, task_statement,
         ROW_NUMBER() OVER (ORDER BY task_id) AS rn
  FROM task_statements
  WHERE data_version = '30.1'
  ORDER BY task_id
  LIMIT 6
)
INSERT INTO tech_progress_task_link (
  week, data_version, task_id, tech_id, link_type, impact_score, confidence, evidence_id
)
SELECT
  '2026-W05',
  '30.1',
  task_id,
  CASE WHEN rn % 3 = 1 THEN 'TECH-LLM-001'
       WHEN rn % 3 = 2 THEN 'TECH-TRI-001'
       ELSE 'TECH-OCR-001'
  END AS tech_id,
  CASE WHEN rn % 2 = 0 THEN 'automates' ELSE 'augments' END AS link_type,
  0.52 + (rn * 0.03) AS impact_score,
  0.62 + (rn * 0.02) AS confidence,
  CASE WHEN rn % 3 = 1 THEN 'E2026W05-001'
       WHEN rn % 3 = 2 THEN 'E2026W04-002'
       ELSE 'E2026W04-001'
  END AS evidence_id
FROM sample_tasks
ON CONFLICT DO NOTHING;

WITH sample_tasks AS (
  SELECT task_id, task_statement,
         ROW_NUMBER() OVER (ORDER BY task_id) AS rn
  FROM task_statements
  WHERE data_version = '30.1'
  ORDER BY task_id
  LIMIT 6
)
INSERT INTO tech_progress_weekly_snapshot (
  week, data_version, task_id, progress_score, delta, top_changes_json, evidence_ids_json
)
SELECT
  '2026-W05',
  '30.1',
  task_id,
  0.50 + (rn * 0.03) AS progress_score,
  0.03 + (rn * 0.01) AS delta,
  jsonb_build_array(
    CASE WHEN rn % 3 = 1 THEN 'TECH-LLM-001 augments'
         WHEN rn % 3 = 2 THEN 'TECH-TRI-001 automates'
         ELSE 'TECH-OCR-001 augments'
    END
  ) AS top_changes_json,
  jsonb_build_array(
    CASE WHEN rn % 3 = 1 THEN 'E2026W05-001'
         WHEN rn % 3 = 2 THEN 'E2026W04-002'
         ELSE 'E2026W04-001'
    END
  ) AS evidence_ids_json
FROM sample_tasks
ON CONFLICT DO NOTHING;

WITH sample_tasks AS (
  SELECT task_id, task_statement,
         ROW_NUMBER() OVER (ORDER BY task_id) AS rn
  FROM task_statements
  WHERE data_version = '30.1'
  ORDER BY task_id
  LIMIT 6
)
INSERT INTO tech_progress_task_link (
  week, data_version, task_id, tech_id, link_type, impact_score, confidence, evidence_id
)
SELECT
  '2026-W06',
  '30.1',
  task_id,
  CASE WHEN rn % 3 = 1 THEN 'TECH-TRI-001'
       WHEN rn % 3 = 2 THEN 'TECH-LLM-001'
       ELSE 'TECH-OCR-001'
  END AS tech_id,
  CASE WHEN rn % 2 = 0 THEN 'augments' ELSE 'automates' END AS link_type,
  0.55 + (rn * 0.03) AS impact_score,
  0.65 + (rn * 0.02) AS confidence,
  CASE WHEN rn % 3 = 1 THEN 'E2026W06-001'
       WHEN rn % 3 = 2 THEN 'E2026W05-001'
       ELSE 'E2026W04-001'
  END AS evidence_id
FROM sample_tasks
ON CONFLICT DO NOTHING;

WITH sample_tasks AS (
  SELECT task_id, task_statement,
         ROW_NUMBER() OVER (ORDER BY task_id) AS rn
  FROM task_statements
  WHERE data_version = '30.1'
  ORDER BY task_id
  LIMIT 6
)
INSERT INTO tech_progress_weekly_snapshot (
  week, data_version, task_id, progress_score, delta, top_changes_json, evidence_ids_json
)
SELECT
  '2026-W06',
  '30.1',
  task_id,
  0.54 + (rn * 0.03) AS progress_score,
  0.02 + (rn * 0.01) AS delta,
  jsonb_build_array(
    CASE WHEN rn % 3 = 1 THEN 'TECH-TRI-001 automates'
         WHEN rn % 3 = 2 THEN 'TECH-LLM-001 augments'
         ELSE 'TECH-OCR-001 automates'
    END
  ) AS top_changes_json,
  jsonb_build_array(
    CASE WHEN rn % 3 = 1 THEN 'E2026W06-001'
         WHEN rn % 3 = 2 THEN 'E2026W05-001'
         ELSE 'E2026W04-001'
    END
  ) AS evidence_ids_json
FROM sample_tasks
ON CONFLICT DO NOTHING;

COMMIT;
