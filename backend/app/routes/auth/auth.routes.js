import { Router } from "express";
import{ check } from "express-validator";
import { authUser } from "../../controllers/auth/auth.controllers.js";
import  validateDocuments  from "../../middlewares/validate.documents.js";
const router = Router();

router.post("/users", [

    check('email').isEmail().withMessage('Formato de correo inválido. Inténtalo de nuevo.').bail(),
    check('password').notEmpty().withMessage('La contraseña es requerida').bail(),
    validateDocuments

], authUser);

export default router;