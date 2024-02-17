import { Assignment, Badge, Course, Module } from "../../../models/index.js";
import { errorHelper, getText } from "../../../utils/index.js";
import { validateParamsFromSelectedCourseDetails } from "../../validators/course.validator.js";

export default async (req, res) => {
	// validate req.params using JOI

	const {
		error,
		value: { selectedCourse },
	} = validateParamsFromSelectedCourseDetails(req.params);

	if (error) {
		return res
			.status(401)
			.json(errorHelper("00099", req, error.details[0].message));
	}
	try {
		const course = await Course.findOne({ slug: selectedCourse });
		if (!course) {
			return res.status(401).json(errorHelper("00097", req));
		}

		course.view += 1;
		await Course.updateOne(
			{ slug: selectedCourse },
			{
				$set: {
					view: course.view,
				},
			},
		).catch((err) => {
			console.log(err);
			return res.status(500).json(errorHelper("00008", req, err.message));
		});

		// for (let i = 0; i < course[0].Modules.length; i++) {
		// 	course[0].Modules[i] = await Module.find({
		// 		module_name: course[0].Modules[i],
		// 	});
		// }

		//logger

		let totalNoOfAssignment = await Assignment.countDocuments({
			courseId: course._id,
		}).catch((err) => {
			return res.status(500).json(errorHelper("00031", req, err.message));
		});
		let badges = await Badge.find({ courseId: course._id });

		console.log(course);
		res.status(200).json({
			Error: false,
			Message: getText("00096"),
			Code: "00096",
			course,
			assignments: totalNoOfAssignment,
			perks: badges,
		});
	} catch (err) {
		console.log(err);
		return res.status(500).json(errorHelper("00008", req, err.message));
	}
};
