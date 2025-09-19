
import type { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "./datatable-column-header-sort";
import RoomsTableActions from "../dashboard/rooms/rooms-table-actions";
import { Badge } from "../ui/badge";
import { Checkbox } from "../ui/checkbox";
import type { RoomWithStatus } from "~/types/types";




export const roomsColumns: ColumnDef<RoomWithStatus>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  { accessorKey: "room_num", header: "Room Number" },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const isOccupied = row.getValue("status");
      return (
        <Badge variant={isOccupied ? "destructive" : "secondary"}>
          {isOccupied ? "Occupied" : "Vacant"}
        </Badge>
      );
    },
  },
  { accessorKey: "tenantName", header: "Tenant Name" },
  {
    accessorKey: "has_ac",
    header: "A/C",
    cell: ({ row }) => {
      return <div>{row.getValue("has_ac") ? "Yes" : "No"}</div>;
    },
  },
  {
    accessorKey: "base_price_month",
    header: ({ column }) => (
      <DataTableColumnHeader
        className="flex-row-reverse"
        title="Base Rent"
        column={column}
      />
    ),
    cell: ({ row }) => {
      const price = parseFloat(row.getValue("base_price_month")) || 0;
      const formatted = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
      }).format(price);
      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "rentedPrice",
    header: ({ column }) => (
      <DataTableColumnHeader
        className="flex-row-reverse"
        title="Actual Rent"
        column={column}
      />
    ),
    cell: ({ row }) => {
      const price = parseFloat(row.getValue("rentedPrice")) || 0;
      if (price === 0) {
        return <div className="text-right font-medium">-</div>;
      }
      const formatted = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
      }).format(price);
      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      return <RoomsTableActions row={row}/>
    },
  },
];
