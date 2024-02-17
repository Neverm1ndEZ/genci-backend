import Joi from "joi";

export function validateAddModule(body) {
	const schema = Joi.object({
		courseId: Joi.string().hex().length(24),
		module_name: Joi.string().required(),
		topic_name: Joi.string().required(),
		duration: Joi.string(),
		topic_no: Joi.number().required(),
		topic_url: Joi.string(),
		module_type: Joi.string().valid("doc", "video").required(),
	});

	return schema.validate(body);
}
