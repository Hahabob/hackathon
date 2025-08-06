import { AuthRequest } from "../middleware/auth";
import { Request, Response } from "express";
import superMarketModel from "../models/superMarket"
import UserModel from "../models/User";
import { Types } from "mongoose";
const SuperMarketController  = {
  async createStore(req: AuthRequest, res: Response) {
 try {
    if (!req.user) {
  return res.status(401).json({ success: false, message: "Unauthorized" });
}
    const {name,location,size,layoutGrid}=req.body;
    const store =new superMarketModel({
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
async deleteStore(req:AuthRequest,res:Response){
    try {
        const {storeId}=req.params;
        if(!storeId){
            return res.status(404).json({success:false, message:"store not found"})
        }
        const deletedStore= await superMarketModel.findByIdAndDelete(storeId)
            if (!deletedStore) {
      return res.status(404).json({ success: false, message: "Store not found" });
    }
 
        res.status(201).json({
            success:true,
            message:"store deletd successfully",
            data:deletedStore,
        })
    } catch (error) {
        console.log(error);
        
          console.error("cant delete", error);
      res.status(500).json({ message: "server error during delete" });
    }
},
}
export default SuperMarketController;
