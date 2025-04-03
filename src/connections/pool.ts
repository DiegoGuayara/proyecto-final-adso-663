import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "final_project",
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
