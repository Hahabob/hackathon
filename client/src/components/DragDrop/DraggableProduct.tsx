import { useDraggable } from "@dnd-kit/core";
import { Package } from "lucide-react";

import type { Product } from "./types";

interface DraggableProductProps {
  product: Product;
  isDragging?: boolean;
}

export default function DraggableProduct({
  product,
  isDragging = false,
}: DraggableProductProps) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: product.id,
  });

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,

    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="p-2 rounded border bg-white shadow cursor-grab active:cursor-grabbing flex items-center gap-2"
    >
      <Package className="w-5 h-5 text-gray-600" />
      <span className="text-sm font-medium">{product.name}</span>
    </div>
  );
}
