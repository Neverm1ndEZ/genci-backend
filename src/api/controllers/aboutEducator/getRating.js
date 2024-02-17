import { AboutEducator, EducatorRating} from "../../../models/index.js";
import { errorHelper, getText } from "../../../utils/index.js";
import { validateParam } from "../../validators/aboutEducator.validator.js";

export default async (req, res) => {
  const { error } = validateParam({id : req.params.id});
  if (error) {
    let code = '00280';
    return res.status(400).json(errorHelper(code, req, error.details[0].message));
  }
  try {
    const existEducator = await AboutEducator.exists({ educatorUserId: req.params.id})
    .catch((err) => {
      return res.status(500).json(errorHelper('00031', req, err.message));
    });
    if (!existEducator) return res.status(404).json(errorHelper('00235', req));
    const educatorRating = await EducatorRating.find({educatorUserId : req.params.id})


    let RatingResponse ={
      total_rating : 0,
      total_review :0,
      rating : null, 
      educatorRating , }

    let AvgRating = 0 
    for (let i =0 ; i<educatorRating.length ; i++){
      if (educatorRating[i].review){
        RatingResponse.total_review ++;
      }
      if (educatorRating[i].rating){
        RatingResponse.total_rating ++;
        AvgRating += educatorRating[i].rating;

      }
      
    }
    if(AvgRating){
      RatingResponse.rating  = AvgRating / educatorRating.length
    }

    return res.status(200).json({
      Message : getText('00286'),
      Code : "00286",   RatingResponse });
  } catch (err) {
    console.log(err)
    return res.status(500).json(errorHelper("00227", req, err.message));
  }
};
