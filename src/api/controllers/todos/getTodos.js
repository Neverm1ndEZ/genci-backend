
import {Todo} from '../../../models/index.js';
import { errorHelper, getText, logger } from '../../../utils/index.js';

export default async (req, res) => {
  const existTodo = await Todo.exists({userId : req.user._id})
  .catch((err) => {
    return res.status(500).json(errorHelper('00031', req, err.message));
  });
  
  if (!existTodo) return res.status(409).json(errorHelper('00220', req));
  let allTodo = await Todo.find({userId : req.user._id})

  logger('00221', getText('00221'), 'Info', req);
  return res.status(200).json({
    Message: getText('00221'),
    Code: '00221',
    allTodo
  });
}