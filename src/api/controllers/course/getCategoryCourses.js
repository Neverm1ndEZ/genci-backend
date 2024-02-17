import { Course } from "../../../models/index.js";
import { errorHelper, getText, logger } from "../../../utils/index.js";
import { validateGetCategoryCourses } from "../../validators/course.validator.js";

export default async (req, res) => {
  // validates req.body using JOI
  const {
    error,
    value: { category },
  } = validateGetCategoryCourses(req.body);

  if (error)
    return res
      .status(401)
      .json(errorHelper("00093", req, error.details[0].message));

  const courses = await Course.find({ category }).catch((err) => {
    return res.status(500).json(errorHelper("00008"));
  });

  if (!courses.length) {
    return res
      .status(401)
      .json(errorHelper("00094", req, "Category not present"));
  }

  //logger

  res.status(200).json({
    Message: getText("00095"),
    Code: "00095",
    courses,
  });
};
