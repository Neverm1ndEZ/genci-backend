import { Course } from "../../../models/index.js";
import { errorHelper, getText, logger } from "../../../utils/index.js";

export default async (req, res) => {
  const courses = await Course.find({}).catch((err) => {
    return res.status(500).json(errorHelper("00008", req, err.message));
  });

  if (!courses.length) {
    return res
      .status(401)
      .json(errorHelper("00097", req, "Courses not present"));
  }

  // logger
  res.status(200).json({
    Message: getText("00095"),
    Code: "00095",
    courses,
  });
};
