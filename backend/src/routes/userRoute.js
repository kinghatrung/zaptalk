import { Router } from "express";
import authMiddleware from "../middlewares/authMiddleware.js";

import userController from "../controller/userController.js";

const router = Router();

router.get("/me", authMiddleware.isAuthorized, userController.authMe);

export default router;
