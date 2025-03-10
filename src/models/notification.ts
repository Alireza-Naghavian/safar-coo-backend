import mongoose from "mongoose";
import { NotificationsType } from "../@types/notifs.t";

const notifSchema = new mongoose.Schema<NotificationsType>(
  {
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "user",
      required: true,
    },
    status: {
      type: String,
      default: "UNREAD",
    },
    refer: {
      type: mongoose.Types.ObjectId,
      refPath: "referType",
    },
    referType:{
      type:String
    },
    expireAt: { type: Date, default: () => new Date(Date.now() + 2592000000) },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);
notifSchema.index({expireAt:1},{expireAfterSeconds:0 })
const notificationModel = mongoose.model("notification", notifSchema);

export default notificationModel;
