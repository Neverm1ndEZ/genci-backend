import Joi from "joi";

export function validateMongoDbID(body) {
  const schema = Joi.object({
    id: Joi.string().hex().length(24),
  });
  return schema.validate(body);
}