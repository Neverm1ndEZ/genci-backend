import Joi from "joi";

export function validateAddAssignment(body) {
  const schema = Joi.object({
    courseId: Joi.string().hex().length(24).required(),
    title : Joi.string().required(),
    details : Joi.array().required()
  });
  return schema.validate(body);
}

export function validateParamsID(body) {
  const schema = Joi.object({
    id: Joi.string().hex().length(24),
  });
  return schema.validate(body);
}