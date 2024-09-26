import { Router } from "express";
import{ body, check, header } from "express-validator";
import { getProjects, createProject } from "../../controllers/projects/projects.controller.js";
import { checkUsersMongoID } from "../../middlewares/validators/checkMongoId.js";
import {verifyTokenAdmin, verifyJWT} from "../../middlewares/JWT/verify.JWT.js";
import  validateDocuments  from "../../middlewares/validate.documents.js";
const router = Router();

router.get("/projects", [
    header("jwt").isJWT().withMessage("La sesion se cerro. Porfavor vuelve a iniciar sesion.").bail(),
    validateDocuments,
    verifyJWT
],

    getProjects);

router.post("/projects", [
    check("name").notEmpty().withMessage("El nombre es requerido").bail()
        .isString().withMessage("Nombre Invalido. Inténtalo de nuevo."),
    check("description").if(body("description").exists().notEmpty())
        .isString().withMessage("El segundo nombre no debe contener numeros").bail(),
    check("users").if(body("users").exists().notEmpty())
        .isArray().withMessage("Usuario Invalido. Inténtalo de nuevo.").bail()
        .custom(checkUsersMongoID).withMessage("Usuario Invalido. Inténtalo de nuevo.").bail(),
    validateDocuments,
    verifyTokenAdmin
], createProject);

export default router;