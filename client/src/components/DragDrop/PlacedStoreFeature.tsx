
import {
  Trash2,
  DoorOpen,
  LogOut,
  CreditCard,
  Package,
  Move,
} from "lucide-react";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import cn from "classnames";

import type  { StoreFeature } from "./types";

interface PlacedStoreFeatureProps {
  feature: StoreFeature;
  onRemove: (featureId: string) => void;
}

export default function PlacedStoreFeature({
  feature,
  onRemove,
}: PlacedStoreFeatureProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    isDragging,
  } = useDraggable({
    id: feature.id,
  });

  const style = {
    transform: CSS.Translate.toString(transform),
   
  };

  const getIcon = () => {
    switch (feature.type) {
      case "entrance":
        return <DoorOpen className="w-3 h-3" />;
      case "exit":
        return <LogOut className="w-3 h-3" />;
      case "checkout":
        return <CreditCard className="w-3 h-3" />;
      default:
        return <Package className="w-3 h-3" />;
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "relative group",
        isDragging && "opacity-50 scale-105 z-50"
      )}
    >
      <button
        onClick={() => onRemove(feature.id)}
        className="absolute -top-1 -right-1 p-1 bg-red-100 rounded-full hover:bg-red-200 z-20 opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <Trash2 className="w-3 h-3 text-red-600" />
      </button>
      <div
        {...attributes}
        {...listeners}
        className="absolute -top-1 -left-1 p-1 bg-white rounded-full shadow-md hover:bg-gray-50 z-20 cursor-grab active:cursor-grabbing opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <Move className="w-3 h-3 text-gray-600" />
      </div>
      <div
        className={cn(
          "p-2 rounded-lg border-2 w-full text-center",
          feature.color
        )}
      >
        <div className="flex items-center justify-center gap-2 mb-1">
          <span className="text-lg">{feature.emoji}</span>
          {getIcon()}
        </div>
        <p className="text-xs font-medium">{feature.name}</p>
      </div>
    </div>
  );
}
