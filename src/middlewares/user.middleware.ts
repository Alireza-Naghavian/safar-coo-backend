import cookieParser from "cookie-parser";
import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

 const verifyAccessToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const accessToken = req.headers.accessToken as string;
    if (!accessToken) {
      return res
        .status(401)
        .json({ message: "لطفا وارد حساب کاربری خود شوید.", status: 401 });
    }

    const token = cookieParser.signedCookie(accessToken,process.env.COOKIE_PARSER_SECRET_KEY as string)
    const isValidUser = verify(token as string,process.env.COOKIE_PARSER_SECRET_KEY as string)
    console.log(isValidUser)
  } catch (error) {
    next(error);
  }
};



export={verifyAccessToken}