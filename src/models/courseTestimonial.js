import mongoose from "mongoose";
const { Schema, model } = mongoose;

const courseTestimonialSchema = Schema({
  courseId: { type: Schema.Types.ObjectId, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  userId: { type: Schema.Types.ObjectId, required: true },
});

const courseTestimonial = model("courseTestimonial", courseTestimonialSchema);

export default courseTestimonial;
