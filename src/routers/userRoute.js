import express from "express";
import { loginController, newUserController } from "../controllers/userController.js";

const router = express.Router();

router.route("/new").post(newUserController);
router.route("/login").get(loginController);

export default router;
