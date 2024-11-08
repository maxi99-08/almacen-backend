import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import {
  crearRol,
  obtenerRoles,
  obtenerRolPorId,
  updateRol,
  eliminarRol,
} from "../controllers/rolesController.js";
const router = express.Router();

// Crear rol
router.post("/", authMiddleware, crearRol);

// Obtener todos los roles
router.get("/", authMiddleware, obtenerRoles);

// Obtener un rol por ID
router.get("/:id", authMiddleware, obtenerRolPorId);

// Actualizar rol
router.put("/:id", authMiddleware, updateRol);

// Eliminar rol
router.delete("/:id", authMiddleware, eliminarRol);

export default router;
