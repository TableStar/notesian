import React from "react";

type MobileDataTableCardsProps<TData> = {
  data: TData[];
  cardComponent: React.ComponentType<{
    item: TData;
    onView?: (item: TData) => void;
    onEdit?: (item: TData) => void;
    onDelete?: (item: TData) => void;
  }>;
  onView?: (item: TData) => void;
  onEdit?: (item: TData) => void;
  onDelete?: (item: TData) => void;
};

export function MobileDataTableCards<TData>({
  data,
  cardComponent: CardComponent,
  onView,
  onEdit,
  onDelete,
}: MobileDataTableCardsProps<TData>) {
  return (
    <div className="flex-1 overflow-y-auto p-4 pb-20 space-y-3">
      {data.map((item, index) => (
        <CardComponent
          key={(item as any).id || index}
          item={item}
          onView={onView}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}

      {data.length === 0 && (
        <div className="text-center py-12">
          <div className="text-muted-foreground mb-2">No items found</div>
          <div className="text-sm text-muted-foreground">
            Try adjusting your search or filters
          </div>
        </div>
      )}
    </div>
  );
}
