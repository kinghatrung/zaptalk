import { Router } from "express";
import userController from "../controller/userController.js";

const router = Router();

router.get("/me", userController.authMe);

export default router;
