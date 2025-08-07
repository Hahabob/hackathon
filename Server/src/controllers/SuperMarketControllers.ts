import { AuthRequest } from "../middleware/auth";
import { Response } from "express";
import superMarketModel from "../models/SuperMarket";
import aisleModel from "../models/Aisle";
import storeFeatureModel from "../models/StoreFeature";
import { Types } from "mongoose";

function isObjectId(id: any): id is Types.ObjectId {
  return id && typeof id === "object" && typeof id.toHexString === "function";
}

const SuperMarketController = {
  async createStore(req: AuthRequest, res: Response) {
    try {
      if (!req.user) {
        return res
          .status(401)
          .json({ success: false, message: "Unauthorized" });
      }

      const {
        name,
        location,
        size,
        layoutGrid,
        aisles = [],
        storeFeatures = [],
      } = req.body;

      // Step 1: Create the SuperMarket document first (without aisles/features)
      const newStore = new superMarketModel({
        name,
        location,
        size,
        layoutGrid,
        createdBy: req.user.userId,
      });

      // Step 2: Save SuperMarket to get its _id
      await newStore.save();

      // Step 3: Create and associate Aisles
      const aisleDocs = await Promise.all(
        aisles.map((aisle: any) =>
          new aisleModel({ ...aisle, store: newStore._id }).save()
        )
      );
      newStore.aisles = aisleDocs.map((a) => a._id);

      // Step 4: Create and associate Store Features
      const featureDocs = await Promise.all(
        storeFeatures.map((feature: any) =>
          new storeFeatureModel({ ...feature, store: newStore._id }).save()
        )
      );
      newStore.storeFeatures = featureDocs.map((f) => f._id);

      // Step 5: Save again with associations
      await newStore.save();

      res.status(201).json({
        success: true,
        message: "Store created successfully",
        data: newStore,
      });
    } catch (error) {
      console.error("Error creating store:", error);
      res
        .status(500)
        .json({ success: false, message: "Failed to create store" });
    }
  },

  async deleteStore(req: AuthRequest, res: Response) {
    try {
      const { storeId } = req.params;
      if (!storeId) {
        return res
          .status(400)
          .json({ success: false, message: "Missing store ID" });
      }

      // Find the store first
      const store = await superMarketModel.findById(storeId);
      if (!store) {
        return res
          .status(404)
          .json({ success: false, message: "Store not found" });
      }

      // Delete related aisles and features
      await aisleModel.deleteMany({ store: store._id });
      await storeFeatureModel.deleteMany({ store: store._id });

      // Delete the store itself
      await superMarketModel.findByIdAndDelete(storeId);

      res.status(200).json({
        success: true,
        message: "Store and related data deleted successfully",
      });
    } catch (error) {
      console.error("Error deleting store:", error);
      res
        .status(500)
        .json({ success: false, message: "Server error during delete" });
    }
  },
  async updateStore(req: AuthRequest, res: Response) {
    try {
      const { storeId } = req.params;
      const {
        name,
        location,
        size,
        layoutGrid,
        aisles = [],
        storeFeatures = [],
      } = req.body;

      if (!storeId) {
        return res
          .status(400)
          .json({ success: false, message: "Missing store ID" });
      }

      const store = await superMarketModel.findById(storeId);
      if (!store) {
        return res
          .status(404)
          .json({ success: false, message: "Store not found" });
      }

      // Update basic fields
      store.name = name || store.name;
      store.location = location || store.location;
      store.size = size || store.size;
      store.layoutGrid = layoutGrid || store.layoutGrid;

      // --- Aisles ---
      const aisleIds: Types.ObjectId[] = [];
      for (const aisle of aisles) {
        if (aisle._id) {
          const updatedAisle = await aisleModel.findByIdAndUpdate(
            aisle._id,
            aisle,
            { new: true, runValidators: true }
          );
          if (updatedAisle && isObjectId(updatedAisle._id)) {
            aisleIds.push(updatedAisle._id);
          }
        } else {
          const newAisle = new aisleModel({ ...aisle, store: store._id });
          await newAisle.save();
          if (isObjectId(newAisle._id)) {
            aisleIds.push(newAisle._id);
          }
        }
      }
      store.aisles = aisleIds;

      // --- Store Features ---
      const featureIds: Types.ObjectId[] = [];
      for (const feature of storeFeatures) {
        if (feature._id) {
          const updatedFeature = await storeFeatureModel.findByIdAndUpdate(
            feature._id,
            feature,
            { new: true, runValidators: true }
          );
          if (updatedFeature && isObjectId(updatedFeature._id)) {
            featureIds.push(updatedFeature._id);
          }
        } else {
          const newFeature = new storeFeatureModel({
            ...feature,
            store: store._id,
          });
          await newFeature.save();
          if (isObjectId(newFeature._id)) {
            featureIds.push(newFeature._id);
          }
        }
      }
      store.storeFeatures = featureIds;

      await store.save();

      res.status(200).json({
        success: true,
        message: "Store updated successfully",
        data: store,
      });
    } catch (error) {
      console.error("Error updating store:", error);
      res
        .status(500)
        .json({ success: false, message: "Server error during update" });
    }
  },
  async getSuperMarket(req: AuthRequest, res: Response) {
    const { storeId } = req.params;
    try {
      const store = await superMarketModel
        .findById(storeId)
        .populate("createdBy", "name email")
        .populate({
          path: "aisles",
          populate: {
            path: "products",
            model: "Product",
          },
        })
        .populate("storeFeatures");

      if (!store) {
        return res
          .status(404)
          .json({ success: false, message: "Store not found" });
      }

      res.json({
        success: true,
        data: store,
      });
    } catch (error) {
      console.error("Can't get store, check with admin:", error);
      res
        .status(500)
        .json({ success: false, message: "Server error during get" });
    }
  },
};
export default SuperMarketController;
