import { Response, NextFunction } from "express";
import Cart from "../models/Cart";
import Product from "../models/Product";
import { AuthRequest } from "../middleware/auth";

const calculateCartTotals = (cart: any) => {
  let totalPrice = 0;
  let totalItems = 0;

  if (cart && cart.items) {
    cart.items.forEach((item: any) => {
      const quantity = item.quantity || 0;
      const price = item.productId?.price || 0;
      totalItems += quantity;
      totalPrice += quantity * price;
    });
  }

  return { totalItems, totalPrice };
};

export const getCart = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const cart = await Cart.findOne({ userId: req.user!.userId }).populate(
      "items.productId"
    );

    if (!cart) {
      return res.status(200).json({
        userId: req.user!.userId,
        items: [],
        totalItems: 0,
        totalPrice: 0,
      });
    }

    console.log("logging cart from cart controller", cart);

    // Transform cart items to match frontend expectations
    const transformedItems = cart.items.map((item: any) => ({
      product: item.productId, // productId is populated with full product object
      quantity: item.quantity,
    }));

    const { totalItems, totalPrice } = calculateCartTotals(cart);

    res.json({
      items: transformedItems,
      totalItems,
      totalPrice,
    });
  } catch (err) {
    next(err);
  }
};

export const addItem = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { productId, quantity } = req.body;
    console.log("=== ADD ITEM DEBUG ===");
    console.log("Request body:", req.body);
    console.log("ProductId:", productId);
    console.log("Quantity:", quantity);
    console.log("User ID:", req.user?.userId);

    const productExists = await Product.exists({ _id: productId });
    if (!productExists) {
      return res.status(400).json({ message: "Product not found" });
    }

    let cart = await Cart.findOne({ userId: req.user!.userId });

    if (!cart) {
      // Create new cart if doesn't exist
      cart = new Cart({
        userId: req.user!.userId,
        items: [{ productId, quantity }],
      });
      await cart.save();
    } else {
      // Check if item already exists in cart
      const existingItemIndex = cart.items.findIndex(
        (item) => item.productId!.toString() === productId.toString()
      );

      if (existingItemIndex !== -1) {
        // Update existing item quantity
        cart.items[existingItemIndex].quantity += quantity;
      } else {
        // Add new item to cart
        cart.items.push({ productId, quantity });
      }

      await cart.save();
    }

    const updatedCart = await Cart.findOne({
      userId: req.user!.userId,
    }).populate("items.productId");

    if (!updatedCart) {
      return res
        .status(500)
        .json({ message: "Failed to retrieve updated cart" });
    }

    // Transform cart items to match frontend expectations
    const transformedItems = updatedCart.items.map((item: any) => ({
      product: item.productId, // productId is populated with full product object
      quantity: item.quantity,
    }));

    const { totalItems, totalPrice } = calculateCartTotals(updatedCart);

    res.json({
      items: transformedItems,
      totalItems,
      totalPrice,
    });
  } catch (err) {
    next(err);
  }
};

export const updateQuantity = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { quantity } = req.body;
    const { productId } = req.params;

    const cart = await Cart.findOneAndUpdate(
      { userId: req.user!.userId, "items.productId": productId },
      { $set: { "items.$.quantity": quantity } },
      { new: true }
    ).populate("items.productId");

    if (!cart) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    // Transform cart items to match frontend expectations
    const transformedItems = cart.items.map((item: any) => ({
      product: item.productId, // productId is populated with full product object
      quantity: item.quantity,
    }));

    const { totalItems, totalPrice } = calculateCartTotals(cart);

    res.json({
      items: transformedItems,
      totalItems,
      totalPrice,
    });
  } catch (err) {
    next(err);
  }
};

export const removeItem = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { productId } = req.params;

    const cart = await Cart.findOneAndUpdate(
      { userId: req.user!.userId },
      { $pull: { items: { productId } } },
      { new: true }
    ).populate("items.productId");

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    // Transform cart items to match frontend expectations
    const transformedItems = cart.items.map((item: any) => ({
      product: item.productId, // productId is populated with full product object
      quantity: item.quantity,
    }));

    const { totalItems, totalPrice } = calculateCartTotals(cart);

    res.json({
      message: "Item removed from cart",
      items: transformedItems,
      totalItems,
      totalPrice,
    });
  } catch (err) {
    next(err);
  }
};

export const clearCart = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const cart = await Cart.findOneAndUpdate(
      { userId: req.user!.userId },
      { $set: { items: [] } },
      { new: true }
    );

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    res.json({
      message: "Cart cleared successfully",
      items: [],
      totalItems: 0,
      totalPrice: 0,
    });
  } catch (err) {
    next(err);
  }
};
