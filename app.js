import express from "express";
import dotenv from "dotenv";

dotenv.config({ path: ".env" });
const app = express();

// Ruta básica
app.get("/", (req, res) => {
  res.send("¡Hola, mundo desde Express!");
});

// Inicia el servidor
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
