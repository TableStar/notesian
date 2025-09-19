import {
  ChevronDown,
  ChevronUp,
  Edit,
  Eye,
  MoreVertical,
  Snowflake,
  Trash2,
} from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import { Badge } from "../ui/badge";
import { cn } from "~/lib/utils";
import { useState } from "react";
import type { RoomWithStatus } from "~/types/types";

type MobileDataTableCardsProps = {
  data: RoomWithStatus[];
  onViewRoom?: (room: RoomWithStatus) => void;
  onEditRoom?: (room: RoomWithStatus) => void;
  onDeleteRoom?: (room: RoomWithStatus) => void;
};

export function MobileDataTableCards({
  data,
  onViewRoom,
  onEditRoom,
  onDeleteRoom,
}: MobileDataTableCardsProps) {
  const [expandedRooms, setExpandedRooms] = useState<Set<string>>(new Set());

  const toggleExpanded = (roomId: string) => {
    const newExpanded = new Set(expandedRooms);
    if (newExpanded.has(roomId)) {
      newExpanded.delete(roomId);
    } else {
      newExpanded.add(roomId);
    }
    setExpandedRooms(newExpanded);
  };

  const getStatusBadge = (status: string) => {
    const statusColors = {
      available: "bg-green-100 text-green-800",
      occupied: "bg-red-100 text-red-800",
      maintenance: "bg-yellow-100 text-yellow-800",
    };
    return (
      <Badge
        className={`${
          statusColors[status as keyof typeof statusColors] ||
          "bg-gray-100 text-gray-800"
        } capitalize`}
      >
        {status}
      </Badge>
    );
  };

  const getAmenityIcon = (amenity: string) => {
    switch (amenity.toLowerCase()) {
      case "ac":
        return <Snowflake className="h-3 w-3" />;
      default:
        return null;
    }
  };

  return (
    <div className="flex-1 overflow-y-auto p-4 pb-20 space-y-3">
      {data.map((room) => (
        <Card
          key={room.id}
          className={cn(
            "transition-all duration-200 cursor-pointer",
            "hover:shadow-md active:scale-[0.98]"
          )}
        >
          <CardContent className="p-4">
            {/* Main Room Info */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="text-6xl font-bold text-primary">
                  {room.room_num}
                </div>
              </div>
              <div className="flex items-center gap-2">
                {getStatusBadge(room.status)}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => onViewRoom?.(room)}>
                      <Eye className="h-4 w-4 mr-2" />
                      View Details
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onEditRoom?.(room)}>
                      <Edit className="h-4 w-4 mr-2" />
                      Edit Room
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => onDeleteRoom?.(room)}
                      className="text-red-600"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete Room
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            {/* Price and Basic Info */}
            <div className="flex items-center justify-between mb-3">
              <div className="text-lg font-semibold text-green-600">
                Rp {room.rentedPrice?.toLocaleString("id-ID") ?? 0}
                <span className="text-xs text-muted-foreground ml-1">
                  /month
                </span>
              </div>
            </div>

            {/* Tenant Info */}
            {room.tenantName && (
              <div className="mb-3 p-2 bg-muted rounded-md">
                <div className="text-xs text-muted-foreground">
                  Current Tenant
                </div>
                <div className="text-sm font-medium">{room.tenantName}</div>
              </div>
            )}

            {/* AC Amenity */}
            {room.has_ac && (
              <div className="flex items-center gap-2 mb-3">
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  {getAmenityIcon("ac")}
                  <span>AC</span>
                </div>
              </div>
            )}

            {/* Collapsible Details */}
            <Collapsible
              open={expandedRooms.has(room.id)}
              onOpenChange={() => toggleExpanded(room.id)}
            >
              <CollapsibleTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full h-8 text-xs"
                >
                  {expandedRooms.has(room.id) ? (
                    <>
                      <ChevronUp className="h-3 w-3 mr-1" />
                      Less Details
                    </>
                  ) : (
                    <>
                      <ChevronDown className="h-3 w-3 mr-1" />
                      More Details
                    </>
                  )}
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="space-y-3 pt-3 border-t">
                {/* Additional Info */}
                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div>
                    <div className="text-muted-foreground">Created</div>
                    <div className="font-medium">
                      {new Date(room.created).toLocaleDateString("id-ID")}
                    </div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Harga Sewa</div>
                    <div className="font-medium">
                      Rp {room.base_price_month.toLocaleString('id-ID') ?? 0} /month
                    </div>
                  </div>
                </div>

                {/* Notes */}
                {room.notes && (
                  <div>
                    <div className="text-xs font-medium text-muted-foreground mb-2">
                      Notes
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {room.notes}
                    </div>
                  </div>
                )}
              </CollapsibleContent>
            </Collapsible>
          </CardContent>
        </Card>
      ))}

      {data.length === 0 && (
        <div className="text-center py-12">
          <div className="text-muted-foreground mb-2">No rooms found</div>
          <div className="text-sm text-muted-foreground">
            Try adjusting your search or filters
          </div>
        </div>
      )}
    </div>
  );
}
