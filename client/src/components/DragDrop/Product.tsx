import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { ShelfType } from "./Shelf";
import type { AisleType, ProductType } from "./SupermarketDragDrop";

interface ProductProps {
  product: ProductType;
  shelf: ShelfType;
  aisle: AisleType;
  aisles: AisleType[];
  setAisles: React.Dispatch<React.SetStateAction<AisleType[]>>;
}

const Product: React.FC<ProductProps> = ({ product }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: product.id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    border: "1px solid #ddd",
    margin: "4px 0",
    padding: "4px",
    borderRadius: "4px",
    backgroundColor: "#fff",
    cursor: "grab",
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {product.name}
    </div>
  );
};

export default Product;
