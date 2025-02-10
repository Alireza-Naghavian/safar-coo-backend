"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signInUserValidation = exports.userSignUpValidation = void 0;
var http_errors_1 = __importDefault(require("http-errors"));
var joi_1 = __importDefault(require("joi"));
var funs_1 = require("../utils/funs");
var emailPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
exports.userSignUpValidation = joi_1.default.object({
    username: joi_1.default.string()
        .required()
        .messages((0, funs_1.createErrorMessage)({ max: 30, min: 3, field: "نام کاربری" }))
        .error(http_errors_1.default.BadRequest("نام کاربری معتبر نمی باشد.")),
    email: joi_1.default.string()
        .required()
        .email()
        .pattern(emailPattern)
        .error(http_errors_1.default.BadRequest("ایمیل کاربری  معتبر نمی باشد.")),
    password: joi_1.default.string()
        .required()
        .messages((0, funs_1.createErrorMessage)({ min: 8, max: 15, field: "کلمه عبور" }))
        .error(http_errors_1.default.BadRequest("نام کاربری معتبر نمی باشد.")),
});
exports.signInUserValidation = joi_1.default.object({
    email: joi_1.default.string()
        .required()
        .email()
        .pattern(emailPattern)
        .error(http_errors_1.default.BadRequest("ایمیل کاربری  معتبر نمی باشد.")),
    password: joi_1.default.string()
        .required()
        .messages((0, funs_1.createErrorMessage)({ min: 8, max: 15, field: "کلمه عبور" }))
        .error(http_errors_1.default.BadRequest("نام کاربری معتبر نمی باشد.")),
});
