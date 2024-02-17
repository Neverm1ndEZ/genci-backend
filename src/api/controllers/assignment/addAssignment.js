import { Assignment, Course } from "../../../models/index.js";
import { errorHelper, getText, logger } from "../../../utils/index.js";
import { validateAddAssignment } from "../../validators/assignment.validator.js";

export default async (req, res) => {
  const { error } = validateAddAssignment(req.body);
  if (error) {
    let code = '00025';
    if (error.details[0].message.includes('courseId'))
      code = '00242';
    else if (error.details[0].message.includes('title'))
      code = '00243';
    else if (error.details[0].message.includes('details'))
      code = '00244';
    return res.status(400).json(errorHelper(code, req, error.details[0].message));
  }
  try {
    const existCourse = await Course.exists({_id : req.body.courseId})
    .catch((err) => {
      return res.status(500).json(errorHelper('00031', req, err.message));
    });
    if (!existCourse) return res.status(409).json(errorHelper('00098', req));
    let assignment = new Assignment(req.body);
    logger('00245', assignment._id, getText('00245'), 'Info', req);
    await assignment.save();
    return res.status(200).json({
      Message : getText('00245'),
      Code : "00245",  assignment });
  } catch (err) {
    console.log(err)
    return res.status(500).json(errorHelper("00246", req, err.message));
  }
};
