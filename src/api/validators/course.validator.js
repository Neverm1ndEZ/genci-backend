import Joi from "joi";

export function validateGetCategoryCourses(body) {
	const schema = Joi.object({
		category: Joi.string().lowercase().required(),
	});

	return schema.validate(body);
}

export function validateParamsFromSelectedCourseDetails(body) {
	const schema = Joi.object({
		selectedCourse: Joi.string().lowercase().required(),
	});

	return schema.validate(body);
}

export function validateAddCourses(body) {
	const schema = Joi.object({
		name: Joi.string().min(3).max(100).required(),
		slug: Joi.string().required(),
		duration: Joi.string(),
		courseType: Joi.string().valid("Practical", "Knowledge").required(),
		category: Joi.string().lowercase(),
		price: Joi.number(),
		thumbnail: Joi.string(),
		sDesc: Joi.string(),
		lDesc: Joi.string(),
		language: Joi.string(),
		certificate: Joi.string().valid("YES", "NO"),
		whatYouWillLearn: Joi.array(),
	});
	return schema.validate(body);
}
export function validateEnrollCourses(body) {
	const schema = Joi.object({
		courseId: Joi.string().hex().length(24).required(),
	});
	return schema.validate(body);
}

export function validateCourseRating(body) {
	const schema = Joi.object({
		rating: Joi.number().required().min(1).max(5),
		courseId: Joi.string().hex().length(24).required(),
		review: Joi.string(),
	});

	return schema.validate(body);
}
