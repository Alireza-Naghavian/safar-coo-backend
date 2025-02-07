import type { NextFunction, Request, Response } from "express";
import userModel from "../models/user";
import { Usertype } from "../types/user.t";
import { comparePassword, hashPassword, setAccessToken, setRefreshToken } from "../utils/auth";
import { signInUserValidation, userSignUpValidation } from "../validations/user.schema";
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
  async signIn(req:Request,res:Response,next:NextFunction):Promise<any>{
    try {
      const {email,password} = req.body
      await signInUserValidation.validateAsync(req.body)
      const user = await userModel.findOne({email},"username email password ")
      if(!user){
        return res.status(404).json({message:"کاربری با این مشخصات یافت نشد",data:null,status:404})
      }
      const isValidPassword = await comparePassword(password,user?.password as string)
      if(!isValidPassword){
        return res.status(403).json({message:"اطلاعات وارد شده صحیح نمی باشد",data:null,status:403})
      }
      await setAccessToken(res,user as Usertype)
      await setRefreshToken(res,user as Usertype)
      return res.status(200).json({message:"ورود با موفقیت انجام شد.",status:200})
    } catch (error) {
      next(error)
    }
  }
}
const AuthController =new userAuthController()
export default AuthController

