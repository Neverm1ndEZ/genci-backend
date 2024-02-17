import { Router } from "express";
import {
	addNotificationForAll,
	getNotificationByUser,
} from "../controllers/notification/index.js";
import { auth } from "../middlewares/index.js";

const router = Router();

// COURSE
router.post("/", addNotificationForAll);
router.get("/", auth, getNotificationByUser);

export default router;
