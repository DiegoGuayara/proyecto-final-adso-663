import { Request, Response } from "express";
import { UserRepository } from "../repositories/UserRepository";
import { PersonasDto } from "../Dto/personasDto";
import { AuthDto } from "../Dto/AuthDto";
import generateToken from "../Helpers/generateToken";

export class PersonasController {
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

      const existingUser = await UserRepository.findByEmail(email);

      if (existingUser) {
        return res.status(400).json({
          message: "Este Email ya existe",
        });
      }

      const newUser = new PersonasDto(
        tipo_persona,
        nombre,
        tipo_documento,
        num_documento,
        direccion,
        telefono,
        email,
        password
      );

      const resultDb = await UserRepository.addUser(newUser);

      console.log(resultDb);

      res.status(201).json({
        status: "Registro exitoso",
        data: resultDb,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "Hubo un fallo",
      });
    }
  }

  static async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const authDto = new AuthDto(email, password);
      const user = UserRepository.findByEmail(authDto.email);

      if (!user) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }

      const validPassword = await UserRepository.verifyPassword(
        authDto.email,
        authDto.password
      );

      if (!validPassword) {
        return res.status(404).json({ message: "Contraseña incorrecta" });
      }

      const payload = {
        email: authDto.email,
      };

      const secret_key = "your-secret-key";
      const token = generateToken(payload, secret_key, 120);

      console.log({
        message: "Inicio de sesión exitoso",
        user: payload,
        token: token,
      });

      return res.status(200).json({
        message: "Inicio de sesión exitoso",
        user: payload,
        token: token,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Error en el login" });
    }
  }

  static async obtUsers(req: Request, res: Response) {
    try {
      const resultDb = await UserRepository.users();

      console.log(resultDb);

      res.send(resultDb);
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "Hubo error en obtener los usuarios",
      });
    }
  }

  static async obtUserId(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const resultDb = await UserRepository.usersId(Number(id));

      console.log(resultDb);
      return res.send(resultDb);
    } catch (error) {
      console.error(error);

      res.status(500).json({
        message: "Error en obtener el usuario",
      });
    }
  }

  static async updateUser(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const camposAct = req.body;

      const columns = [];
      const values = [];

      for (let [key, value] of Object.entries(camposAct)) {
        if (value !== undefined && value !== null && value !== "") {
          columns.push(`${key} = ?`);
          values.push(value);
        }
      }

      if (columns.length === 0) {
        return res.status(400).json({
          message: "No hay datos para actualizar",
        });
      }

      const sql = `UPDATE persona SET ${columns.join(
        ", "
      )} WHERE id_persona = ?`;

      values.push(id);

      const resultDb = await UserRepository.update(sql, values);

      return res
        .status(200)
        .json({ message: "Datos actualizados correctamente", resultDb });
    } catch (error) {
      console.error("Error al actualizar el usuario:", error);
      return res
        .status(500)
        .json({ message: "Hubo un error al actualizar el usuario" });
    }
  }

  static async delUser(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const resultDb = await UserRepository.delete(Number(id));

      if (resultDb.affectedRows === 0) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }

      return res.status(200).json({
        message: "Usuario eliminado correctamente",
        resultDb,
      });
    } catch (error) {
      console.error(error);

      return res.status(500).json({ message: "Error al eliminar el usuario" });
    }
  }

  static async verifyUser(req: Request, res: Response) {
    try {
      const { id } = req.body;

      return res
        .status(200)
        .json({ status: "Se pudo obtener el usuario", id: id });
    } catch (error) {
      console.log(error);

      return res
        .status(500)
        .json({ errorInfo: "An unknown error has occurred" });
    }
  }
}
