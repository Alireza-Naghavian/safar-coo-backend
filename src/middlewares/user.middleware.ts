import cookieParser from "cookie-parser";
import { NextFunction, Request, Response } from "express";
import { JwtPayload, verify } from "jsonwebtoken";
import {  TokenPayload, Usertype } from "../@types/user.t";
import userModel from "../models/user";

export const verifyAccessToken = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const accessToken = await req.cookies?.accessToken;
    if (!accessToken) {
      return res
        .status(401)
        .json({ message: "لطفا وارد حساب کاربری خود شوید.", status: 401 });
    }

    const token = cookieParser.signedCookie(
      accessToken,
      process.env.COOKIE_PARSER_SECRET_KEY as string
    );
    // console.log(token)
    const tokenPayload:TokenPayload = verify(
      token as string ,
      process.env.AccessTokenSecretKey as string
    ) as TokenPayload
    
    const user = await userModel.findOne({email:tokenPayload.email})

    if(user)  req.user = user as Usertype
    return next();
  } catch (error) {
    next(error);
  }
};
