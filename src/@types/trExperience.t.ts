import { ObjectId } from "mongoose";

export type TravelExprerience = {
    title:string,
    address:string
    category:string,
    location:[number,number]
    plan:"PAID"|"FREE";
    publishTime:Date|null,
    body:string
    isPublished:boolean
    publisher:ObjectId
}
export type TrExpStatusTypes=  "allTrExp" | "published" | "queue";