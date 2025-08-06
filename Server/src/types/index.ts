import { Types } from "mongoose";
import { ICartItem } from "../models/Cart";

export interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  createdAt: Date;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
}

export interface AuthPayload {
  userId: Types.ObjectId;
  email: string;
  isAdmin: boolean;
}

export interface CartResponse {
  _id: string;
  userId: string;
  items: ICartItem[];
  totalItems: number;
  totalPrice: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface AddToCartRequest {
  productId: string;
  quantity: number;
}

export interface UpdateQuantityRequest {
  quantity: number;
}
