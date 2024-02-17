import { Badge, Course } from "../../../models/index.js";
import { errorHelper, getText } from "../../../utils/index.js";
import { validateMongoDbID } from "../../validators/mongodbId.validator.js";

export default async (req, res) => {
	const { error } = validateMongoDbID({ id: req.params.courseId });
	if (error) {
		return res
			.status(400)
			.json(errorHelper("00253", req, error.details[0].message));
	}
	try {
		const existCourse = await Course.exists({ _id: req.params.courseId }).catch(
			(err) => {
				return res.status(500).json(errorHelper("00031", req, err.message));
			},
		);
		if (!existCourse) return res.status(409).json(errorHelper("00306", req));
		let badges = await Badge.find({ courseId: req.params.courseId });
		if (!badges.length) return res.status(404).json(errorHelper("00306", req));
		return res.status(200).json({
			Error: false,
			Message: getText("00307"),
			Code: "00307",
			badges,
		});
	} catch (err) {
		console.log(err);
		return res.status(500).json(errorHelper("00308", req, err.message));
	}
};
