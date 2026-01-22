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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { LayoutGrid, List, Search, X } from "lucide-react";

const numberFormatter = new Intl.NumberFormat("en-US");

const formatScore = (value: number | null) =>
  value === null || Number.isNaN(value) ? "--" : value.toFixed(1);

const formatConfidence = (value: number | null) =>
  value === null || Number.isNaN(value) ? "--" : value.toFixed(2);

// SOC code to industry category mapping
const getIndustryFromSoc = (socCode: string): string | null => {
  const prefix = socCode.substring(0, 2);
  const industries: Record<string, string> = {
    "11": "Management",
    "13": "Business",
    "15": "Technology",
    "17": "Engineering",
    "19": "Science",
    "21": "Social Service",
    "23": "Legal",
    "25": "Education",
    "27": "Arts & Media",
    "29": "Healthcare",
    "31": "Health Support",
    "33": "Protective",
    "35": "Food Service",
    "37": "Maintenance",
    "39": "Personal Care",
    "41": "Sales",
    "43": "Administrative",
    "45": "Agriculture",
    "47": "Construction",
    "49": "Repair",
    "51": "Production",
    "53": "Transportation",
  };
  return industries[prefix] ?? null;
};

// Label generation function
const getLabels = (item: OccupationItem | OccupationDetail | null) => {
  if (!item) return [];
  const labels: string[] = [];

  // Get SOC code
  const socCode = 'soc_code' in item ? item.soc_code : null;

  // Industry label from SOC code
  if (socCode) {
    const industry = getIndustryFromSoc(socCode);
    if (industry) {
      labels.push(industry);
    }
  }

  // Detailed labels from ai_score (only for OccupationDetail)
  const aiScore = 'ai_score' in item ? item.ai_score : null;

  if (aiScore) {
    if (aiScore.ai_augmentation_potential_mean !== null) {
      if (aiScore.ai_augmentation_potential_mean >= 3.5) {
        labels.push("AI Collaborative");
      } else if (aiScore.ai_augmentation_potential_mean <= 2.0) {
        labels.push("Human-Centric");
      }
    }

    if (aiScore.human_context_dependency_mean !== null) {
      if (aiScore.human_context_dependency_mean >= 3.5) {
        labels.push("Judgment Required");
      }
    }

    if (aiScore.physical_world_dependency_mean !== null) {
      if (aiScore.physical_world_dependency_mean >= 3.5) {
        labels.push("On-Site Required");
      } else if (aiScore.physical_world_dependency_mean <= 2.0) {
        labels.push("Remote Possible");
      }
    }
  }

  return labels.slice(0, 3);
};

// Score color based on AI impact
const getScoreColor = (score: number | null) => {
  if (score === null) return "text-muted-foreground";
  if (score >= 70) return "text-red-600";
  if (score >= 40) return "text-amber-600";
  return "text-green-600";
};

const getScoreLabel = (score: number | null) => {
  if (score === null) return "";
  if (score >= 70) return "High";
  if (score >= 40) return "Medium";
  return "Low";
};

// Quick filter types
type QuickFilter = "low-risk" | "ai-collaborative" | "on-site";

// Industries that are typically AI collaborative (knowledge work)
const AI_COLLABORATIVE_INDUSTRIES = ["15", "17", "19"]; // Technology, Engineering, Science

// Industries that typically require on-site presence
const ON_SITE_INDUSTRIES = ["29", "31", "33", "35", "37", "45", "47", "49", "51", "53"]; // Healthcare, Health Support, Protective, Food Service, Maintenance, Agriculture, Construction, Repair, Production, Transportation

export default function Home() {
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<"ai" | "employment">("ai");
  const [page, setPage] = useState(1);
  const [pageSize] = useState(20);
  const [dataVersion] = useState(getDataVersion());
  const [items, setItems] = useState<OccupationItem[]>([]);
  const [total, setTotal] = useState(0);
  const [ranking, setRanking] = useState<RankingItem[]>([]);
  const [selected, setSelected] = useState<OccupationDetail | null>(null);
  const [loadingList, setLoadingList] = useState(false);
  const [loadingDetail, setLoadingDetail] = useState(false);
  const [loadingRank, setLoadingRank] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"cards" | "table">("cards");
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeFilters, setActiveFilters] = useState<QuickFilter[]>([]);
  const detailRequestId = useRef(0);
  const heroRef = useRef<HTMLDivElement>(null);

  // Toggle quick filter
  const toggleFilter = (filter: QuickFilter) => {
    setActiveFilters((prev) =>
      prev.includes(filter)
        ? prev.filter((f) => f !== filter)
        : [...prev, filter]
    );
    setPage(1); // Reset to first page when filter changes
  };

  // Apply quick filters to items
  const filteredItems = useMemo(() => {
    if (activeFilters.length === 0) return items;

    return items.filter((item) => {
      const socPrefix = item.soc_code.substring(0, 2);

      for (const filter of activeFilters) {
        if (filter === "low-risk") {
          if (item.ai_mean === null || item.ai_mean >= 40) return false;
        }
        if (filter === "ai-collaborative") {
          if (!AI_COLLABORATIVE_INDUSTRIES.includes(socPrefix)) return false;
        }
        if (filter === "on-site") {
          if (!ON_SITE_INDUSTRIES.includes(socPrefix)) return false;
        }
      }
      return true;
    });
  }, [items, activeFilters]);

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        const heroBottom = heroRef.current.getBoundingClientRect().bottom;
        setIsScrolled(heroBottom < 80);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
    fetchRankings({ limit: 10, dataVersion })
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

  // Detail panel component
  const DetailPanel = () => {
    if (!selected) return null;

    const labels = getLabels(selected);

    return (
      <div className="rounded-2xl border border-border/70 bg-card/90 shadow-[var(--shadow)] backdrop-blur">
        <div className="flex items-center justify-between px-4 pt-4 pb-2">
          <p className="text-sm font-medium text-foreground">Selected Occupation</p>
          <Button variant="ghost" size="sm" onClick={closeDetail} className="h-7 w-7 p-0">
            <X className="h-4 w-4" />
          </Button>
        </div>
        <div className="space-y-4 px-4 pb-4">
          <div>
            <h3 className="text-lg font-semibold text-foreground">
              {selected.title}
            </h3>
            {selected.description && (
              <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                {selected.description}
              </p>
            )}
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <span className={`text-2xl font-bold ${getScoreColor(selected.ai_score?.mean ?? null)}`}>
                {formatScore(selected.ai_score?.mean ?? null)}
              </span>
              <div className="h-6 w-20 rounded-full bg-secondary/80 overflow-hidden">
                <div
                  className="h-full rounded-full bg-primary transition-all"
                  style={{ width: `${Math.min(100, selected.ai_score?.mean ?? 0)}%` }}
                />
              </div>
            </div>
            <Badge variant="outline" className={getScoreColor(selected.ai_score?.mean ?? null)}>
              {getScoreLabel(selected.ai_score?.mean ?? null)}
            </Badge>
          </div>

          {labels.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {labels.map((label) => (
                <Badge key={label} variant="secondary" className="text-xs">
                  {label}
                </Badge>
              ))}
            </div>
          )}

          <details className="rounded-xl border border-border/70 bg-background/80 px-4 py-3" open>
            <summary className="cursor-pointer text-sm font-medium text-foreground">
              Detailed Metrics
            </summary>
            <div className="mt-3 grid gap-2 grid-cols-2">
              <div className="rounded-lg border border-border/70 bg-card px-3 py-2">
                <p className="text-xs text-muted-foreground">AI Augmentation</p>
                <p className="mt-1 text-base font-semibold text-foreground">
                  {formatScore(selected.ai_score?.ai_augmentation_potential_mean ?? null)}
                </p>
              </div>
              <div className="rounded-lg border border-border/70 bg-card px-3 py-2">
                <p className="text-xs text-muted-foreground">Context Dependency</p>
                <p className="mt-1 text-base font-semibold text-foreground">
                  {formatScore(selected.ai_score?.human_context_dependency_mean ?? null)}
                </p>
              </div>
              <div className="rounded-lg border border-border/70 bg-card px-3 py-2">
                <p className="text-xs text-muted-foreground">Physical Dependency</p>
                <p className="mt-1 text-base font-semibold text-foreground">
                  {formatScore(selected.ai_score?.physical_world_dependency_mean ?? null)}
                </p>
              </div>
              <div className="rounded-lg border border-border/70 bg-card px-3 py-2">
                <p className="text-xs text-muted-foreground">Confidence</p>
                <p className="mt-1 text-base font-semibold text-foreground">
                  {formatConfidence(selected.ai_score?.confidence_mean ?? null)}
                </p>
              </div>
            </div>
          </details>

          {selected.alternate_titles.length > 0 && (
            <div>
              <p className="text-xs text-muted-foreground">Alternate Titles</p>
              <div className="mt-2 flex flex-wrap gap-1">
                {selected.alternate_titles.slice(0, 4).map((title) => (
                  <Badge key={title} variant="outline" className="text-xs">
                    {title}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          <div>
            <p className="text-xs text-muted-foreground">Key Tasks</p>
            <div className="mt-2 space-y-2 max-h-48 overflow-y-auto">
              {selected.top_tasks.slice(0, 5).map((task) => (
                <div
                  key={task.task_id}
                  className="rounded-lg border border-border/70 bg-background/80 px-3 py-2"
                >
                  <p className="text-sm text-foreground line-clamp-2">
                    {task.task_statement}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Ranking panel component
  const RankingPanel = () => (
    <div className="rounded-2xl border border-border/70 bg-card/80 shadow-[var(--shadow)] backdrop-blur">
      <div className="px-4 pt-4 pb-2">
        <p className="text-sm font-medium text-foreground">AI Impact TOP 10</p>
        <p className="text-xs text-muted-foreground">
          Highest risk occupations
        </p>
      </div>
      <div className="px-4 pb-4">
        {loadingRank ? (
          <div className="space-y-2">
            {Array.from({ length: 5 }).map((_, index) => (
              <Skeleton key={index} className="h-8 w-full" />
            ))}
          </div>
        ) : (
          <div className="space-y-1">
            {ranking.map((item, index) => (
              <button
                key={item.soc_code}
                className="w-full flex items-center justify-between py-2 px-2 rounded-lg hover:bg-muted/60 transition text-left"
                onClick={() => loadDetail(item.soc_code)}
              >
                <div className="flex items-center gap-2 min-w-0">
                  <span className="text-xs text-muted-foreground w-4">{index + 1}</span>
                  <span className="text-sm truncate">{item.title}</span>
                </div>
                <span className={`text-sm font-medium ${getScoreColor(item.ai_mean)}`}>
                  {formatScore(item.ai_mean)}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  // Summary panel component
  const SummaryPanel = () => (
    <div className="grid gap-3 grid-cols-2">
      <div className="rounded-xl border border-border/70 bg-card/80 px-4 py-3">
        <p className="text-xs text-muted-foreground">Average AI Impact</p>
        <p className="mt-1 text-2xl font-semibold text-foreground">
          {riskSnapshot ? formatScore(riskSnapshot.average) : "--"}
        </p>
      </div>
      <div className="rounded-xl border border-border/70 bg-card/80 px-4 py-3">
        <p className="text-xs text-muted-foreground">Total Occupations</p>
        <p className="mt-1 text-2xl font-semibold text-foreground">
          {numberFormatter.format(total)}
        </p>
      </div>
    </div>
  );

  const isDetailOpen = Boolean(selected || loadingDetail);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Background gradient */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(27,71,85,0.12),_transparent_55%)]" />
        <div className="absolute -top-32 right-[-10%] h-72 w-72 rounded-full bg-[radial-gradient(circle,_rgba(33,90,101,0.35),_transparent_70%)] blur-3xl animate-float" />
        <div className="absolute bottom-[-40%] left-[-10%] h-80 w-80 rounded-full bg-[radial-gradient(circle,_rgba(247,209,157,0.45),_transparent_70%)] blur-3xl animate-float" />
      </div>

      {/* Fixed header (on scroll) */}
      <div className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
      }`}>
        <div className="bg-background/95 backdrop-blur border-b border-border/50 shadow-sm">
          <div className="mx-auto max-w-7xl px-4 py-3 flex items-center gap-4">
            <span className="font-semibold text-foreground">Task Risk Atlas</span>
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search occupations..."
                  value={searchInput}
                  onChange={(event) => setSearchInput(event.target.value)}
                  className="pl-9 h-9"
                />
              </div>
            </div>
            <Select value={sort} onValueChange={(value) => setSort(value as "ai" | "employment")}>
              <SelectTrigger className="w-32 h-9">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ai">AI Impact</SelectItem>
                <SelectItem value="employment">Employment</SelectItem>
              </SelectContent>
            </Select>
            {activeFilters.length > 0 && (
              <div className="flex items-center gap-2">
                {activeFilters.map((filter) => (
                  <Badge key={filter} variant="secondary" className="text-xs">
                    {filter === "low-risk" ? "Low Risk" : filter === "ai-collaborative" ? "AI Collab" : "On-Site"}
                  </Badge>
                ))}
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-7 px-2 text-xs text-muted-foreground"
                  onClick={() => setActiveFilters([])}
                >
                  Clear
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation */}
        <AppNav />

        {/* Hero search section */}
        <div ref={heroRef} className="mt-8 mb-10 animate-rise">
          <div className="text-center max-w-2xl mx-auto">
            <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-foreground">
              Is Your Job Safe in the AI Era?
            </h1>
            <p className="mt-3 text-muted-foreground">
              Explore AI automation risk by occupation and prepare for the future
            </p>
          </div>

          <div className="mt-8 max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search by occupation (e.g., Developer, Nurse, Accountant)"
                value={searchInput}
                onChange={(event) => setSearchInput(event.target.value)}
                className="pl-12 h-14 text-lg rounded-2xl border-border/70 bg-card/80 shadow-[var(--shadow)] backdrop-blur"
              />
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
              <Select value={sort} onValueChange={(value) => setSort(value as "ai" | "employment")}>
                <SelectTrigger className="w-36">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ai">AI Impact (High)</SelectItem>
                  <SelectItem value="employment">Employment Size</SelectItem>
                </SelectContent>
              </Select>

              <div className="flex gap-2">
                <Button
                  variant={activeFilters.includes("low-risk") ? "secondary" : "outline"}
                  size="sm"
                  className={`text-xs ${activeFilters.includes("low-risk") ? "border-primary/50" : ""}`}
                  onClick={() => toggleFilter("low-risk")}
                >
                  Low AI Risk
                </Button>
                <Button
                  variant={activeFilters.includes("ai-collaborative") ? "secondary" : "outline"}
                  size="sm"
                  className={`text-xs ${activeFilters.includes("ai-collaborative") ? "border-primary/50" : ""}`}
                  onClick={() => toggleFilter("ai-collaborative")}
                >
                  AI Collaborative
                </Button>
                <Button
                  variant={activeFilters.includes("on-site") ? "secondary" : "outline"}
                  size="sm"
                  className={`text-xs ${activeFilters.includes("on-site") ? "border-primary/50" : ""}`}
                  onClick={() => toggleFilter("on-site")}
                >
                  On-Site Jobs
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Main content (4:6 ratio) */}
        <main className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
          {/* Left: Occupation list (40%) */}
          <div className="space-y-4">
            <div className="rounded-2xl border border-border/70 bg-card/80 shadow-[var(--shadow)] backdrop-blur">
              <div className="flex items-center justify-between px-4 pt-4 pb-2">
                <div>
                  <p className="text-sm font-medium text-foreground">Occupations</p>
                  <p className="text-xs text-muted-foreground">
                    {loadingList
                      ? "Loading..."
                      : activeFilters.length > 0
                        ? `${numberFormatter.format(filteredItems.length)} of ${numberFormatter.format(items.length)} shown`
                        : `${numberFormatter.format(total)} total`}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex rounded-lg border border-border/70 p-1">
                    <button
                      className={`p-1.5 rounded ${viewMode === "cards" ? "bg-muted" : ""}`}
                      onClick={() => setViewMode("cards")}
                    >
                      <LayoutGrid className="h-4 w-4" />
                    </button>
                    <button
                      className={`p-1.5 rounded ${viewMode === "table" ? "bg-muted" : ""}`}
                      onClick={() => setViewMode("table")}
                    >
                      <List className="h-4 w-4" />
                    </button>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {page}/{pages}
                  </Badge>
                </div>
              </div>

              <div className="px-4 pb-4">
                {error && (
                  <div className="mb-3 rounded-xl border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive">
                    {error}
                  </div>
                )}

                {viewMode === "cards" ? (
                  <div className="space-y-2">
                    {loadingList ? (
                      Array.from({ length: 6 }).map((_, index) => (
                        <Skeleton key={index} className="h-16 w-full" />
                      ))
                    ) : filteredItems.length === 0 ? (
                      <div className="py-8 text-center text-muted-foreground text-sm">
                        No occupations match the current filters
                      </div>
                    ) : (
                      filteredItems.map((item) => (
                        <button
                          key={`${item.soc_code}-${item.onetsoc_code}`}
                          className={`w-full rounded-xl border px-4 py-3 text-left transition hover:border-border hover:bg-muted/60 ${
                            selected?.soc_code === item.soc_code
                              ? "border-primary bg-primary/5"
                              : "border-border/70 bg-background/70"
                          }`}
                          onClick={() => loadDetail(item.soc_code)}
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="min-w-0 flex-1">
                              <p className="font-medium text-foreground truncate">
                                {item.title}
                              </p>
                              <div className="mt-1 flex flex-wrap gap-1">
                                {getLabels(item).slice(0, 2).map((label) => (
                                  <Badge key={label} variant="secondary" className="text-xs px-1.5 py-0">
                                    {label}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                            <div className="text-right flex-shrink-0">
                              <span className={`text-lg font-bold ${getScoreColor(item.ai_mean)}`}>
                                {formatScore(item.ai_mean)}
                              </span>
                              <div className="mt-1 h-1.5 w-16 rounded-full bg-secondary/80 overflow-hidden">
                                <div
                                  className="h-full rounded-full bg-primary transition-all"
                                  style={{ width: `${Math.min(100, item.ai_mean ?? 0)}%` }}
                                />
                              </div>
                            </div>
                          </div>
                        </button>
                      ))
                    )}
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Occupation</TableHead>
                        <TableHead className="text-right w-20">AI Impact</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {loadingList ? (
                        Array.from({ length: 6 }).map((_, index) => (
                          <TableRow key={index}>
                            <TableCell colSpan={2}>
                              <Skeleton className="h-5 w-full" />
                            </TableCell>
                          </TableRow>
                        ))
                      ) : filteredItems.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={2} className="text-center py-8 text-muted-foreground">
                            No occupations match the current filters
                          </TableCell>
                        </TableRow>
                      ) : (
                        filteredItems.map((item) => (
                          <TableRow
                            key={`${item.soc_code}-${item.onetsoc_code}`}
                            className={`cursor-pointer hover:bg-muted/60 ${
                              selected?.soc_code === item.soc_code ? "bg-primary/5" : ""
                            }`}
                            onClick={() => loadDetail(item.soc_code)}
                          >
                            <TableCell>
                              <span className="font-medium">{item.title}</span>
                            </TableCell>
                            <TableCell className="text-right">
                              <span className={`font-medium ${getScoreColor(item.ai_mean)}`}>
                                {formatScore(item.ai_mean)}
                              </span>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                )}

                <div className="flex items-center justify-between pt-3 mt-3 border-t border-border/50">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPage((prev) => Math.max(1, prev - 1))}
                    disabled={page === 1 || loadingList}
                  >
                    Previous
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPage((prev) => Math.min(pages, prev + 1))}
                    disabled={page >= pages || loadingList}
                  >
                    Next
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Detail + Default content (60%) */}
          <div className="space-y-4">
            {/* Loading state for detail */}
            {loadingDetail && (
              <div className="rounded-2xl border border-border/70 bg-card/80 shadow-[var(--shadow)] backdrop-blur p-4">
                <div className="space-y-3">
                  <Skeleton className="h-6 w-2/3" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-4/5" />
                </div>
              </div>
            )}

            {/* Selected occupation detail */}
            {selected && <DetailPanel />}

            {/* Default content (always visible) */}
            <SummaryPanel />
            <RankingPanel />
          </div>
        </main>

        {/* Mobile detail modal */}
        {isDetailOpen && (
          <div className="lg:hidden fixed inset-0 z-40 bg-black/40">
            <div className="absolute inset-x-0 bottom-0 rounded-t-3xl border border-border/70 bg-card p-5 shadow-[var(--shadow)] max-h-[85vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm font-medium text-foreground">Selected Occupation</p>
                <Button variant="ghost" size="sm" onClick={closeDetail}>
                  Close
                </Button>
              </div>
              {loadingDetail && !selected ? (
                <div className="space-y-3">
                  <Skeleton className="h-5 w-2/3" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-4/5" />
                </div>
              ) : selected ? (
                <DetailPanel />
              ) : null}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
