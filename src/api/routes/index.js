import { Router } from "express";
import swaggerJsdoc from "swagger-jsdoc";
import { serve, setup } from "swagger-ui-express";
import { specs, swaggerConfig } from "../../config/index.js";
import user from "./user.js";
import search from "./search.js";
import techNews from "./techNews.js";
import course from "./course.js";
import update from "./updates.js";
import todos from "./todos.js";
import module from "./module.js";
import aboutEducator from "./aboutEducator.js";
import assignment from "./assignment.js";
import courseTestimonial from "./courseTestimonial.js";
import passingCriteria from "./passingCriteria.js";
import notification from "./notification.js";
import badges from "./badges.js";

const router = Router();

const specDoc = swaggerJsdoc(swaggerConfig);

router.use(specs, serve);
router.get(specs, setup(specDoc, { explorer: true }));

router.use("/user", user);
router.use("/search", search);
router.use("/technews", techNews);
router.use("/courses", course);
router.use("/updates", update);
router.use("/todos", todos);
router.use("/module", module);
router.use("/educator", aboutEducator);
router.use("/assignment", assignment);
router.use("/testimonial", courseTestimonial);
router.use("/passing-criteria", passingCriteria);
router.use("/notification", notification);
router.use("/badge", badges);

export default router;
