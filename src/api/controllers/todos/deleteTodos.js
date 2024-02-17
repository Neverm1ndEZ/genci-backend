import {Todo} from '../../../models/index.js';
import { errorHelper, getText, logger } from "../../../utils/index.js";

export default async (req, res) => {
  const  todoId  = req.params.todoId;
  if (!todoId) {
    let code = "00038";
    return res.status(400).json(errorHelper(code, req));
  }
  const existTodo = await Todo.exists({userId : req.user._id , _id : todoId})
  .catch((err) => {
    return res.status(500).json(errorHelper('00031', req, err.message));
  });
  if (!existTodo) return res.status(409).json(errorHelper('00220', req));

  await Todo.deleteOne({userId : req.user._id , _id : todoId}).catch(err => {
    return res.status(500).json(errorHelper('00031', req, err.message));
  });
  logger("00222", getText("00222"), "Info", req);
  return res.status(200).json({
    Message: getText("00222"),
    Code: "00222",
  });
}
