import createHttpError from "http-errors";
import Joi from "joi";
import { createErrorMessage } from "../utils/funs";

const emailPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

const emailShema = Joi.string()
  .required()
  .email().trim()
  .pattern(emailPattern)
  .error(createHttpError.BadRequest("ایمیل کاربری  معتبر نمی باشد."));

const passwordShema = Joi.string()
  .required().trim()
  .messages(createErrorMessage({ min: 8, max: 15, field: "کلمه عبور" }))
  .error(createHttpError.BadRequest("نام کاربری معتبر نمی باشد."));

export const userSignUpValidation = Joi.object({
  username: Joi.string()
    .required().trim()
    .messages(createErrorMessage({ max: 30, min: 3, field: "نام کاربری" }))
    .error(createHttpError.BadRequest("نام کاربری معتبر نمی باشد.")),
  email: emailShema,
  password: passwordShema,
});
export const signInUserValidation = Joi.object({
  email: emailShema,
  password: passwordShema,
});

export const sendingEmailValidation = Joi.object({
  email: emailShema,
});

export const resetPasswordValidation = Joi.object({
  newPassword: passwordShema,
  email: emailShema,
});
