import express from "express";
import connection from "./config/db.js"
import dotenv from "dotenv";

import usuarioRoutes from "./routes/usuarioRoutes.js";
import rolesRoutes from "./routes/rolesRoutes.js";
import protectedRoutes from './routes/protectedRoutes.js';
import caracteristicaRoutes from './routes/caracteristicaRoutes.js';


dotenv.config({ path: ".env" });
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para manejar JSON
app.use(express.json());

// Routing

// Rutas para usuarios
app.use("/auth", usuarioRoutes);
// Rutas para roles
app.use('/api/roles', rolesRoutes);
// Rutas para caracteristicas
app.use('/api/caracteristicas', caracteristicaRoutes);

app.use('/api', protectedRoutes);


// Inicia el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
