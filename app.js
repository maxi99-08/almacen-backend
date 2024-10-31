import express from "express";
import connection from "./config/db.js"
import dotenv from "dotenv";

import usuarioRoutes from "./routes/usuarioRoutes.js";
import protectedRoutes from './routes/protectedRoutes.js';

dotenv.config({ path: ".env" });
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para manejar JSON
app.use(express.json());

// Routing
app.use("/auth", usuarioRoutes);
app.use('/api', protectedRoutes);

// Inicia el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
