import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import {
  obtenerProductos,
  obtenerProductoPorId,
  obtenerProductosActivos,
  obtenerProductosActivosPorSucursal,
  crearProducto,
  updateProducto,
  desactivarProducto,
  activarProducto,
} from "../controllers/productoController.js";

const router = express.Router();

// Rutas para productos
router.get("/", authMiddleware, obtenerProductos);
router.get("/activos", authMiddleware, obtenerProductosActivos);
router.get("/:id", authMiddleware, obtenerProductoPorId);
router.get("/activosSucursal/:sucursalId", obtenerProductosActivosPorSucursal);
router.post("/", authMiddleware, crearProducto);
router.put("/:id", authMiddleware, updateProducto);
router.put("/desactivar/:id", authMiddleware, desactivarProducto);
router.put("/activar/:id", authMiddleware, activarProducto);

export default router;
