import { Request, Response } from "express";
import pool from "../config/config-db";

//Obtener usuarios
export const obtenerUsuarios = async (req: Request, res: Response) => {
  try {
    const [result] = await pool.query("SELECT*FROM usuario");
    console.log("Usuarios encontrados:", result);

    res.send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send({
      message: "error al obtener los usuarios",
    });
  }
};

//Obtener usuario por ID
export const obtenerUsuarioId = async (req: Request, res: Response) => {
  const { id_us } = req.params;

  try {
    const [result] = await pool.query("SELECT*FROM usuario WHERE id_us = ?", [
      id_us,
    ]);
    console.log("Usuarios encontrados:", result);
    res.send(result);
  } catch (error) {
    res.status(500).send({
      message: "error al obtener los usuarios",
    });
  }
};

//Crear usuario
export const crearUsuario = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { nombre } = req.body;
  try {
    const [result] = await pool.query(
      "INSERT INTO usuario (nombre) VALUES (?);",
      [nombre]
    );
    console.log(result);
    res.send(result);
  } catch (error) {
    res.status(500).send({
      message: "error al crear el usuario",
    });
  }
};
