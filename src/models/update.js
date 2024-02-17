import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const updateSchema = Schema({
  title: {  type: String, required: true },
  slug: { type: String, required: true },
  date: { type: Date, },
  category: { type: String , require :true},
  source: { type: String},
  imageUrl : { type: String },
  description : { type: String },
},
  {
    timestamps: true
  });

const update = model('update', updateSchema);

export default update;