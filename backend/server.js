import express from "express";
import cors from "cors";
import { pool } from "./db.js";

const app = express();

app.use(cors());
app.use(express.json());

// 🔑 LOGIN
app.post("/login", async (req, res) => {
  try {
    const { correo, clave } = req.body;

    if (!correo || !clave) {
      return res.status(400).json({ error: "Faltan datos" });
    }

    const [rows] = await pool.query(
      "SELECT * FROM cargaLogosCredenciales WHERE correo = ? AND clave = ?",
      [correo, clave]
    );

    if (rows.length === 0) {
      return res.status(401).json({ error: "Credenciales incorrectas" });
    }

    return res.json({
      success: true,
      mensaje: "Login correcto",
      usuario: rows[0],
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error servidor" });
  }
});

// 🚀 SERVER
app.listen(3000, () => {
  console.log("Servidor corriendo en http://localhost:3000");
});
