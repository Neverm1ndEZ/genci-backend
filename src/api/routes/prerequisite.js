import { Router } from "express";
import {addPrerequisite, getPrerequisite} from "../controllers/prerequisite/index.js";

const router = Router();

// COURSE
router.get("/:slug",getPrerequisite);
router.post("/:slug",addPrerequisite);


export default router;
