import { User } from "../../../../models/index.js";
import { validateUserUpdate } from "../../../validators/user.validator.js";
import { errorHelper, logger, getText } from "../../../../utils/index.js";

export default async (req, res) => {
  const { error } = validateUserUpdate(req.body);
  if (error) {
    let code = "00106";
    const message = error.details[0].message;
    return res.status(400).json(errorHelper(code, req, message));
  }

  const user = await User.updateOne(
    { _id: req.user._id },
    { ...req.body }
  ).catch((err) => {
    user.save().catch((err) => {
      return res.status(500).json(errorHelper("00082", req, err.message));
    });
  });

  logger("00086", req.user._id, getText("00086"), "Info", req);
  return res.status(200).json({
    Error: false,
    Message: getText("00086"),
    resultCode: "00086",
  });
};

/**
 * @swagger
 * /user:
 *    put:
 *      summary: Edit the Profile Information
 *      parameters:
 *        - in: header
 *          name: Authorization
 *          schema:
 *            type: string
 *          description: Put access token here
 *        - in: formData
 *          name: image
 *          required: false
 *          schema:
 *            type: file
 *          description: Image file here
 *      requestBody:
 *        description: Some of the user profile information to change
 *        required: false
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                name:
 *                  type: string
 *                username:
 *                  type: string
 *                language:
 *                  type: string
 *                  enum: ['tr', 'en']
 *                gender:
 *                  type: string
 *                  enum: ['male', 'female', 'other']
 *                birthDate:
 *                  type: string
 *      tags:
 *        - User
 *      responses:
 *        "200":
 *          description: Your profile information was changed successfully.
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          resultMessage:
 *                              $ref: '#/components/schemas/ResultMessage'
 *                          resultCode:
 *                              $ref: '#/components/schemas/ResultCode'
 *                          photoUrl:
 *                              type: string
 *        "400":
 *          description: Please provide valid values for each key you want to change.
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Result'
 *        "401":
 *          description: Invalid token.
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
