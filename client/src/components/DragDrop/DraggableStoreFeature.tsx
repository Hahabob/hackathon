import { useDraggable } from "@dnd-kit/core";
import { DoorOpen, LogOut, CreditCard, Package } from "lucide-react";

import type { StoreFeature } from "./types";

interface DraggableStoreFeatureProps {
  feature: StoreFeature;
}

export default function DraggableStoreFeature({
  feature,
}: DraggableStoreFeatureProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: feature.id,
    });

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,

    opacity: isDragging ? 0.5 : 1,
  };

  const getIcon = () => {
    switch (feature.type) {
      case "entrance":
        return <DoorOpen className="w-4 h-4" />;
      case "exit":
        return <LogOut className="w-4 h-4" />;
      case "checkout":
        return <CreditCard className="w-4 h-4" />;
      default:
        return <Package className="w-4 h-4" />;
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="flex items-center gap-2 p-2 rounded border cursor-grab active:cursor-grabbing"
    >
      <span className="text-lg">{feature.emoji}</span>
      {getIcon()}
      <span className="font-medium">{feature.name}</span>
    </div>
  );
}
