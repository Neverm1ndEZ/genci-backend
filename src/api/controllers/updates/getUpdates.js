import {update} from '../../../models/index.js';
import { errorHelper, getText, logger } from '../../../utils/index.js';

export default async function (req, res) {
  
  const existupdate = await update.exists()
  .catch((err) => {
    return res.status(500).json(errorHelper('00031', req, err.message));
  });


  if (!existupdate)  return res.status(500).json(errorHelper('00210' , req , req.message))

  let allUpdate = await update.find()

  logger('00211', getText('00211'), 'Info', req);
  return res.status(200).json({
    Message: getText('00211'),
    Code: '00211',
    Updates : allUpdate,
  });
}