
import {techNews} from '../../../models/index.js';
import { errorHelper, getText, logger } from '../../../utils/index.js';
import { validateTechNews } from '../../validators/technews.validator.js';

export default async (req, res) =>{
  const { error } = validateTechNews(req.body);
  if (error) {
    let code = '00038';
    if (error.details[0].message.includes('title'))
      code = '00201';
    else if (error.details[0].message.includes('slug'))
      code = '00202';
    else if (error.details[0].message.includes('category'))
      code = '0203';
    else if (error.details[0].message.includes('source'))
      code = '00204';

    return res.status(400).json(errorHelper(code, req, error.details[0].message));
  }
  const existTechNews = await techNews.exists({slug : req.body.slug})
  .catch((err) => {
    return res.status(500).json(errorHelper('00031', req, err.message));
  });

  if (existTechNews) return res.status(409).json(errorHelper('00205', req));

  let TechNews = new techNews(req.body);
  
  TechNews = await TechNews.save().catch((err) => {
      return res.status(500).json(errorHelper('00031', req, err.message));
    });


  logger('00206', getText('00206'), 'Info', req);
  return res.status(200).json({
    Message: getText('00206'),
    Code: '00206'
  });
}