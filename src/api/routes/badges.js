import { Router } from "express";
import { AddBadges, GetBadgesWithCourseId, } from "../controllers/badges/index.js";

const router = Router();

router.post('/', AddBadges );
router.get('/:courseId', GetBadgesWithCourseId );

export default router;
