import express from "express";
import dotenv from "dotenv";

import usuarioRoutes from "./routes/usuarioRoutes.js";
import rolesRoutes from "./routes/rolesRoutes.js";
import protectedRoutes from './routes/protectedRoutes.js';
import caracteristicaRoutes from './routes/caracteristicaRoutes.js';
import proveedorRoutes from './routes/proveedoresRoutes.js'
import sucursalRoutes from "./routes/sucursalRoutes.js";
import productoRoutes from "./routes/productoRoutes.js";

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
//Rutas para Proveedores
app.use("/api/proveedores", proveedorRoutes);
//Rutas para Sucursales
app.use("/api/sucursales", sucursalRoutes);
//Rutas para Productos
app.use("/api/productos", productoRoutes);

app.use('/api', protectedRoutes);


// Inicia el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
