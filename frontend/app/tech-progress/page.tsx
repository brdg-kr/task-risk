"use client";

import { useEffect, useMemo, useState } from "react";
import { AppNav } from "@/components/app-nav";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { API_BASE, getDataVersion } from "@/lib/api";
import {
  fetchTechSummary,
  fetchTechTaskDetail,
  fetchTechTasks,
  fetchTechWeeks,
  type TechProgressSummary,
  type TechProgressTaskDetail,
  type TechProgressTaskItem,
} from "@/lib/tech-progress-api";
import { cn } from "@/lib/utils";

const numberFormatter = new Intl.NumberFormat("en-US");

const formatScore = (value: number | null | undefined) =>
  value === null || value === undefined || Number.isNaN(value)
    ? "--"
    : value.toFixed(2);

const formatNumber = (value: number | null | undefined) =>
  value === null || value === undefined || Number.isNaN(value)
    ? "--"
    : numberFormatter.format(value);

export default function TechProgressPage() {
  const [dataVersion, setDataVersion] = useState(getDataVersion());
  const [weeks, setWeeks] = useState<string[]>([]);
  const [week, setWeek] = useState<string | null>(null);
  const [summary, setSummary] = useState<TechProgressSummary | null>(null);
  const [tasks, setTasks] = useState<TechProgressTaskItem[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [linkType, setLinkType] = useState("all");
  const [minDeltaInput, setMinDeltaInput] = useState("");
  const [selectedTaskId, setSelectedTaskId] = useState<number | null>(null);
  const [selectedTask, setSelectedTask] =
    useState<TechProgressTaskDetail | null>(null);
  const [loadingWeeks, setLoadingWeeks] = useState(false);
  const [loadingSummary, setLoadingSummary] = useState(false);
  const [loadingList, setLoadingList] = useState(false);
  const [loadingDetail, setLoadingDetail] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoadingWeeks(true);
    setError(null);
    fetchTechWeeks({ dataVersion })
      .then((data) => {
        if (cancelled) return;
        setWeeks(data.weeks);
        setWeek((prev) => prev ?? data.weeks[0] ?? null);
      })
      .catch((err) => {
        if (cancelled) return;
        setError(err.message ?? "Failed to load weeks.");
      })
      .finally(() => {
        if (!cancelled) setLoadingWeeks(false);
      });
    return () => {
      cancelled = true;
    };
  }, [dataVersion]);

  useEffect(() => {
    if (!week) {
      setSummary(null);
      return;
    }
    let cancelled = false;
    setLoadingSummary(true);
    setError(null);
    fetchTechSummary({ week, dataVersion })
      .then((data) => {
        if (!cancelled) setSummary(data);
      })
      .catch((err) => {
        if (!cancelled) setError(err.message ?? "Failed to load summary.");
      })
      .finally(() => {
        if (!cancelled) setLoadingSummary(false);
      });
    return () => {
      cancelled = true;
    };
  }, [week, dataVersion]);

  useEffect(() => {
    if (!week) {
      setTasks([]);
      setTotal(0);
      return;
    }
    let cancelled = false;
    setLoadingList(true);
    setError(null);
    const minDelta = minDeltaInput.trim() === "" ? undefined : Number(minDeltaInput);
    fetchTechTasks({
      week,
      dataVersion,
      page,
      pageSize,
      linkType: linkType === "all" ? undefined : linkType,
      minDelta: Number.isNaN(minDelta) ? undefined : minDelta,
    })
      .then((data) => {
        if (cancelled) return;
        setTasks(data.items);
        setTotal(data.total);
        if (data.items.length && !selectedTaskId) {
          setSelectedTaskId(data.items[0].task_id);
        }
      })
      .catch((err) => {
        if (cancelled) return;
        setError(err.message ?? "Failed to load tasks.");
      })
      .finally(() => {
        if (!cancelled) setLoadingList(false);
      });
    return () => {
      cancelled = true;
    };
  }, [week, dataVersion, page, pageSize, linkType, minDeltaInput]);

  useEffect(() => {
    if (!week || selectedTaskId === null) {
      setSelectedTask(null);
      return;
    }
    let cancelled = false;
    setLoadingDetail(true);
    fetchTechTaskDetail({
      taskId: selectedTaskId,
      week,
      dataVersion,
    })
      .then((data) => {
        if (!cancelled) setSelectedTask(data);
      })
      .catch((err) => {
        if (!cancelled) setError(err.message ?? "Failed to load detail.");
      })
      .finally(() => {
        if (!cancelled) setLoadingDetail(false);
      });
    return () => {
      cancelled = true;
    };
  }, [week, dataVersion, selectedTaskId]);

  useEffect(() => {
    setSelectedTaskId(null);
    setSelectedTask(null);
    setPage(1);
  }, [week, dataVersion]);

  useEffect(() => {
    setSelectedTaskId(null);
    setSelectedTask(null);
  }, [page, pageSize]);

  useEffect(() => {
    setPage(1);
  }, [linkType, minDeltaInput]);

  const pages = Math.max(1, Math.ceil(total / pageSize));

  const activeSummary = useMemo(() => {
    if (!summary) return null;
    return {
      tasksWithChange: summary.tasks_with_change,
      avgProgress: summary.avg_progress,
    };
  }, [summary]);

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-10">
        <AppNav />

        <header className="flex flex-col gap-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <Badge className="rounded-full px-3 py-1 text-xs uppercase tracking-[0.3em]">
                Weekly Tech Signals
              </Badge>
              <h1 className="mt-4 text-3xl font-semibold text-foreground sm:text-4xl">
                AI 기술 발전 조회
              </h1>
              <p className="mt-3 max-w-2xl text-base text-muted-foreground">
                주차별 AI 기술 발전 내용을 업무(task) 단위로 연결해 변화량을
                확인합니다. Active scope에 포함된 업무만 집계합니다.
              </p>
            </div>
            <div className="rounded-md border border-border bg-muted px-3 py-2 text-xs text-muted-foreground">
              API Base: {API_BASE}
            </div>
          </div>

          <Card className="border-border bg-card">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg">필터</CardTitle>
              <CardDescription>
                주차와 데이터 버전을 선택합니다.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                  Week
                </p>
                <Select
                  value={week ?? ""}
                  onValueChange={(value) => setWeek(value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="주차 선택" />
                  </SelectTrigger>
                  <SelectContent>
                    {loadingWeeks && (
                      <SelectItem value="loading" disabled>
                        로딩 중...
                      </SelectItem>
                    )}
                    {weeks.map((item) => (
                      <SelectItem key={item} value={item}>
                        {item}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                  Data Version
                </p>
                <Input
                  value={dataVersion}
                  onChange={(event) => setDataVersion(event.target.value)}
                />
              </div>
              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                  Page Size
                </p>
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
                        {size}개
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                  Link Type
                </p>
                <Select value={linkType} onValueChange={setLinkType}>
                  <SelectTrigger>
                    <SelectValue placeholder="연결 타입" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">전체</SelectItem>
                    <SelectItem value="automates">automates</SelectItem>
                    <SelectItem value="augments">augments</SelectItem>
                    <SelectItem value="enables">enables</SelectItem>
                    <SelectItem value="replaces">replaces</SelectItem>
                    <SelectItem value="requires">requires</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                  Min Delta
                </p>
                <Input
                  type="number"
                  inputMode="decimal"
                  step="0.01"
                  placeholder="예: 0.05"
                  value={minDeltaInput}
                  onChange={(event) => setMinDeltaInput(event.target.value)}
                />
              </div>
            </CardContent>
          </Card>
        </header>

        <section className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
          <Card className="border-border bg-card">
            <CardHeader className="pb-4">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <CardTitle>업무 변화 목록</CardTitle>
                  <CardDescription>
                    총 {formatNumber(total)}개 업무
                  </CardDescription>
                </div>
                <Badge variant="outline">
                  {loadingList ? "로딩 중" : `${page} / ${pages} 페이지`}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {error && (
                <div className="rounded-xl border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive">
                  {error}
                </div>
              )}
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>업무</TableHead>
                    <TableHead className="text-right">진척도</TableHead>
                    <TableHead className="text-right">주간 변화</TableHead>
                    <TableHead>대표 기술</TableHead>
                    <TableHead className="text-right">연결 수</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loadingList
                    ? Array.from({ length: 6 }).map((_, index) => (
                        <TableRow key={index}>
                          <TableCell colSpan={5}>
                            <Skeleton className="h-5 w-full" />
                          </TableCell>
                        </TableRow>
                      ))
                    : tasks.map((item) => (
                        <TableRow
                          key={item.task_id}
                          className={cn(
                            "cursor-pointer hover:bg-muted",
                            selectedTaskId === item.task_id &&
                              "bg-muted"
                          )}
                          onClick={() => setSelectedTaskId(item.task_id)}
                        >
                          <TableCell className="font-medium">
                            {item.task_statement}
                          </TableCell>
                          <TableCell className="text-right">
                            {formatScore(item.progress_score)}
                          </TableCell>
                          <TableCell className="text-right">
                            {formatScore(item.delta)}
                          </TableCell>
                          <TableCell>
                            {item.top_tech_name ?? "--"}
                          </TableCell>
                          <TableCell className="text-right">
                            {formatNumber(item.link_count)}
                          </TableCell>
                        </TableRow>
                      ))}
                </TableBody>
              </Table>

              <Separator />

              <div className="flex items-center justify-between">
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
            </CardContent>
          </Card>

          <div className="flex flex-col gap-6">
            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle>주간 요약</CardTitle>
                <CardDescription>
                  활성 범위에서 집계한 변화 지표
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {loadingSummary ? (
                  <div className="space-y-3">
                    <Skeleton className="h-6 w-full" />
                    <Skeleton className="h-6 w-3/4" />
                  </div>
                ) : summary ? (
                  <>
                    <div className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                      Active Scope{" "}
                      <span className="text-foreground">
                        {summary.active_scope_id ?? "없음"}
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-3">
                      <Badge className="bg-primary text-primary-foreground">
                        변화 업무 {formatNumber(activeSummary?.tasksWithChange)}
                      </Badge>
                      <Badge variant="secondary">
                        평균 진척 {formatScore(activeSummary?.avgProgress)}
                      </Badge>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                        Top 변화 업무
                      </p>
                      <div className="mt-3 space-y-2">
                        {summary.top_tasks.length === 0 && (
                          <p className="text-sm text-muted-foreground">
                            표시할 변화 업무가 없습니다.
                          </p>
                        )}
                        {summary.top_tasks.map((task) => (
                          <div
                            key={task.task_id}
                            className="rounded-lg border border-border bg-background px-4 py-3"
                          >
                            <div className="flex items-center justify-between text-xs text-muted-foreground">
                              <span>#{task.task_id}</span>
                              <span>Δ {formatScore(task.delta)}</span>
                            </div>
                            <p className="mt-2 text-sm text-foreground">
                              {task.task_statement}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                        Top 기술
                      </p>
                      <div className="mt-3 space-y-2">
                        {summary.top_tech.length === 0 && (
                          <p className="text-sm text-muted-foreground">
                            연결된 기술이 없습니다.
                          </p>
                        )}
                        {summary.top_tech.map((tech) => (
                          <div
                            key={tech.tech_id}
                            className="flex items-center justify-between rounded-md border border-border bg-secondary px-3 py-2 text-sm"
                          >
                            <span>{tech.name}</span>
                            <span className="text-xs text-muted-foreground">
                              {formatNumber(tech.task_count)} tasks
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    주간 데이터를 선택하세요.
                  </p>
                )}
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle>업무 상세</CardTitle>
                <CardDescription>선택한 업무의 연결 정보</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {loadingDetail && (
                  <div className="space-y-3">
                    <Skeleton className="h-5 w-2/3" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-4/5" />
                  </div>
                )}
                {!selectedTask && !loadingDetail && (
                  <p className="text-sm text-muted-foreground">
                    왼쪽 목록에서 업무를 선택하세요.
                  </p>
                )}
                {selectedTask && (
                  <div className="space-y-4">
                    <div>
                      <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                        #{selectedTask.task.task_id}
                      </p>
                      <h3 className="text-xl font-semibold text-foreground">
                        {selectedTask.task.task_statement}
                      </h3>
                    </div>
                    <div className="flex flex-wrap items-center gap-3">
                      <Badge className="bg-primary text-primary-foreground">
                        진척 {formatScore(selectedTask.task.progress_score)}
                      </Badge>
                      <Badge variant="secondary">
                        주간 변화 {formatScore(selectedTask.task.delta)}
                      </Badge>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                        연결된 기술
                      </p>
                      <div className="mt-3 space-y-3">
                        {selectedTask.links.length === 0 && (
                          <p className="text-sm text-muted-foreground">
                            연결된 기술이 없습니다.
                          </p>
                        )}
                        {selectedTask.links.map((link) => (
                          <div
                            key={`${link.tech_id}-${link.evidence_id}`}
                            className="rounded-lg border border-border bg-background px-4 py-3"
                          >
                            <div className="flex items-center justify-between gap-2 text-xs text-muted-foreground">
                              <span>{link.link_type}</span>
                              <span>Impact {formatScore(link.impact_score)}</span>
                            </div>
                            <p className="mt-2 text-sm text-foreground">
                              {link.tech_name}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                        근거(Evidence)
                      </p>
                      <div className="mt-3 space-y-3">
                        {selectedTask.evidence.length === 0 && (
                          <p className="text-sm text-muted-foreground">
                            연결된 근거가 없습니다.
                          </p>
                        )}
                        {selectedTask.evidence.map((item) => (
                          <div
                            key={item.evidence_id}
                            className="rounded-lg border border-border bg-secondary px-4 py-3"
                          >
                            <div className="flex items-center justify-between text-xs text-muted-foreground">
                              <span>{item.source_type}</span>
                              <span>{item.evidence_date}</span>
                            </div>
                            <p className="mt-2 text-sm text-foreground">
                              {item.summary}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
}
