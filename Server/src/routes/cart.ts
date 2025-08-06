import express from "express";
import { authenticateToken } from "../middleware/auth";
import {
  validateAddToCart,
  validateUpdateQuantity,
  validateProductId,
} from "../middleware/cartValidation";
import {
  getCart,
  addItem,
  updateQuantity,
  removeItem,
  clearCart,
} from "../controllers/CartController";

const router = express.Router();

router.use(authenticateToken);

router.get("/", getCart);

router.post("/", validateAddToCart, addItem);

router.patch("/:productId", validateUpdateQuantity, updateQuantity);

router.delete("/:productId", validateProductId, removeItem);

router.delete("/", clearCart);

export default router;
