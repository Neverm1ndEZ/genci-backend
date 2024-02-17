import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const todoSchema = Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  text : { type: String, required: true },
  date : { type : Date , default: Date.now } ,
  isCompleted : { type : Boolean , default : false},
  description : { type: String},
},
  {
    timestamps: true
  });

const Todo = model('Todo', todoSchema);

export default Todo;