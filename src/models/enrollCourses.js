import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const enrollCoursesSchema = Schema({
  courseId : {type : Schema.Types.ObjectId , required: true},
  userId : {type : Schema.Types.ObjectId , required: true},
  CourseProgress : {type : Number , default : 0.0}
});

const enrollCourses = model('enrollCourses', enrollCoursesSchema);

export default enrollCourses;