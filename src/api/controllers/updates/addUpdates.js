import update from "../../../models/update.js";
import { errorHelper, getText, logger } from "../../../utils/index.js";
import { validateUpdates } from "../../validators/updates.validator.js";

export default async function (req, res) {
  const { error } = validateUpdates(req.body);
  if (error) {
    let code = "00038";
    if (error.details[0].message.includes("title"))
      code = "00201";

    else if (error.details[0].message.includes("slug"))
      code = "00202";

    else if (error.details[0].message.includes("category"))
      code = "00203";

    return res.status(400).json(errorHelper(code, req, error.details[0].message));
  }

  req.body.slug  = req.body.slug.trim().replaceAll(' ', '-')
  console.log(req.body)

  const existUpdate = await update.exists({ slug: req.body.slug  }).catch((err) => {
      return res.status(500).json(errorHelper("00031", req, err.message));
    });

  if (existUpdate) return res.status(409).json(errorHelper("00205", req));

  let updates = new update(req.body);

  updates = await updates.save().catch((err) => {
    return res.status(500).json(errorHelper("00031", req, err.message));
  });

  logger("00209", getText("00209"), "Info", req);
  return res.status(200).json({
    Message: getText("00209"),
    Code: "00209",
  });
}
