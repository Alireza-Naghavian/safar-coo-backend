import createHttpError from "http-errors";
import Joi from "joi";
import { createErrorMessage } from "../utils/funs";

const emailPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

const userNameSchema = Joi.string()
  .required()
  .trim()
  .min(3)
  .max(30)
  .messages(createErrorMessage({ max: 30, min: 3, field: "نام کاربری" }));

const emailShema = Joi.string()
  .required()
  .email()
  .trim()
  .pattern(emailPattern)
  .error(createHttpError.BadRequest("ایمیل کاربری  معتبر نمی باشد."));

const passwordShema = Joi.string()
  .required()
  .trim()
  .min(8)
  .max(15)
  .messages(createErrorMessage({ min: 8, max: 15, field: "کلمه عبور" }));

export const userSignUpValidation = Joi.object({
  username: userNameSchema,
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

export const editProfileValidation = Joi.object({
  newUsername: userNameSchema,
  newPassword: passwordShema,
});
