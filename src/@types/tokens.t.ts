import { JwtPayload } from "jsonwebtoken";
import { ObjectId } from "mongoose";

export type TokenProps = {
    userId:ObjectId,
    refreshToken:JwtPayload,
    expires:Date
}