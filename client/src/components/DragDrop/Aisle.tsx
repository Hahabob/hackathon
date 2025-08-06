import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Shelf, { type ShelfType } from "./Shelf";
import  type { AisleType } from "./SupermarketDragDrop";

interface AisleProps {
  aisle: AisleType;
  aisles: AisleType[];
  setAisles: React.Dispatch<React.SetStateAction<AisleType[]>>;
}

const Aisle: React.FC<AisleProps> = ({ aisle, aisles, setAisles }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: aisle.id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    border: "1px solid #aaa",
    padding: "8px",
    borderRadius: "8px",
    width: "250px",
    backgroundColor: "#fafafa",
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <h3>{aisle.name}</h3>
      <div>
        {aisle.shelves.map((shelf) => (
          <Shelf
            key={shelf.id}
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

export default Aisle;
