import { NextFunction, Request, Response } from "express";
import notificationModel from "../models/notification";
import NotificationService from "../services/notificationServices";
import { NotificationsType } from "./../@types/notifs.t";
import Controller from "./controller";
import { isValidObjectId } from "mongoose";

export class NotificationContorller extends Controller {
  private notificationService: NotificationService;
  constructor() {
    super();
    this.notificationService = new NotificationService();
  }
  async getNotifs(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    const hasNotifQeury = Object.keys(req.query).length > 0;
    if (hasNotifQeury) {
      return this.getNotifsByQueries(req, res, next);
    } else {
      return this.getUserNotifs(req, res, next);
    }
  }

  async getNotifsByQueries(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const status = req.query.status as string | undefined;
      const user = req.user._id;
      let notifs = null;
      await notificationModel.deleteMany({
        expireAt: { $lte: new Date() }
      });
      if (status && status?.trim().length > 0) {
        notifs = await notificationModel
          .find({ status, user })
          .populate("user", "username role")
          .lean();
      } else {
        notifs = await notificationModel
          .find({ user })
          .populate("user", "username role")
          .lean();
      }
      if (!notifs || notifs.length === 0) {
        res
          .status(404)
          .json({ message: "اعلانی یافت نشد", data: null, status: 404 });
      }

      return res.status(200).json(notifs);
    } catch (error) {
      next(error);
    }
  }
  async getUserNotifs(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const userId = req.user._id;

      await notificationModel.deleteMany({
        expireAt: { $lte: new Date() }
      });
      const notifications = await this.notificationService.getUserNotification(userId);
      return res.status(200).json(notifications);
    } catch (error) {
      next(error);
    }
  }

  async makeNotfiAsRead(req: Request,res: Response,next: NextFunction): Promise<any> {
    try {
      const { notifId } = req.body;
      if(!isValidObjectId(notifId)){
        return res.status(422).json({message:"شناسه اعلان معتبر نمیباشد",status:422})
      }
      await this.notificationService.markNotifAsRead(notifId);
      return res
        .status(201)
        .json({ message: "علامت به عنوان خوانده شده", status: 201 });
    } catch (error) {
      next(error);
    }
  }

  public async createNotification(options?: NotificationsType): Promise<any> {
    try {
      await this.notificationService.createNotification(
        options as NotificationsType
      );
    } catch (error) {
      console.error("error accured in sending notification", error);
    }
  }
  public async removeNotif(req:Request,res:Response,next:NextFunction):Promise<any>{
    try {
        const {notifId}= req.params;
        if(!isValidObjectId(notifId)){
          return res.status(404).json({message:"شناسه اعلان معتبر نمی باشد",status:404})
        }
        await notificationModel.findOneAndDelete({_id:notifId});
        return res.status(200).json({message:"اعلان با موفقیت حذف گردید.",status:200});
    } catch (error) {
      next(error)
    }
  }
}

const NotifController = new NotificationContorller();
export default NotifController;
