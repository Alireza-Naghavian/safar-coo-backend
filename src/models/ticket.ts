import mongoose from "mongoose";
import { TickeType } from "../@types/ticket.t";

const messageSchema = new mongoose.Schema({
  body: {
    type: String,
    required: true,
  },
  sendAt: {
    type: Date,
    default: Date.now,
    required: true,
  },
  sender: {
    type: mongoose.Types.ObjectId,
    ref: "user",
    required: true,
  },
});

const ticketSchema = new mongoose.Schema<TickeType>(
  {
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    priority: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      required: false,
      default: "OPEN",
    },
    user:{
        type:mongoose.Types.ObjectId ,
        ref:"user",
        required: true,
    },
    messages: {
      type: [messageSchema],
      required: false,
      default: [],
    },
    adminMessages: {
      type: [messageSchema],
      required: false,
      default: [],
    },
  },
  { timestamps: true }
);


const ticketModel = mongoose.model("ticket",ticketSchema)

export default ticketModel