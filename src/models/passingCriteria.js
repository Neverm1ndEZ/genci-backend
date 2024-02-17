import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const passingCriteriaSchema = Schema({
  courseId : {type : Schema.Types.ObjectId , required: true},
  title: {  type: String, required: true },
  details : [
    {
      type: String,
      required: true
    }
  ]
});

const passingCriteria = model('passingCriteria', passingCriteriaSchema);

export default passingCriteria;