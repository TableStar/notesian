import z from "zod";

export const loginSchema = z.object({
  email: z.string().email({ message: "Alamat Email tidak valid" }),
  password: z.string().min(1, { message: "Password tidak boleh kosong." }),
});

export type LoginForm = z.infer<typeof loginSchema>;

export type Room = {
  id:string;
  number: string;
  status: "vacant" | "occupied" | "maintenance";
  hasAC: boolean;
}

export type RoomCardProps = {
  room: Room;
  onClick?: () => void;
}
