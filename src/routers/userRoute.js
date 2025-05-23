import express from "express";
import { loginController, logoutController, signupController } from "../controllers/userController.js";
import { auth } from "../middlewares/auth.js";

const router = express.Router();

router.route("/new").post(signupController);
router.route("/login").post(loginController);
router.route("/logout").get(logoutController)

export default router;
