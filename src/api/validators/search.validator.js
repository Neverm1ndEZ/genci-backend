import Joi from "joi";

export function validateSearch(body) {
  const schema = Joi.object({
    q: Joi.string().required().lowercase(),
  });

  return schema.validate(body);
}

