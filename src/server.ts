import type { Application } from "express";
import express = require("express");
import dotenv = require("dotenv");
import mongoose = require("mongoose");
import cookieParser = require("cookie-parser");
import setHeader = require("./middlewares/setHeaders");
import cors = require("cors");
import path = require("path")
const errorHandler = require("./middlewares/errorHandlers")
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
    this.app.use(cors(setHeader));
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
  private errorHandling():void{
    this.app.use(errorHandler)
  }
}

module.exports = App
