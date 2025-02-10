import { ObjectId } from "mongoose"

export type MsgTeyp = {
    body:string,
    sendAt:Date,
    sender:string
}
export type TickeType ={
    title:string,
    body:string,
    priority:number,
    user:ObjectId,
    status?:"REPLIED"|"PENDING"|"CLOSED"
    createAt?:Date,
    updatedAt?:Date
    messages:MsgTeyp[]|[]
    adminMessages:MsgTeyp[]|[]
}