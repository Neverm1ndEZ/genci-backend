import { User } from "../../../../models/index.js";
import {
  validateForgotPassword,
  validateToken,
} from "../../../validators/user.validator.js";
import {
  errorHelper,
  logger,
  getText,
  sendLinkToEmail,
} from "../../../../utils/index.js";
import { jwtVerifyEmailKey } from "../../../../config/index.js";
import bcrypt from "bcryptjs";
const { hash } = bcrypt;
import pkg from "jsonwebtoken";
const { verify } = pkg;

export default async (req, res) => {

  const { error } = validateToken({ token: req.params.token });
  if (error)
    return res
      .status(400)
      .json(errorHelper("00053", req, error.details[0].message));
  try {
    req.user = verify(req.params.token, jwtVerifyEmailKey);
  } catch (err) {
    return res.status(400).json(errorHelper("00055", req, err.message));
  }
  const exists = await User.exists({ _id: req.user._id }).catch((err) => {
    return res.status(500).json(errorHelper("00288", req, err.message));
  });

  if (!exists) return res.status(400).json(errorHelper("00052", req));

  await User.updateOne(
    { _id: req.user._id },
    { $set: { isEmailVerified: true } }
  ).catch((err) => {
    return res.status(500).json(errorHelper("00056", req, err.message));
  });

  let  passwordBodyError  =  validateForgotPassword(req.body);
  console.log("check4")
  if (passwordBodyError.error){
    return res
    .status(400)
    .json(errorHelper("00291", req, passwordBodyError.error.details[0].message));
  }
  

  const hashed = await hash(req.body.password, 10)
  .catch((err) => {
    return res.status(500).json(errorHelper("00074", req, err.message));
  });

  try {
    await User.updateOne(
      { _id: req.user._id },
      { $set: { password: hashed } }
    ).catch((err) => {
      return res.status(500).json(errorHelper("00292", req, err.message));
    });
    await sendLinkToEmail().catch((err) => {
      return res.status(500).json(errorHelper("00293", req, err.message));
    });
    logger("00293", req.user._id, getText("00293"), "Info", req);
    return res.status(200).json({
      Message: getText("00293"),
      Code: "00293",
    });
  } catch (err) {
    return res.status(500).json(errorHelper("00294", req, err.message));
  }
};
