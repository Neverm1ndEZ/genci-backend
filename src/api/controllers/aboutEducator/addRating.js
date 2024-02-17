import { AboutEducator, EducatorRating} from "../../../models/index.js";
import { errorHelper, getText, logger } from "../../../utils/index.js";
import { validateParam, validateSubmitRating } from "../../validators/aboutEducator.validator.js";

export default async (req, res) => {
  const { error  } = validateSubmitRating(req.body);
  if (error) {
    let code = '00279';
    if (error.details[0].message.includes('rating'))
      code = '00278';
    return res.status(400).json(errorHelper(code, req, error.details[0].message));
  }
  const {ParamsError} = validateParam({id : req.params.id})
  
  if (ParamsError){
    return res.status(400).json(errorHelper('00280', req, error.details[0].message));
  }
  try {
    const existEducator = await AboutEducator.exists({ educatorUserId : req.params.id})
    .catch((err) => {
      return res.status(500).json(errorHelper('00031', req, err.message));
    });
    if (!existEducator) return res.status(404).json(errorHelper('00281', req));

    let userAlreadyRated = await EducatorRating.exists({userId : req.user._id})
    .catch((err) => {
      return res.status(500).json(errorHelper('00031', req, err.message));
    });
    if(userAlreadyRated){
      return res.status(404).json(errorHelper('00285', req));
    }
    let rating = new  EducatorRating({...req.body , educatorUserId : req.params.id , userId : req.user._id});
    logger('00283', rating._id, getText('00283'), 'Info', req);
    await rating.save();
    return res.status(200).json({
      Message : getText('00283'),
      Code : "00283",  rating });
  } catch (err) {
    return res.status(500).json(errorHelper("00284", req, err.message));
  }
};
