import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import {
  crearCaracteristica,
  obtenerCaracteristicas,
  obtenerCaracteristicaPorId,
  updateCaracteristica,
  eliminarCaracteristica,
} from "../controllers/caracteristicaController.js";

const router = express.Router();
// Crear Caracteristica
router.post("/", authMiddleware, crearCaracteristica);

// Obtener Caracteristicas
router.get("/", authMiddleware, obtenerCaracteristicas);

// Obtener una Caracteristica por ID
router.get('/:id', authMiddleware, obtenerCaracteristicaPorId);

// Actualizar Caracteristica
router.put("/:id", authMiddleware, updateCaracteristica);

// Eliminar Caracteristica
router.delete("/:id", authMiddleware, eliminarCaracteristica);

export default router;
