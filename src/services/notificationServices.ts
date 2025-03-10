import mongoose from "mongoose";
import { NotificationsType } from "../@types/notifs.t";
import notificationModel from "../models/notification";

export default class NotificationService {
  public async createNotification(
    data: Partial<NotificationsType>
  ): Promise<NotificationsType> {
    return await notificationModel.create(data);
  }

  public async getUserNotification(userId: mongoose.Types.ObjectId) {
    return await notificationModel
      .find({ user: userId })
      .sort({ createdAt: -1 })
      .lean();
  }
  public async markNotifAsRead(notifId:string) {
    return await notificationModel.findOneAndUpdate(
      { _id: notifId },
      { status: "READ" },
      { new: true }
    );
  }
}
