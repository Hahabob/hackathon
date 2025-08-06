import { Document, Schema, Types, model } from "mongoose";

interface ISuperMarket extends Document {
  _id: Types.ObjectId;
  name: string;
  location: {
    lat: number;
    lng: number;
    address?: string;
  };
  size: {
    rows: number;
    cols: number;
  };
  layoutGrid: string[][]; 
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
      lat: { type: Number, required: true },
      lng: { type: Number, required: true },
      address: { type: String },
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

const ISuperMarket = model<ISuperMarket>("SuperMarket", superMarketSchema);

export default ISuperMarket;
