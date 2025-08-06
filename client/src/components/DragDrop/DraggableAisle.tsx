import { useDraggable } from "@dnd-kit/core";
import {  Trash2 } from "lucide-react";

import type { Aisle } from "./types";

interface DraggableAisleProps {
  aisle: Aisle;
  onRemoveProduct: (productId: string) => void;
}

export default function DraggableAisle({
  aisle,
  onRemoveProduct,
}: DraggableAisleProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    isDragging,
  } = useDraggable({
    id: aisle.id,
  });

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    opacity: isDragging ? 0.5 : 1,
    // Remove transition here
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="bg-white rounded border shadow p-2"
      {...attributes}
      {...listeners}
    >
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-semibold">{aisle.name}</h3>
      </div>
      <div className="space-y-1 max-h-32 overflow-auto">
        {aisle.products.length === 0 && (
          <p className="text-sm text-gray-400 italic">No products</p>
        )}
        {aisle.products.map((product) => (
          <div
            key={product.id}
            className="flex items-center justify-between border rounded px-2 py-1"
          >
            <span className="text-sm">{product.name}</span>
            <button
              onClick={() => onRemoveProduct(product.id)}
              className="text-red-600 hover:text-red-800"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
