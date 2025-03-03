import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import {
  insertarMovimiento,
  actualizarTipoMovimiento,
  eliminarProductoDeMovimiento,
  agregarProductoAMovimiento
} from "../controllers/movimientoController.js";

const router = express.Router();

// Insertar Movimiento y Detalle Movimiento
router.post("/", authMiddleware, insertarMovimiento);

// Actualizar Tipo de Movimiento
router.put("/actualizar-tipo/:id", authMiddleware, actualizarTipoMovimiento);

// Eliminar Un Detalle Movimiento
router.delete("/eliminar-producto", authMiddleware, eliminarProductoDeMovimiento);

// Agregar un detalle movimiento
router.post("/agregar-producto", authMiddleware, agregarProductoAMovimiento);

export default router;
