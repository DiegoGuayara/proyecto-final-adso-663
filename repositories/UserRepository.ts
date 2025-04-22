import pool from "../config/config-db";
import { PersonasDto } from "../Dto/personasDto";
import bcrypt from "bcryptjs";

export class UserRepository {
  static async addUser(user: PersonasDto) {
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

    const [resultDb]: any = await pool.query(sql, values);

    return {
      ...user,
      id_persona: resultDb.insertId,
    };
  }

  static async users() {
    const [rows]: any = await pool.query("SELECT * FROM persona");
    console.log(rows);

    return rows || null;
  }

  static async usersId(id: number) {
    const [rows]: any = await pool.query(
      "SELECT * FROM persona WHERE id_persona = ?",
      [id]
    );

    if (rows.length === 0) {
      return { message: "Usuario no encontrado" };
    }

    return rows[0] || null;
  }

  static async findByEmail(email: string): Promise<PersonasDto | null> {
    const [rows]: any = await pool.query(
      "SELECT id_persona, nombre, email, password FROM persona WHERE email = ?",
      [email]
    );
    return rows[0] || null;
  }

  static async update(sql: string, values: any[]) {
    const [resultDb]: any = await pool.query(sql, values);

    return resultDb;
  }

  static async delete(id: number) {
    const [rows]: any = await pool.query(
      "DELETE FROM persona WHERE id_persona = ?",
      [id]
    );

    return rows;
  }

  static async verifyPassword(
    email: string,
    password: string
  ): Promise<boolean> {
    const user = await this.findByEmail(email);
    if (!user) {
      return false;
    }

    return bcrypt.compare(password, user.password!);
  }
}
