import {Course, PassingCriteria } from "../../../models/index.js";
import { errorHelper, getText, logger } from "../../../utils/index.js";
import { validateAddPassingCriteria } from "../../validators/passingCriteria.validator.js";

export default async (req, res) => {
  const { error } = validateAddPassingCriteria(req.body);
  if (error) {
    let code = '00268';
    if (error.details[0].message.includes('courseId'))
      code = '00269';
    else if (error.details[0].message.includes('title'))
      code = '00243';
    else if (error.details[0].message.includes('details'))
      code = '00270';
    return res.status(400).json(errorHelper(code, req, error.details[0].message));
  }
  try {
    const existCourse = await Course.exists({_id : req.body.courseId})
    .catch((err) => {
      return res.status(500).json(errorHelper('00271', req, err.message));
    });
    if (!existCourse) return res.status(409).json(errorHelper('00098', req));
    let passingCriteria = new PassingCriteria(req.body);
    logger('00272', passingCriteria._id, getText('00272'), 'Info', req);
    await passingCriteria.save();
    return res.status(200).json({
      Message : getText('00272'),
      Code : "00272",  passingCriteria });
  } catch (err) {
    console.log(err)
    return res.status(500).json(errorHelper("00276", req, err.message));
  }
};
