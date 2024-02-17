import Joi from "joi";

export function validateAddNotification(body) {
  const schema = Joi.object({
    notificationMessage: Joi.string().required(),
    notificationUrl: Joi.string(),
    notificationSlug: Joi.string().required(),
  });

  return schema.validate(body);
}