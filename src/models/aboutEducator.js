import mongoose from "mongoose";
const { Schema, model } = mongoose;

const aboutEducatorSchema = new Schema(
  {
    // educator name
    educatorUserId :{
      type: Schema.Types.ObjectId,
      required: true,
      unique: true
    },
    name: {
      type: String,
      trim: true,
    },
    designation : {
      type: String,
      trim: true,
    },
    aboutEducator : {
      type: String,
      required: true,
      trim: true,
    },
    websiteUrl : {
      type: String,
      trim: true,

    },
    facebookId : {
      type: String,
      trim: true,

    },
    instagramId : {
      type: String,
      trim: true,

    },
    twitterId : {
      type: String,
      trim: true,

    },
    linkedinId : {
      type: String,
      trim: true,
    },
    youtubeId : {
      type: String,
      trim: true,
    },    
    imageUrl:{
      type: String,
      trim: true,
    }
  },
  { timestamps: true }
);

const aboutEducator = model("aboutEducator", aboutEducatorSchema);
export default aboutEducator;
