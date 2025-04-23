import { Router } from "express";
import { PersonasController } from "../controllers/personas.controller";
import { verifyToken } from "../middleware/VerifyToken";

const personasController = new PersonasController();
const router = Router();

router.post("/register", PersonasController.register.bind(personasController));
router.post("/login", PersonasController.login.bind(personasController));
router.get("/obtUsers", PersonasController.obtUsers.bind(personasController));
router.get(
  "/obtUsers/:id",
  PersonasController.obtUserId.bind(personasController)
);
router.get(
  "/verifyUser",
  verifyToken,
  PersonasController.verifyUser.bind(personasController)
);
router.put(
  "/actUser/:id",
  PersonasController.updateUser.bind(personasController)
);
router.delete(
  "/delUser/:id",
  PersonasController.delUser.bind(personasController)
);

export default router;
