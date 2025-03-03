import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import {
  obtenerProveedores,
  obtenerProveedorPorId,
  crearProveedor,
  actualizarProveedor,
  eliminarProveedor,
  activarProveedor,
} from "../controllers/proveedorController.js";
const router = express.Router();

// Crear Proveedor
router.get("/", authMiddleware, obtenerProveedores);

// Obtener todos los Proveedor
router.post("/", authMiddleware, crearProveedor);

// Obtener un Proveedor por ID
router.get("/:id", authMiddleware, obtenerProveedorPorId);

// Actualizar Proveedor
router.put("/:id", authMiddleware, actualizarProveedor);

// Eliminar Proveedor
router.delete("/:id", authMiddleware, eliminarProveedor);

// Ruta para activar proveedor
router.put("/activar/:id", authMiddleware, activarProveedor);

export default router;
