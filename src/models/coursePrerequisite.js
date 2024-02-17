import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const coursePrerequisiteSchema = Schema({
  course_slug : {type : String , required : true},
  prerequisite_course_name: {type: String, required: true },
  prerequisite_course_slug : { type: String}
});
const coursePrerequisite = model('coursePrerequisite', coursePrerequisiteSchema);
export default coursePrerequisite;