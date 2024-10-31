import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import connection from "../config/db.js";

const loginUsuario = async (req, res) => {
  const { email, password } = req.body;

  try {
    const query = "SELECT * FROM usuarios WHERE email = ?";
    connection.query(query, [email], async (error, results) => {
      if (error || results.length === 0) {
        return res
          .status(401)
          .json({ message: "Credenciales inválidas", error: 1 });
      }

      const user = results[0];
      const isPasswordCorrect = await bcrypt.compare(password, user.password);

      if (!isPasswordCorrect) {
        return res
          .status(401)
          .json({ message: "Credenciales inválidas", error: 1 });
      }

      const token = jwt.sign(
        { id: user.id, rol: user.rol_id },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      res.json({ message: "Inicio de sesión exitoso", token, error: 0 });
    });
  } catch (error) {
    res.status(500).json({ message: "Error al iniciar sesión", error: 1 });
  }
};

const registrarUsuario = async (req, res) => {
  const { nombre, email, password, rol_id } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const query =
      "INSERT INTO usuarios (nombre, email, password, rol_id) VALUES (?, ?, ?, ?)";
    connection.query(
      query,
      [nombre, email, hashedPassword, rol_id],
      (error) => {
        if (error) {
          return res
            .status(500)
            .json({ message: "Error al registrar usuario", error: 1 });
        }
        res
          .status(201)
          .json({ message: "Usuario registrado exitosamente", error: 0 });
      }
    );
  } catch (error) {
    res.status(500).json({ message: "Error al registrar usuario", error: 1 });
  }
};

const updateUsuario = async (req, res) => {
  const { id } = req.params;
  const { nombre, password, rol_id, activo } = req.body;

  try {
    let fields = [];
    let values = [];

    if (nombre) {
      fields.push("nombre = ?");
      values.push(nombre);
    }
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      fields.push("password = ?");
      values.push(hashedPassword);
    }
    if (rol_id) {
      fields.push("rol_id = ?");
      values.push(rol_id);
    }
    if (typeof activo !== "undefined") {
      fields.push("activo = ?");
      values.push(activo ? 1 : 0);
    }

    if (fields.length === 0) {
      return res
        .status(400)
        .json({ message: "No hay campos para actualizar", error: 1 });
    }

    const query = `UPDATE usuarios SET ${fields.join(", ")} WHERE id = ?`;
    values.push(id);

    connection.query(query, values, (error, results) => {
      if (error)
        return res
          .status(500)
          .json({ message: "Error al actualizar usuario", error: 1 });

      res.json({ message: "Usuario actualizado correctamente", error: 0 });
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al procesar la solicitud", error: 1 });
  }
};

const listarUsuarios = async (req, res) => {
  try {
    const query = "SELECT * FROM usuarios";
    connection.query(query, (error, results) => {
      if (error)
        return res
          .status(500)
          .json({ message: "Error en la consulta", error: 1 });

      if (results.length === 0) {
        // Manejo cuando no hay usuarios
        return res
          .status(404)
          .json({ message: "No hay usuarios registrados", error: 1 });
      }

      res.json({ error: 0, data: results });
    });
  } catch (error) {
    res.status(500).json({ message: "Error al obtener usuarios", error: 1 });
  }
};

const listarUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const query = "SELECT * FROM usuarios WHERE id = ?";
    connection.query(query, [id], (error, results) => {
      if (error)
        return res
          .status(500)
          .json({ message: "Error en la consulta", error: 1 });

      if (results.length === 0) {
        // Manejo cuando no hay usuarios
        return res
          .status(404)
          .json({ message: "No hay usuarios con este id", error: 1 });
      }

      res.json({ data: results, error: 0 });
    });
  } catch (error) {
    res.status(500).json({ message: "Error al obtener usuarios", error: 1 });
  }
};

const eliminarUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const query = "UPDATE usuarios SET activo = 0 WHERE id = ?";

    connection.query(query, [id], (error, results) => {
      if (error)
        return res
          .status(500)
          .json({ message: "Error al eliminar usuario", error: 1 });

      res.json({ message: "Usuario eliminado correctamente", error: 0 });
    });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar usuario", error: 1 });
  }
};

export {
  loginUsuario,
  registrarUsuario,
  updateUsuario,
  listarUsuarios,
  listarUsuario,
  eliminarUsuario,
};
