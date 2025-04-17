import Joi from "joi";
import { createErrorMessage } from "../utils/funs";

export const trExperienceValidation = Joi.object({
  title: Joi.string()
    .required()
    .trim()
    .min(4)
    .max(50)
    .messages(createErrorMessage({ max: 50, min: 4, field: "عنوان تجربه" })),
  body: Joi.string()
    .required()
    .min(10)
    .trim()
    .messages(
      createErrorMessage({ max: Infinity, min: 4, field: "محتوای تجربه" })
    ),
  category: Joi.string()
    .required()
    .trim()
    .messages(
      createErrorMessage({ max: Infinity, min: 0, field: "دسته بندی" })
    ),
  plan: Joi.string()
    .valid("PAID", "FREE")
    .required()
    .messages({"any.required":"فیلد هزینه مکان الزامی است"}),
    province:Joi.number().required() .messages({"any.required":"انتخاب استان سفر الزامی است"}),
    city:Joi.number().required() .messages({"any.required":"انتخاب شهر سفر الزامی است"}),
});
