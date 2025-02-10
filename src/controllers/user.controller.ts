import { NextFunction, Request, Response } from "express";
import Controller from "./controller";



class userController extends Controller{

 async  createTicket(req:Request,res:Response,next:NextFunction):Promise<any>{
    try {
        
    } catch (error) {
        next(error)
    }
}

async ticket(req:Request,res:Response,next:NextFunction):Promise<any>{

}

}



const UserController = new userController();

export default UserController