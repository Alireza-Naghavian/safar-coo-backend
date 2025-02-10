import { NextFunction, Request, Response } from "express";
 const setHeader = (_req:Request,res:Response,next:NextFunction)=>{
res.header("Access-Control-Allow-Origin",process.env.ALLOW_CORS_ORIGIN as string)
res.header("Access-Control-Allow-Methods","GET,POST,PUT,PATCH,DELETE,OPTION")
res.header("Access-Control-Allow-Headers","content-Type,Authorization")
res.header("Access-Control-Allow-Credentials","true")
next();
}
export default setHeader