import { NextFunction, Request, Response } from "express";
import { CustomErr } from "../types/global";
const errorHandler = (
  err: CustomErr,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  const { message, name, data, status } = err;
  console.log("==> Start Error <==");
  console.log(err);
  console.log("==> End Error <==");
  return res.status(status || 500).json({ message, data, name });
};
module.exports =errorHandler
