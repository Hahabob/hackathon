// This file is responsible for displaying a summary of the shopping cart.
// It will interact with CartContext.tsx to get the cart's subtotal, taxes, and total.
// Best practice: Keep this component simple and focused on displaying the final costs.
// Include a clear call-to-action button for checkout.

import useCart from "@/hooks/useCart";
import { useNavigate } from "react-router-dom";

export default function CartSummary() {
  const { cart } = useCart();
  const navigate = useNavigate();
  console.log(cart);

  return <div>baba</div>;
}
