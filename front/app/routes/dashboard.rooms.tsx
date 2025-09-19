import { pb } from "~/lib/pocketbase";
import type { Route } from "./+types/dashboard.rooms";
import type { RoomWithExpandRentalsPb } from "~/types/types";
import { RoomsDataTable } from "~/components/DataTable/rooms-datatable";
import { roomsColumns } from "~/components/DataTable/columns";

export const clientLoader = async ({ request }: Route.ClientLoaderArgs) => {
  const searchParams = new URL(request.url).searchParams;
  const currPage = parseInt(searchParams.get("page") || "1", 10);
  const result = await pb.collection("rooms").getList<RoomWithExpandRentalsPb>(currPage, 10,{expand:"rentals_via_room"});
  const rooms = result.items;

  const roomsWithStatus = rooms.map((room) => {
    const activeRentals = room.expand?.rentals_via_room?.filter(
      (rental) => rental.status === "active"
    )||[];

    const isOccupied = activeRentals.length >0;
    const currRental = isOccupied ? activeRentals[0]:null;

    return {
      ...room,
      status: isOccupied,
      tenantName:currRental?.tenant_name||null,
      rentedPrice: currRental?.rented_price_monthly||null
    }
  })

  const paginationData = {
    page: result.page,
    perPage: result.perPage,
    totalItems: result.totalItems,
    totalPages: result.totalPages,
  };
  return { roomsWithStatus, paginationData };
};

const Rooms = ({ loaderData }: Route.ComponentProps) => {
  const { roomsWithStatus, paginationData } = loaderData;
  return (
    <div className="space-y-4 p-4 md:p-8">
      <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Semua Kamar</h1>
          <p className="text-muted-foreground">
            List Semua Kamar
          </p>
      </div>
      <RoomsDataTable
        columns={roomsColumns}
        data={roomsWithStatus}
        paginationData={paginationData}
      />
    </div>
  );
};

export default Rooms;
