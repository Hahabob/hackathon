import { AuthRequest } from "../middleware/auth";
import { Request, Response } from "express";
import superMarketModl from "../models/superMarket"
import UserModel from "../models/User";
import { Types } from "mongoose";
const SuperMarketController  = {
  async createStore(req: AuthRequest, res: Response) {
 try {
    if (!req.user) {
  return res.status(401).json({ success: false, message: "Unauthorized" });
}
    const {name,location,size,layoutGrid}=req.body;
    const store =new superMarketModl({
           name,
      location,
      size,
      layoutGrid,
      createdBy: req.user.userId,

    });
    await store.save();
    res.status(201).json({sucsses:true ,data:store})
 } catch (error) {
      console.error(error);
    res.status(500).json({success:false, message:"failed to create store"})
 }
   
   
    },
  
  async get(req: Request, res: Response) {
    try {
      const { recepieId } = req.params;
      const recepie = await superMarketModl.findById(recepieId).populate(
        "createdBy",
        "name"
      );
      if (!recepie) {
        res.status(400).json({ success: false, message: "recepie not found" });
        return;
      }
      res.json({
        data: recepie,
        success: true,
      });
    } catch (error) {
      console.error("cant get", error);
      res.status(500).json({ message: "server error during get function" });
    }
  },
  async update(req: AuthRequest, res: Response) {
    try {
      const {
        title,
        content,
        ingredients,
        steps,
        prepTime,
        cookTime,
        difficulty,
      } = req.body;
      const recepie = req.recepie;

      if (!recepie) {
        return res
          .status(404)
          .json({ success: false, message: "recepie not found" });
      }
      recepie.title = title ?? recepie.title;
      recepie.content = content ?? recepie.content;
      recepie.ingredients = ingredients ?? recepie.ingredients;
      recepie.steps = steps ?? recepie.steps;
      recepie.prepTime = prepTime ?? recepie.prepTime;
      recepie.cookTime = cookTime ?? recepie.cookTime;
      recepie.difficulty = difficulty ?? recepie.difficulty;

      await recepie.save();

      const populatedRecepie = await recepie.populate("createdBy", "name");

      res.status(201).json({
        success: true,
        message: "recepie updated successfully",
        data: populatedRecepie,
      });
    } catch (error) {
      console.error("cant update", error);
      res.status(500).json({ message: "server error during update" });
    }
  },
  async delete(req: AuthRequest, res: Response) {
    try {
      const recepie = req.recepie;
      if (!recepie) {
        return res
          .status(404)
          .json({ success: false, message: "recepie not found" });
      }

      const populatedRecepie = await await recepie.deleteOne();
      res.status(201).json({
        success: true,
        message: "recepie deleted successfully",
        data: populatedRecepie,
      });
    } catch (error) {
      console.error("cant delete", error);
      res.status(500).json({ message: "server error during delete" });
    }
  },
  async getAll(req: Request, res: Response) {
    try {
      const recepies =
        (await superMarketModl.find({}).populate("createdBy", "name")) ||
        "no recepies yet";
      res.json({
        data: recepies,
        success: true,
      });
    } catch (error) {
      console.error("cant get", error);
      res.status(500).json({ message: "server error during get function" });
    }
  },
 
};

export default SuperMarketController;
