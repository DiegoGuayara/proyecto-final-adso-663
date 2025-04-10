import express from "express";
import { RegisterController } from "../controllers/register-controller";
const router = express.Router();

router.post("/", RegisterController.register);

export default router;
