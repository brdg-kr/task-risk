프로젝트 개요/배경

* 목표: “직업(occupation)·업무(task)·스킬(skill)”을 보여주고, AI 발전에 따른 대체 위험도를 점수화해 랭킹/검색/상세로 제공하는 서비스.
* 데이터: O*NET 30.1(직업·업무·스킬/지식/능력), BLS(OEWS 고용/임금, Projections 성장률/오프닝).
* 핵심 설계: 직업을 직접 매번 평가하지 않고 “업무(Task)”를 평가 단위로 고정.

  * 업무를 4모델(OpenAI/Anthropic/Gemini/Grok)로 동일 프롬프트 점수화 → 평균/표준편차 저장
  * 직업 점수 = Σ(업무 점수 × 직업-업무 가중치)
* 운영 제약: “월별 직업 고용 인원”은 공식 통계 구조상 없음(OEWS는 연 1회, 기준월 5월). 월간 신호는 이후 단계에서 산업(CES/JOLTS) 또는 구인 지수로 보조.

---

이번 주 DoD(완료 기준)

1. Postgres에 O*NET 핵심 테이블 적재 + 직업 10개 상세(상위 업무) 조회 가능
2. SOC 키 매핑(O*NET-SOC → SOC) 확정 및 DB 반영
3. 업무 카탈로그(예: 200개) 생성 + 직업-업무 가중치 생성
4. 업무 20개 샘플을 4모델로 점수화 → 평균/표준편차 저장 + 직업 점수 집계 저장
5. API 최소 3개(목록/상세/랭킹) 동작

---

스택(단순 고정)

* Ubuntu VPS 1대(2vCPU/4GB/60GB 권장)
* PostgreSQL 16
* Python FastAPI(서빙)
* Python 배치(ETL/점수화)
* cron(스케줄)
* Docker Compose(권장)

---

DB 최소 스키마(필수)

* occupation_master(onetsoc_code PK, soc_code, title, …)
* task_statements(task_id PK, task_statement, …)
* occupation_task_ratings(onetsoc_code, task_id, scale_id, data_value, …)  // O*NET Task Ratings
* occupation_task_weight(soc_code, task_id, weight)  // 합=1
* model_run(id PK, model, prompt_version, model_version, created_at, cost_estimate, status)
* task_ai_score(task_id, model, score, run_id, created_at, raw_json_ref)
* task_ai_ensemble(task_id, mean, std, min, max, updated_at)
* occupation_ai_score(soc_code, mean, std, updated_at)
* bls_oews_metrics(soc_code, ref_year_month, employment, median_wage, …)  // 선택(틀만)
* bls_proj_metrics(soc_code, projection_period, growth_pct, annual_openings, …)  // 선택(틀만)

SOC 매핑 규칙: soc_code = onetsoc_code의 “앞 7자리”(예: 11-3121.00 → 11-3121). 세부 .01/.02도 동일.

---

작업 순서(이번 주)
Day 1: 기반/스키마

* repo scaffold + docker-compose + .env.example + /health
* schema.sql 작성 및 마이그레이션 적용
* O*NET Data and Metadata 기반으로 필요한 테이블/컬럼만 고정(문서 1장 생성)

Day 2: O*NET 적재(ETL)

* batch/import_onet.py 구현(occupation, alternate titles, task statements, task ratings 우선)
* 적재 후 검증 쿼리: 특정 onetsoc_code의 상위 task 20개 조회

Day 3: BLS 틀 + 코드 매핑

* occupation_master에 soc_code 채우기
* bls_oews_metrics / bls_proj_metrics DDL + 샘플 CSV 적재 스텁(있으면)

Day 4: 업무 카탈로그/가중치 생성

* batch/build_task_catalog.py: 상위 N tasks 선정(중요도/빈도 스케일 활용)
* batch/build_task_weights.py: 직업별 weights 정규화(합=1)

Day 5: LLM 점수화 + API MVP

* worker/score_tasks.py: task_catalog 중 샘플 20개 4모델 점수화(레이트리밋/재시도/캐시)
* worker/aggregate_occupations.py: 직업 점수 집계 저장
* FastAPI endpoints:

  * GET /occupations?search=&sort=ai|employment&page=
  * GET /occupations/{soc_code}
  * GET /rankings/ai_risk (또는 /occupations?sort=ai)

---

Codex에 주는 “실행 지시”

* “위 개요/DoD/스택/스키마/작업순서를 기준으로, 필요한 파일을 생성하고 코드까지 작성해라.”
* “각 단계마다: 생성/변경 파일 리스트, 실행 명령어, 검증 쿼리를 README에 추가해라.”
* “ETL은 재실행해도 중복 폭발하지 않도록 upsert 또는 truncate+reload 중 하나로 일관되게 해라.”
* “LLM 점수화는 task 단위 캐시(프롬프트+입력 해시)로 중복 호출을 막아라.”
