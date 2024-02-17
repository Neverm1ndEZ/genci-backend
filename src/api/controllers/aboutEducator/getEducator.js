import { AboutEducator, User } from "../../../models/index.js";
import { errorHelper, getText } from "../../../utils/index.js";
import { validateAbouteParam } from "../../validators/aboutEducator.validator.js";

export default async (req, res) => {
  const { error } = validateAbouteParam({id : req.params.id});
  if (error) {
    let code = '00238';
    if (error.details[0].message.includes('id'))
      code = '00237';
    return res.status(400).json(errorHelper(code, req, error.details[0].message));
  }
  try {
    const existEducator = await AboutEducator.exists({ educatorUserId: req.params.id})
    .catch((err) => {
      return res.status(500).json(errorHelper('00031', req, err.message));
    });
    if (!existEducator) return res.status(404).json(errorHelper('00235', req));
    const educator = await AboutEducator.find({educatorUserId : req.params.id})
    return res.status(200).json({
      Message : getText('00236'),
      Code : "00236",  educator  });
  } catch (err) {
    console.log(err)
    return res.status(500).json(errorHelper("00227", req, err.message));
  }
};
