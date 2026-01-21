"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  API_BASE,
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
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

const numberFormatter = new Intl.NumberFormat("en-US");

const formatScore = (value: number | null) =>
  value === null || Number.isNaN(value) ? "--" : value.toFixed(2);

const formatNumber = (value: number | null) =>
  value === null || Number.isNaN(value) ? "--" : numberFormatter.format(value);

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

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-10">
        <AppNav />
        <header className="flex flex-col gap-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <Badge className="rounded-full px-3 py-1 text-xs uppercase tracking-[0.3em]">
                Live Risk Signals
              </Badge>
              <h1 className="mt-4 text-3xl font-semibold text-foreground sm:text-4xl">
                Occupation & Task Automation Risk
              </h1>
              <p className="mt-3 max-w-2xl text-base text-muted-foreground">
                Aggregate model risk scores for O*NET tasks and quickly explore
                occupation rankings and task breakdowns.
              </p>
            </div>
            <div className="rounded-md border border-border bg-muted px-3 py-2 text-xs text-muted-foreground">
              API Base: {API_BASE}
            </div>
          </div>

          <Card className="border-border bg-card">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg">Explore Filters</CardTitle>
              <CardDescription>
                Adjust search, sorting, data version, and page size.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-4">
              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                  Search
                </p>
                <Input
                  placeholder="Occupation name or SOC code"
                  value={searchInput}
                  onChange={(event) => setSearchInput(event.target.value)}
                />
              </div>
              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                  Sort
                </p>
                <Select
                  value={sort}
                  onValueChange={(value) =>
                    setSort(value as "ai" | "employment")
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ai">AI risk</SelectItem>
                    <SelectItem value="employment">Employment</SelectItem>
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
                    <SelectValue placeholder="Page size" />
                  </SelectTrigger>
                  <SelectContent>
                    {[10, 20, 50].map((size) => (
                      <SelectItem key={size} value={String(size)}>
                        {size} items
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </header>

        <section className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
          <Card className="border-border bg-card">
            <CardHeader className="pb-4">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <CardTitle>Occupation List</CardTitle>
                  <CardDescription>
                    Total {numberFormatter.format(total)} occupations
                  </CardDescription>
                </div>
                <Badge variant="outline">
                  {loadingList ? "Loading" : `${page} / ${pages} pages`}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {error && (
                <div className="rounded-xl border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive">
                  {error}
                </div>
              )}

              <Tabs defaultValue="cards" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="cards">Cards</TabsTrigger>
                  <TabsTrigger value="table">Table</TabsTrigger>
                </TabsList>
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
                        className="w-full rounded-lg border border-border bg-background px-4 py-3 text-left transition hover:bg-muted"
                        onClick={() => loadDetail(item.soc_code)}
                      >
                        <div className="flex flex-wrap items-center justify-between gap-3">
                          <div>
                            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                              {item.soc_code}
                            </p>
                            <p className="text-base font-semibold text-foreground">
                              {item.title}
                            </p>
                          </div>
                          <div className="flex flex-col items-end gap-1">
                            <Badge className="bg-primary text-primary-foreground">
                              AI {formatScore(item.ai_mean)}
                            </Badge>
                            <span className="text-xs text-muted-foreground">
                              Employment {formatNumber(item.employment)}
                            </span>
                          </div>
                        </div>
                        <div className="mt-3 h-2 w-full rounded-full bg-secondary">
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
                        <TableHead>Occupation</TableHead>
                        <TableHead>SOC</TableHead>
                        <TableHead className="text-right">AI</TableHead>
                        <TableHead className="text-right">Employment</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {loadingList
                        ? Array.from({ length: 6 }).map((_, index) => (
                            <TableRow key={index}>
                              <TableCell colSpan={4}>
                                <Skeleton className="h-5 w-full" />
                              </TableCell>
                            </TableRow>
                          ))
                        : items.map((item) => (
                            <TableRow
                              key={`${item.soc_code}-${item.onetsoc_code}`}
                              className="cursor-pointer hover:bg-muted"
                              onClick={() => loadDetail(item.soc_code)}
                            >
                              <TableCell className="font-medium">
                                {item.title}
                              </TableCell>
                              <TableCell>{item.soc_code}</TableCell>
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
              </Tabs>

              <Separator />

              <div className="flex items-center justify-between">
                <Button
                  variant="outline"
                  onClick={() => setPage((prev) => Math.max(1, prev - 1))}
                  disabled={page === 1 || loadingList}
                >
                  Previous
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setPage((prev) => Math.min(pages, prev + 1))}
                  disabled={page >= pages || loadingList}
                >
                  Next
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="flex flex-col gap-6">
            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle>Occupation Detail</CardTitle>
                <CardDescription>
                  Task breakdown for the selected occupation
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {loadingDetail && (
                  <div className="space-y-3">
                    <Skeleton className="h-5 w-2/3" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-4/5" />
                  </div>
                )}
                {!selected && !loadingDetail && (
                  <p className="text-sm text-muted-foreground">
                    Select an occupation from the list on the left.
                  </p>
                )}
                {selected && (
                  <div className="space-y-4">
                    <div>
                      <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                        {selected.soc_code}
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
                        AI mean {formatScore(selected.ai_score?.mean ?? null)}
                      </Badge>
                      <Badge variant="secondary">
                        Std dev {formatScore(selected.ai_score?.std ?? null)}
                      </Badge>
                    </div>
                    {selected.alternate_titles.length > 0 && (
                      <div>
                        <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                          Alternate Titles
                        </p>
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
                      <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                        Top 8 Core Tasks
                      </p>
                      <div className="mt-3 space-y-3">
                        {selected.top_tasks.slice(0, 8).map((task) => (
                          <div
                            key={task.task_id}
                            className="rounded-lg border border-border bg-background px-4 py-3"
                          >
                            <div className="flex items-center justify-between gap-2 text-xs text-muted-foreground">
                              <span>Weight {task.weight.toFixed(3)}</span>
                              <span>#{task.task_id}</span>
                            </div>
                            <p className="mt-2 text-sm text-foreground">
                              {task.task_statement}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle>Risk Report</CardTitle>
                <CardDescription>Snapshot of high-risk occupations</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {loadingRank ? (
                  <div className="space-y-3">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <Skeleton key={index} className="h-6 w-full" />
                    ))}
                  </div>
                ) : (
                  <>
                    {riskSnapshot && (
                      <div className="rounded-lg border border-border bg-secondary px-4 py-3">
                        <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                          Average Risk (Top 12)
                        </p>
                        <div className="mt-2 flex items-center justify-between">
                          <span className="text-3xl font-semibold text-foreground">
                            {formatScore(riskSnapshot.average)}
                          </span>
                          {riskSnapshot.top && (
                            <Badge variant="outline">
                              {riskSnapshot.top.title}
                            </Badge>
                          )}
                        </div>
                      </div>
                    )}
                    <Table>
                    <TableHeader>
                      <TableRow>
                          <TableHead>Occupation</TableHead>
                          <TableHead className="text-right">AI</TableHead>
                      </TableRow>
                    </TableHeader>
                      <TableBody>
                        {ranking.map((item) => (
                          <TableRow key={item.soc_code}>
                            <TableCell className="font-medium">
                              {item.title}
                            </TableCell>
                            <TableCell className="text-right">
                              {formatScore(item.ai_mean)}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
}
