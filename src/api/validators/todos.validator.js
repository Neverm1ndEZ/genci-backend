import Joi from "joi";

export function validateAddTodos(body) {
  const schema = Joi.object({
    text : Joi.string().required(),
    date: Joi.date(),
    description: Joi.string(),
  })
  return schema.validate(body);
}