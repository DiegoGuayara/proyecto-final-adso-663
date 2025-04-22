import pool from "../config/config-db";
import { ArticuloDto } from "../Dto/ArticuloDto";

import bcrypt from "bcryptjs";

export class ArticuloRepository {
  static async addArticle(user: ArticuloDto) {
    const hashedCode = await bcrypt.hash(user.codigo!, 10);
    const sql =
      "INSERT INTO articulo (codigo, nombre, precio_venta, stock, descripcion, estado) VALUES (?, ?, ?, ?, ?, ?)";

    if (user.stock > 0) {
      user.estado = true;
    }

    const values = [
      hashedCode,
      user.nombre,
      user.precio_venta,
      user.stock,
      user.descripcion,
      user.estado,
    ];

    const [resultDb]: any = await pool.query(sql, values);

    return {
      ...user,
      id_articulo: resultDb.insertId,
    };
  }

  static async articles() {
    const [rows]: any = await pool.query("SELECT * FROM articulo");
    console.log(rows);

    return rows || null;
  }

  static async articlesId(id: number) {
    const [rows]: any = await pool.query(
      "SELECT * FROM articulo WHERE id_articulo = ?",
      [id]
    );

    if (rows.length === 0) {
      return { message: "Articulo no encontrado" };
    }

    return rows[0] || null;
  }

  static async update(sql: string, values: any[]) {
    const [resultDb]: any = await pool.query(sql, values);

    return resultDb;
  }

  static async delete(id: number) {
    const [rows]: any = await pool.query(
      "DELETE FROM articulo WHERE id_articulo = ?",
      [id]
    );

    return rows;
  }

  static async findByName(nombre: string): Promise<ArticuloDto | null> {
    const [rows]: any = await pool.query(
      "SELECT id_articulo, nombre, precio_venta FROM articulo WHERE nombre = ?",
      [nombre]
    );
    return rows[0];
  }
}
