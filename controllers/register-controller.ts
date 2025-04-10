import { Request, Response } from "express";
import { PersonaDto } from "../Dto/PersonaDto";
import { UserService } from "../services/UserServices";

export class RegisterController {
  static async register(req: Request, res: Response) {
    try {
      const {
        tipo_persona,
        nombre,
        tipo_documento,
        num_documento,
        direccion,
        telefono,
        email,
        password,
      } = req.body;

      const persona = new PersonaDto(
        tipo_persona,
        nombre,
        tipo_documento,
        num_documento,
        direccion,
        telefono,
        email,
        password
      );

      const result = await UserService.register(persona);

      return res.status(201).json({
        status: "Registro exitoso",
        data: result,
      });
    } catch (error: any) {
      console.error("Error en el registro:", error);

      if (error.code === "ER_DUP_ENTRY") {
        return res.status(400).json({
          status: "Error",
          message: "El email ya está registrado",
        });
      }

      return res.status(500).json({
        status: "Error",
        message: "Error interno del servidor",
      });
    }
  }
}
