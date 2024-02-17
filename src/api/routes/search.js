import { Router } from "express";
import { search } from "../controllers/search/index.js";

const router = Router();

router.post("/", search);

export default router;
