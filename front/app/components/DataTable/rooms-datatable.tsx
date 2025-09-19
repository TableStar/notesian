import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { useState } from "react";

import { useNavigate } from "react-router";
import { Input } from "../ui/input";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { ChevronsLeft, ChevronsRight, SlidersHorizontal } from "lucide-react";
import { useIsMobile } from "~/hooks/use-mobile";
import { MobileDataTableCards } from "./mobile-room-cards";
import type { RoomWithStatus } from "~/types/types";

type PaginationData = {
  page: number;
  perPage: number;
  totalItems: number;
  totalPages: number;
};

type DataTableProps<TData, TValue> = {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  paginationData?: PaginationData;
};

export const RoomsDataTable = <TData, TValue>({
  columns,
  data,
  paginationData,
}: DataTableProps<TData, TValue>) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  const canGoPrevious = paginationData ? paginationData.page > 1 : false;
  const canGoNext = paginationData
    ? paginationData.page < paginationData.totalPages
    : false;

  const handleNavigation = (page: number) => {
    navigate(`?page=${page}`);
  };



  // Get the processed data from the table (filtered and sorted)
  const processedData = table.getRowModel().rows.map(row => row.original);


  return (
    <div className="w-xs md:w-full">
      <div className="flex flex-col-reverse md:flex-row items-start md:items-center justify-between">
        <div className="flex items-center gap-4 py-4 w-full">
          <Input
            placeholder="Filter by room number..."
            value={
              (table.getColumn("room_num")?.getFilterValue() as string) ?? ""
            }
            onChange={(event) =>
              table.getColumn("room_num")?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
          {(table.getColumn("room_num")?.getFilterValue() as string) && (
            <Button
              variant="ghost"
              onClick={() => table.getColumn("room_num")?.setFilterValue("")}
            >
              Clear
            </Button>
          )}
        </div>
        <div className="flex items-center gap-4 justify-between w-full md:justify-start">
          {!isMobile && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="md:ml-auto">
                  <SlidersHorizontal className="mr-2 h-4 w-4" />
                  View
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {table
                  .getAllColumns()
                  .filter((column) => column.getCanHide())
                  .map((column) => {
                    return (
                      <DropdownMenuCheckboxItem
                        key={column.id}
                        className="capitalize"
                        checked={column.getIsVisible()}
                        onCheckedChange={(value) =>
                          column.toggleVisibility(!!value)
                        }
                      >
                        {column.id}
                      </DropdownMenuCheckboxItem>
                    );
                  })}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
          <Button>Add New Room</Button>
        </div>
      </div>

      {isMobile ? (
        <MobileDataTableCards
          data={processedData as RoomWithStatus[]} // Type assertion for now - you may want to properly type this
          onViewRoom={(room) => console.log("View room:", room)}
          onEditRoom={(room) => console.log("Edit room:", room)}
          onDeleteRoom={(room) => console.log("Delete room:", room)}
        />
      ) : (
        <>
          <div className="overflow-auto rounded-md border">
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
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && "selected"}
                      className="hover:bg-muted/50"
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 text-center"
                    >
                      No results.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          {paginationData && (
            <div className="flex items-center justify-between space-x-2 py-4">
              <div className="flex-1 text-sm text-muted-foreground">
                {table.getFilteredSelectedRowModel().rows.length} of{" "}
                {table.getFilteredRowModel().rows.length} row(s) selected.
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  className="hidden h-8 w-8 p-0 lg:flex"
                  onClick={() => handleNavigation(1)}
                  disabled={!canGoPrevious}
                >
                  <span className="sr-only">Go to first page</span>
                  <ChevronsLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  className="h-8 w-8 p-0"
                  onClick={() => handleNavigation(paginationData.page - 1)}
                  disabled={!canGoPrevious}
                >
                  <span className="sr-only">Go to previous page</span>
                  <ChevronsLeft className="h-4 w-4" />
                </Button>
                <div className="flex w-[100px] items-center justify-center text-sm font-medium">
                  Page {paginationData.page} of {paginationData.totalPages}
                </div>
                <Button
                  variant="outline"
                  className="h-8 w-8 p-0"
                  onClick={() => handleNavigation(paginationData.page + 1)}
                  disabled={!canGoNext}
                >
                  <span className="sr-only">Go to next page</span>
                  <ChevronsRight className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  className="hidden h-8 w-8 p-0 lg:flex"
                  onClick={() => handleNavigation(paginationData.totalPages)}
                  disabled={!canGoNext}
                >
                  <span className="sr-only">Go to last page</span>
                  <ChevronsRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};
