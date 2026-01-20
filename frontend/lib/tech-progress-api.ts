import { API_BASE, getDataVersion } from "@/lib/api";

export type TechProgressSummary = {
  data_version: string;
  week: string | null;
  active_scope_id: string | null;
  tasks_with_change: number;
  avg_progress: number | null;
  top_tasks: {
    task_id: number;
    task_statement: string;
    delta: number | null;
  }[];
  top_tech: {
    tech_id: string;
    name: string;
    task_count: number;
    avg_impact: number | null;
  }[];
};

export type TechProgressTaskItem = {
  task_id: number;
  task_statement: string;
  progress_score: number | null;
  delta: number | null;
  top_tech_id: string | null;
  top_tech_name: string | null;
  link_count: number;
};

export type TechProgressTaskDetail = {
  data_version: string;
  week: string;
  task: {
    task_id: number;
    task_statement: string;
    progress_score: number | null;
    delta: number | null;
  };
  links: {
    tech_id: string;
    tech_name: string;
    link_type: string;
    impact_score: number | null;
    confidence: number | null;
    evidence_id: string;
  }[];
  evidence: {
    evidence_id: string;
    evidence_date: string;
    summary: string;
    source_type: string;
  }[];
};

export async function fetchTechWeeks(params: {
  dataVersion?: string;
  signal?: AbortSignal;
}): Promise<{ data_version: string; weeks: string[] }> {
  const searchParams = new URLSearchParams();
  searchParams.set("data_version", getDataVersion(params.dataVersion));
  const response = await fetch(
    `${API_BASE}/tech-progress/weeks?${searchParams.toString()}`,
    { signal: params.signal }
  );
  if (!response.ok) {
    throw new Error(`Failed to load weeks (${response.status})`);
  }
  return response.json();
}

export async function fetchTechSummary(params: {
  week?: string;
  dataVersion?: string;
  signal?: AbortSignal;
}): Promise<TechProgressSummary> {
  const searchParams = new URLSearchParams();
  if (params.week) searchParams.set("week", params.week);
  searchParams.set("data_version", getDataVersion(params.dataVersion));
  const response = await fetch(
    `${API_BASE}/tech-progress/summary?${searchParams.toString()}`,
    { signal: params.signal }
  );
  if (!response.ok) {
    throw new Error(`Failed to load summary (${response.status})`);
  }
  return response.json();
}

export async function fetchTechTasks(params: {
  week?: string;
  dataVersion?: string;
  page?: number;
  pageSize?: number;
  linkType?: string;
  minDelta?: number;
  signal?: AbortSignal;
}): Promise<{
  data_version: string;
  week: string | null;
  items: TechProgressTaskItem[];
  page: number;
  page_size: number;
  total: number;
}> {
  const searchParams = new URLSearchParams();
  if (params.week) searchParams.set("week", params.week);
  if (params.page) searchParams.set("page", String(params.page));
  if (params.pageSize) searchParams.set("page_size", String(params.pageSize));
  if (params.linkType) searchParams.set("link_type", params.linkType);
  if (params.minDelta !== undefined && !Number.isNaN(params.minDelta)) {
    searchParams.set("min_delta", String(params.minDelta));
  }
  searchParams.set("data_version", getDataVersion(params.dataVersion));
  const response = await fetch(
    `${API_BASE}/tech-progress/tasks?${searchParams.toString()}`,
    { signal: params.signal }
  );
  if (!response.ok) {
    throw new Error(`Failed to load tasks (${response.status})`);
  }
  return response.json();
}

export async function fetchTechTaskDetail(params: {
  taskId: number;
  week?: string;
  dataVersion?: string;
  signal?: AbortSignal;
}): Promise<TechProgressTaskDetail> {
  const searchParams = new URLSearchParams();
  if (params.week) searchParams.set("week", params.week);
  searchParams.set("data_version", getDataVersion(params.dataVersion));
  const response = await fetch(
    `${API_BASE}/tech-progress/tasks/${params.taskId}?${searchParams.toString()}`,
    { signal: params.signal }
  );
  if (!response.ok) {
    throw new Error(`Failed to load task detail (${response.status})`);
  }
  return response.json();
}
