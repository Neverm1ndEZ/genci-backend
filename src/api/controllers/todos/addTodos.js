import {Todo} from '../../../models/index.js';
import { errorHelper, getText, logger } from "../../../utils/index.js";
import { validateAddTodos } from '../../validators/todos.validator.js';

export default async (req, res) => {
  const { error } = validateAddTodos(req.body);
  if (error) {
    let code = "00038";
    if (error.details[0].message.includes("text"))
      code = "00218";
    return res.status(400).json(errorHelper(code, req, error.details[0].message));
  }

  let todo = new Todo({...req.body , userId : req.user._id});

  todo = await todo.save().catch((err) => {
    return res.status(500).json(errorHelper("00031", req, err.message));
  });

  logger("00219", getText("00219"), "Info", req);
  return res.status(200).json({
    Message: getText("00219"),
    Code: "00219",
    todo
  });
}
