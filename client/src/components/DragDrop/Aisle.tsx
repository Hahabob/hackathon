import type { Aisle as AisleType } from "./types";

interface AisleProps {
  aisle: AisleType;
  onRemoveProduct: (productId: string) => void;
  showContents: boolean;
}

export default function Aisle({
  aisle,
  onRemoveProduct,
  showContents,
}: AisleProps) {
  return (
    <div className="aisle">
      <h3>{aisle.name}</h3>
      {showContents && (
        <ul>
          {aisle.products.map((product) => (
            <li key={product.id}>
              {product.name}
              <button onClick={() => onRemoveProduct(product.id)}>
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
