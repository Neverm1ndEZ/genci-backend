import { Course, CourseTestimonial} from "../../../models/index.js";
import { errorHelper, getText } from "../../../utils/index.js";
import { validateParam } from "../../validators/courseTestimonial.validator.js";

export default async (req, res) => {
  const { error } = validateParam({id : req.params.courseId});
  if (error) {
    let code = '00262';
    if (error.details[0].message.includes('id'))
      code = '00263';
    return res.status(400).json(errorHelper(code, req, error.details[0].message));
  }
  try {
    const existCourse = await Course.exists({_id : req.params.courseId})
    .catch((err) => {
      return res.status(500).json(errorHelper('00031', req, err.message));
    });
    if (!existCourse) return res.status(409).json(errorHelper('00254', req));

    const testimonial = await CourseTestimonial.find({courseId : req.params.courseId})
    if (!testimonial.length) return res.status(409).json(errorHelper('00264', req));
    return res.status(200).json({
      Message: getText("00265"),
      Code: "00265", testimonial,
    });

  }
  catch (err) {
    return res.status(500).json(errorHelper('00031', req, err.message));
  }
};