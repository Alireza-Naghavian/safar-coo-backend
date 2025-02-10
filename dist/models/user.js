"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var userSchema = new mongoose_1.default.Schema({
    username: {
        type: String,
        requred: true,
    },
    email: {
        type: String,
        requred: true,
    },
    password: {
        type: String,
        requred: true,
    },
    changePassExpTime: {
        type: Date,
    },
    isPassChanged: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });
var userModel = mongoose_1.default.model("user", userSchema);
exports.default = userModel;
