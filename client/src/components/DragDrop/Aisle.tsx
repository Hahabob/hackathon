import React, { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { useDroppable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { Trash2, Edit2, Check, X } from "lucide-react";
import type { Aisle as AisleType } from "./types";

interface DraggableAisleProps {
  aisle: AisleType;
  onRemoveProduct: (productId: string) => void;
  onAddProduct?: (product: any) => void;
  onUpdateName?: (newName: string) => void;
  showContents?: boolean;
  fullHeight?: boolean;
}

// Complete color mapping for reliable rendering without Tailwind config
const colorMap: Record<string, { bg: string; border: string; text: string; accent: string }> = {
  "bg-blue-100 border-blue-500": { 
    bg: "#dbeafe", 
    border: "#3b82f6",
    text: "#1e40af",
    accent: "#2563eb"
  },
  "bg-green-100 border-green-500": { 
    bg: "#dcfce7", 
    border: "#22c55e",
    text: "#166534",
    accent: "#16a34a"
  },
  "bg-yellow-100 border-yellow-500": { 
    bg: "#fefce8", 
    border: "#eab308",
    text: "#a16207",
    accent: "#ca8a04"
  },
  "bg-purple-100 border-purple-500": { 
    bg: "#f3e8ff", 
    border: "#a855f7",
    text: "#7c3aed",
    accent: "#9333ea"
  },
  "bg-orange-100 border-orange-500": { 
    bg: "#fed7aa", 
    border: "#f97316",
    text: "#ea580c",
    accent: "#f97316"
  },
  "bg-red-100 border-red-500": { 
    bg: "#fee2e2", 
    border: "#ef4444",
    text: "#dc2626",
    accent: "#ef4444"
  },
  "bg-pink-100 border-pink-500": { 
    bg: "#fce7f3", 
    border: "#ec4899",
    text: "#be185d",
    accent: "#ec4899"
  },
  "bg-indigo-100 border-indigo-500": { 
    bg: "#e0e7ff", 
    border: "#6366f1",
    text: "#4338ca",
    accent: "#6366f1"
  },
  "bg-gray-100 border-gray-500": { 
    bg: "#f3f4f6", 
    border: "#d1d5db",
    text: "#374151",
    accent: "#6b7280"
  }
};

export default function DraggableAisle({
  aisle,
  onRemoveProduct,
  onAddProduct,
  onUpdateName,
  showContents = true,
  fullHeight = false,
}: DraggableAisleProps) {
  const [isEditingName, setIsEditingName] = useState(false);
  const [editingName, setEditingName] = useState(aisle.name);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: aisle.id });

  const { setNodeRef: setDroppableRef, isOver } = useDroppable({
    id: `aisle-drop-${aisle.id}`,
  });

  // Get colors from mapping, fallback to gray if not found
  const colors = colorMap[aisle.color] || colorMap["bg-gray-100 border-gray-500"];

  const style = {
    transform: CSS.Transform.toString(transform),
    opacity: isDragging ? 0.5 : 1,
  };

  const containerStyle: React.CSSProperties = {
    backgroundColor: isOver ? '#f0f9ff' : colors.bg,
    borderColor: isOver ? '#3b82f6' : colors.border,
    borderWidth: '2px',
    borderStyle: 'solid',
    borderRadius: '0.5rem',
    padding: '0.75rem',
    minHeight: fullHeight ? '200px' : '80px',
    height: fullHeight ? '100%' : 'auto',
    cursor: isDragging ? 'grabbing' : 'grab',
    userSelect: 'none',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    transition: 'all 0.2s ease-in-out',
    ...style,
  };

  const headerStyle: React.CSSProperties = {
    fontWeight: '600',
    color: colors.text,
    marginBottom: showContents && aisle.products.length > 0 ? '0.5rem' : '0',
    fontSize: '0.875rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexShrink: 0,
  };

  const productListStyle: React.CSSProperties = {
    marginTop: aisle.products.length > 0 ? '0.5rem' : '0',
    flex: 1,
    overflow: 'auto',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: isOver ? 'rgba(59, 130, 246, 0.05)' : 'transparent',
    borderRadius: '0.25rem',
    transition: 'all 0.2s ease-in-out',
  };

  const productItemStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: '0.25rem',
    padding: '0.375rem 0.5rem',
    marginBottom: '0.25rem',
    fontSize: '0.75rem',
    border: `1px solid ${colors.border}20`,
  };

  const removeButtonStyle: React.CSSProperties = {
    backgroundColor: '#dc2626',
    color: 'white',
    border: 'none',
    borderRadius: '0.25rem',
    padding: '0.25rem 0.5rem',
    fontSize: '0.625rem',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease-in-out',
    display: 'flex',
    alignItems: 'center',
    gap: '0.25rem',
  };

  const removeButtonHoverStyle: React.CSSProperties = {
    ...removeButtonStyle,
    backgroundColor: '#b91c1c',
  };

  const emptyStateStyle: React.CSSProperties = {
    color: '#6b7280',
    fontSize: '0.75rem',
    fontStyle: 'italic',
    textAlign: 'center',
    padding: '1rem 0',
    backgroundColor: isOver ? 'rgba(59, 130, 246, 0.1)' : 'rgba(255, 255, 255, 0.5)',
    borderRadius: '0.25rem',
    border: `1px dashed ${isOver ? '#3b82f6' : colors.border + '40'}`,
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.2s ease-in-out',
  };

  const productCountStyle: React.CSSProperties = {
    display: 'inline-block',
    backgroundColor: colors.accent,
    color: 'white',
    borderRadius: '9999px',
    padding: '0.125rem 0.5rem',
    fontSize: '0.625rem',
    fontWeight: '600',
    minWidth: '1.5rem',
    textAlign: 'center',
  };

  const dragHandleStyle: React.CSSProperties = {
    position: 'absolute',
    top: '0.5rem',
    right: '0.5rem',
    width: '1rem',
    height: '1rem',
    backgroundImage: `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' stroke='${encodeURIComponent(colors.border)}' stroke-width='2' stroke-dasharray='2%2c2' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e")`,
    cursor: 'grab',
    opacity: 0.6,
  };

  const handleNameSave = () => {
    if (onUpdateName && editingName.trim() !== '') {
      onUpdateName(editingName.trim());
    }
    setIsEditingName(false);
  };

  const handleNameCancel = () => {
    setEditingName(aisle.name);
    setIsEditingName(false);
  };

  return (
    <div
      ref={setNodeRef}
      style={containerStyle}
      {...attributes}
      {...listeners}
    >
      {/* Drag handle indicator */}
      <div style={dragHandleStyle} />
      
      <div style={headerStyle}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flex: 1 }}>
          {isEditingName ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', flex: 1 }}>
              <input
                type="text"
                value={editingName}
                onChange={(e) => setEditingName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleNameSave();
                  if (e.key === 'Escape') handleNameCancel();
                }}
                style={{
                  border: 'none',
                  background: 'transparent',
                  color: colors.text,
                  fontWeight: '600',
                  fontSize: '0.875rem',
                  outline: 'none',
                  flex: 1,
                }}
                autoFocus
              />
              <button
                onClick={handleNameSave}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '0.125rem',
                  color: colors.accent,
                }}
              >
                <Check size={12} />
              </button>
              <button
                onClick={handleNameCancel}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '0.125rem',
                  color: '#6b7280',
                }}
              >
                <X size={12} />
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', flex: 1 }}>
              <span>{aisle.name}</span>
              {onUpdateName && (
                <button
                  onClick={() => setIsEditingName(true)}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '0.125rem',
                    color: colors.accent,
                    opacity: 0.6,
                  }}
                >
                  <Edit2 size={12} />
                </button>
              )}
            </div>
          )}
          {aisle.products.length > 0 && (
            <span style={productCountStyle}>
              {aisle.products.length}
            </span>
          )}
        </div>
      </div>
      
      {showContents && (
        <div 
          ref={setDroppableRef}
          style={productListStyle}
        >
          {aisle.products.length > 0 ? (
            <div>
              {aisle.products.map((product) => (
                <div key={product.id} style={productItemStyle}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                    <span style={{ color: '#374151', fontWeight: '500', fontSize: '0.75rem' }}>
                      {product.name}
                    </span>
                    <span style={{ color: '#6b7280', fontSize: '0.625rem' }}>
                      ${product.price.toFixed(2)}
                    </span>
                  </div>
                  <button
                    style={removeButtonStyle}
                    onMouseEnter={(e) => {
                      Object.assign(e.currentTarget.style, removeButtonHoverStyle);
                    }}
                    onMouseLeave={(e) => {
                      Object.assign(e.currentTarget.style, removeButtonStyle);
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      onRemoveProduct(product.id);
                    }}
                  >
                    <Trash2 size={10} />
                    Remove
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div style={emptyStateStyle}>
              {isOver ? 'Drop product here!' : 'Drop products here or drag this aisle to the store layout'}
            </div>
          )}
        </div>
      )}
      
      {!showContents && (
        <div 
          ref={setDroppableRef}
          style={{ 
            marginTop: '0.25rem', 
            fontSize: '0.625rem', 
            color: colors.text,
            opacity: 0.8,
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '60px'
          }}
        >
          {aisle.products.length > 0 ? (
            <span>{aisle.products.length} product{aisle.products.length !== 1 ? 's' : ''} assigned</span>
          ) : (
            <span style={{ fontStyle: 'italic', opacity: 0.6 }}>Drop products here</span>
          )}
        </div>
      )}
    </div>
  );
}