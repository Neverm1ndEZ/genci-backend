import { Notification } from "../../../models/index.js";
import {  errorHelper, getText} from "../../../utils/index.js";

export default async (req, res) => {
  try {
    const notification = await Notification.find({
      userId: req.user._id, isViewed : false
    }).catch((err) => {
      return res.status(500).json(errorHelper("00008", req, err.message));
    });
    if (!notification.length)  return res.status(404).json(errorHelper("00300", req));
    return res.status(200).json({
      Message: getText("00301"),
      Code: "00301",
      notification,
    });
  } catch (e) {
    return res.status(500).json(errorHelper("000041", req, err.message));
  }
};
