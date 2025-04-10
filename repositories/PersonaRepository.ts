import pool from "../config/config-db";
import { PersonaDto } from "../Dto/PersonaDto";
import bcrypt from "bcryptjs";

export class PersonaRepository {
  async create(persona: PersonaDto): Promise<PersonaDto> {
    const hashedPassword = await bcrypt.hash(persona.password!, 10);
    const [result]: any = await pool.query(
      "INSERT INTO persona (tipo_persona, nombre, tipo_documento, num_documento, direccion, telefono, email, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [
        persona.tipo_persona,
        persona.nombre,
        persona.tipo_documento,
        persona.num_documento,
        persona.direccion,
        persona.telefono,
        persona.email,
        hashedPassword,
      ]
    );
    return { ...persona, id_persona: result.insertId };
  }

  async findByEmail(email: string): Promise<PersonaDto | null> {
    const [rows]: any = await pool.query(
      "SELECT * FROM persona WHERE email = ?",
      [email]
    );
    return rows[0] || null;
  }

  async findById(id: number): Promise<PersonaDto | null> {
    const [rows]: any = await pool.query(
      "SELECT * FROM persona WHERE id_persona = ?",
      [id]
    );
    return rows[0] || null;
  }

  async update(id: number, persona: Partial<PersonaDto>): Promise<boolean> {
    const [result]: any = await pool.query(
      "UPDATE persona SET ? WHERE id_persona = ?",
      [persona, id]
    );
    return result.affectedRows > 0;
  }

  async delete(id: number): Promise<boolean> {
    const [result]: any = await pool.query(
      "DELETE FROM persona WHERE id_persona = ?",
      [id]
    );
    return result.affectedRows > 0;
  }

  async verifyPassword(email: string, password: string): Promise<boolean> {
    const persona = await this.findByEmail(email);
    if (!persona) return false;
    return bcrypt.compare(password, persona.password!);
  }
}
