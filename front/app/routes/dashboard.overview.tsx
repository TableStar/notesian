import { pb } from "~/lib/pocketbase";
import type { Route } from "./+types/dashboard.overview";
import { Header } from "~/components/header";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Bed, CheckCircle, DollarSign, User } from "lucide-react";
import type { Room } from "~/types/types";
import { RoomCardMinimalist } from "~/components/dashboard/room-card-minimal";

export const clientLoader = async ({}: Route.ClientLoaderArgs) => {
  const [rooms, activeRentals] = await Promise.all([
    pb.collection("rooms").getFullList({ sort: "room_num" }),
    pb.collection("rentals").getFullList({ filter: 'status = "active"' }),
  ]);

  const totalRooms = rooms.length;
  const occupiedRooms = activeRentals.length;
  const vacantRooms = totalRooms - occupiedRooms;

  const totalIncome = activeRentals.reduce((sum, rental) => {
    return sum + rental.rented_price_monthly || 0;
  }, 0);

  const expectedMonthlyIncome = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(totalIncome);

  const stats = {
    totalRooms,
    occupiedRooms,
    vacantRooms,
    expectedMonthlyIncome,
  };

  const occupiedRoomsMap = new Map(
    activeRentals.map((rental) => [rental.room, rental])
  );

  const roomStatusList:Room[] = rooms.map((room) => {
    const isOccupied = occupiedRoomsMap.has(room.id);
    const rentalInfo = occupiedRoomsMap.get(room.id);

    return {
      number: room.room_num,
      status: isOccupied ? "occupied" : "vacant",
      hasAC: isOccupied ? rentalInfo?.ac_included : room.has_ac,
    };
  });

  return { stats, roomStatusList };
};

const Overview = ({ loaderData }: Route.ComponentProps) => {
  const { stats, roomStatusList } = loaderData;
  const displayStats = [
    {
      title: "Total Rooms",
      value: stats.totalRooms,
      icon: Bed,
    },
    {
      title: "Occupied Rooms",
      value: stats.occupiedRooms,
      icon: User,
    },
    {
      title: "Vacant Rooms",
      value: stats.vacantRooms,
      icon: CheckCircle,
    },
    {
      title: "Expected Monthly Income",
      value: stats.expectedMonthlyIncome,
      icon: DollarSign,
    },
  ];

  const rooms = roomStatusList;

  return (
    <div className="space-y-4 p-8 pt-6 mx-auto max-w-7xl">
      <Header title="Dashboard Overview" />

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {displayStats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Room Status Panel */}
      <Card>
        <CardHeader>
          <CardTitle>Live Room Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4 lg:grid-cols-6">
            {rooms.map((room) => (
              <RoomCardMinimalist room={room}/>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
export default Overview;
