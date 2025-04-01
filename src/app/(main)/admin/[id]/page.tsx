"use client";
import { z } from "zod";
import { readReportClientSchema } from "@/lib/zod";
import ResolveButton from "./_components/resolve-button";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "./_components/table";
import useFetchReports from "./_hooks/useFetchReports";
import { DataTableColumnHeader } from "@/components/ui/data-table";

export default function Page() {
  const { data, isLoading, setData } = useFetchReports({});

  function updateRow({
    id,
    resolved_by,
    resolved_at,
    status,
  }: {
    id: string;
    resolved_by: string | null;
    resolved_at: Date | null;
    status: string;
  }) {
    setData(
      data.map((report) => {
        if (report.id === id) {
          return { ...report, resolved_by, resolved_at, status };
        }
        return report;
      })
    );
  }

  const columns: ColumnDef<z.infer<typeof readReportClientSchema>>[] = [
    {
      id: "actions",
      cell: ({ row }) => {
        const rowData = row.original;
        return <div className="w-[120px] flex justify-center"><ResolveButton rowData={rowData} update={updateRow} /></div>;
      },
    },
    {
      accessorKey: "id",
      header: "ID",
      cell: ({ row }) => {
        const val: string = row.getValue("id");
        if(!val) return <div className="text-left font-medium"> - </div>;
        return <div className="text-left font-medium">{val}</div>;
      },
    },
    {
      accessorKey: "type",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Type" />
      ),
    },
    {
      accessorKey: "reason",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Reason" />
      ),
      cell: ({ row }) => {
        const val: string = row.getValue("reason");
        if(!val) return <div className="text-left font-medium"> - </div>;
        return <div className="text-left font-medium">{val}</div>;
      },
    },
    {
      accessorKey: "status",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Status" />
      ),
      cell: ({ row }) => {
        const val: string = row.getValue("status");
        if(!val) return <div className="text-center font-medium"> - </div>;
        return <div className="text-center font-medium">{val}</div>;
      },
    },
    {
      accessorKey: "target_id",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Target ID" />
      ),
      cell: ({ row }) => {
        const val: string = row.getValue("target_id");
        if(!val) return <div className="text-center font-medium"> - </div>;
        return <div className="text-center font-medium">{val}</div>;
      },
    },
    {
      accessorKey: "description",
      header: "Description",
      cell: ({ row }) => {
        const val: string = row.getValue("description");
        if(!val) return <div className="text-left font-medium"> - </div>;
        return <div className="text-left font-medium text-pretty break-words">{val}</div>;
      },
    },
    {
      accessorKey: "created_at",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Created At" />
      ),
      cell: ({ row }) => {
        const val: Date = row.getValue("created_at");
        if(!val) return <div className="text-center font-medium"> - </div>;
        const date = new Date(val).toLocaleString("en-SG");
        return <div className="text-left font-medium">{date}</div>;
      },
    },
    {
      accessorKey: "submitted_by",
      header: "Submitted By",
    },
    {
      accessorKey: "resolved_at",
      header: "Resolved At",
      cell: ({ row }) => {
        const val: Date = row.getValue("resolved_at");
        if(!val) return <div className="text-center font-medium"> - </div>;
        const date = new Date(val).toLocaleString("en-SG");
        return <div className="text-left font-medium">{date}</div>;
      },
    },
    {
      accessorKey: "resolved_by",
      header: "Resolved By",
      cell: ({ row }) => {
        const val: string = row.getValue("resolved_by");
        if(!val) return <div className="text-left font-medium"> - </div>;
        return <div className="text-left font-medium">{val}</div>;
      },
    },
  ];

  return (
    <div className="flex flex-col w-full justify-center">
      <DataTable columns={columns} data={data} isLoading={isLoading} />
    </div>
  );
}
