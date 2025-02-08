import { JwtPayload } from "jsonwebtoken";

export type Usertype = {
  username: string;
  password: string;
  email: string;
  changePassExpTime?: Date;
  createdAt?:Date
  updatedAt?:Date
isPassChanged?: boolean;
};

export interface TokenPayload extends JwtPayload {
  email: string;
}

export enum Roles {
  "USER","ADMIN"
}

export type TokenOptions = {
  email: string;
  tokenSectretKey: string;
  expiresIn:  number;
role:Roles
};

