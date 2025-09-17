import type { RoomPb } from "~/types/types";
import type { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "./datatable-column-header-sort";
import RoomsTableActions from "../dashboard/rooms/rooms-table-actions";

export const roomsColumns: ColumnDef<RoomPb>[] = [
  { accessorKey: "room_num", header: "Nomer Kamar" },
  { accessorKey: "status", header: "Status" },
  { accessorKey: "has_ac", header: "A/C Terpasang" },
  {
    accessorKey: "base_price_month",
    header: ({ column }) => (
      <DataTableColumnHeader
        className="flex-row-reverse"
        title="Sewa Per Bulan"
        column={column}
      />
    ),
    cell: ({ row }) => {
      const price = parseFloat(row.getValue("base_price_month"));
      const formatted = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
      }).format(price);
      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    id: "actions",
    header: "Aksi",
    cell: ({ row }) => {
      return <RoomsTableActions row={row}/>
    },
  },
];
