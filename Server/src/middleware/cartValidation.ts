import { Response, NextFunction } from "express";
import { AuthRequest } from "./auth";
import mongoose from "mongoose";

export const validateAddToCart = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  const { productId, quantity } = req.body;

  if (!productId) {
    res.status(400).json({ message: "Product ID is required" });
    return;
  }

  if (!quantity) {
    res.status(400).json({ message: "Quantity is required" });
    return;
  }

  // Validate ObjectId format
  if (!mongoose.Types.ObjectId.isValid(productId)) {
    res.status(400).json({ message: "Invalid product ID format" });
    return;
  }

  // Validate quantity
  if (typeof quantity !== "number" || quantity < 1) {
    res.status(400).json({ message: "Quantity must be a positive number" });
    return;
  }

  if (quantity > 100) {
    res.status(400).json({ message: "Quantity cannot exceed 100" });
    return;
  }

  next();
};

export const validateUpdateQuantity = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  const { quantity } = req.body;
  const { productId } = req.params;

  // Validate product ID
  if (!mongoose.Types.ObjectId.isValid(productId)) {
    res.status(400).json({ message: "Invalid product ID format" });
    return;
  }

  // Validate quantity
  if (!quantity) {
    res.status(400).json({ message: "Quantity is required" });
    return;
  }

  if (typeof quantity !== "number" || quantity < 1) {
    res.status(400).json({ message: "Quantity must be a positive number" });
    return;
  }

  if (quantity > 100) {
    res.status(400).json({ message: "Quantity cannot exceed 100" });
    return;
  }

  next();
};

export const validateProductId = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  const { productId } = req.params;

  if (!productId) {
    res.status(400).json({ message: "Product ID is required" });
    return;
  }

  if (!mongoose.Types.ObjectId.isValid(productId)) {
    res.status(400).json({ message: "Invalid product ID format" });
    return;
  }

  next();
};
