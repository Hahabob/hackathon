import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Product from "./Product";
import { type AisleType } from "./SupermarketDragDrop";
import type { ProductType } from "./SupermarketDragDrop";
export interface ShelfType {
  id: string;
  name: string;
  products: ProductType[];
}

interface ShelfProps {
  shelf: ShelfType;
  aisle: AisleType;
  aisles: AisleType[];
  setAisles: React.Dispatch<React.SetStateAction<AisleType[]>>;
}

const Shelf: React.FC<ShelfProps> = ({ shelf, aisle, aisles, setAisles }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: shelf.id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    border: "1px solid #ccc",
    margin: "8px 0",
    padding: "6px",
    borderRadius: "6px",
    backgroundColor: "#fff",
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <h4>{shelf.name}</h4>
      <div style={{ paddingLeft: 12 }}>
        {shelf.products.map((product) => (
          <Product
            key={product.id}
            product={product}
            shelf={shelf}
            aisle={aisle}
            aisles={aisles}
            setAisles={setAisles}
          />
        ))}
      </div>
    </div>
  );
};

export default Shelf;
