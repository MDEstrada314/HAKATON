import { Router } from "express";
import{ body, check } from "express-validator";
import { getProjects, createProject } from "../../controllers/projects/project.controller.js";
import  validateDocuments  from "../../middlewares/validate.documents.js";
const router = Router();

router.get("/project", getProjects);

router.post("/project", [
    check("name_project").notEmpty(),
    validateDocuments
], createProject);

export default router;