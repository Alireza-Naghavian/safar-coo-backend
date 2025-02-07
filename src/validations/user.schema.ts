import createHttpError from "http-errors";
import Joi from "joi";
import { createErrorMessage } from "../utils/funs";
const emailPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
 export const userSignUpValidation = Joi.object({
  username: Joi.string()
    .required()
    .messages(createErrorMessage({ max: 30, min: 3, field: "نام کاربری" }))
    .error(createHttpError.BadRequest("نام کاربری معتبر نمی باشد.")),
  email: Joi.string()
    .required()
    .email()
    .pattern(emailPattern)
    .error(createHttpError.BadRequest("ایمیل کاربری  معتبر نمی باشد.")),
  password: Joi.string()
    .required()
    .messages(createErrorMessage({ min: 8, max: 15, field: "کلمه عبور" }))
    .error(createHttpError.BadRequest("نام کاربری معتبر نمی باشد.")),
});

