import mongoose from "mongoose";
const { Schema, model } = mongoose;

const badgeSchema = Schema({
	courseId: { type: Schema.Types.ObjectId, required: true },
	badgeName: { type: String, required: true },
	badgeUrl: { type: String, required: true },
	badgeSlug: { type: String, require: true },
	description: { type: String },
});

const badge = model("badge", badgeSchema);

export default badge;
