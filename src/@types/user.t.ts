import { JwtPayload } from "jsonwebtoken";
export type Usertype = {
  username: string;
  password: string;
  email: string;
  resetTokenExpiration?: Date;
  createdAt?: Date;
  updatedAt?: Date;
  resetToken?: string;
  role?: "USER" | "ADMIN";
};

export interface TokenPayload extends JwtPayload {
  email: string;
}

export type TokenOptions = {
  email: string;
  tokenSectretKey: string;
  expiresIn: number;
};
