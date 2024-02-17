import mongoose from "mongoose";
const { Schema, model } = mongoose;

const userSchema = new Schema(
	{
		firstname: {
			type: String,
			require: true,
			trim: true,
		},
		lastname: {
			type: String,
			trim: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
			lowercase: true,
			match:
				/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
		},
		password: {
			type: String,
			required: true,
			select: false,
		},
		nationality: {
			type: String,
			trim: true,
		},
		dob: {
			type: Date,
			trim: true,
		},
		/*NOTE: If you are using admin panel and controllers specific to admin panel,
      you can control the authority of users with the help of this field.*/
		type: {
			type: String,
			enum: ["admin", "user", "reader", "creator"],
			default: "user",
		},
		//NOTE: You can change the gender options acc. to your needs in the app.
		gender: {
			type: String,
			enum: ["male", "female", "other"],
		},
		countryCode: {
			type: String,
			trim: true,
		},
		contactNumber: {
			type: Number,
			trim: true,
		},
		//NOTE: To check whether the user skipped the email-verification step or not. You can delete the unverified accounts day by day.
		isEmailVerified: {
			type: Boolean,
			default: false,
			required: true,
		},
		coursesEnrolled: {
			type: Array,
		},
		bio: {
			type: String,
		},

		//NOTE: In case the user delete its account, you can store its non-personalized information anonymously.
	},
	{
		timestamps: true,
	},
);

const User = model("User", userSchema);
export default User;

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *         name:
 *           type: string
 *         username:
 *           type: string
 *         type:
 *           type: string
 *           enum: ['user', 'admin', 'creator', 'reader']
 *         language:
 *           type: string
 *           enum: ['tr', 'en']
 *         isPremium:
 *           type: boolean
 *         gender:
 *           type: string
 *           enum: ['male', 'female', 'other']
 *         countryCode:
 *           type: string
 *         timezone:
 *           type: number
 *         birthDate:
 *           type: string
 *         photoUrl:
 *           type: string
 *         isActivated:
 *           type: boolean
 *         isEmailVerified:
 *           type: boolean
 *         deviceId:
 *           type: string
 *         platform:
 *           type: string
 *           enum: ['Android', 'IOS']
 *         deletedAt:
 *           type: string
 */
