import { Course, EnrollCourse, User } from "../../../models/index.js";
import { errorHelper, getText, logger } from "../../../utils/index.js";
import { validateEnrollCourses } from "../../validators/course.validator.js";

export default async (req, res) => {
  const { error } = validateEnrollCourses(req.body);
  if (error) {
    return res.status(404).json(errorHelper("00212", req));
  }
  const { courseId } = req.body;
  try {
    const existCourse = await Course.exists({_id : courseId}).catch((err) => {
      return res.status(500).json(errorHelper("00008", req, err.message));
    });
    if (!existCourse) {
      return res.status(204).json(errorHelper("00213", req));
    }
    try {
      if (await EnrollCourse.exists({courseId : courseId , userId : req.user._id})) {
        res.status(200).json(errorHelper("00214", req));
      } else {
       const enrollCourses = new EnrollCourse({courseId : courseId , userId : req.user._id})
        await enrollCourses.save();
        // logger
        logger('00215', enrollCourses._id, getText('00215'), 'Info', req);
        return res.status(200).json({
          Message : getText('00215'),
          Code : "00215",enrollCourses
        });
      }
    } catch (err) {
      res.status(500).json(errorHelper("00031", req, err.message));
    }
  } catch (err) {
    res.status(500).json(errorHelper("00041", req, err.message));
  }
};
