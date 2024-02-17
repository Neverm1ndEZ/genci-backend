import { Router } from "express";
import { addPassingCriteriaUsingCourseId, getPassingCriteriaUsingCourseId } from "../controllers/passingCriteria/index.js";

const router = Router();

router.post("/",  addPassingCriteriaUsingCourseId);
// router.get("/",  );
router.get('/:id',  getPassingCriteriaUsingCourseId);
// router.delete("/",  );


export default router;
