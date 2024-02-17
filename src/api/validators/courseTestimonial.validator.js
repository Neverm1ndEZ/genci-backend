import Joi from "joi";

export function validateAddTestimonial(body) {
  const schema = Joi.object({
    title : Joi.string().required(),
    description : Joi.string().required()
  });
  return schema.validate(body);
}

export function validateParam(body) {
  const schema = Joi.object({
    id: Joi.string().hex().length(24),
  });
  return schema.validate(body);
}