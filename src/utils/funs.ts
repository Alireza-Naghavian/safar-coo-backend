type ErrMsgType = {
  field: string;
  min: number;
  max: number;
};
export const createErrorMessage = ({ field, min, max }: ErrMsgType) => ({
  "string.empty": `${field} نمی‌تواند خالی باشد.`,
  "string.min": `${field} حداقل باید ${min} کاراکتر باشد.`,
  "string.max": `${field} حداکثر باید ${max} کاراکتر باشد. `,
  "any.required": `${field} نمی‌تواند خالی باشد.`,
});

