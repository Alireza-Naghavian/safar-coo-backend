import Joi from "joi";
import { createErrorMessage } from "../utils/funs";

export const ticketSchemaValidatio = Joi.object({
  title: Joi.string()
    .required()
    .trim()
    .min(5)
    .max(40)
    .messages(createErrorMessage({ max: 40, min: 5, field: "عنوان تیکت" })),
  body: Joi.string()
    .required()
    .trim()
    .min(7)
    .messages(
      createErrorMessage({ max: Infinity, min: 7, field: "محتوای تیکت" })
    ),
  priority: Joi.number()
    .min(1)
    .max(3)
    .required()
    .messages(createErrorMessage({ max: 3, min: 1, field: "اولویت تیکت" })),
});
