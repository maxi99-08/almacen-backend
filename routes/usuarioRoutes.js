import express from "express";
import {
  registrarUsuario,
  loginUsuario,
  updateUsuario,
  listarUsuarios,
  listarUsuario,
  eliminarUsuario,
  prueba,
} from "../controllers/usuarioController.js";
import authMiddleware from "../middlewares/authMiddleware.js"; // Asegúrate de que la ruta sea correcta

const router = express.Router();

// Ruta para registrar un usuario
router.post("/", registrarUsuario);

// Ruta para iniciar sesión
router.post("/login", loginUsuario);

// Ruta para registrar usuario
router.post("/registrarUsuario", authMiddleware, registrarUsuario);

// Ruta para registrar usuario
router.put("/updateUsuario/:id", authMiddleware, updateUsuario);

// Ruta para traer todos los usuarios
router.get("/listarUsuarios", authMiddleware, listarUsuarios);

// Ruta para traer a un usuario
router.get("/listarUsuario/:id", authMiddleware, listarUsuario);

// Ruta para eliminara un usuario
router.delete("/eliminarUsuario/:id", authMiddleware, eliminarUsuario);

export default router;
