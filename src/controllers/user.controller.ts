import { NextFunction, Request, Response } from "express";
import Controller from "./controller";
import { TickeType } from "../@types/ticket.t";
import { ticketSchemaValidation } from "../validations/ticket.schema";
import mongoose from "mongoose";
import ticketModel from "../models/ticket";

class userController extends Controller {
  async createTicket(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const { title, body, priority }: TickeType = req.body;
      const user = req.user._id;

      // ticket validation
      await ticketSchemaValidation.validateAsync({ title, body, priority });

      const isValidUser = mongoose.isValidObjectId(user);

      if (!isValidUser) {
        res.status(400).json({
          message: "شناسه کاربری معتبر نمی باشد",
          data: null,
          status: 400,
        });
      }

      await ticketModel.create({
        title,
        body,
        priority,
        user,
      });

      res
        .status(201)
        .json({ message: "تیکت با موفقیت ایجاد شد.", status: 201 });
    } catch (error) {
      next(error);
    }
  }

  async getTickets(req: Request, res: Response, next: NextFunction): Promise<any> {
    

  }
}

const UserController = new userController();

export default UserController;
