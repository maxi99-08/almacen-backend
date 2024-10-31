// authMiddleware.js
import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Asumiendo que el token se envía como "Bearer <token>"

  if (!token) {
    return res.status(403).json({ message: "No se proporcionó token", error: 1 });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Token inválido", error: 1 });
    }

    // Guardar información del usuario decodificada en la solicitud para uso posterior
    req.user = decoded;
    next(); // Continuar al siguiente middleware o ruta
  });
};

export default authMiddleware;