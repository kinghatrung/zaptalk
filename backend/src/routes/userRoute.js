import { Router } from "express";
import userController from "../controller/userController.js";

const router = Router();

router.get("/me", userController.authMe);
router.get("/test", userController.test);

export default router;
