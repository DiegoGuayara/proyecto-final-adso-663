import {
  crearUsuario,
  obtenerUsuarioId,
  obtenerUsuarios,
} from "../controllers/userRegister.controller";
import { Router } from "express";

const router = Router();

router.post("/crearUsuario", crearUsuario);
router.get("/obtenerUsuarios", obtenerUsuarios);
router.get("/obtenerUsuariosId/:id_us", obtenerUsuarioId);

export default router;
