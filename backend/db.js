import mysql from "mysql2/promise";

export const pool = mysql.createPool({
  host: "www.help-now.cl",
  user: "helpnowc_paulina",
  password: "helpnowc_paulina",
  database: "cargaLogosCredenciales",
  waitForConnections: true,
  connectionLimit: 10,
});
