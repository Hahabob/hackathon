// src/components/SupermarketDragDrop/GridSpotComponent.tsx
import cn from "classnames";
import { useDroppable } from "@dnd-kit/core";
import { Package } from "lucide-react";
import type { GridSpot } from "./types";
import DraggableAisle from "./DraggableAisle";

interface GridSpotComponentProps {
  spot: GridSpot;
  onRemoveAisle: (productId: string) => void;
  isDraggingProduct: boolean;
}

export default function GridSpotComponent({
  spot,
  onRemoveAisle,
  isDraggingProduct,
}: GridSpotComponentProps) {
  const { setNodeRef, isOver } = useDroppable({
    id: `spot-${spot.position}`,
    disabled: spot.aisle !== null || isDraggingProduct,
  });

  return (
    <div
      ref={setNodeRef}
      className={cn(
        "min-h-[200px] border-2 border-dashed border-gray-300 rounded-lg transition-all duration-300 relative",
        isOver &&
          !spot.aisle &&
          !isDraggingProduct &&
          "border-blue-400 bg-blue-50 scale-105",
        spot.aisle && "border-transparent"
      )}
    >
      {spot.aisle ? (
        <DraggableAisle aisle={spot.aisle} onRemoveProduct={onRemoveAisle} />
      ) : (
        <div className="flex items-center justify-center h-full text-gray-400">
          <div className="text-center">
            <Package className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">Drop aisle here</p>
            <p className="text-xs">Position {spot.position + 1}</p>
          </div>
        </div>
      )}
    </div>
  );
}
