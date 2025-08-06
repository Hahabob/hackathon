import React, { useState } from "react";
import { DndContext, closestCenter, type  DragEndEvent } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import Aisle from "./Aisle";

export interface ProductType {
  id: string;
  name: string;
}

export interface ShelfType {
  id: string;
  name: string;
  products: ProductType[];
}

export interface AisleType {
  id: string;
  name: string;
  shelves: ShelfType[];
}

const SupermarketDragDrop: React.FC = () => {
  const [aisles, setAisles] = useState<AisleType[]>([
    {
      id: "aisle1",
      name: "Aisle 1",
      shelves: [
        {
          id: "shelf1",
          name: "Shelf 1",
          products: [
            { id: "product1", name: "Product 1" },
            { id: "product2", name: "Product 2" },
          ],
        },
      ],
    },
  ]);

 
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setAisles((items) => {
        const oldIndex = items.findIndex((i) => i.id === active.id);
        const newIndex = items.findIndex((i) => i.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={aisles} strategy={verticalListSortingStrategy}>
        <div style={{ display: "flex", gap: 20 }}>
          {aisles.map((aisle) => (
            <Aisle
              key={aisle.id}
              aisle={aisle}
              setAisles={setAisles}
              aisles={aisles}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
};

export default SupermarketDragDrop;
