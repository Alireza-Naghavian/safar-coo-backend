import type { NextFunction, Request, Response } from "express";
import userModel from "../models/user";
import { Usertype } from "../types/user.t";
import { hashPassword, setAccessToken, setRefreshToken } from "../utils/auth";
import { userSignUpValidation } from "../validations/user.schema";
import Controller from "./controller";

class userAuthController extends Controller  {
  constructor() {
super();
  }
  async signUpUser(req: Request, res: Response,next:NextFunction):Promise<any> {
   try {
    const { email, password, username }: Usertype = req.body;
    await userSignUpValidation.validateAsync(req.body);

    const hasuser = await userModel.findOne({ email }, "_id");
    if (hasuser) {
        return res.status(401).json({
        message: "کاربری با این ایمیل ثبت نام کرده است.",
        status: 401,
      });
      
    }
    //   encrypt user pass
    const hashUserPassword = await hashPassword(password);
    const newUser = await userModel.create({
      email,
      username,
      password: hashUserPassword,
    });

    //   set jwt token
    setAccessToken(res, newUser as Usertype);
    setRefreshToken(res, newUser as Usertype);

     return res.status(201)
      .json({ message: "ثبت نام با موفقیت انجام شد.", status: 201 });
   } catch (error) {
    next(error)
   }
  }
}
const AuthController =new userAuthController()
export default AuthController

