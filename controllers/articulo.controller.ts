import { Request, Response } from "express";
import { ArticuloRepository } from "../repositories/articuloRepository";
import { ArticuloDto } from "../Dto/ArticuloDto";

export class ArticuloController {
  static async addArticle(req: Request, res: Response) {
    try {
      const {
        id_articulo,
        codigo,
        nombre,
        precio_venta,
        stock,
        descripcion,
        estado,
      } = req.body;

      const existingArticle = await ArticuloRepository.findByName(nombre);

      if (existingArticle) {
        return res.status(400).json({
          message: "Este articulo ya existe",
        });
      }

      const newArticule = new ArticuloDto(
        codigo,
        nombre,
        precio_venta,
        stock,
        descripcion,
        estado
      );

      const resultDb = await ArticuloRepository.addArticle(newArticule);

      console.log(resultDb);

      res.status(201).json({
        status: "Registro del articulo exitoso",
        data: resultDb,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "Hubo un fallo",
      });
    }
  }

  static async obtArticles(req: Request, res: Response) {
    try {
      const [resultDb] = await ArticuloRepository.articles();

      console.log(resultDb);

      res.send(resultDb);
    } catch (error) {
      res.status(500).json({
        message: "Hubo error en obtener los articulos",
      });
    }
  }

  static async obtArticlesId(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const resultDb = await ArticuloRepository.articlesId(Number(id));

      console.log(resultDb);
      return res.send(resultDb);
    } catch (error) {
      console.error(error);

      res.status(500).json({
        message: "Error en obtener el articulo",
      });
    }
  }

  static async updateArticle(req: Request, res: Response) {
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

      const sql = `UPDATE articulo SET ${columns.join(
        ", "
      )} WHERE id_articulo = ?`;

      values.push(id);

      const resultDb = await ArticuloRepository.update(sql, values);

      return res
        .status(200)
        .json({ message: "Datos actualizados correctamente", resultDb });
    } catch (error) {
      console.error("Error al actualizar el articulo:", error);
      return res
        .status(500)
        .json({ message: "Hubo un error al actualizar el articulo" });
    }
  }

  static async delArticle(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const resultDb = await ArticuloRepository.delete(Number(id));

      if (resultDb.affectedRows === 0) {
        return res.status(404).json({ message: "Articulo no encontrado" });
      }

      return res.status(200).json({
        message: "Articulo eliminado correctamente",
        resultDb,
      });
    } catch (error) {
      console.error(error);

      return res.status(500).json({ message: "Error al eliminar el usuario" });
    }
  }
}
