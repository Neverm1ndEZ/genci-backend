import Joi from "joi";

export function validateAddBadges(body) {
  const schema = Joi.object({
    courseId: Joi.string().hex().length(24).required(),
    badgeName : Joi.string().required(),
    badgeUrl : Joi.string().required(),
    badgeSlug : Joi.string().required(),
    description : Joi.string(),
  });
  return schema.validate(body);
}
