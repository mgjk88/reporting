"use client";
import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";
import { toast } from "sonner";
export default function ResolveButton({
  rowData,
  update,
}: {
  rowData: {
    status: string;
    id: string;
    type: "user" | "review" | "business" | "service" | "other";
    target_id: string;
    reason: string;
    description: string | null;
    submitted_by: string;
    resolved_by: string | null;
    resolved_at: Date | null;
    created_at: Date;
  };
  update: (data: {
    id: string;
    resolved_by: string | null;
    resolved_at: Date | null;
    status: string;
  }) => void;
}) {
  const { id } = useParams();

  return (
    <Button
      onClick={() => {
        const toggleResolve = fetch(`/api/v1/reports/${rowData.id}`, {
          method: "PATCH",
          body: JSON.stringify({
            id: rowData.id,
            resolved_by: rowData.status === "resolved" ? null : id,
            resolved_at: rowData.status === "resolved" ? null : new Date(),
          }),
        })
          .then((res) => {
            if (!res.ok) throw new Error(res.statusText);
            return res.json();
          })
          .then((res) => {
            update({
              id: res.report.id,
              resolved_by: rowData.resolved_by
                ? null
                : res.report.resolver.email,
              resolved_at: rowData.resolved_at ? null : res.report.resolved_at,
              status: rowData.status === "resolved" ? "unresolved" : "resolved",
            });
          });
        toast.promise(toggleResolve, {
          loading: "Updating report",
          success: "Report updated",
          error: (err) => `Error updating report: ${err}`,
        });
      }}
    >
      {rowData.status === "resolved" ? "Unresolve" : "Resolve"}
    </Button>
  );
}
