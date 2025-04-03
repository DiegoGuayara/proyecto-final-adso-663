import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "final_project",
  port: 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

const verificarConexion = async () => {
  try {
    const connection = await pool.getConnection();
    console.log("Se ha conectado a la base de datos exitosamente");
    connection.release();
  } catch (error) {
    console.error("Error en la conexion");
  }
};

verificarConexion();

export default pool;
