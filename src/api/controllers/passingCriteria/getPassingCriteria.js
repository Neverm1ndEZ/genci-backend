import { PassingCriteria, Course } from "../../../models/index.js";
import { errorHelper, getText } from "../../../utils/index.js";
import { validateParamsID } from "../../validators/passingCriteria.validator.js";

export default async (req, res) => {
  const { error } = validateParamsID({id : req.params.id});
  if (error) {
    return res.status(400).json(errorHelper("00273", req, error.details[0].message));
  }
  try {
    const existCourse = await Course.exists({_id : req.params.id})
    .catch((err) => {
      return res.status(500).json(errorHelper('00031', req, err.message));
    });
    if (!existCourse) return res.status(409).json(errorHelper('00274', req));
    let passingCriteria = await PassingCriteria.find({courseId : req.params.id});
    if (!passingCriteria.length) return res.status(404).json(errorHelper("00255", req));
    return res.status(200).json({
      Message : getText('00275'),
      Code : "00275",  passingCriteria });
  } catch (err) {
    console.log(err)
    return res.status(500).json(errorHelper("00277", req, err.message));
  }
};
