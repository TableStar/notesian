

import { Snowflake, User, CheckCircle, Wrench } from "lucide-react"
import { Card, CardContent } from "../ui/card"
import { Badge } from "../ui/badge"
import type { Room, RoomCardProps } from "~/types/types"


export function RoomCardColored({ room, onClick }: RoomCardProps) {
  const getStatusConfig = (status: Room["status"]) => {
    switch (status) {
      case "vacant":
        return {
          bgClass: "bg-green-600",
          icon: CheckCircle,
          label: "Available",
        }
      case "occupied":
        return {
          bgClass: "bg-red-600",
          icon: User,
          label: "Occupied",
        }
      case "maintenance":
        return {
          bgClass: "bg-yellow-600",
          icon: Wrench,
          label: "Maintenance",
        }
    }
  }

  const config = getStatusConfig(room.status)
  const Icon = config.icon

  return (
    <Card
      className={`${config.bgClass} text-white border-0 hover:shadow-lg transition-all cursor-pointer hover:scale-105`}
      onClick={onClick}
    >
      <CardContent className="p-4 text-center">
        <div className="text-3xl font-bold mb-2">{room.number}</div>
        <div className="flex items-center justify-center gap-1 mb-2">
          <Icon className="h-4 w-4" />
          <span className="text-lg font-medium">{config.label}</span>
        </div>
        {room.hasAC && (
          <Badge variant="secondary" className="text-xs bg-white/20 text-white border-0 hover:bg-white/30">
            <Snowflake className="h-3 w-3 mr-1" />
            AC
          </Badge>
        )}
      </CardContent>
    </Card>
  )
}
