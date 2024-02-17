import { Router } from "express";
import { AddAssignment, getAssignmentWithCourseId,  } from "../controllers/assignment/index.js";

const router = Router();

router.post("/",  AddAssignment);
// router.get("/",  );
router.get('/:id',  getAssignmentWithCourseId);
// router.delete("/",  );


export default router;
