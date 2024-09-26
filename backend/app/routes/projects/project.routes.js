import { Router } from "express";
import{ body, check } from "express-validator";
import { getProjects, createProject } from "../../controllers/projects/projects.controller.js";
import { checkMongoId } from "../../middlewares/validators/checkMongoId.js";
import  validateDocuments  from "../../middlewares/validate.documents.js";
const router = Router();

router.get("/projects", getProjects);

router.post("/projects", [
    check("name").notEmpty().withMessage("El nombre es requerido").bail()
        .isString().withMessage("Nombre Invalido. Inténtalo de nuevo."),
    check("description").if(body("middleName").exists().notEmpty())
        .isString().withMessage("El segundo nombre no debe contener numeros").bail(),
    check("users").if(body("users").exists().notEmpty())
        .isArray().withMessage("Usuario Invalido. Inténtalo de nuevo.").bail()
        .custom(checkMongoId).withMessage("Usuario Invalido. Inténtalo de nuevo.").bail(),
    validateDocuments
], createProject);

export default router;