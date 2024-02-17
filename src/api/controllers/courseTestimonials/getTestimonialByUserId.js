import {CourseTestimonial} from "../../../models/index.js";
import { errorHelper, getText } from "../../../utils/index.js";

export default async (req, res) => {
  try {
    const testimonial = await CourseTestimonial.find({userId : req.user._id})
    if (!testimonial.length) return res.status(409).json(errorHelper('00267', req));
    return res.status(200).json({
      Message: getText("00266"),
      Code: "00266", testimonial,
    });

  }
  catch (err) {
    return res.status(500).json(errorHelper('00031', req, err.message));
  }
};