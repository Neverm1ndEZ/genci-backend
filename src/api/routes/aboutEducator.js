import { Router } from "express";
import { auth } from "../middlewares/index.js";
import {addEducatorDetails, addEducatorRating, getEducator, getEducatorRating} from "../controllers/aboutEducator/index.js";

const router = Router();

router.post("/add", auth  , addEducatorDetails);
router.get("/:id", getEducator );
router.post("/rating/:id",auth , addEducatorRating );
router.get("/rating/:id", getEducatorRating);


export default router;
