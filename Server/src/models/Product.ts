import { Document, Schema, Types, model } from "mongoose";

interface IProduct extends Document {
  _id: Types.ObjectId;
  name: string;
  producer: string;
  category: string;
  barcode: number;
  price: number;
  image?: string; // Added image field
  location?: {
    x: number;
    y: number;
  };
  createdAt: Date;
  updatedAt: Date;
}

const productSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      require: true,
    },
    producer: {
      type: String,
      require: true,
    },
    category: {
      type: String,
      require: true,
    },
    price: {
      type: Number,
      require: true,
    },
    barcode: {
      type: Number,
      require: true,
    },
    image: {
      type: String, // Added image field to schema
    },
    location: {
      x: {
        type: Number,
      },
      y: {
        type: Number,
      },
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Product = model<IProduct>("Product", productSchema);

export default Product;
