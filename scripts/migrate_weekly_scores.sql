BEGIN;

ALTER TABLE model_run
  ADD COLUMN IF NOT EXISTS week VARCHAR(8);
UPDATE model_run SET week = 'legacy' WHERE week IS NULL;
ALTER TABLE model_run
  ALTER COLUMN week SET NOT NULL;

ALTER TABLE task_ai_score
  ADD COLUMN IF NOT EXISTS week VARCHAR(8);
UPDATE task_ai_score SET week = 'legacy' WHERE week IS NULL;
ALTER TABLE task_ai_score
  ALTER COLUMN week SET NOT NULL;

DROP INDEX IF EXISTS uniq_task_ai_score_cache;
CREATE UNIQUE INDEX IF NOT EXISTS uniq_task_ai_score_cache
  ON task_ai_score (data_version, week, task_id, model, prompt_hash, input_hash);

DROP INDEX IF EXISTS idx_task_ai_score_task;
CREATE INDEX IF NOT EXISTS idx_task_ai_score_task
  ON task_ai_score (data_version, week, task_id);

ALTER TABLE task_ai_ensemble
  ADD COLUMN IF NOT EXISTS week VARCHAR(8);
UPDATE task_ai_ensemble SET week = 'legacy' WHERE week IS NULL;
ALTER TABLE task_ai_ensemble
  ALTER COLUMN week SET NOT NULL;
ALTER TABLE task_ai_ensemble
  DROP CONSTRAINT IF EXISTS task_ai_ensemble_pkey;
ALTER TABLE task_ai_ensemble
  ADD PRIMARY KEY (data_version, week, task_id);

ALTER TABLE occupation_ai_score
  ADD COLUMN IF NOT EXISTS week VARCHAR(8);
UPDATE occupation_ai_score SET week = 'legacy' WHERE week IS NULL;
ALTER TABLE occupation_ai_score
  ALTER COLUMN week SET NOT NULL;
ALTER TABLE occupation_ai_score
  DROP CONSTRAINT IF EXISTS occupation_ai_score_pkey;
ALTER TABLE occupation_ai_score
  ADD PRIMARY KEY (data_version, week, soc_code);

DROP INDEX IF EXISTS idx_occupation_ai_score_mean;
CREATE INDEX IF NOT EXISTS idx_occupation_ai_score_mean
  ON occupation_ai_score (data_version, week, mean DESC);

COMMIT;
