import type { Room, RoomCardProps } from "~/types/types"
import { Card, CardContent } from "../ui/card"
import { Snowflake } from "lucide-react"

export function RoomCardMinimalist({ room, onClick }: RoomCardProps) {
  const getStatusConfig = (status: Room["status"]) => {
    switch (status) {
      case "vacant":
        return {
          borderClass: "border-l-green-500",
          textClass: "text-green-600",
          label: "Available",
        }
      case "occupied":
        return {
          borderClass: "border-l-red-500",
          textClass: "text-red-600",
          label: "Occupied",
        }
      case "maintenance":
        return {
          borderClass: "border-l-yellow-500",
          textClass: "text-yellow-600",
          label: "Maintenance",
        }
    }
  }

  const config = getStatusConfig(room.status)

  return (
    <Card
      className={`bg-card border-l-4 ${config.borderClass} border-border hover:shadow-md transition-shadow cursor-pointer`}
      onClick={onClick}
    >
      <CardContent className="p-4 text-center">
        <div className="text-3xl font-bold text-foreground mb-1">{room.number}</div>
        <div className={`text-lg font-medium mb-2 ${config.textClass}`}>{config.label}</div>
        {room.hasAC && (
          <div className="flex items-center text-xs text-muted-foreground">
            <Snowflake className="h-3 w-3 mr-1" />
            Air Conditioned
          </div>
        )}
      </CardContent>
    </Card>
  )
}
