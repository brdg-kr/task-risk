여러 방식으로 조회하는 기능이 필요해.

  직업 > 상세조회 > 업무.
  업무 > 연관 직업 > 직업.

  AI 기술 발전 화면은 일단 가만히 두고,

  정식 서비스가 되기 위해
  그리고 확장성을 고려 했을 때
  어떤 레이아웃이 좋을지
  구성을 제안해줘.
  
------

 여러 방식으로 조회하는 기능이 필요해.

  직업 > 상세조회 > 업무.
  업무 > 연관 직업 > 직업.

  AI 기술 발전 화면은 일단 가만히 두고,

  정식 서비스가 되기 위해
  그리고 확장성을 고려 했을 때
  어떤 레이아웃이 좋을지
  구성을 제안해줘.


• 두 가지 진입점(예: 일반 사용자, 관리자)을 기준으로 네비게이션, 필터, 브레드크럼 구성을 제안합
  니다. 각 진입점별 주요 화면(대시보드, 목록 보기, 상세 보기 등)과 데이터 모델 개념을 포함해 간
  결하게 설명하겠습니다.

• 요구하신 “직업→업무”와 “업무→직업” 양방향 탐색을 중심으로, 확장성을 고려한 레이아웃/IA 제안입
  니다.
  (기술 발전 화면은 유지)

  ———

  ## 1) 전체 IA (권장)

  탑 레벨 메뉴

  - Occupations
  - Tasks
  - Tech Progress (현행 유지)

  공통 레이아웃

  - 좌측: 탐색/필터 패널
  - 중앙: 리스트/테이블
  - 우측: 상세 패널 (Split View)

  > 장점: 양방향 탐색 시 “리스트와 상세를 동시에” 보여줘서 클릭 흐름이 빠름.

  ———

  ## 2) 흐름별 화면 구성

  ### A. Occupation → Detail → Tasks

  Occupations 리스트 화면

  - (좌) 필터: 검색, 위험도 범위, 고용/임금, 스코프/주차
  - (중) 직업 리스트 (카드/테이블 전환)
  - (우) 직업 상세
      - 직업 요약
      - 위험도 점수
      - 핵심 업무 TOP N
      - 업무 리스트 (weight 순)

  업무를 클릭하면

  - 우측에 Task Detail 드로어/모달 또는 Task 탭으로 전환
  - 해당 Task의 연관 직업 링크 제공

  ———

  ### B. Tasks → Detail → Related Occupations

  Tasks 리스트 화면 (신규)

  - (좌) 필터: 검색, 위험도, 자동화/증강 타입, 연관 기술
  - (중) 업무 리스트
  - (우) 업무 상세
      - Task statement
      - 위험도 점수 (task_ai_ensemble)
      - 관련 기술/증거 (있으면)
      - 연관 직업 TOP N (weight/importance 기준)

  연관 직업 클릭 시

  - 우측 상세에서 직업 정보로 스왑 or “Occupation Detail” 탭

  ———

  ## 3) 상세 화면 내 탭 구조 (확장성)

  Occupation Detail 탭

  - Overview
  - Tasks (default)
  - Trends (주차 추이)
  - Evidence / Notes (추후)

  Task Detail 탭

  - Overview
  - Related Occupations (default)
  - Tech Links (추후)

  ———

  ## 4) 추천 레이아웃 옵션

  ### 옵션 1: Split View (리스트+상세 동시)

  - 가장 빠른 탐색
  - 데이터량 많은 화면에 적합

  ### 옵션 2: Master-Detail + Drawer

  - 리스트 화면 간결
  - 상세는 우측 드로어/모달로 표시

  ### 옵션 3: Full Detail Page

  - SEO/공유에 유리
  - 하지만 탐색 속도는 떨어짐

  ➡️ 현재 서비스 단계에서는 옵션 1 또는 2 추천

  ———

  ## 5) 추천 네비게이션 요소

  - Breadcrumb: Occupation > Task
  - Context Switch 버튼: “View related occupations”
  - Scope/Week selector: 화면 우측 상단 고정(필터와 별도)

  ———

  ## 6) 확장성 고려 포인트

  - Task/Occupation 공통 Detail 컴포넌트화
  - 검색/필터 상태를 URL query로 유지
  - 정렬 기준 확장 (risk, weight, employment 등)
  - 추후 Trend/History 탭 추가 가능

  ———

  원하시면 아래 중 하나로 구체화해서 와이어프레임/컴포넌트 구조까지 제안할게요:

  1. Split View 기반 IA
  2. Drawer 기반 IA
  3. Full Detail Page 기반 IA