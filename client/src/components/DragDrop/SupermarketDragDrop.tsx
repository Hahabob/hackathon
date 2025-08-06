import { useEffect, useState } from "react";
import {
  DndContext,
  DragOverlay,
  useSensor,
  useSensors,
  PointerSensor,
  closestCenter,
} from "@dnd-kit/core";
import type { DragEndEvent, DragStartEvent } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import {
  ShoppingCart,
  Package,
  DoorOpen,
  CreditCard,
  LogOut,
  Trash2,
  Plus,
  Expand,
  Eye,
  EyeOff,
} from "lucide-react";

import type { Aisle, StoreFeature, BorderSpot, GridSpot } from "./types";

import type { Product } from "@/types/Product";
import DraggableProduct from "./DraggableProduct";
import DraggableAisle from "./DraggableAisle";
import DraggableStoreFeature from "./DraggableStoreFeature";

import BorderSpotComponent from "./BorderSpotComponent";
import GridSpotComponent from "./GridSpotComponent";
import { useFetchProducts } from "@/hooks/useFetch";

const aisleColors = [
  "bg-blue-100 border-blue-500",
  "bg-green-100 border-green-500",
  "bg-yellow-100 border-yellow-500",
  "bg-purple-100 border-purple-500",
];

const initialAisles: Aisle[] = [
  {
    id: "a1",
    name: "Aisle 1",
    products: [],
    color: aisleColors[0],
    position: null,
  },
  {
    id: "a2",
    name: "Aisle 2",
    products: [],
    color: aisleColors[1],
    position: null,
  },
];

const initialStoreFeatures: StoreFeature[] = [
  {
    id: "entrance-1",
    name: "Entrance 1",
    type: "entrance",
    emoji: "🚪",
    color: "bg-green-100 border-green-500",
    position: null,
  },
  {
    id: "checkout-1",
    name: "Checkout 1",
    type: "checkout",
    emoji: "🛒",
    color: "bg-orange-100 border-orange-500",
    position: null,
  },
  {
    id: "exit-1",
    name: "Exit 1",
    type: "exit",
    emoji: "🚶",
    color: "bg-red-100 border-red-500",
    position: null,
  },
];

export default function SupermarketDragDrop() {
  const [products, setProducts] = useState<Product[]>([]);
  const [aisles, setAisles] = useState<Aisle[]>(initialAisles);
  const [storeFeatures, setStoreFeatures] =
    useState<StoreFeature[]>(initialStoreFeatures);
  const [activeItem, setActiveItem] = useState<
    Product | Aisle | StoreFeature | null
  >(null);
  const [showAisleContents, setShowAisleContents] = useState(true);
  const [totalAisleSpots, setTotalAisleSpots] = useState(6);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 8 },
    })
  );

  const { data: fetchedProducts } = useFetchProducts();

  useEffect(() => {
    if (fetchedProducts) {
      setProducts(fetchedProducts);
    }
  }, [fetchedProducts]);

  // Dragging flags
  const isDraggingProduct = activeItem && "price" in activeItem;
  const isDraggingFeature = activeItem && "type" in activeItem;

  // Calculate grid layout
  const aislesPerRow = Math.ceil(Math.sqrt(totalAisleSpots));
  const rows = Math.ceil(totalAisleSpots / aislesPerRow);

  // Generate border spots with features assigned to their position
  const borderSpots: BorderSpot[] = [
    // Top
    ...Array.from({ length: aislesPerRow }, (_, i) => ({
      id: `border-top-${i}`,
      side: "top" as const,
      position: i,
      feature: storeFeatures.find((f) => f.position === `top-${i}`) || null,
    })),
    // Bottom
    ...Array.from({ length: aislesPerRow }, (_, i) => ({
      id: `border-bottom-${i}`,
      side: "bottom" as const,
      position: i,
      feature: storeFeatures.find((f) => f.position === `bottom-${i}`) || null,
    })),
    // Left
    ...Array.from({ length: rows }, (_, i) => ({
      id: `border-left-${i}`,
      side: "left" as const,
      position: i,
      feature: storeFeatures.find((f) => f.position === `left-${i}`) || null,
    })),
    // Right
    ...Array.from({ length: rows }, (_, i) => ({
      id: `border-right-${i}`,
      side: "right" as const,
      position: i,
      feature: storeFeatures.find((f) => f.position === `right-${i}`) || null,
    })),
  ];

  // Generate grid spots with aisles assigned
  const gridSpots: GridSpot[] = Array.from(
    { length: totalAisleSpots },
    (_, i) => ({
      id: `spot-${i}`,
      position: i,
      aisle: aisles.find((a) => a.position === i) || null,
    })
  );

  // Derived arrays for unplaced items
  const unplacedFeatures = storeFeatures.filter((f) => f.position === null);
  const unplacedAisles = aisles.filter((a) => a.position === null);

  // Handle drag start
  function handleDragStart(event: DragStartEvent) {
    const { active } = event;
    const id = active.id;

    // Find dragged item in products, aisles, or features
    const draggedProduct = products.find((p) => p._id === id);
    if (draggedProduct) {
      setActiveItem(draggedProduct);
      return;
    }

    const draggedAisle = aisles.find((a) => a.id === id);
    if (draggedAisle) {
      setActiveItem(draggedAisle);
      return;
    }

    const draggedFeature = storeFeatures.find((f) => f.id === id);
    if (draggedFeature) {
      setActiveItem(draggedFeature);
      return;
    }
  }

  // Handle drag end: placing product, aisle, or feature
  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over) {
      setActiveItem(null);
      return;
    }
    const overId = String(over.id);
    if (!activeItem) {
      setActiveItem(null);
      return;
    }
    if ("price" in activeItem) {
      if (overId.startsWith("spot-")) {
        const pos = parseInt(overId.split("-")[1], 10);
        const aisleAtSpot = aisles.find((a) => a.position === pos);
        if (aisleAtSpot) {
          setProducts((prev) => prev.filter((p) => p._id !== activeItem._id));
          setAisles((prev) =>
            prev.map((a) =>
              a.id === aisleAtSpot.id
                ? { ...a, products: [...a.products, activeItem as Product] }
                : a
            )
          );
        }
      }
      setActiveItem(null);
      return;
    }

    // Aisle dragged to grid spot (placing aisle in store)
    if ("products" in activeItem) {
      if (overId.startsWith("spot-")) {
        const pos = parseInt(overId.split("-")[1], 10);

        // If aisle is unplaced, assign position
        if (activeItem.position === null) {
          setAisles((prev) =>
            prev.map((a) =>
              a.id === activeItem.id ? { ...a, position: pos } : a
            )
          );
        } else {
          // Move aisle to new position, swap if occupied
          setAisles((prev) => {
            const targetAisle = prev.find((a) => a.position === pos);
            return prev.map((a) => {
              if (a.id === activeItem.id) return { ...a, position: pos };
              if (targetAisle && a.id === targetAisle.id)
                return { ...a, position: activeItem.position };
              return a;
            });
          });
        }
      }
      setActiveItem(null);
      return;
    }

    if ("type" in activeItem) {
      if (overId.startsWith("border-")) {
        const [_, side, posStr] = overId.split("-");
        const positionStr = `${side}-${posStr}`;
        setStoreFeatures((prev) =>
          prev.map((f) =>
            f.id === activeItem.id ? { ...f, position: positionStr } : f
          )
        );
      }
      setActiveItem(null);
      return;
    }

    setActiveItem(null);
  }

  const removeProductFromAisle = (productId: string, aisleId: string) => {
    const aisle = aisles.find((a) => a.id === aisleId);
    if (!aisle) return;

    const product = aisle.products.find((p) => p._id === productId);
    if (!product) return;

    setAisles((prev) =>
      prev.map((a) =>
        a.id === aisleId
          ? { ...a, products: a.products.filter((p) => p._id !== productId) }
          : a
      )
    );

    setProducts((prev) => [...prev, product]);
  };

  const addNewAisle = () => {
    const newAisle: Aisle = {
      id: `aisle-${Date.now()}`,
      name: `New Aisle`,
      products: [],
      color: aisleColors[aisles.length % aisleColors.length],
      position: null,
    };
    setAisles((prev) => [...prev, newAisle]);
  };

  const addNewFeature = (type: "entrance" | "exit" | "checkout") => {
    const featureConfig = {
      entrance: {
        name: "New Entrance",
        emoji: "🚪",
        color: "bg-green-100 border-green-500",
      },
      exit: {
        name: "New Exit",
        emoji: "🚶",
        color: "bg-red-100 border-red-500",
      },
      checkout: {
        name: "New Checkout",
        emoji: "🛒",
        color: "bg-orange-100 border-orange-500",
      },
    };
    const config = featureConfig[type];
    const newFeature: StoreFeature = {
      id: `${type}-${Date.now()}`,
      name: config.name,
      type,
      emoji: config.emoji,
      color: config.color,
      position: null,
    };
    setStoreFeatures((prev) => [...prev, newFeature]);
  };

  const removeAisle = (aisleId: string) => {
    const aisle = aisles.find((a) => a.id === aisleId);
    if (aisle) {
      setProducts((prev) => [...prev, ...aisle.products]);
      setAisles((prev) => prev.filter((a) => a.id !== aisleId));
    }
  };

  const removeFeature = (featureId: string) => {
    setStoreFeatures((prev) =>
      prev.map((f) => (f.id === featureId ? { ...f, position: null } : f))
    );
  };

  const deleteFeature = (featureId: string) => {
    setStoreFeatures((prev) => prev.filter((f) => f.id !== featureId));
  };

  const expandStoreLayout = () => {
    setTotalAisleSpots((prev) => prev + 2);
  };

  const renderStoreGrid = () => {
    const gridElements = [];

    // Top border
    const topBorderSpots = borderSpots.filter((spot) => spot.side === "top");
    gridElements.push(
      <div
        key="top-border"
        className="grid gap-2 mb-2"
        style={{ gridTemplateColumns: `repeat(${aislesPerRow}, 1fr)` }}
      >
        {topBorderSpots.map((spot) => (
          <BorderSpotComponent
            key={spot.id}
            spot={spot}
            isDraggingFeature={!!isDraggingFeature}
            onRemoveFeature={removeFeature}
          />
        ))}
      </div>
    );

    for (let row = 0; row < rows; row++) {
      const startIndex = row * aislesPerRow;
      const endIndex = Math.min(startIndex + aislesPerRow, totalAisleSpots);
      const leftBorderSpot = borderSpots.find(
        (spot) => spot.side === "left" && spot.position === row
      );
      const rightBorderSpot = borderSpots.find(
        (spot) => spot.side === "right" && spot.position === row
      );

      const rowElements = [];

      if (leftBorderSpot) {
        rowElements.push(
          <BorderSpotComponent
            key={leftBorderSpot.id}
            spot={leftBorderSpot}
            isDraggingFeature={!!isDraggingFeature}
            onRemoveFeature={removeFeature}
          />
        );
      }

      for (let i = startIndex; i < endIndex; i++) {
        rowElements.push(
          <GridSpotComponent
            key={i}
            spot={gridSpots[i]}
            onRemoveAisle={(productId) => {
              const aisle = gridSpots[i].aisle;
              if (aisle) removeProductFromAisle(productId, aisle.id);
            }}
            isDraggingProduct={!!isDraggingProduct}
          />
        );
      }

      if (rightBorderSpot) {
        rowElements.push(
          <BorderSpotComponent
            key={rightBorderSpot.id}
            spot={rightBorderSpot}
            isDraggingFeature={!!isDraggingFeature}
            onRemoveFeature={removeFeature}
          />
        );
      }

      gridElements.push(
        <div key={`row-${row}`} className="mb-4">
          <div
            className="grid gap-2"
            style={{
              gridTemplateColumns: `80px repeat(${Math.min(
                aislesPerRow,
                endIndex - startIndex
              )}, 1fr) 80px`,
            }}
          >
            {rowElements}
          </div>

          {row < rows - 1 && (
            <div className="relative my-4">
              <div className="h-8 bg-gradient-to-r from-blue-100 via-blue-200 to-blue-100 rounded-full flex items-center justify-center border-2 border-blue-300 border-dashed mx-20">
                <span className="text-blue-700 font-medium text-sm">
                  ← PATHWAY {row + 1} →
                </span>
              </div>
            </div>
          )}
        </div>
      );
    }

    // Bottom border
    const bottomBorderSpots = borderSpots.filter(
      (spot) => spot.side === "bottom"
    );
    gridElements.push(
      <div
        key="bottom-border"
        className="grid gap-2 mt-2"
        style={{ gridTemplateColumns: `repeat(${aislesPerRow}, 1fr)` }}
      >
        {bottomBorderSpots.map((spot) => (
          <BorderSpotComponent
            key={spot.id}
            spot={spot}
            isDraggingFeature={!!isDraggingFeature}
            onRemoveFeature={removeFeature}
          />
        ))}
      </div>
    );

    return gridElements;
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-3">
              <ShoppingCart className="w-8 h-8" />
              Supermarket Layout Planner
            </h1>
            <p className="text-gray-600">
              Drag products to aisles, arrange aisles in the store, and place
              entrances/exits on the borders
            </p>
            {isDraggingProduct && (
              <div className="mt-2 p-2 bg-blue-100 rounded-lg text-blue-800 text-sm">
                💡 Drop the product into any aisle to place it there
              </div>
            )}
            {isDraggingFeature && (
              <div className="mt-2 p-2 bg-green-100 rounded-lg text-green-800 text-sm">
                🏪 Drop the{" "}
                {activeItem && "type" in activeItem
                  ? activeItem.type
                  : "feature"}{" "}
                on any border position
              </div>
            )}
          </div>

          <div className="grid lg:grid-cols-4 gap-6">
            {/* Left Sidebar */}
            <div className="lg:col-span-1 space-y-4">
              {/* Products Menu */}
              <div className="bg-white rounded-lg shadow p-4">
                <div className="flex items-center mb-2">
                  <Package className="w-5 h-5 mr-2" />
                  <h2 className="font-semibold text-lg flex items-center gap-2">
                    Products Menu
                    <span className="ml-auto inline-block bg-gray-200 rounded-full px-2 py-0.5 text-xs">
                      {products.length}
                    </span>
                  </h2>
                </div>
                <SortableContext
                  items={products.map((p) => p._id)}
                  strategy={verticalListSortingStrategy}
                >
                  <div className="space-y-2 max-h-[300px] overflow-y-auto">
                    {products.map((product) => (
                      <DraggableProduct key={product._id} product={product} />
                    ))}
                    {products.length === 0 && (
                      <div className="text-center text-gray-400 py-8 text-sm">
                        All products placed in aisles
                      </div>
                    )}
                  </div>
                </SortableContext>
              </div>

              {/* Store Features */}
              <div className="bg-white rounded-lg shadow p-4">
                <div className="flex items-center mb-2">
                  <DoorOpen className="w-5 h-5 mr-2" />
                  <h2 className="font-semibold text-lg flex items-center gap-2">
                    Store Features
                    <div className="ml-auto flex gap-1">
                      <button
                        onClick={() => addNewFeature("entrance")}
                        className="p-1 border rounded hover:bg-green-100"
                      >
                        <DoorOpen className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() => addNewFeature("checkout")}
                        className="p-1 border rounded hover:bg-orange-100"
                      >
                        <CreditCard className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() => addNewFeature("exit")}
                        className="p-1 border rounded hover:bg-red-100"
                      >
                        <LogOut className="w-3 h-3" />
                      </button>
                    </div>
                  </h2>
                </div>
                <div className="space-y-2">
                  {unplacedFeatures.map((feature) => (
                    <div key={feature.id} className="relative">
                      <DraggableStoreFeature feature={feature} />
                      <button
                        onClick={() => deleteFeature(feature.id)}
                        className="absolute top-1 left-1 p-1 bg-red-100 rounded-full hover:bg-red-200 z-10"
                      >
                        <Trash2 className="w-3 h-3 text-red-600" />
                      </button>
                    </div>
                  ))}
                  {unplacedFeatures.length === 0 && (
                    <div className="text-center text-gray-400 py-4 text-sm">
                      All features placed on borders
                    </div>
                  )}
                </div>
              </div>

              {/* Unplaced Aisles */}
              {unplacedAisles.length > 0 && (
                <div className="bg-white rounded-lg shadow p-4">
                  <div className="flex items-center mb-2">
                    <h2 className="font-semibold text-lg flex items-center gap-2">
                      Available Aisles
                      <button
                        onClick={addNewAisle}
                        className="ml-auto p-1 border rounded hover:bg-green-100"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </h2>
                  </div>
                  <div className="space-y-2">
                    {unplacedAisles.map((aisle) => (
                      <div key={aisle.id} className="relative">
                        <DraggableAisle
                          aisle={aisle}
                          onRemoveProduct={(productId) =>
                            removeProductFromAisle(productId, aisle.id)
                          }
                        />
                        <button
                          onClick={() => removeAisle(aisle.id)}
                          className="absolute top-1 left-1 p-1 bg-red-100 rounded-full hover:bg-red-200 z-10"
                        >
                          <Trash2 className="w-3 h-3 text-red-600" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Store Layout Grid */}
            <div className="lg:col-span-3">
              <div className="mb-4 flex justify-between items-center">
                <h2 className="text-xl font-semibold">Store Layout</h2>
                <div className="flex gap-2">
                  <button
                    onClick={expandStoreLayout}
                    className="flex items-center gap-2 bg-green-50 hover:bg-green-100 border border-green-300 rounded px-3 py-1 text-sm"
                  >
                    <Expand className="w-4 h-4" />
                    Add 2 More Spots
                  </button>
                  <button
                    onClick={addNewAisle}
                    className="flex items-center gap-2 border rounded px-3 py-1 text-sm hover:bg-gray-100"
                  >
                    <Plus className="w-4 h-4" />
                    Add Aisle
                  </button>
                  <button
                    onClick={() => setShowAisleContents(!showAisleContents)}
                    className="flex items-center gap-2 border rounded px-3 py-1 text-sm hover:bg-gray-100"
                  >
                    {showAisleContents ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                    {showAisleContents ? "Hide" : "Show"} Contents
                  </button>
                </div>
              </div>

              {/* Store Map with Borders */}
              <div className="bg-white p-6 rounded-lg border-2 border-gray-200">
                <div className="relative">
                  <div className="relative">{renderStoreGrid()}</div>

                  {/* Store Info */}
                  <div className="mt-6 pt-4 border-t-2 border-dashed border-gray-300">
                    <div className="flex justify-between items-center text-sm">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 bg-blue-200 rounded border border-blue-300"></div>
                          <span className="text-blue-700">
                            Customer Pathways
                          </span>
                        </div>
                        <span className="inline-block bg-gray-200 rounded-full px-2 py-0.5 text-xs">
                          {totalAisleSpots} Aisle Spots
                        </span>
                        <span className="inline-block bg-gray-200 rounded-full px-2 py-0.5 text-xs">
                          {aisles.length} Aisles
                        </span>
                      </div>
                      <div>
                        <button
                          onClick={addNewAisle}
                          className="text-blue-600 hover:underline text-sm"
                        >
                          Add New Aisle
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Drag Overlay */}
          <DragOverlay>
            {activeItem && "price" in activeItem && (
              <DraggableProduct product={activeItem} isDragging />
            )}
            {activeItem && "products" in activeItem && (
              <DraggableAisle aisle={activeItem} onRemoveProduct={() => {}} />
            )}
            {activeItem && "type" in activeItem && (
              <DraggableStoreFeature feature={activeItem} />
            )}
          </DragOverlay>
        </div>
      </div>
    </DndContext>
  );
}
