import { User } from '../../../../models/index.js';
import { validateRegister } from '../../../validators/user.validator.js';
import { errorHelper, sendLinkToEmail, logger, getText, signConfirmToken } from '../../../../utils/index.js';
import ipHelper from '../../../../utils/helpers/ip-helper.js';
import bcrypt from 'bcryptjs';
const { hash } = bcrypt;
import geoip from 'geoip-lite';
const { lookup } = geoip;

export default async (req, res) => {

  const { error } = validateRegister(req.body);
  if (error) {
    let code = '00025';
    if (error.details[0].message.includes('email'))
      code = '00026';
    else if (error.details[0].message.includes('password'))
      code = '00027';
    else if (error.details[0].message.includes('firstname'))
      code = '00028';
    return res.status(400).json(errorHelper(code, req, error.details[0].message));
  }


  const exists = await User.exists({ email: req.body.email })
  .catch((err) => {
    return res.status(500).json(errorHelper('00031', req, err.message));
  });

  if (exists) return res.status(409).json(errorHelper('00032', req));

  const hashed = await hash(req.body.password, 10);

  const geo = lookup(ipHelper(req));

  let user = new User({
    email: req.body.email,
    password: hashed,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    nationality: req.body.nationality,
    age: req.body.age,
    gender: req.body.gender,
    countryCode: geo == null ? 'IN' : geo.country,
    contactNumber: req.body.contactNumber,
  });
  user = await user.save().catch((err) => {
    console.log(err)
    return res.status(500).json(errorHelper('00034', req, err.message));
  });

  const token = signConfirmToken(user._id);
  await sendLinkToEmail(req.body.email, req.body.firstname, token, 'register', req, res);

  user.password = null;

  logger('00035', user._id, getText('00035'), 'Info', req);
  return res.status(200).json({
    Message: getText('00035'),
    Code: '00035', user, 
    // confirmToken: token  //nedd to remove for security purpose
  });
};

/**
 * @swagger
 * /user:
 *    post:
 *      summary: Registers the user
 *      requestBody:
 *        description: All required information about the user
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                email:
 *                  type: string
 *                password:
 *                  type: string
 *                name:
 *                  type: string
 *                language:
 *                  type: string
 *                  enum: ['tr', 'en']
 *                platform:
 *                  type: string
 *                  enum: ['Android', 'IOS']
 *                timezone:
 *                  type: number
 *                deviceId:
 *                  type: string
 *      tags:
 *        - User
 *      responses:
 *        "200":
 *          description: You registered successfully.
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          resultMessage:
 *                              $ref: '#/components/schemas/ResultMessage'
 *                          resultCode:
 *                              $ref: '#/components/schemas/ResultCode'
 *                          user:
 *                              $ref: '#/components/schemas/User'
 *                          confirmToken:
 *                              type: string
 *        "400":
 *          description: Please provide all the required fields!
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Result'
 *        "500":
 *          description: An internal server error occurred, please try again.
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Result'
 */