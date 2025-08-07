import mongoose, { Document, Schema, Types } from "mongoose";

export interface ISuperMarket extends Document {
  _id: Types.ObjectId;
  name: string;
  location: string;
  size: {
    rows: number;
    cols: number;
  };
  layoutGrid: string[][];
  aisles: Types.ObjectId[];
  storeFeatures: Types.ObjectId[];
  createdBy: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const superMarketSchema = new Schema<ISuperMarket>(
  {
    name: {
      type: String,
      required: true,
    },
    location: {
      type: String,
    },
    size: {
      rows: { type: Number, required: true },
      cols: { type: Number, required: true },
    },
    layoutGrid: {
      type: [[String]],
      required: true,
      default: [],
    },
    aisles: [
      {
        type: Schema.Types.ObjectId,
        ref: "Aisle",
        default: [],
      },
    ],
    storeFeatures: [
      {
        type: Schema.Types.ObjectId,
        ref: "StoreFeature",
        default: [],
      },
    ],
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

export default mongoose.model<ISuperMarket>("SuperMarket", superMarketSchema);
