import express from 'express';
import authMiddleware from '../middlewares/authMiddleware.js'; // Asegúrate de que la ruta sea correcta

const router = express.Router();

router.get('/protected', authMiddleware, (req, res) => {
  // Aquí tienes acceso a req.user, que contiene la información del usuario decodificada
  res.json({ message: "Acceso permitido", user: req.user });
});

export default router;