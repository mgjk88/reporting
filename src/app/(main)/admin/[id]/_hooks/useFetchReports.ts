"use client";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { z } from "zod";
import { readReportClientSchema, readReportServerSchema } from "@/lib/zod";

//TODO: add ability to call select pages based on current page in UI
export default function useFetchReports({
  page,
  items,
}: {
  page?: number;
  items?: number;
}) {
  const [data, setData] = useState<z.infer<typeof readReportClientSchema>[]>([]);
  const [isLoading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    const url =
      page && items
        ? `/api/v1/reports?limit=${items}&offset=${page * items}`
        : "/api/v1/reports";
    const loadReports = fetch(url, { signal })
      .then((res) => {
        if (!res.ok) throw new Error(res.statusText);
        return res.json();
      })
      .then((res) => {
        if (res.reports) {
          setData(processData(res.reports));
        }
      })
      .finally(() => {
        setLoading(false);
      });

    toast.promise(loadReports, {
      loading: "Loading reports",
      success: "Done",
      error: (err) => `Loading Error: ${err}`,
    });
    return () => {
      controller.abort();
    };
  }, [page, items]);

  return { data, isLoading, setData };
}

function processData(data: z.infer<typeof readReportServerSchema>[]) {
  return data.map((report) => {
    return {
      id: report.id,
      type: report.type,
      status: report.resolved_by ? "resolved" : "unresolved",
      target_id: report.target_id,
      reason: report.reason,
      description: report.description,
      created_at: report.created_at,
      submitted_by: report.submitter.email,
      resolved_at: report.resolved_at,
      resolved_by: report.resolver ? report.resolver.email : null,
    };
  });
}
