import { Course, Module } from "../../../models/index.js";
import { errorHelper, getText, logger } from "../../../utils/index.js";
import { validateAddModule } from "../../validators/module.validator.js";

export default async (req, res) => {
	const { error } = validateAddModule(req.body);
	if (error) {
		let code = "00025";
		if (error.details[0].message.includes("courseId")) code = "00223";
		else if (error.details[0].message.includes("module_name")) code = "00224";
		else if (error.details[0].message.includes("topic_name")) code = "00228";
		else if (error.details[0].message.includes("topic_no")) code = "00229";
		return res
			.status(400)
			.json(errorHelper(code, req, error.details[0].message));
	}
	try {
		const existCourse = await Course.exists({ _id: req.body.courseId }).catch(
			(err) => {
				return res.status(500).json(errorHelper("00031", req, err.message));
			},
		);
		if (!existCourse) return res.status(409).json(errorHelper("00098", req));
		const course = await Course.findById(req.body.courseId);
		console.log(course.Modules);
		const isModuleExist = course.Modules.includes(req.body.module_name);
		if (!isModuleExist) {
			course.Modules.push(req.body.module_name);
			await course.save();
		}
		let module = new Module(req.body);
		logger("00226", module._id, getText("00226"), "Info", req);
		await module.save();
		return res.status(200).json({
			Message: getText("00226"),
			Code: "00226",
			module,
		});
	} catch (err) {
		console.log(err);
		return res.status(500).json(errorHelper("00227", req, err.message));
	}
};
