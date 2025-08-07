import { AuthRequest } from "../middleware/auth";
import { Request, Response } from "express";
import UserModel from "../models/User";
import ProductModel from "../models/Product";

const ProductController = {
  async create(req: AuthRequest, res: Response) {
    try {
      const { name, producer, category, barcode, price, image } = req.body ?? {};
      const user = await UserModel.findById(req.user!.userId);
      if (!user) {
        res.status(400).json({ message: "User dosen't exist" });
        return;
      }
      const newProduct = await ProductModel.create({
        name,
        producer,
        category,
        barcode,
        price,
        image,
      });

      res.status(201).json({
        success: true,
        message: "product created successfully",
        data: newProduct,
      });
    } catch (error) {
      console.error("Creation error:", error);
      res.status(500).json({ message: "Server error during creation" });
    }
  },
  async get(req: Request, res: Response) {
    try {
      const { productId } = req.params;
      const product = await ProductModel.findById(productId);
      if (!product) {
        res.status(400).json({ success: false, message: "product not found" });
        return;
      }
      res.json({
        data: product,
        success: true,
      });
    } catch (error) {
      console.error("cant get", error);
      res.status(500).json({ message: "server error during get function" });
    }
  },
  async update(req: AuthRequest, res: Response) {
    try {
      const { productId } = req.params;
      const { name, producer, category, barcode, price, image } = req.body;
      const product = await ProductModel.findById(productId);
      if (!product) {
        return res
          .status(404)
          .json({ success: false, message: "product not found" });
      }

      product.name = name ?? product.name;
      product.producer = producer ?? product.producer;
      product.category = category ?? product.category;
      product.barcode = barcode ?? product.barcode;
      product.price = price ?? product.price;
      product.image = image ?? product.image; // Update the image field

      await product.save();

      res.status(201).json({
        success: true,
        message: "product updated successfully",
        data: product,
      });
    } catch (error) {
      console.error("cant update", error);
      res.status(500).json({ message: "server error during update" });
    }
  },
  async move(req: AuthRequest, res: Response) {
    try {
      const { productId } = req.params;
      const { location } = req.body;
      const product = await ProductModel.findById(productId);
      if (!product) {
        return res
          .status(404)
          .json({ success: false, message: "product not found" });
      }
      if (!product.location) {
        product.location = { x: 0, y: 0 };
      }
      product.location.x = location.x ?? product.location.x;
      product.location.y = location.y ?? product.location.y;

      await product.save();

      res.status(201).json({
        success: true,
        message: "product moved successfully",
        data: product,
      });
    } catch (error) {
      console.error("cant update", error);
      res.status(500).json({ message: "server error during update" });
    }
  },
  async delete(req: AuthRequest, res: Response) {
    try {
      const { productId } = req.params;
      const deletedProduct = await ProductModel.findByIdAndDelete(productId);
      if (!deletedProduct) {
        return res
          .status(404)
          .json({ success: false, message: "product not found" });
      }

      res.status(201).json({
        success: true,
        message: "product deleted successfully",
        data: deletedProduct,
      });
    } catch (error) {
      console.error("cant delete", error);
      res.status(500).json({ message: "server error during delete" });
    }
  },
  async getAll(req: Request, res: Response) {
    try {
      const products = (await ProductModel.find({})) || "no products yet";
      res.json({
        data: products,
        success: true,
      });
    } catch (error) {
      console.error("cant get", error);
      res.status(500).json({ message: "server error during get function" });
    }
  },
  async toggleLike(req: AuthRequest, res: Response) {},
};

export default ProductController;
