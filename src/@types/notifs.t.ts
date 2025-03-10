import { ObjectId } from "mongoose"

export type NotificationsType ={
    title:string,
    referType:string,
    body:string,
    refer:{
        type:ObjectId,
        ref:string
    },
    user:ObjectId,
    status:"READ"|"UNREAD",
    updatedAt:Date,
    createdAt:Date
}