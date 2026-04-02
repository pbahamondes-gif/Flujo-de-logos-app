import mysql from "mysql2/promise";

export const pool = mysql.createPool({
  host: "www.help-now.cl",
  user: "helpnowc_paulina",
  password: "Paulina2026$",
  database: "cargaLogosCredenciales",
  port: 3306,
  waitForConnections: true,
  connectionLimit: 10,
});
