import { User } from '../../../../models/index.js';
import { validateEmailForForgotPassword } from '../../../validators/user.validator.js';
import {sendLinkToEmail , errorHelper, logger, getText, signVerifyEmailToken} from '../../../../utils/index.js';

export default async (req, res) => {
  const { error } = validateEmailForForgotPassword(req.body);
  if (error) return res.status(400).json(errorHelper('00287', req, error.details[0].message));

  const user = await User.findOne({ email: req.body.email})
    .catch((err) => {
      return res.status(500).json(errorHelper('00288', req, err.message));
    });

  if (!user) return res.status(404).json(errorHelper('00289', req));

  const token = signVerifyEmailToken(user._id);
  await sendLinkToEmail(user.email, user.firstname, token, 'resetPassword', req, res);

  logger('00290', user._id, getText('00290'), 'Info', req);
  return res.status(200).json({
    Message: getText('00290'),
    Code: '00290',
  });
};