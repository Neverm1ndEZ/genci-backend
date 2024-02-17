import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const courseRatingSchema = Schema({
  courseId : {type : Schema.Types.ObjectId , required: true},
  userId : {type : Schema.Types.ObjectId , required: true},
  review: {  type: String },
  rating: {type : Number , require  :true  ,min: 1 , max:5}
});

const courseRating = model('courseRating', courseRatingSchema);

export default courseRating;