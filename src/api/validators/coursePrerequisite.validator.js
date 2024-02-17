import Joi from "joi";

export function validateAddPrerequisite(body) {
  const schema = Joi.object({
    prerequisite_course_name : Joi.string().required(),
    prerequisite_course_slug : Joi.string()
  });

  return schema.validate(body);
}