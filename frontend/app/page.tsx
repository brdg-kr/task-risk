"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  fetchOccupationDetail,
  fetchOccupations,
  fetchRankings,
  getDataVersion,
  type OccupationDetail,
  type OccupationItem,
  type RankingItem,
} from "@/lib/api";
import { AppNav } from "@/components/app-nav";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";

const numberFormatter = new Intl.NumberFormat("en-US");

const formatScore = (value: number | null) =>
  value === null || Number.isNaN(value) ? "--" : value.toFixed(2);

const formatNumber = (value: number | null) =>
  value === null || Number.isNaN(value) ? "--" : numberFormatter.format(value);

const formatConfidence = (value: number | null) =>
  value === null || Number.isNaN(value) ? "--" : value.toFixed(2);

export default function Home() {
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<"ai" | "employment">("ai");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [dataVersion, setDataVersion] = useState(getDataVersion());
  const [items, setItems] = useState<OccupationItem[]>([]);
  const [total, setTotal] = useState(0);
  const [ranking, setRanking] = useState<RankingItem[]>([]);
  const [selected, setSelected] = useState<OccupationDetail | null>(null);
  const [loadingList, setLoadingList] = useState(false);
  const [loadingDetail, setLoadingDetail] = useState(false);
  const [loadingRank, setLoadingRank] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const detailRequestId = useRef(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearch(searchInput.trim());
      setPage(1);
    }, 350);
    return () => clearTimeout(timer);
  }, [searchInput]);

  useEffect(() => {
    let cancelled = false;
    setLoadingList(true);
    setError(null);
    fetchOccupations({
      search,
      sort,
      page,
      pageSize,
      dataVersion,
    })
      .then((data) => {
        if (cancelled) return;
        setItems(data.items);
        setTotal(data.total);
      })
      .catch((err) => {
        if (cancelled) return;
        setError(err.message ?? "Failed to load data.");
      })
      .finally(() => {
        if (!cancelled) setLoadingList(false);
      });
    return () => {
      cancelled = true;
    };
  }, [search, sort, page, pageSize, dataVersion]);

  useEffect(() => {
    let cancelled = false;
    setLoadingRank(true);
    fetchRankings({ limit: 12, dataVersion })
      .then((data) => {
        if (!cancelled) setRanking(data.items);
      })
      .catch(() => {})
      .finally(() => {
        if (!cancelled) setLoadingRank(false);
      });
    return () => {
      cancelled = true;
    };
  }, [dataVersion]);

  const loadDetail = (socCode: string) => {
    const requestId = detailRequestId.current + 1;
    detailRequestId.current = requestId;
    setLoadingDetail(true);
    fetchOccupationDetail(socCode, dataVersion)
      .then((data) => {
        if (detailRequestId.current === requestId) {
          setSelected(data);
        }
      })
      .catch((err) => {
        if (detailRequestId.current === requestId) {
          setError(err.message ?? "Failed to load detail.");
        }
      })
      .finally(() => {
        if (detailRequestId.current === requestId) {
          setLoadingDetail(false);
        }
      });
  };

  const closeDetail = () => {
    detailRequestId.current += 1;
    setLoadingDetail(false);
    setSelected(null);
  };

  const pages = Math.max(1, Math.ceil(total / pageSize));

  const riskSnapshot = useMemo(() => {
    if (!ranking.length) return null;
    const validScores = ranking
      .map((item) => item.ai_mean)
      .filter((value): value is number => value !== null);
    const average =
      validScores.reduce((sum, value) => sum + value, 0) /
      (validScores.length || 1);
    return {
      average,
      top: ranking[0],
    };
  }, [ranking]);

  const detailBody = selected ? (
    <div className="space-y-4">
      <div>
        <p className="text-xs text-muted-foreground">
          직업 코드 {selected.soc_code}
        </p>
        <h3 className="text-xl font-semibold text-foreground">
          {selected.title}
        </h3>
        {selected.description && (
          <p className="mt-2 text-sm text-muted-foreground">
            {selected.description}
          </p>
        )}
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <Badge className="bg-primary text-primary-foreground">
          AI 대체 가능성 {formatScore(selected.ai_score?.mean ?? null)}
        </Badge>
        <Badge variant="secondary">
          변동성 {formatScore(selected.ai_score?.std ?? null)}
        </Badge>
      </div>
      <details className="rounded-xl border border-border/70 bg-background/80 px-4 py-3">
        <summary className="cursor-pointer text-sm font-medium text-foreground">
          세부 지표
        </summary>
        <p className="mt-2 text-xs text-muted-foreground">
          현재 스코프의 업무 커버리지를 기준으로 산출됩니다.
        </p>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <div className="rounded-lg border border-border/70 bg-card px-3 py-2">
            <p className="text-xs text-muted-foreground">보조 가능성</p>
            <p className="mt-1 text-lg font-semibold text-foreground">
              {formatScore(
                selected.ai_score?.ai_augmentation_potential_mean ?? null
              )}
            </p>
          </div>
          <div className="rounded-lg border border-border/70 bg-card px-3 py-2">
            <p className="text-xs text-muted-foreground">사람 맥락 의존</p>
            <p className="mt-1 text-lg font-semibold text-foreground">
              {formatScore(
                selected.ai_score?.human_context_dependency_mean ?? null
              )}
            </p>
          </div>
          <div className="rounded-lg border border-border/70 bg-card px-3 py-2">
            <p className="text-xs text-muted-foreground">물리 환경 의존</p>
            <p className="mt-1 text-lg font-semibold text-foreground">
              {formatScore(
                selected.ai_score?.physical_world_dependency_mean ?? null
              )}
            </p>
          </div>
          <div className="rounded-lg border border-border/70 bg-card px-3 py-2">
            <p className="text-xs text-muted-foreground">신뢰도</p>
            <p className="mt-1 text-lg font-semibold text-foreground">
              {formatConfidence(selected.ai_score?.confidence_mean ?? null)}
            </p>
          </div>
        </div>
      </details>
      {selected.alternate_titles.length > 0 && (
        <div>
          <p className="text-xs text-muted-foreground">다른 이름</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {selected.alternate_titles.slice(0, 6).map((title) => (
              <Badge key={title} variant="outline">
                {title}
              </Badge>
            ))}
          </div>
        </div>
      )}
      <div>
        <p className="text-xs text-muted-foreground">핵심 업무 8개</p>
        <div className="mt-3 space-y-3">
          {selected.top_tasks.slice(0, 8).map((task) => (
            <div
              key={task.task_id}
              className="rounded-xl border border-border/70 bg-background/80 px-4 py-3"
            >
              <div className="text-xs text-muted-foreground">
                업무 비중 {task.weight.toFixed(3)}
              </div>
              <p className="mt-2 text-sm text-foreground">
                {task.task_statement}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  ) : null;

  const rankingCard = (
    <div className="rounded-2xl border border-border/70 bg-card/80 shadow-[var(--shadow)] backdrop-blur">
      <div className="px-4 pt-4 pb-2">
        <p className="text-sm font-medium text-foreground">빠른 비교</p>
        <p className="text-xs text-muted-foreground">
          AI 영향이 큰 직업을 모아봤어요.
        </p>
      </div>
      <div className="space-y-4 px-4 pb-4">
        {loadingRank ? (
          <div className="space-y-3">
            {Array.from({ length: 5 }).map((_, index) => (
              <Skeleton key={index} className="h-6 w-full" />
            ))}
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>직업</TableHead>
                <TableHead className="text-right">AI 영향</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ranking.map((item) => (
                <TableRow key={item.soc_code}>
                  <TableCell className="font-medium">{item.title}</TableCell>
                  <TableCell className="text-right">
                    {formatScore(item.ai_mean)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );

  const isDetailOpen = Boolean(selected || loadingDetail);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(27,71,85,0.12),_transparent_55%)]" />
        <div className="pointer-events-none absolute -top-32 right-[-10%] h-72 w-72 rounded-full bg-[radial-gradient(circle,_rgba(33,90,101,0.35),_transparent_70%)] blur-3xl animate-float" />
        <div className="pointer-events-none absolute bottom-[-40%] left-[-10%] h-80 w-80 rounded-full bg-[radial-gradient(circle,_rgba(247,209,157,0.45),_transparent_70%)] blur-3xl animate-float" />
      </div>

      <div className="relative mx-auto flex w-full max-w-none flex-col gap-10 px-6 py-10 sm:px-8 lg:px-12 2xl:px-16">
        <AppNav />

        <header className="grid gap-4 animate-rise">
          <div className="flex flex-wrap items-center gap-3">
            <Badge className="rounded-full bg-primary text-primary-foreground">
              AI 영향 요약
            </Badge>
            <span className="text-xs text-muted-foreground">
              O*NET 직업 기반
            </span>
          </div>
          <div className="grid gap-2">
            <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              내 일이 AI로 얼마나 달라질지, 쉽게 확인하세요
            </h1>
            <p className="max-w-2xl text-sm text-muted-foreground sm:text-base">
              직업별 AI 영향과 핵심 업무를 한눈에 보고, 필요한 정보만
              부담 없이 살펴볼 수 있도록 구성했어요.
            </p>
          </div>
        </header>

        <main className="grid gap-8">
          <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 animate-rise">
            <div className="rounded-2xl border border-border/70 bg-card/80 px-4 py-4 shadow-[var(--shadow)] backdrop-blur">
              <p className="text-xs text-muted-foreground">상위 12개 평균 영향</p>
              <p className="mt-2 text-3xl font-semibold text-foreground">
                {riskSnapshot ? formatScore(riskSnapshot.average) : "--"}
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                최근 평가 기준으로 집계된 평균이에요.
              </p>
            </div>
            <div className="rounded-2xl border border-border/70 bg-card/80 px-4 py-4 shadow-[var(--shadow)] backdrop-blur">
              <p className="text-xs text-muted-foreground">가장 영향 큰 직업</p>
              <p className="mt-2 text-lg font-semibold text-foreground">
                {riskSnapshot?.top?.title ?? "데이터 준비 중"}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                점수 {formatScore(riskSnapshot?.top?.ai_mean ?? null)}
              </p>
            </div>
            <div className="rounded-2xl border border-border/60 bg-card/60 px-4 py-4 text-sm text-muted-foreground shadow-[var(--shadow)] backdrop-blur">
              <p className="text-xs text-muted-foreground">확장 슬롯</p>
              <p className="mt-2 text-sm text-foreground">
                채용 변화, 기술 증거, 코호트 비교가 이 영역에 붙습니다.
              </p>
              <p className="mt-2">
                지금은 기본 정보만 보여드려요.
              </p>
            </div>
          </section>

          <section className="rounded-2xl border border-border/70 bg-card/80 px-4 py-4 shadow-[var(--shadow)] backdrop-blur">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-sm font-medium text-foreground">
                  직업 찾기
                </p>
                <p className="text-xs text-muted-foreground">
                  검색하고 필요한 정보만 골라보세요.
                </p>
              </div>
              <Badge variant="outline" className="rounded-full">
                {loadingList ? "불러오는 중" : `${page} / ${pages} 페이지`}
              </Badge>
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-[minmax(0,1fr)_minmax(0,180px)]">
              <Input
                placeholder="직업 이름으로 검색"
                value={searchInput}
                onChange={(event) => setSearchInput(event.target.value)}
              />
              <Select
                value={sort}
                onValueChange={(value) =>
                  setSort(value as "ai" | "employment")
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="정렬" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ai">AI 영향 높은 순</SelectItem>
                  <SelectItem value="employment">고용 규모 큰 순</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <details className="mt-4 rounded-xl border border-border/70 bg-background/70 px-3 py-2 text-sm">
              <summary className="cursor-pointer text-xs text-muted-foreground">
                고급 설정
              </summary>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                <div className="space-y-2">
                  <p className="text-xs text-muted-foreground">데이터 버전</p>
                  <Input
                    value={dataVersion}
                    onChange={(event) => setDataVersion(event.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <p className="text-xs text-muted-foreground">페이지 크기</p>
                  <Select
                    value={String(pageSize)}
                    onValueChange={(value) => {
                      setPageSize(Number(value));
                      setPage(1);
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="페이지 크기" />
                    </SelectTrigger>
                    <SelectContent>
                      {[10, 20, 50].map((size) => (
                        <SelectItem key={size} value={String(size)}>
                          {size}개 보기
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </details>
          </section>

          <section className="grid gap-6 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] xl:grid-cols-[minmax(0,1.8fr)_minmax(0,1fr)]">
            <div className="space-y-6">
              <section className="rounded-2xl border border-border/70 bg-card/80 shadow-[var(--shadow)] backdrop-blur animate-rise">
                <Tabs defaultValue="cards" className="w-full">
                  <div className="flex flex-wrap items-center justify-between gap-3 px-4 pt-4 pb-2">
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        직업 목록
                      </p>
                      <p className="text-xs text-muted-foreground">
                        총 {numberFormatter.format(total)}개 직업
                      </p>
                    </div>
                    <TabsList className="grid w-full grid-cols-2 rounded-full bg-muted/60 p-1 sm:w-auto">
                      <TabsTrigger value="cards" className="rounded-full">
                        카드
                      </TabsTrigger>
                      <TabsTrigger value="table" className="rounded-full">
                        표
                      </TabsTrigger>
                    </TabsList>
                  </div>
                  <div className="space-y-4 px-4 pb-4">
                    {error && (
                      <div className="rounded-xl border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive">
                        {error}
                      </div>
                    )}

                    <TabsContent value="cards" className="space-y-3">
                      {loadingList && (
                        <div className="space-y-3">
                          {Array.from({ length: 6 }).map((_, index) => (
                            <Skeleton key={index} className="h-16 w-full" />
                          ))}
                        </div>
                      )}
                      {!loadingList &&
                        items.map((item) => (
                          <button
                            key={`${item.soc_code}-${item.onetsoc_code}`}
                            className="w-full rounded-2xl border border-border/70 bg-background/70 px-4 py-3 text-left transition hover:-translate-y-0.5 hover:border-border hover:bg-muted/60"
                            onClick={() => loadDetail(item.soc_code)}
                          >
                            <div className="flex flex-wrap items-center justify-between gap-3">
                              <div>
                                <p className="text-base font-semibold text-foreground">
                                  {item.title}
                                </p>
                              </div>
                              <div className="flex flex-col items-end gap-1">
                                <Badge className="bg-primary text-primary-foreground">
                                  AI 영향 {formatScore(item.ai_mean)}
                                </Badge>
                                <span className="text-xs text-muted-foreground">
                                  고용 규모 {formatNumber(item.employment)}
                                </span>
                              </div>
                            </div>
                            <div className="mt-3 h-2 w-full rounded-full bg-secondary/80">
                              <div
                                className="h-2 rounded-full bg-primary"
                                style={{
                                  width: `${Math.min(100, item.ai_mean ?? 0)}%`,
                                }}
                              />
                            </div>
                          </button>
                        ))}
                    </TabsContent>
                    <TabsContent value="table">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>직업</TableHead>
                            <TableHead className="text-right">
                              AI 영향
                            </TableHead>
                            <TableHead className="text-right">
                              고용 규모
                            </TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {loadingList
                            ? Array.from({ length: 6 }).map((_, index) => (
                                <TableRow key={index}>
                                  <TableCell colSpan={3}>
                                    <Skeleton className="h-5 w-full" />
                                  </TableCell>
                                </TableRow>
                              ))
                            : items.map((item) => (
                                <TableRow
                                  key={`${item.soc_code}-${item.onetsoc_code}`}
                                  className="cursor-pointer hover:bg-muted/60"
                                  onClick={() => loadDetail(item.soc_code)}
                                >
                                  <TableCell className="font-medium">
                                    {item.title}
                                  </TableCell>
                                  <TableCell className="text-right">
                                    {formatScore(item.ai_mean)}
                                  </TableCell>
                                  <TableCell className="text-right">
                                    {formatNumber(item.employment)}
                                  </TableCell>
                                </TableRow>
                              ))}
                        </TableBody>
                      </Table>
                    </TabsContent>

                    <div className="flex items-center justify-between pt-2">
                      <Button
                        variant="outline"
                        onClick={() => setPage((prev) => Math.max(1, prev - 1))}
                        disabled={page === 1 || loadingList}
                      >
                        이전
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => setPage((prev) => Math.min(pages, prev + 1))}
                        disabled={page >= pages || loadingList}
                      >
                        다음
                      </Button>
                    </div>
                  </div>
                </Tabs>
              </section>

              <div className="lg:hidden">{rankingCard}</div>
            </div>

            <div className="hidden lg:flex flex-col gap-6">
              <section className="rounded-2xl border border-border/70 bg-card/80 shadow-[var(--shadow)] backdrop-blur animate-rise-slow">
                <div className="px-4 pt-4 pb-2">
                  <p className="text-sm font-medium text-foreground">
                    선택한 직업
                  </p>
                  <p className="text-xs text-muted-foreground">
                    업무 단위로 영향을 확인하세요.
                  </p>
                </div>
                <div className="space-y-4 px-4 pb-4">
                  {loadingDetail && (
                    <div className="space-y-3">
                      <Skeleton className="h-5 w-2/3" />
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-4/5" />
                    </div>
                  )}
                  {!selected && !loadingDetail && (
                    <p className="text-sm text-muted-foreground">
                      직업을 선택하면 상세 내용을 보여드려요.
                    </p>
                  )}
                  {selected && detailBody}
                </div>
              </section>

              {rankingCard}
            </div>
          </section>
        </main>

        {isDetailOpen && (
          <div className="lg:hidden fixed inset-0 z-40 bg-black/40">
            <div className="absolute inset-x-0 bottom-0 rounded-t-3xl border border-border/70 bg-card p-5 shadow-[var(--shadow)]">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-foreground">
                    선택한 직업
                  </p>
                  <p className="text-xs text-muted-foreground">
                    필요한 정보만 빠르게 확인하세요.
                  </p>
                </div>
                <Button variant="ghost" size="sm" onClick={closeDetail}>
                  닫기
                </Button>
              </div>
              <div className="mt-4 max-h-[70vh] overflow-auto pr-2">
                {loadingDetail && !selected ? (
                  <div className="space-y-3">
                    <Skeleton className="h-5 w-2/3" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-4/5" />
                  </div>
                ) : (
                  detailBody
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
