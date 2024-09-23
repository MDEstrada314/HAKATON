import { Router } from "express";
import { authUser } from "../../controllers/auth.controllers.js";

const router = Router();

router.post("/users", authUser);

export default router;