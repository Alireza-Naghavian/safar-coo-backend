import { NextFunction, Request, Response } from "express";
import Controller from "./controller";
import { TickeType } from "../@types/ticket.t";
import { ticketSchemaValidation } from "../validations/ticket.schema";
import mongoose, { ObjectId } from "mongoose";
import ticketModel from "../models/ticket";
import NotifController from "./notifications.controller";
import NotificationService from "../services/notificationServices";

class userController extends Controller {
  private notificationService: NotificationService;
  constructor() {
    super();
    this.notificationService = new NotificationService();
  }
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
       return res.status(400).json({
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
      const notifData = {
        body:"تیم پشتیبانی در اسرع وقت تیکت شما را پاسخ خواهد داد.",
        title:"تیکت با موفقیت ایجاد شد",
        refer: user._id  as unknown as ObjectId,
        user: user._id  as unknown as ObjectId,
        referType: "ticket",
      };
      await this.notificationService.createNotification(notifData);
    return  res
        .status(201)
        .json({ message: "تیکت با موفقیت ایجاد شد.", status: 201 });
    } catch (error) {
      next(error);
    }
  }

  async getTickets(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    const hasTicketQuery = Object.keys(req.query).length > 0;
    if (hasTicketQuery) {
      return this.getTicketsByQueries(req, res, next);
    } else {
      return this.getAllTickets(req, res, next);
    }
  }
  // if has query
  async getTicketsByQueries(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const { status }: Pick<TickeType, "status"> = req.query || "";
      const user = req.user._id;
      let tickets = null;
      if (status && status?.trim().length > 0) {
        tickets = await ticketModel
          .find({ status, user })
          .populate("user", "username role")
          .lean();
      } else {
        tickets = await ticketModel
          .find({ user })
          .populate("user", "username role")
          .lean();
      }
      if (!tickets || tickets.length === 0) {
      return  res
          .status(404)
          .json({ message: "تیکتی یافت نشد", data: null, status: 404 });
      }
      return res.status(200).json(tickets);
    } catch (error) {
      next(error);
    }
  }
  // initail load tickets
  async getAllTickets(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const user = req.user;
      const tickets = await ticketModel
        .find({ user })
        .populate("user", "username role")
        .lean();
      if (!tickets) {
     return   res
          .status(404)
          .json({ message: "تیکتی یافت نشد", data: null, status: 404 });
      }
      return res.status(200).json(tickets);
    } catch (error) {
      next(error);
    }
  }

  async getTicket(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const { ticketId } = req.params;
      const user = req.user._id;
      const ticket = await ticketModel
        .findOne({ user, _id: ticketId })
        .populate("user", "role")
        .lean();
      if (!ticket) {
        return res
          .status(404)
          .json({ message: "تیکت یافت نشد!", data: null, status: 404 });
      }
      return res.status(200).json(ticket);
    } catch (error) {
      next(error);
    }
  }
}

const UserController = new userController();

export default UserController;
