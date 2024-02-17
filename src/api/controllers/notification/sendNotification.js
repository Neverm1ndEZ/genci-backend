import { Notification, User } from "../../../models/index.js";
import {
  SendNotificationToUser,
  errorHelper,
  getText,
} from "../../../utils/index.js";
import { validateAddNotification } from "../../validators/notification.validator.js";

export default async (req, res) => {
  const { error } = validateAddNotification(req.body);
  if (error) {
    let code = "00268";
    if (error.details[0].message.includes("notificationMessage"))
      code = "00296";
    else if (error.details[0].message.includes("notificationSlug"))
      code = "00298";
    return res
      .status(400)
      .json(errorHelper(code, req, error.details[0].message));
  }
  try {
    const existNotification = await Notification.exists({
      notificationSlug: req.body.notificationSlug,
    });
    if(existNotification) return res.status(500).json(errorHelper("00299", req));
    const user = await User.find({}, { _id: 1 }).catch((err) => {
      return res.status(500).json(errorHelper("00008", req, err.message));
    });

    user.map(async (items) => {
      await SendNotificationToUser(
        items._id,
        req.body.notificationMessage,
        req.body.notificationSlug,
        req.body.notificationUrl
      );
    });
    // logger('00297', ._id, getText('00297'), 'Info', req);
    return res.status(200).json({
      Message: getText("00297"),
      Code: "00297",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json(errorHelper("00008", req, err.message));
  }
};
