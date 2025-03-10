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
    }
  },
  { timestamps: true }
);
notifSchema.index({createdAt:1},{expireAfterSeconds:2592000 })
const notificationModel = mongoose.model("notification", notifSchema);

export default notificationModel;
