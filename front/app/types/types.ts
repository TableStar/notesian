import z from "zod";

export const loginSchema = z.object({
  email: z.string().email({ message: "Alamat Email tidak valid" }),
  password: z.string().min(1, { message: "Password tidak boleh kosong." }),
});

export type LoginForm = z.infer<typeof loginSchema>;

export type Room = {
  id: string;
  number: string;
  status: "vacant" | "occupied" | "maintenance";
  hasAC: boolean;
};

export type RoomCardProps = {
  room: Room;
  onClick?: () => void;
};

export type RoomPb = {
  id: string;
  created: string; // ISO datetime string
  updated: string; // ISO datetime string
  owner: string; // owner ID
  room_num: string; // stored as string
  base_price_month: number;
  has_ac: boolean;
  notes: string;
};

export type RentalsPb = {
  ac_included: boolean;
  collectionId: string;
  collectionName: string;
  created: string; // ISO 8601 datetime string
  id: string;
  rented_price_monthly: number;
  room: string; // appears to be a room ID
  start_date: string; // ISO 8601 datetime string
  status: string; // could be more specific as 'active' | 'inactive' | etc.
  tenant_name: string;
  updated: string; // ISO 8601 datetime string
};

export type RoomWithExpandRentalsPb = RoomPb & {
  expand?: {
    rentals_via_room?: RentalsPb[];
  };
};

export type RoomWithStatus = {
  id: string;
  created: string;
  updated: string;
  owner: string;
  room_num: string;
  base_price_month: number;
  has_ac: boolean;
  notes: string;
  status: string;
  tenantName: string | null;
  rentedPrice: number | null;
};