import { Course , CoursePrerequisite} from "../../../models/index.js";
import { errorHelper, getText, logger } from "../../../utils/index.js";
import { validateAddPrerequisite } from "../../validators/coursePrerequisite.validator.js";

export default async (req, res) => {
  const { error } = validateAddPrerequisite(req.body);
  if (error) {
    let code = '00025';
    if (error.details[0].message.includes('prerequisite_course_name'))
    code = '00230';
    return res.status(400).json(errorHelper(code, req, error.details[0].message));
  }
  try {
    const existCourse = await Course.exists({slug : req.params.slug})
    .catch((err) => {
      return res.status(500).json(errorHelper('00031', req, err.message));
    });
    if (!existCourse) return res.status(409).json(errorHelper('00098', req));
    
    let coursePrerequisite = new CoursePrerequisite({...req.body , course_slug : req.params.slug});
    logger('00226', coursePrerequisite._id, getText('00230'), 'Info', req);
    await coursePrerequisite.save();
    return res.status(200).json({
      Message : getText('00232'),
      Code : "00232",  coursePrerequisite });
  } catch (err) {
    console.log(err)
    return res.status(500).json(errorHelper("00227", req, err.message));
  }
};
