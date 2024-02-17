import { Notification, User } from "../models/index.js";

export default async (
  userId,
  notificationMessage,
  notificationSlug,
  notificationUrl
) => {
  const user = await User.exists({ _id: userId });
  if (user) {
    try {
      let notification = new Notification({
        userId: userId,
        notificationMessage: notificationMessage,
        notificationUrl: notificationUrl,
        notificationSlug: notificationSlug,
      });

      await notification.save();
    } catch (err) {
      console.log(err);
    }
  }
};
