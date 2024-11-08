import connection from '../config/db.js';

const crearCaracteristica = async (req, res) => {
  const { tipo } = req.body;

  try {
    const query = "INSERT INTO caracteristicas (tipo) VALUES (?)";
    connection.query(query, [tipo], (error, results) => {
      if (error) {
        return res.status(500).json({ message: "Error al crear la característica", error: 1 });
      }
      res.json({ message: "Característica creada exitosamente", error: 0 });
    });
  } catch (error) {
    res.status(500).json({ message: "Error al procesar la solicitud", error: 1 });
  }
};

const obtenerCaracteristicas = async (req, res) => {
  try {
    const query = "SELECT * FROM caracteristicas";
    connection.query(query, (error, results) => {
      if (error) {
        return res.status(500).json({ message: "Error al obtener las características", error: 1 });
      }
      res.json({ data: results, error: 0 });
    });
  } catch (error) {
    res.status(500).json({ message: "Error al procesar la solicitud", error: 1 });
  }
};

const obtenerCaracteristicaPorId = async (req, res) => {
  const { id } = req.params;

  try {
    const query = "SELECT * FROM caracteristicas WHERE id = ?";
    connection.query(query, [id], (error, results) => {
      if (error) {
        return res.status(500).json({ message: "Error al obtener la característica", error: 1 });
      }
      if (results.length === 0) {
        return res.status(404).json({ message: "Característica no encontrada", error: 1 });
      }
      res.json({ data: results[0], error: 0 });
    });
  } catch (error) {
    res.status(500).json({ message: "Error al procesar la solicitud", error: 1 });
  }
};

const updateCaracteristica = async (req, res) => {
  const { id } = req.params;
  const { tipo } = req.body;

  try {
    const query = "UPDATE caracteristicas SET tipo = ? WHERE id = ?";
    connection.query(query, [tipo, id], (error, results) => {
      if (error || results.affectedRows === 0) {
        return res.status(500).json({ message: "Error al actualizar la característica", error: 1 });
      }
      res.json({ message: "Característica actualizada exitosamente", error: 0 });
    });
  } catch (error) {
    res.status(500).json({ message: "Error al procesar la solicitud", error: 1 });
  }
};

const eliminarCaracteristica = async (req, res) => {
  const { id } = req.params;

  try {
    const query = "DELETE FROM caracteristicas WHERE id = ?";
    connection.query(query, [id], (error, results) => {
      if (error || results.affectedRows === 0) {
        return res.status(500).json({ message: "Error al eliminar la característica", error: 1 });
      }
      res.json({ message: "Característica eliminada exitosamente", error: 0 });
    });
  } catch (error) {
    res.status(500).json({ message: "Error al procesar la solicitud", error: 1 });
  }
};

export {
  crearCaracteristica,
  obtenerCaracteristicas,
  obtenerCaracteristicaPorId,
  updateCaracteristica,
  eliminarCaracteristica
}