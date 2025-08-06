// src/components/SupermarketDragDrop/BorderSpotComponent.tsx

import cn from "classnames";
import { useDroppable } from "@dnd-kit/core";

import type { BorderSpot } from "./types";
import PlacedStoreFeature from "./PlacedStoreFeature";

interface BorderSpotComponentProps {
  spot: BorderSpot;
  isDraggingFeature: boolean;
  onRemoveFeature: (featureId: string) => void;
}

export default function BorderSpotComponent({
  spot,
  isDraggingFeature,
  onRemoveFeature,
}: BorderSpotComponentProps) {
  const { setNodeRef, isOver } = useDroppable({
    id: `border-${spot.side}-${spot.position}`,
    disabled: !isDraggingFeature,
  });

  const getBorderStyle = () => {
    switch (spot.side) {
      case "top":
        return "border-t-4 border-t-blue-400";
      case "bottom":
        return "border-b-4 border-b-blue-400";
      case "left":
        return "border-l-4 border-l-blue-400";
      case "right":
        return "border-r-4 border-r-blue-400";
    }
  };

  const getPlaceholderText = () => {
    return `${spot.side.charAt(0).toUpperCase() + spot.side.slice(1)} ${
      spot.position + 1
    }`;
  };

  return (
    <div
      ref={setNodeRef}
      className={cn(
        "min-h-[80px] min-w-[120px] max-w-[120px] border-2 border-dashed border-gray-300 rounded-lg transition-all duration-300 flex items-center justify-center flex-shrink-0 overflow-hidden",
        isOver && isDraggingFeature && "border-blue-400 bg-blue-50 scale-105",
        spot.feature && "border-transparent",
        isDraggingFeature && getBorderStyle()
      )}
    >
      {spot.feature ? (
        <PlacedStoreFeature feature={spot.feature} onRemove={onRemoveFeature} />
      ) : (
        <div className="text-center text-gray-400">
          <div className="text-xs">{getPlaceholderText()}</div>
          {isDraggingFeature && (
            <div className="text-xs mt-1 text-blue-600">Drop here</div>
          )}
        </div>
      )}
    </div>
  );
}
