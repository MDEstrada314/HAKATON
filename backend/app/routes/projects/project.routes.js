import { Router } from "express";
import{ body, check } from "express-validator";
import { getProjects, createProject } from "../../controllers/projects/projects.controller.js";
import  validateDocuments  from "../../middlewares/validate.documents.js";
const router = Router();

router.get("/projects", getProjects);

router.post("/projects", [
    check("name").notEmpty().withMessage("El nombre es requerido").bail()
        .isString().withMessage("Nombre Invalido. Inténtalo de nuevo."),
    check("description").if(body("middleName").exists().notEmpty())
        .isString().withMessage("El segundo nombre no debe contener numeros").bail(),
    check("users").if(body("middleName").exists().notEmpty())
        .isMongoId().withMessage("usuario invalido intente nuevamente"),
    validateDocuments
], createProject);

export default router;