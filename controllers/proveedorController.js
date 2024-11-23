import connection from "../config/db.js";

// Crear proveedor
const crearProveedor = async (req, res) => {
  const { nombre, direccion, telefono, email, activo = 1 } = req.body;
  try {
    const query =
      "INSERT INTO proveedores (nombre, direccion, telefono, email) VALUES (?, ?, ?, ?)";
    connection.query(
      query,
      [nombre, direccion, telefono, email, activo],
      (error, results) => {
        if (error) {
          return res
            .status(500)
            .json({ message: "Error al crear el proveedor", error: 1 });
        }
        res.json({ message: "Proveedor creado con éxito", error: 0 });
      }
    );
  } catch (error) {
    res.status(500).json({ message: "Error al crear Proveedor", error: 1 });
  }
};

// Obtener todos los proveedores
const obtenerProveedores = async (req, res) => {
  try {
    const query = "SELECT * FROM proveedores";
    connection.query(query, (error, results) => {
      if (error) {
        return res
          .status(500)
          .json({ message: "Error al obtener los proveedores", error: 1 });
      }
      res.json({ data: results, error: 0 });
    });
  } catch (error) {
    res.status(500).json({ message: "Error al obtener Proveedores", error: 1 });
  }
};

// Obtener proveedor por ID
const obtenerProveedorPorId = async (req, res) => {
  const { id } = req.params;
  try {
    const query = "SELECT * FROM proveedores WHERE id = ?";
    connection.query(query, [id], (error, results) => {
      if (error || results.length === 0) {
        return res
          .status(404)
          .json({ message: "Proveedor no encontrado", error: 1 });
      }
      res.json({ data: results[0], error: 0 });
    });
  } catch (error) {
    res.status(500).json({ message: "Error al obtener Proveedor", error: 1 });
  }
};

// Actualizar Proveedor
const actualizarProveedor = async (req, res) => {
  const { id } = req.params;
  const { nombre, direccion, telefono, email, activo } = req.body;
  try {
    const query =
      "UPDATE proveedores SET nombre = ?, direccion = ?, telefono = ?, email = ?, activo = ? WHERE id = ?";
    connection.query(
      query,
      [nombre, direccion, telefono, email, activo, id],
      (error, results) => {
        if (error) {
          return res
            .status(500)
            .json({ message: "Error al actualizar el proveedor", error: 1 });
        }
        res.json({ message: "Proveedor actualizado con éxito", error: 0 });
      }
    );
  } catch (error) {
    res.status(500).json({ message: "Error actualizar Proveedor", error: 1 });
  }
};

// Eliminar Proveedor
const eliminarProveedor = async (req, res) => {
  const { id } = req.params;
  try {
    const query = "UPDATE proveedores SET activo = 0 WHERE id = ?";
    connection.query(query, [id], (error, results) => {
      if (error) {
        return res.status(500).json({
          message: "Error al cambiar el estado del proveedor",
          error: 1,
        });
      }
      res.json({ message: "Proveedor desactivado con éxito", error: 0 });
    });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar Proveedor", error: 1 });
  }
};

// Activar proveedor cambiando el estado de activo
const activarProveedor = async (req, res) => {
  const { id } = req.params;
  try {
    const query = "UPDATE proveedores SET activo = 1 WHERE id = ?";
    connection.query(query, [id], (error, results) => {
      if (error) {
        return res.status(500).json({ message: "Error al activar el proveedor", error: 1 });
      }
      if (results.affectedRows === 0) {
        return res.status(404).json({ message: "Proveedor no encontrado", error: 1 });
      }
      res.json({ message: "Proveedor activado con éxito", error: 0 });
    });
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor", error: 1 });
  }
};

export {
  crearProveedor,
  obtenerProveedores,
  obtenerProveedorPorId,
  actualizarProveedor,
  eliminarProveedor,
  activarProveedor
};
