import { Request, Response } from "express";
import { AuthDto } from "../Dto/AuthDto";
import { UserService } from "../services/UserServices";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export class AuthController {
  static async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const authDto = new AuthDto(email, password);
      const login = await UserService.login(authDto);

      if (login.logged) {
        const token = jwt.sign(
          { id: login.id },
          process.env.JWT_SECRET || "your-secret-key",
          { expiresIn: "1h" }
        );

        return res.status(200).json({
          status: login.status,
          token: token,
        });
      }

      return res.status(401).json({
        status: login.status,
      });
    } catch (error) {
      console.error("Error en el login:", error);
      return res.status(500).json({
        status: "Error interno del servidor",
      });
    }
  }

  static async register(req: Request, res: Response) {
    try {
      const persona = req.body;
      const result = await UserService.register(persona);
      return res.status(201).json({
        status: "Usuario registrado exitosamente",
        data: result,
      });
    } catch (error) {
      console.error("Error en el registro:", error);
      return res.status(500).json({
        status: "Error interno del servidor",
      });
    }
  }
}
