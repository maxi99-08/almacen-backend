import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import {
  crearSucursal,
  obtenerSucursales,
  obtenerSucursalPorId,
  updateSucursal,
  desactivarSucursal,
  activarSucursal,
} from "../controllers/sucursalController.js";

const router = express.Router();
// Crear Sucursal
router.post("/", authMiddleware, crearSucursal);

// Obtener Sucursales
router.get("/", authMiddleware, obtenerSucursales);

// Obtener Sucursales por ID
router.get("/:id", authMiddleware, obtenerSucursalPorId);

// Actualizar Sucursal
router.put("/:id", authMiddleware, updateSucursal);

// Desactivar Sucursal
router.put("/desactivar/:id", authMiddleware, desactivarSucursal);

// Activar Sucursal
router.put("/activar/:id", authMiddleware, activarSucursal);

export default router;
