import mongoose from "mongoose";

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

const ticketSchema = new mongoose.Schema(
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