import { Router } from "express";
import{ body, header, check } from "express-validator";
import { getActivities, createActivity, updateActivity } from "../../controllers/activities/activities.controller.js";
import {verifyJWT, verifyTokenAdmin} from "../../middlewares/JWT/verify.JWT.js";
import { checkUserProjectMongoID } from "../../middlewares/validators/checkMongoId.js";
import  validateDocuments  from "../../middlewares/validate.documents.js";

const router = Router();

router.get("/activities", [
    header("jwt").isJWT().withMessage("La sesion se cerro. Porfavor vuelve a iniciar sesion.").bail(),
    validateDocuments,
    verifyJWT
], getActivities);

router.post("/activities", [
    header("jwt").isJWT().withMessage("La sesion se cerro. Porfavor vuelve a iniciar sesion.").bail(),
    check("name").notEmpty().withMessage("El nombre es requerido").bail().isString().withMessage("El nombre debe ser texto."),
    check("description").if(body("description").exists().notEmpty()).isString().withMessage("La descripcion debe ser texto.").bail(),
    check("project").notEmpty().withMessage("El projecto al que pertenece la actividad no existe.").bail()
        .isMongoId().withMessage("Hubo un problema con la asignacion de proyecto. Refresque su pagina.").bail(),
    check("users").notEmpty().withMessage("Falta al usuario al que se le asigna la tarea.").bail()
        .isMongoId().withMessage("Hubo un problema en asignar el usuario a la actividad, Refresca la pagina."),
    check("timeSpent").if(body("timeSpent").exists().notEmpty()).isNumeric().withMessage("El tiempo utilzado debe ser numerico.").bail(),
    check("startedAt").if(body("startedAt").exists().notEmpty()).isDate().withMessage("Hubo un problema al cargar la fecha de inicio, Intentelo nuevamente.").bail(),
    check("finishedAt").if(body("finishedAt").exists().notEmpty()).isDate().withMessage("Hubo un problema al cargar la fecha de finalizacion, Intentelo nuevamente.").bail(),
    check('finished').if(body("finished").exists().notEmpty()).isBoolean().withMessage("Hubo un problema. Refresca la pagina."),

    validateDocuments,
    checkUserProjectMongoID,
    verifyTokenAdmin
], createActivity);

router.put("/activities/:id", [
    header("jwt").isJWT().withMessage("La sesion se cerro. Porfavor vuelve a iniciar sesion.").bail(),
    validateDocuments,
    verifyJWT
], updateActivity);

export default router;