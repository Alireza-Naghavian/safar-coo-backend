import mongoose from "mongoose";
import { TokenProps } from "../@types/tokens.t";


const tokenSchame = new mongoose.Schema<TokenProps>({
    refreshToken:{
        type : String,
        required:true
    },
    userId:{
        type:mongoose.Types.ObjectId,
        ref:"user",
        required:true
    },
    expires:{
        type :Date,
        required:true,
        default : Date.now()
    }
})

const tokenModel = mongoose.model("token",tokenSchame)

export default tokenModel;