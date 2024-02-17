
import {techNews} from '../../../models/index.js';
import { errorHelper, getText, logger } from '../../../utils/index.js';

export default async (req, res) =>{
  const existTechNews = await techNews.exists()
  .catch((err) => {
    return res.status(500).json(errorHelper('00031', req, err.message));
  });
  
  if (!existTechNews) return res.status(409).json(errorHelper('00207', req));
  let allTechNews = await techNews.find()

  logger('00208', getText('00208'), 'Info', req);
  return res.status(200).json({
    Message: getText('00208'),
    Code: '00208',
    TechNews : allTechNews
  });
}