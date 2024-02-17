import { Assignment, Course } from "../../../models/index.js";
import { errorHelper, getText, logger } from "../../../utils/index.js";
import { validateParamsID } from "../../validators/assignment.validator.js";

export default async (req, res) => {
  const { error } = validateParamsID({id : req.params.id});
  if (error) {
    return res.status(400).json(errorHelper("00253", req, error.details[0].message));
  }
  try {
    const existCourse = await Course.exists({_id : req.params.id})
    .catch((err) => {
      return res.status(500).json(errorHelper('00031', req, err.message));
    });
    if (!existCourse) return res.status(409).json(errorHelper('00254', req));
    let assignment = await Assignment.find({courseId : req.params.id});
    if (!assignment.length) return res.status(404).json(errorHelper("00255", req));
    return res.status(200).json({
      Message : getText('00256'),
      Code : "00256",  assignment });
  } catch (err) {
    console.log(err)
    return res.status(500).json(errorHelper("00257", req, err.message));
  }
};
