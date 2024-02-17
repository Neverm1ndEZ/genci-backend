import mongoose from "mongoose";
const { Schema, model } = mongoose;

const moduleSchema = new Schema(
	{
		courseId: {
			type: Schema.Types.ObjectId,
			ref: "Course",
			require: true,
		},
		module_name: {
			type: String,
			required: true,
			trim: true,
		},
		topic_name: {
			type: String,
			required: true,
			trim: true,
		},
		duration: {
			type: String,
		},
		topic_no: {
			type: Number,
			required: true,
		},
		topic_url: {
			type: String,
		},
		module_type: {
			type: String,
			enum: ["doc", "video"],
			require: true,
		},
	},
	{ timestamps: true },
);

const module = model("module", moduleSchema);
export default module;
