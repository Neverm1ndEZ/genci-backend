import Joi from 'joi';

export function validateUpdates(body) {
  const schema = Joi.object({
    title: Joi.string().min(3).required(),
    slug: Joi.string().min(3).required(),
    date: Joi.date(),
    category: Joi.string().required(),
    source : Joi.string(),
    imageUrl : Joi.string(),
    description : Joi.string(),
  });
  return schema.validate(body);
}
