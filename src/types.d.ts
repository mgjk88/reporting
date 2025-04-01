type ReportType = "review" | "user" | "business" | "service" | "other";

type ReportFilterObj = {
  type?: ReportType;
  target_id?: bigint;
  reason?: string;
  description?: string;
  submitted_by?: bigint;
  resolved_by?: bigint;
  resolved_at?: Date;
  created_at?: Date;
};

//used for sort api calls, not implemented
type ReportSortList = ReportSortObj[];

type ReportSortObj =
  | { type: sortOrder }
  | { target_id: sortOrder }
  | { reason: sortOrder }
  | { description: sortOrder }
  | { submitted_by: sortOrder }
  | { resolved_by: sortOrder }
  | { resolved_at: sortOrder }
  | { created_at: sortOrder };

type sortOrder = "asc" | "desc";

//type for querying reports from db
type ReportsQuery = {
  filter?: ReportFilterObj;
  sort?: ReportSortList;
  offset?: number;
  limit?: number;
}