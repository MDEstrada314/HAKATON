import { Router } from "express";
import{ body, check } from "express-validator";
import { getActivities, createActivity, updateActivity } from "../../controllers/activities/activities.controller.js";
import  validateDocuments  from "../../middlewares/validate.documents.js";
const router = Router();

router.get("/activities", [
    validateDocuments
], getActivities);

router.post("/activities", [
    validateDocuments
], createActivity);

router.put("/activities/:id", [
    validateDocuments
], updateActivity);

export default router;