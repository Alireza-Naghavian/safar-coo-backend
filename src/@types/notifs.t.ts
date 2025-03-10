import { ObjectId } from "mongoose"

export type NotificationsType ={
    title:string,
    referType:string,
    body:string,
    refer:ObjectId,
    user:ObjectId,
    status?:"READ"|"UNREAD",
    updatedAt?:Date,
    expireAt?:Date
    createdAt?:Date
}