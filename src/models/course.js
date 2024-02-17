import mongoose from "mongoose";
const { Schema, model } = mongoose;

const courseSchema = new Schema(
	{
		// course name
		name: {
			type: String,
			required: true,
			trim: true,
			maxLength: 100,
		},
		slug: {
			type: String,
			required: true,
			trim: true,
			lowercase: true,
		},
		// course educator
		educator: {
			type: Schema.Types.ObjectId,
			required: true,
			trim: true,
			maxLength: 25,
		},
		educatorName: {
			type: String,
			required: true,
			trim: true,
			maxLength: 30,
		},

		// course time duration in hours
		duration: {
			type: String,
		},
		// course type
		// could not be "type" as it will mismatch with schema option "type"
		// it will be only Practial or Knowledge
		courseType: {
			type: String,
			enum: ["Practical", "Knowledge"],
			required: true,
		},
		// course category
		category: {
			type: String,
			maxLength: 20,
			trim: true,
			lowercase: true,
		},
		// price
		price: {
			type: Number,
			default: 0,
		},
		rating: {
			type: Number,
			default: 0,
		},
		totalRating: {
			type: Number,
			default: 0,
		},
		thumbnail: {
			type: String,
			default: "",
		},
		sDesc: {
			type: String,
		},
		lDesc: {
			type: String,
		},
		Modules: {
			type: Array,
		},
		view: {
			type: Number,
			default: 0,
		},
		language: {
			type: String,
		},
		certificate: {
			type: String,
			enum: ["YES", "NO"],
		},
		whatYouWillLearn: {
			type: Array,
		},
	},
	{ timestamps: true },
);

const Course = model("Course", courseSchema);
export default Course;
