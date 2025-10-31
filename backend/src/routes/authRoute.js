import { Router } from "express";

import authController from "../controller/authController.js";

const router = Router();

router.post("/signup", authController.signUp);
router.post("/signin", authController.signIn);
router.post("/signout", authController.signOut);
router.post("/refresh", authController.refreshToken);

export default router;
