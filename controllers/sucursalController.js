import connection from "../config/db.js";

// Crear una nueva sucursal
const crearSucursal = async (req, res) => {
  const { nombre, direccion, telefono } = req.body;
  try {
    const query =
      "INSERT INTO sucursales (nombre, direccion, telefono) VALUES (?, ?, ?)";
    connection.query(query, [nombre, direccion, telefono], (error, results) => {
      if (error) {
        return res
          .status(500)
          .json({ message: "Error al crear la sucursal", error: 1 });
      }
      res
        .status(201)
        .json({
          message: "Sucursal creada con éxito",
          id: results.insertId,
          error: 0,
        });
    });
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor", error: 1 });
  }
};

// Obtener todas las sucursales
const obtenerSucursales = async (req, res) => {
  try {
    const query = "SELECT * FROM sucursales";
    connection.query(query, (error, results) => {
      if (error) {
        return res
          .status(500)
          .json({ message: "Error al obtener las sucursales", error: 1 });
      }
      res.json({ data: results, error: 0 });
    });
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor", error: 1 });
  }
};

// Obtener una sucursal por ID
const obtenerSucursalPorId = async (req, res) => {
  const { id } = req.params;
  try {
    const query = "SELECT * FROM sucursales WHERE id = ?";
    connection.query(query, [id], (error, results) => {
      if (error) {
        return res
          .status(500)
          .json({ message: "Error al obtener la sucursal", error: 1 });
      }
      if (results.length === 0) {
        return res
          .status(404)
          .json({ message: "Sucursal no encontrada", error: 1 });
      }
      res.json({ data: results[0], error: 0 });
    });
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor", error: 1 });
  }
};

// Actualizar una sucursal
const updateSucursal = async (req, res) => {
  const { id } = req.params;
  const { nombre, direccion, telefono } = req.body;
  try {
    const query =
      "UPDATE sucursales SET nombre = ?, direccion = ?, telefono = ? WHERE id = ?";
    connection.query(
      query,
      [nombre, direccion, telefono, id],
      (error, results) => {
        if (error) {
          return res
            .status(500)
            .json({ message: "Error al actualizar la sucursal", error: 1 });
        }
        if (results.affectedRows === 0) {
          return res
            .status(404)
            .json({ message: "Sucursal no encontrada", error: 1 });
        }
        res.json({ message: "Sucursal actualizada con éxito", error: 0 });
      }
    );
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor", error: 1 });
  }
};

// Desactivar una sucursal
const desactivarSucursal = async (req, res) => {
  const { id } = req.params;
  try {
    const query = "UPDATE sucursales SET activo = 0 WHERE id = ?";
    connection.query(query, [id], (error, results) => {
      if (error) {
        return res
          .status(500)
          .json({ message: "Error al desactivar la sucursal", error: 1 });
      }
      if (results.affectedRows === 0) {
        return res
          .status(404)
          .json({ message: "Sucursal no encontrada", error: 1 });
      }
      res.json({ message: "Sucursal desactivada con éxito", error: 0 });
    });
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor", error: 1 });
  }
};

// Activar una sucursal
const activarSucursal = async (req, res) => {
  const { id } = req.params;
  try {
    const query = "UPDATE sucursales SET activo = 1 WHERE id = ?";
    connection.query(query, [id], (error, results) => {
      if (error) {
        return res
          .status(500)
          .json({ message: "Error al activar la sucursal", error: 1 });
      }
      if (results.affectedRows === 0) {
        return res
          .status(404)
          .json({ message: "Sucursal no encontrada", error: 1 });
      }
      res.json({ message: "Sucursal activada con éxito", error: 0 });
    });
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor", error: 1 });
  }
};

export {
    crearSucursal,
    obtenerSucursales,
    obtenerSucursalPorId,
    updateSucursal,
    desactivarSucursal,
    activarSucursal
  };
  