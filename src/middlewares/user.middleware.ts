import cookieParser from "cookie-parser";
import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { Usertype } from "../@types/user.t";

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
    const isValidUser = verify(
      token as string,
      process.env.AccessTokenSecretKey as string
    );
    if(isValidUser)  req.user = isValidUser as Usertype
    return next();
  } catch (error) {
    next(error);
  }
};
