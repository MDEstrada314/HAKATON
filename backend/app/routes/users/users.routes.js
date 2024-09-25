import { Router } from "express";
import{ body, check } from "express-validator";
import { checkEmail } from "../../middlewares/validators/checkEmail.js";
import { createUser } from "../../controllers/users/users.controllers.js";
import  validateDocuments  from "../../middlewares/validate.documents.js";
const router = Router();

router.post("/users", [

    check("firstName").notEmpty().withMessage("El primer nombre es requerido").bail().isString().withMessage("El primer nombre no debe contener numeros").bail(),

    check("middleName").if(body("middleName").exists().notEmpty()).isString().withMessage("El segundo nombre no debe contener numeros").bail(),

    check("lastName").notEmpty().withMessage("El primer apellido es requerido").bail().isString().withMessage("El primer apellido no debe contener numeros").bail(),

    check("secondLastName").if(body("secondLastName").exists().notEmpty()).isString().withMessage("El segundo apellido no debe contener numeros").bail(),

    check("rol").isIn(["ADMIN", "USER"]).withMessage("Hubo un error en asignar el rol, intentalo de nuevo").bail(),

    check("sex").isIn(["M", "F"]).withMessage("Hubo un problema en asignar el sexo, intentalo de nuevo"),
    
    check('email').isEmail().withMessage('Formato de correo inválido. Inténtalo de nuevo.').bail()
    .custom(checkEmail).withMessage("Ya existe un usuario con esa direccion de correo").bail(),

    check('password').notEmpty().withMessage('La contraseña es requerida').bail(),
    validateDocuments

], createUser);

export default router;