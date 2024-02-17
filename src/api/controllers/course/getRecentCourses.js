import { Course, EnrollCourse, User } from "../../../models/index.js";
import { errorHelper, getText, logger } from "../../../utils/index.js";

export default async (req, res) => {
	const userId = req.user._id;
	try {
		const existUser = await User.exists({ _id: userId }).catch((err) => {
			return res.status(500).json(errorHelper("00008", req, err.message));
		});
		if (!existUser) {
			return res.status(204).json(errorHelper("00052", req));
		}
		try {
			let coursesEnrolled = await EnrollCourse.find(
				{ userId: userId },
				{ courseId: 1, _id: 0 },
			);

			if (!coursesEnrolled.length)
				return res.status(404).json(errorHelper("00100", req, err.message));

			let allCoursesDetails = [];
			for (let i = 0; i < coursesEnrolled.length; i++) {
				let singleCourse = await Course.findById(coursesEnrolled[i].courseId);
				allCoursesDetails.push(singleCourse);
			}
			logger("00216", userId, getText("00216"), "Info", req);
			return res.status(200).json({
				Message: getText("00217"),
				Code: "00217",
				allCoursesDetails,
			});
		} catch (err) {
			return res.status(500).json(errorHelper("000031", req, err.message));
		}
	} catch (e) {
		return res.status(500).json(errorHelper("000041", req, err.message));
	}
};
