import express from "express";
import cors from "cors";
import { pool } from "./db.js";
import bcrypt from "bcrypt";

const app = express();

app.use(cors());
app.use(express.json());

app.post("/login", async (req, res) => {
  try {
    const { correo, clave } = req.body;

    if (!correo || !clave) {
      return res.status(400).json({ error: "Faltan datos" });
    }

    // 🔍 Buscar usuario
    const [rows] = await pool.query(
      "SELECT * FROM cargaLogosCredenciales WHERE correo = ?",
      [correo]
    );

    if (rows.length === 0) {
      return res.status(401).json({ error: "Usuario no encontrado" });
    }

    const usuario = rows[0];

    // 🔐 Comparar bcrypt
    const match = await bcrypt.compare(clave, usuario.clave);

    if (!match) {
      return res.status(401).json({ error: "Clave incorrecta" });
    }

    return res.json({
      success: true
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error servidor" });
  }
});

app.listen(3000, () => {
  console.log("Servidor corriendo");
});
