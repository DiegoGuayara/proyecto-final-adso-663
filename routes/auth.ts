import express from "express";
import { AuthController } from "../controllers/authController";

const router = express.Router();
const authController = new AuthController();

router.post("/login", authController.login.bind(authController));
router.post("/register", authController.register.bind(authController));

export default router;
