import { Router } from "express";
import { auth } from "../middlewares/index.js";
import { addCourseTestimonial, getCourseTestimonialByCourseId, getCourseTestimonialByUserId } from "../controllers/courseTestimonials/index.js";
const router = Router();

router.get('/',  auth , getCourseTestimonialByUserId);
router.get('/:courseId' , getCourseTestimonialByCourseId);
router.post("/:courseId",  auth ,addCourseTestimonial);
// router.delete("/",  );


export default router;
