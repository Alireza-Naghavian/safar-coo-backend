import mongoose from "mongoose";
import { TravelExprerience } from "../@types/trExperience.t";

const travelExperienceSchema = new mongoose.Schema<TravelExprerience>(
  {
    body: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    plan: {
      type: String,
      required: true,
      default: "PAID",
    },
    location: {
      type: [Number],
      required: false,
      index: "2dsphere",
    },
    address: {
      type: String,
      required: false,
    },
    publishTime: {
      type: Date,
      required: false,
      default:  null,
    },
    category: {
      type: String,
      required: true,
    },
    isPublished:{
      type:Boolean,
      required:false,
      default:false
    },
    publisher:{
      type:mongoose.Types.ObjectId,
      ref:"user",
      required:true
    }
  },
  { timestamps: true }
);
travelExperienceSchema.index({title:"text",body:"text"})
const exprerienceModel = mongoose.model("experience", travelExperienceSchema);
export default exprerienceModel;
