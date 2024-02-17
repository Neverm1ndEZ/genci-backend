import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const assignmentSchema = Schema({
  courseId : {type : Schema.Types.ObjectId , required: true},
  title: {  type: String, required: true },
  details : [
    {
      type: String,
      required: true
    }
  ]
});

const assignment = model('assignment', assignmentSchema);

export default assignment;