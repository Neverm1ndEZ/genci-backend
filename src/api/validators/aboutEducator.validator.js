import Joi from "joi";

export function validateAbouteParam(body) {
  const schema = Joi.object({
    id: Joi.string().hex().length(24),
  });

  return schema.validate(body);
}
export function validateAddEducatorDetails(body) {
  const schema = Joi.object({
    designation: Joi.string(),
    aboutEducator : Joi.string().required(),
    websiteUrl : Joi.string(),
    facebookId :Joi.string(),
    instagramId :Joi.string(),
    twitterId : Joi.string(),
    linkedinId :Joi.string(),
    youtubeId :Joi.string(),
    imageUrl : Joi.string(),
  });

  return schema.validate(body);
}

export function validateParam(body) {
  const schema = Joi.object({
    id: Joi.string().hex().length(24),
  });
  return schema.validate(body);
}
export function validateSubmitRating(body) {
  const schema = Joi.object({
    review : Joi.string(),
    rating : Joi.number().required().min(1).max(5)
  });

  return schema.validate(body);
}