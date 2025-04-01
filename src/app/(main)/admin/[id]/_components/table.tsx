import {
  ColumnDef,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
  SortingState,
  getSortedRowModel,
  flexRender,
  getFilteredRowModel,
  ColumnFiltersState,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { DataTablePagination } from "@/components/ui/data-table";

import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useState } from "react";

export function DataTable<Tdata, Tvalue>({
  columns,
  data,
  isLoading,
}: {
  columns: ColumnDef<Tdata, Tvalue>[];
  data: Tdata[];
  isLoading: boolean;
}) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [selectedColumn, setSelectedColumn] = useState<string>("type");
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnFiltersChange: setColumnFilters,
    state: { sorting, columnFilters },
  });

  return (
    <div className="flex justify-center flex-col items-center w-full h-full pt-2 pb-2">
      <div className="flex max-w-lg items-center space-x-2 md:space-x-3 pl-2 pr-2">
        <Select
          onValueChange={(value) => {
            setSelectedColumn(value);
          }}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter By Column" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="type">Type</SelectItem>
            <SelectItem value="status">Status</SelectItem>
            <SelectItem value="reason">Reason</SelectItem>
            <SelectItem value="description">Description</SelectItem>
          </SelectContent>
        </Select>
        <Input
          value={
            (table.getColumn(selectedColumn)?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn(selectedColumn)?.setFilterValue(event.target.value)
          }
        />
      </div>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell className="text-center" colSpan={columns.length}>
                Loading...
              </TableCell>
            </TableRow>
          ) : table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell className="min-w-[50px] max-w-[200px] max-h-[100px] text-pretty" key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell className="text-center" colSpan={columns.length}>
                No Results
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <DataTablePagination table={table} />
    </div>
  );
}
