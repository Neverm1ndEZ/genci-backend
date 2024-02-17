import { Course, CourseRating } from "../../../models/index.js";
import { errorHelper, getText, logger } from "../../../utils/index.js";
import { validateCourseRating } from "../../validators/course.validator.js";

export default async (req, res) => {
	const { error } = validateCourseRating(req.body);
	if (error) {
		let code = "00279";
		if (error.details[0].message.includes("rating")) code = "00278";
		if (error.details[0].message.includes("courseId")) code = "00309";
		return res
			.status(400)
			.json(errorHelper(code, req, error.details[0].message));
	}
	try {
		const initialRating = await Course.findOne(
			{ _id: req.body.courseId },
			{ rating: 1 },
		).catch((err) => {
			return res.status(500).json(errorHelper("00031", req, err.message));
		});

		if (!initialRating) return res.status(404).json(errorHelper("00310", req));

		let userAlreadyRated = await CourseRating.exists({
			userId: req.user._id,
			courseId: req.body.courseId,
		}).catch((err) => {
			return res.status(500).json(errorHelper("00031", req, err.message));
		});
		if (userAlreadyRated) {
			return res.status(404).json(errorHelper("00285", req));
		}

		let totalRatingLength = await CourseRating.countDocuments({
			courseId: req.body.courseId,
		}).catch((err) => {
			return res.status(500).json(errorHelper("00031", req, err.message));
		});

		let newRating =
			(totalRatingLength * initialRating.rating + req.body.rating) /
			(totalRatingLength + 1);
		await Course.updateOne(
			{ _id: req.body.courseId },
			{
				$set: {
					rating: newRating,
					totalRating: totalRatingLength + 1,
				},
			},
		).catch((err) => {
			return res.status(500).json(errorHelper("00064", req, err.message));
		});

		let rating = new CourseRating({ ...req.body, userId: req.user._id });
		logger("00311", rating._id, getText("00311"), "Info", req);
		await rating.save();
		return res.status(200).json({
			Error: false,
			Message: getText("00311"),
			Code: "00311",
			rating,
		});
	} catch (err) {
		console.log(err);
		return res.status(500).json(errorHelper("00312", req, err.message));
	}
};
