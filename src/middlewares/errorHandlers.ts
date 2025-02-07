import type{ NextFunction, Request, Response } from "express";
import { CustomErr } from "../types/global";
const errorHandler = (
  err: CustomErr,
  _req: Request,
  res: Response,
  _next: NextFunction
):Response => {
  const { message, name, data, status } = err;
  console.log("==> Start Error <==");
  console.log(err);
  console.log("==> End Error <==");
  return res.status(status || 500).json({
    message: message || "Internal Server Error",
    data: data || null,
    name: name || "Error",
  });
};
export default errorHandler
