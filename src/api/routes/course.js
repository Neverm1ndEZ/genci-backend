import { Router } from "express";
import { auth } from "../middlewares/index.js";

import {
  PopularCourses,
  addCourses,
  addCoursesRating,
  courseDirectory,
  enrollCourse,
  getAllCourses,
  getCategoryCourses,
  getRecentCourses,
  getSelectedCourseDetails,
} from "../controllers/course/index.js";

import prerequisite from "./prerequisite.js";
const router = Router();
// COURSE
router.get("/", getAllCourses);
router.post("/category", getCategoryCourses);
router.get("/getrecentcourses", auth, getRecentCourses);
router.post("/addcourses", auth, addCourses);
router.post("/enrollcourse", auth, enrollCourse);
router.use("/prerequisite", prerequisite);
router.get("/popular-courses", PopularCourses);
router.post("/rating", auth, addCoursesRating);
router.get("/rating", );
router.post("/:selectedCourse", getSelectedCourseDetails);
router.get("/directory/:slug", courseDirectory);

export default router;
