import mongoose from "mongoose";
const { Schema, model } = mongoose;

const notificationSchema = Schema({
  userId: { type: Schema.Types.ObjectId, required: true },
  notificationMessage: { type: String, required: true },
  notificationSlug: { type: String, required: true },
  notificationUrl: { type: String,  },
  isViewed: {
    type: Boolean,
    default : false
  },
});



const notification = model("notification", notificationSchema);

export default notification;
