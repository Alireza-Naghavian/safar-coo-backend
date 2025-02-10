import { JwtPayload } from "jsonwebtoken";
import mongoose from "mongoose";
export type Usertype = {
  username: string;
  password: string;
  email: string;
  resetTokenExpiration?: Date;
  createdAt?: Date;
  updatedAt?: Date;
  resetToken?: string;
  role?: "USER" | "ADMIN";
  _id:mongoose.Types.ObjectId
};

export type TokenPayload = JwtPayload& {
  email: string;
}

export type TokenOptions = {
  email: string;
  tokenSectretKey: string;
  expiresIn: number;
};
