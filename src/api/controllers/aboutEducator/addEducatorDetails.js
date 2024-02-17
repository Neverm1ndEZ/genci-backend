import { AboutEducator, User} from "../../../models/index.js";
import { errorHelper, getText, logger } from "../../../utils/index.js";
import { validateAddEducatorDetails } from "../../validators/aboutEducator.validator.js";

export default async (req, res) => {
  const { error } = validateAddEducatorDetails(req.body);
  if (error) {
    return res.status(400).json(errorHelper('00025', req, error.details[0].message));
  }
  try {
    const existEducator = await AboutEducator.exists({ educatorUserId : req.user._id})
    .catch((err) => {
      return res.status(500).json(errorHelper('00031', req, err.message));
    });
    if (existEducator) return res.status(404).json(errorHelper('00241', req));

    const user = await User.findOne({_id: req.user._id} , {firstname : 1 , lastname : 1})
    console.log(user)
    let name = user.firstname  + " " + (user.lastname ? user.lastname :"")

    let aboutEducator = new  AboutEducator({...req.body , educatorUserId : req.user._id , name :name });
    logger('00240', aboutEducator._id, getText('00240'), 'Info', req);
    await aboutEducator.save();
    return res.status(200).json({
      Message : getText('00240'),
      Code : "00240",  aboutEducator });
  } catch (err) {
    console.log(err)
    return res.status(500).json(errorHelper("00227", req, err.message));
  }
};
