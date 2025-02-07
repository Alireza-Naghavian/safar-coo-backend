type ErrMsgType = {
  field: string;
  min: number;
  max: number;
};
export const createErrorMessage = ({ field, min, max }: ErrMsgType) => ({
  "string.empty": `${field} نمی‌تواند خالی باشد.`,
  "string.min": `حداقل ${min} کاراکتر.`,
  "string.max": `حداکثر ${max} کاراکتر.`,
  "any.required": `${field} نمی‌تواند خالی باشد.`,
});

