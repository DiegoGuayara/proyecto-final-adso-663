import mysql from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USERNAME || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_DATABASE || "tienda_de_tecnologia",
  connectionLimit: 10,
  queueLimit: 0,
  port: 3306,
});

const verificarConexion = async () => {
  try {
    const connection = await pool.getConnection();
    console.log("Conectado a la base de datos");
    connection.release();
  } catch (error: any) {
    console.error("Error en la conexion con la base de datos:", error.message);
  }
};

verificarConexion();

export default pool;
