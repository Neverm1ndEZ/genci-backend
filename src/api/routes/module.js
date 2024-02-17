import { Router } from "express";
import { auth } from "../middlewares/index.js";
import { addModule, getModule } from "../controllers/modules/index.js";

const router = Router();

router.post("/", auth, addModule);
router.get("/:courseId", getModule);

export default router;
