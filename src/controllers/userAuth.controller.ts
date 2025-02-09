import type { CookieOptions, NextFunction, Request, Response } from "express";
import { Usertype } from "../@types/user.t";
import userModel from "../models/user";
import crypto from "crypto";
import {
  comparePassword,
  hashPassword,
  setAccessToken,
  setRefreshToken,
} from "../utils/auth";
import {
  editProfileValidation,
  resetPasswordValidation,
  sendingEmailValidation,
  signInUserValidation,
  userSignUpValidation,
} from "../validations/user.schema";
import Controller from "./controller";
import { sendEmail } from "../utils/sendEmail";

class userAuthController extends Controller {
  constructor() {
    super();
  }

  async signUpUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
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

      return res
        .status(201)
        .json({ message: "ثبت نام با موفقیت انجام شد.", status: 201 });
    } catch (error) {
      next(error);
    }
  }

  async signIn(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      const { email, password } = req.body;
      await signInUserValidation.validateAsync(req.body);
      const user = await userModel.findOne(
        { email },
        "username email password "
      );
      if (!user) {
        return res.status(404).json({
          message: "کاربری با این مشخصات یافت نشد",
          data: null,
          status: 404,
        });
      }
      const isValidPassword = await comparePassword(
        password,
        user?.password as string
      );
      if (!isValidPassword) {
        return res.status(403).json({
          message: "اطلاعات وارد شده صحیح نمی باشد",
          data: null,
          status: 403,
        });
      }
      await setAccessToken(res, user as Usertype);
      await setRefreshToken(res, user as Usertype);
      return res
        .status(200)
        .json({ message: "ورود با موفقیت انجام شد.", status: 200 });
    } catch (error) {
      next(error);
    }
  }

  async getMe(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      const email = req.user.email;
      const user = await userModel.findOne({ email }, "-password");
      if (!user) {
        return res.status(401).json({
          message: "لطفا ابتدا وارد حساب کاربری شوید",
          data: null,
          status: 401,
        });
      }

      return res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }

  async logout(_req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      const cookieOptions: CookieOptions = {
        maxAge: 0,
        expires: new Date(),
        httpOnly: true,
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        secure: process.env.NODE_ENV === "production" ? true : false,
        path: "/",
      };
      res.cookie("accessToken", null, cookieOptions);
      res.cookie("refreshToken", null, cookieOptions);
      return res
        .status(200)
        .json({ message: "خروج موفقیت آمیز ", data: null, status: 200 });
    } catch (error) {
      next(error);
    }
  }

  async sendingEmail(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const { email } = req.body;
      await sendingEmailValidation.validateAsync(req.body);
      const user = await userModel.findOne({ email }, "-password");
      if (!user) {
        return res
          .status(404)
          .json({ message: "کاربر یافت نشد", data: null, status: 404 });
      }
      const resetToken = crypto.randomBytes(32).toString("hex");

      // reset last token before create new one
      user.resetToken = undefined;
      user.resetTokenExpiration = undefined;
      await user.save();

      // set valid token for reset pass on client
      user.resetToken = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");

      // add 1 hour time expiration
      user.resetTokenExpiration = new Date(Date.now() + 3_600_000);
      await user.save();

      const resetLink = `${process.env.CLIENT_URL}/reset-link?token=${resetToken}$email=${user.email}`;

      const emailContent = `
      <h2>بازنشانی کلمه عبور</h2>
      <p>برای تغییر کلمه عبور روی لینک زیر کلیک کنید:</p>
      <a href="${resetLink}">تغییر رمز عبور</a>
  `;

      await sendEmail(email, "بازنشانی کلمه عبور", emailContent);

      return res
        .status(200)
        .json({ message: "ایمیل بازنشانی ارسال شد", status: "success" });
    } catch (error) {
      next(error);
    }
  }

  async resetPassword(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const { token, email, newPassword } = req.body;
      await resetPasswordValidation.validateAsync({ email, newPassword });

      const user = await userModel.findOne({ email });
      if (!user) {
        return res
          .status(404)
          .json({ message: "کاربر یافت نشد", data: null, status: 404 });
      }

      // token validation
      const hashedToken = crypto
        .createHash("sha256")
        .update(token)
        .digest("hex");

      if (
        user.resetToken !== hashedToken ||
        Date.now() > Number(user.resetTokenExpiration)
      ) {
        return res
          .status(400)
          .json({ message: "توکن نامعتبر یا منقضی شده است" });
      }

      // hashed new password
      const hashUserPassword = await hashPassword(newPassword);
      user.password = hashUserPassword;
      // reset token field for reuse in future
      user.resetToken = undefined;
      user.resetTokenExpiration = undefined;
      await user.save();

      return res
        .status(200)
        .json({ message: "رمز عبور با موفقیت آپدیت شد", status: 200 });
    } catch (error) {
      next(error);
    }
  }

  async editUserProfile(req: Request,res: Response,next: NextFunction): Promise<any> {
    try {
      const { newUsername, newPassword, email } = req.body;
      await editProfileValidation.validateAsync({ newUsername, newPassword });

      const user = await userModel.findOne(
        { email },
        "username email password"
      );
      if (!user) {
        res
          .status(404)
          .json({ message: "کاربر یافت نشد", data: null, status: 404 });
      }

      const isSamePassword = await comparePassword(
        user?.password as string,
        newPassword
      );

      if (isSamePassword) {
        return res
          .status(403)
          .json({
            message: "کلمه عبور تکراری است.لطفا کلمه عبور جدید را وارد کنید",
            status: 403,
          });
      }

      // hash new password
      const hashUserPassword = await hashPassword(newPassword);

      await userModel.findOneAndUpdate(
        { email },
        { $set: { username: newUsername, password: hashUserPassword } }
      );

      return res
        .status(200)
        .json({ message: "اطلاعات با موفقیت بروزرسانی شد", status: 200 });
    } catch (error) {
      next(error);
    }
  }
}
const AuthController = new userAuthController();
export default AuthController;
