import {Course, CourseTestimonial } from "../../../models/index.js";
import { errorHelper, getText, logger } from "../../../utils/index.js";
import { validateAddTestimonial } from "../../validators/courseTestimonial.validator.js";

export default async (req, res) => {
  const { error } = validateAddTestimonial(req.body);
  if (error) {
    let code = '00025';
    if (error.details[0].message.includes('title'))
      code = '00258';
    else if (error.details[0].message.includes('description'))
      code = '00259';
    return res.status(400).json(errorHelper(code, req, error.details[0].message));
  }
  try {
    const existCourse = await Course.exists({_id : req.params.courseId})
    .catch((err) => {
      return res.status(500).json(errorHelper('00031', req, err.message));
    });
    if (!existCourse) return res.status(409).json(errorHelper('00260', req));
    let testimonial = new CourseTestimonial({...req.body , userId : req.user._id , courseId : req.params.courseId});
    logger('00261', testimonial._id, getText('00261'), 'Info', req);
    await testimonial.save();
    return res.status(200).json({
      Message : getText('00261'),
      Code : "00261",  testimonial });
  } catch (err) {
    console.log(err)
    return res.status(500).json(errorHelper("00246", req, err.message));
  }
};
