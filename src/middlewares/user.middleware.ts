import cookieParser from "cookie-parser";
import { NextFunction, Request, Response } from "express";
import createError from "http-errors";
import { JwtPayload, verify } from "jsonwebtoken";
import { TokenPayload, Usertype } from "../@types/user.t";
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
    const tokenPayload: TokenPayload = verify(
      token as string,
      process.env.AccessTokenSecretKey as string
    ) as TokenPayload;

    const user = await userModel.findOne({ email: tokenPayload.email });

    if (user) req.user = user as Usertype;
    return next();
  } catch (error) {
    next(error);
  }
};

export const verifyRefreshToken = async (req: Request) => {
  const refreshToken =req.cookies.refreshToken;
  if (!refreshToken) {
    return createError.Unauthorized("لطفا وارد حساب کاربری خود شوید");
  }
  const token = cookieParser.signedCookie(
    refreshToken,
    process.env.RefreshTokenSecreKey as string
  );
  if (typeof token !== "string") {
    return createError.Unauthorized("لطفا وارد حساب کاربری خود شوید");
  }
  let payload: JwtPayload;
  try {
    payload = verify(
      token as string,
      process.env.RefreshTokenSecreKey as string
    )as JwtPayload
  } catch (error) {
    return createError.Unauthorized("لطفا وارد حساب کاربری خود شوید");
  }
  const user = await userModel.findOne({email:payload.email})
  if (!user || typeof user?._id.toJSON() !== "string") {
    return createError.Unauthorized("لطفا وارد حساب کاربری خود شوید");
  }
  return user._id;
};
