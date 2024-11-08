import connection from "../config/db.js";

// Crear rol
const crearRol = (req, res) => {
  const { nombre } = req.body;
  try {
    const query = "INSERT INTO roles (nombre) VALUES (?)";
    connection.query(query, [nombre], (error, result) => {
      if (error)
        return res
          .status(500)
          .json({ message: "Error al crear el rol", error: 1 });
      res.json({ message: "Rol creado exitosamente", error: 0 });
    });
  } catch (error) {
    res.status(500).json({ message: "Error al crear rol", error: 1 });
  }
};

// Obtener todos los roles
const obtenerRoles = (req, res) => {
  try {
    const query = "SELECT * FROM roles";
    connection.query(query, (error, results) => {
      if (error)
        return res
          .status(500)
          .json({ message: "Error al obtener los roles", error: 1 });
      res.json({ data: results, error: 0 });
    });
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los roles", error: 1 });
  }
};

// Obtener rol por ID
const obtenerRolPorId = (req, res) => {
  const { id } = req.params;
  try {
    const query = "SELECT * FROM roles WHERE id = ?";
    connection.query(query, [id], (error, results) => {
      if (error)
        return res
          .status(500)
          .json({ message: "Error al obtener el rol", error: 1 });
      if (results.length === 0)
        return res.status(404).json({ message: "Rol no encontrado", error: 1 });
      res.json({ data: results[0], error: 0 });
    });
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el rol", error: 1 });
  }
};

// Actualizar rol
const updateRol = (req, res) => {
  const { id } = req.params;
  const { nombre } = req.body;
  try {
    const query = "UPDATE roles SET nombre = ? WHERE id = ?";
    connection.query(query, [nombre, id], (error) => {
      if (error)
        return res
          .status(500)
          .json({ message: "Error al actualizar el rol", error: 1 });
      res.json({ message: "Rol actualizado exitosamente", error: 0 });
    });
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar el rol", error: 1 });
  }
};

// Eliminar rol
const eliminarRol = (req, res) => {
  const { id } = req.params;
  try {
    const query = "DELETE FROM roles WHERE id = ?";
    connection.query(query, [id], (error) => {
      if (error)
        return res
          .status(500)
          .json({ message: "Error al eliminar el rol", error: 1 });
      res.json({ message: "Rol eliminado exitosamente", error: 0 });
    });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el rol", error: 1 });
  }
};

export { crearRol, obtenerRoles, obtenerRolPorId, updateRol, eliminarRol };
