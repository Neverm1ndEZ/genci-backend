import { Course, Module } from "../../../models/index.js";
import { errorHelper, getText } from "../../../utils/index.js";

export default async (req, res) => {
	try {
		const existCourse = await Course.exists({ _id: req.params.courseId }).catch(
			(err) => {
				return res.status(500).json(errorHelper("00031", req, err.message));
			},
		);
		if (!existCourse) return res.status(409).json(errorHelper("00098", req));
		const module = await Module.find({ courseId: req.params.courseId }).catch(
			(err) => {
				return res.status(500).json(errorHelper("00031", req, err.message));
			},
		);

		if (!module.length) return res.status(409).json(errorHelper("00314", req));

		return res.status(200).json({
			Error: false,
			Message: getText("00315"),
			Code: "00315",
			module,
		});
	} catch (err) {
		console.log(err);
		return res.status(500).json(errorHelper("00227", req, err.message));
	}
};
