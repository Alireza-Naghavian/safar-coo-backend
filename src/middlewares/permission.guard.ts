import { NextFunction, Request, Response } from "express";
import userModel from "../models/user";

const authorize = ({ ...allowedRoles }) => {
  return async function (req: Request, res: Response, next: NextFunction) {
    try {
      const user = await userModel.findOne({ email: req.user.email });
      if (!user) {
        return res
          .status(401)
          .json({
            message: "لطفا وارد حساب کاربری شوید",
            data: null,
            status: 401,
          });
      }
      if (allowedRoles.length === 0 || allowedRoles.includes(user.role)) {
        return next();
      } else {
        return res
          .status(403)
          .json({
            message: "شما به این قسمت دسترسی ندارید",
            data: null,
            status: 403,
          });
      }
    } catch (error) {
      next(error);
    }
  };
};

export default authorize
