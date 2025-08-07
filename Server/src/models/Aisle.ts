import { Document, Schema, Types, model } from "mongoose";

export interface IAisle extends Document {
  name: string;
  position: number | null;
  products: Types.ObjectId[];
  supermarket: Types.ObjectId;
}

const aisleSchema = new Schema<IAisle>(
  {
    name: { type: String, required: true },
    position: { type: Number, default: null },
    products: [{ type: Schema.Types.ObjectId, ref: "Product" }],
    supermarket: {
      type: Schema.Types.ObjectId,
      ref: "SuperMarket",
      required: true,
    },
  },
  { timestamps: true }
);

export default model<IAisle>("Aisle", aisleSchema);
