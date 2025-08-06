import { AuthRequest } from "../middleware/auth";
import { Request, Response } from "express";
import UserModel from "../models/User";
import ProductModel from "../models/Product";

const ProductController = {
  async create(req: AuthRequest, res: Response) {
    try {
      const { name, producer, category, barcode } = req.body ?? {};
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
      });

      res.status(201).json({
        success: true,
        message: "recepie created successfully",
        data: newProduct,
      });
    } catch (error) {
      console.error("Creation error:", error);
      res.status(500).json({ message: "Server error during creation" });
    }
  },
  async get(req: Request, res: Response) {},
  async update(req: AuthRequest, res: Response) {},
  async move(req: AuthRequest, res: Response) {},
  async delete(req: AuthRequest, res: Response) {},
  async getAll(req: AuthRequest, res: Response) {},
  async toggleLike(req: AuthRequest, res: Response) {},
};
