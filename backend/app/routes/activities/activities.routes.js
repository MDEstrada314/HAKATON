import { Router } from "express";
import{ body, check } from "express-validator";
import { getActivities, createActivities } from "../../controllers/activities/activities.controller.js";
import  validateDocuments  from "../../middlewares/validate.documents.js";
const router = Router();

router.get("/activities", [
    validateDocuments
],getActivities);

router.post("/activities", [
    validateDocuments
], createActivities);

export default router;