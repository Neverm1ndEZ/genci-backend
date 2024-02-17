import { Badge, Course } from "../../../models/index.js";
import { errorHelper, getText, logger } from "../../../utils/index.js";
import { validateAddBadges } from "../../validators/badges.validator.js";

export default async (req, res) => {
	const { error } = validateAddBadges(req.body);
	if (error) {
		let code = "00025";
		if (error.details[0].message.includes("courseId")) code = "00242";
		else if (error.details[0].message.includes("bad geName")) code = "00302";
		else if (error.details[0].message.includes("badgeUrl")) code = "00303";
		else if (error.details[0].message.includes("badgeSlug")) code = "00304";
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

		const existBadgeSlug = await Badge.exists({
			badgeSlug: req.body.badgeSlug,
			courseId: req.body.courseId,
		}).catch((err) => {
			return res.status(500).json(errorHelper("00031", req, err.message));
		});

		if (existBadgeSlug) return res.status(409).json(errorHelper("00313", req));

		if (!existCourse) return res.status(409).json(errorHelper("00098", req));
		let badge = new Badge(req.body);
		logger("00305", badge._id, getText("00305"), "Info", req);
		await badge.save();
		return res.status(200).json({
			Message: getText("00305"),
			Code: "00305",
			badge,
		});
	} catch (err) {
		console.log(err);
		return res.status(500).json(errorHelper("00246", req, err.message));
	}
};
