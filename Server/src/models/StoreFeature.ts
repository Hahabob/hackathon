import mongoose, { Document, Schema, Types } from "mongoose";

export interface IStoreFeature extends Document {
  type: "entry" | "exit" | "fridge" | "checkout";
  position: string;
  supermarket: Types.ObjectId;
}

const storeFeatureSchema = new Schema<IStoreFeature>(
  {
    type: {
      type: String,
      enum: ["entry", "exit", "checkout"],
      required: true,
    },
    position: { type: String, required: true },
    supermarket: {
      type: Schema.Types.ObjectId,
      ref: "SuperMarket",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model<IStoreFeature>(
  "StoreFeature",
  storeFeatureSchema
);
