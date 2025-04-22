import pool from "../config/config-db";
import { PersonaDto } from "../Dto/personaDto";
import { AuthDto } from "../Dto/AuthDto";
import bcrypt from "bcryptjs";

export class UserRepository {
  static async add(user: PersonaDto) {
    const hashedPassword = await bcrypt.hash(user.password!, 10);
    const sql =
      "INSERT INTO persona (tipo_persona, nombre, tipo_documento, num_documento, direccion, telefono, email, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    const values = [
      user.tipo_persona,
      user.nombre,
      user.tipo_documento,
      user.num_documento,
      user.direccion,
      user.telefono,
      user.email,
      hashedPassword,
    ];
    const [result]: any = await pool.query(sql, values);
    return { ...user, id_persona: result.insertId };
  }

  static async login(auth: AuthDto) {
    const sql = "SELECT id_persona, password FROM persona WHERE email = ?";
    const values = [auth.email];
    const [rows]: any = await pool.query(sql, values);

    if (rows.length > 0) {
      const isPasswordValid = await bcrypt.compare(
        auth.password,
        rows[0].password
      );
      if (isPasswordValid) {
        return {
          logged: true,
          status: "Successful authentication",
          id: rows[0].id_persona,
        };
      }
      return {
        logged: false,
        status: "Invalid username or password",
      };
    }
    return {
      logged: false,
      status: "Invalid username or password",
    };
  }
}