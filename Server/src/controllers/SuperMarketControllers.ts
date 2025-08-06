import { AuthRequest } from "../middleware/auth";
import {  Response } from "express";
import superMarketModel from "../models/superMarket";
const SuperMarketController = {
  async createStore(req: AuthRequest, res: Response) {
    try {
      if (!req.user) {
        return res
          .status(401)
          .json({ success: false, message: "Unauthorized" });
      }
      const { name, location, size, layoutGrid } = req.body;
      const store = new superMarketModel({
        name,
        location,
        size,
        layoutGrid,
        createdBy: req.user.userId,
      });
      await store.save();
      res.status(201).json({ sucsses: true, data: store });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ success: false, message: "failed to create store" });
    }
  },
  async deleteStore(req: AuthRequest, res: Response) {
    try {
      const { storeId } = req.params;
      if (!storeId) {
        return res
          .status(404)
          .json({ success: false, message: "store not found" });
      }
      const deletedStore = await superMarketModel.findByIdAndDelete(storeId);
      if (!deletedStore) {
        return res
          .status(404)
          .json({ success: false, message: "Store not found" });
      }

      res.status(201).json({
        success: true,
        message: "store deletd successfully",
        data: deletedStore,
      });
    } catch (error) {
      console.log(error);

      console.error("cant delete", error);
      res.status(500).json({ message: "server error during delete" });
    }
  },
  async updateStore(req: AuthRequest, res: Response) {
    try {
        const {storeId}=req.params
      const { name, location, size, layoutGrid } = req.body;
         if (!storeId) {
      return res.status(400).json({ success: false, message: "Missing store ID" });
    }
    const updatedStore=await superMarketModel.findByIdAndUpdate( storeId,
      { name, location, size, layoutGrid },
      { new: true, runValidators: true })
    if (!updatedStore) {
      return res.status(404).json({ success: false, message: "Store not found" });
    }
      
    res.status(200).json({
      success: true,
      message: "Store updated successfully",
      data: updatedStore,
    });
      
     
    } catch (error) { console.error("Error updating store:", error);
    res.status(500).json({ success: false, message: "Server error during update" })}
  },
  async getSuperMarket(req:AuthRequest,res:Response){
     const { storeId } = req.params;
     try {
        const store = await superMarketModel.findById(storeId).populate(
             "createdBy",
             "name"
           );
              if (!store) {
        res.status(400).json({ success: false, message: "store not found" });
        return;
      }
        res.json({
        data: store,
        success: true,
      }); 
     } catch (error) {
              console.error("Can't get store, check with admin:", error);
      res.status(500).json({ message: "server error during get function" });
     }
       
  }
};
export default SuperMarketController;
