import Joi from 'joi';

export function validateTechNews(body) {
  const schema = Joi.object({
    title: Joi.string().min(3).required(),
    slug: Joi.string().min(3).required(),
    date: Joi.date(),
    category: Joi.string().required(),
    source : Joi.string().required(),
    imageUrl : Joi.string()
  });
  return schema.validate(body);
}
