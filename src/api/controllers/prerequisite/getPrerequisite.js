import {
	Course,
	CoursePrerequisite,
	Module,
	User,
} from "../../../models/index.js";
import { errorHelper, getText } from "../../../utils/index.js";

export default async (req, res) => {
	try {
		const existCourse = await Course.exists({ slug: req.params.slug }).catch(
			(err) => {
				return res.status(500).json(errorHelper("00031", req, err.message));
			},
		);
		if (!existCourse) return res.status(409).json(errorHelper("00098", req));

		const prerequisites = await CoursePrerequisite.find({
			course_slug: req.params.slug,
		});
		if (!prerequisites.length)
			return res.status(409).json(errorHelper("00233", req));
		return res.status(200).json({
			Message: getText("00234"),
			Code: "00234",
			prerequisites,
		});
	} catch (err) {
		return res.status(500).json(errorHelper("00031", req, err.message));
	}
};
