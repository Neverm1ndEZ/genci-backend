import { AboutEducator, Course } from "../../../models/index.js";
import { errorHelper, getText, logger } from "../../../utils/index.js";
import { validateAddCourses } from "../../validators/course.validator.js";

export default async (req, res) => {
	const { error } = validateAddCourses(req.body);
	if (error) {
		return res
			.status(400)
			.json(errorHelper("00025", req, error.details[0].message));
	}

	try {
		const slug = req.body.slug.trim().replace(/ /g, "-");

		const existCourse = await Course.exists({ slug: slug }).catch((err) => {
			return res.status(500).json(errorHelper("00031", req, err.message));
		});

		if (existCourse) return res.status(409).json(errorHelper("00205", req));
		const educatorName = await AboutEducator.findOne({
			educatorUserId: req.user._id,
		});
		let courses = new Course({
			...req.body,
			educator: req.user._id,
			educatorName: educatorName.name,
		});
		courses["slug"] = slug;
		logger("00216", Course._id, getText("00215"), "Info", req);
		await courses.save();
		return res.status(200).json({
			Error: false,
			Message: getText("00216"),
			Code: "00216",
			courses,
		});
	} catch (err) {
		console.log(err);
		return res.status(500).json(errorHelper("00008", req, err.message));
	}
};
