import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import type { Application, NextFunction, Request, Response } from "express";
import express from "express";
import mongoose from "mongoose";
import path from "path";
import errorHandler from "./middlewares/errorHandlers";
import setHeader from "./middlewares/setHeaders";
import allRoutes from "./routes/router";
dotenv.config();
class App {
  private app: Application;
  private port: string | number;
  private db_uri: string;
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 5000;
    this.db_uri = process.env.APP_DB as string;
    this.createServer();
    this.connectedToDB();
    this.initClientSession();
    this.configServer();
    this.configRoutes();
    this.errorHandling();
  }
  private createServer(): void {
    this.app.listen(this.port, () => {
      console.log(`server listen to port ${this.port}`);
    });
  }
  private configServer(): void {
    this.app.use(express.json());
    this.app.use(express.urlencoded({extended:true}))
    this.app.use(express.static(path.join(__dirname,"..")))
    this.app.use(setHeader);
  }
  private async connectedToDB(): Promise<void> {
    try {
      await mongoose.connect(this.db_uri);
      console.log("mongo db connected succesfully :)");
    } catch (error) {
      console.log("==> db connection error <==");
      console.log(error);
      console.log("==> db connection error <==");
    }
  }
  private initClientSession(): void {
    this.app.use(cookieParser(process.env.COOKIE_PARSER_SECRET_KEY));
  }
  private configRoutes():void{
    this.app.use("/api",allRoutes )
  }
  private errorHandling():void{
    this.app.use((err:any,req:Request,res:Response,next:NextFunction)=>{
      errorHandler(err,req,res,next)
    }); 
  }
}

export default App 
