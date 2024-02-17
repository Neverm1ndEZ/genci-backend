import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const techNewsSchema = Schema({
  title: {  type: String, required: true },
  slug: { type: String, required: true ,unique : true },
  date: { type: Date, },
  category: { type: String , require :true},
  source : { type: String , require : true},
  imageUrl : { type: String },
},
  {
    timestamps: true
  });

const techNews = model('techNews', techNewsSchema);

export default techNews;