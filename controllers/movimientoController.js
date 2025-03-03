import connectionPromise from "../config/dbPromise.js";
import connection from "../config/db.js";

const insertarMovimiento = async (req, res) => {
  const { usuario_id, tipo, sucursal_id, detalles } = req.body;

  const queryMovimiento =
    "INSERT INTO movimiento (usuario_id, tipo, sucursal_id, total) VALUES (?, ?, ?, ?)";
  const queryDetalle =
    "INSERT INTO detalle_movimiento (movimiento_id, producto_id, cantidad, precio, total) VALUES (?, ?, ?, ?, ?)";
  const queryStock =
    "UPDATE productos SET cantidad = cantidad + ? WHERE id = ?";

  let connection;

  try {
    // Inicia la conexión a la base de datos
    connection = await connectionPromise();

    // Inicia la transacción
    await connection.beginTransaction();

    // Calcular el total del movimiento
    const total = detalles.reduce((sum, d) => sum + d.total, 0);

    // Inserta el movimiento
    const [result] = await connection.query(queryMovimiento, [
      usuario_id,
      tipo,
      sucursal_id,
      total,
    ]);
    const movimientoId = result.insertId;

    // Procesa los detalles y actualiza el stock
    for (const detalle of detalles) {
      const { producto_id, cantidad, precio } = detalle;
      const totalDetalle = cantidad * precio;

      // Inserta el detalle
      await connection.query(queryDetalle, [
        movimientoId,
        producto_id,
        cantidad,
        precio,
        totalDetalle,
      ]);

      // Actualiza el stock (entrada o salida)
      const ajusteStock = tipo === "entrada" ? cantidad : -cantidad;

      // Verifica stock si es salida
      if (tipo === "salida") {
        const [stockResult] = await connection.query(
          "SELECT cantidad FROM productos WHERE id = ?",
          [producto_id]
        );
        const stockDisponible = stockResult[0].cantidad;
        if (stockDisponible < cantidad) {
          return res.status(400).json({
            error: 1,
            message: `Stock insuficiente para el producto con ID ${id_producto}`,
          });
        }
      }

      // Aplica la actualización de stock
      await connection.query(queryStock, [ajusteStock, producto_id]);
    }

    // Confirma la transacción
    await connection.commit();

    res.json({ message: "Movimiento registrado correctamente", error: 0 });
  } catch (error) {
    // Si algo falla, se deshacen todos los cambios
    if (connection) {
      await connection.rollback();
    }
    res.status(500).json({
      message: error.message || "Error al registrar el movimiento",
      error: 1,
    });
  } finally {
    if (connection) {
      await connection.end(); // Cierra la conexión al final
    }
  }
};

// Actualizar el tipo de un movimiento
const actualizarTipoMovimiento = async (req, res) => {
  const { id } = req.params;
  const { nuevo_tipo } = req.body;

  // Validar que el tipo sea uno de los permitidos
  const tiposPermitidos = ["entrada", "salida", "anulado", "rechazado"];
  if (!tiposPermitidos.includes(nuevo_tipo)) {
    return res
      .status(400)
      .json({ message: "Tipo de movimiento no válido.", error: 1 });
  }

  try {
    const query = "UPDATE movimiento SET tipo = ? WHERE id = ?";
    connection.query(query, [nuevo_tipo, id], (error, results) => {
      if (error) {
        return res
          .status(500)
          .json({
            message: "Error al actualizar el tipo de movimiento.",
            error: 1,
          });
      }
      if (results.affectedRows === 0) {
        return res
          .status(404)
          .json({ message: "Movimiento no encontrado.", error: 1 });
      }
      res.json({
        message: "Tipo de movimiento actualizado con éxito.",
        error: 0,
      });
    });
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor.", error: 1 });
  }
};

// Eliminar Un Detalle Movimiento
const eliminarProductoDeMovimiento = async (req, res) => {
  const { id_movimiento, id_producto } = req.body;
  let connection;

  try {
    connection = await connectionPromise();
    await connection.beginTransaction();

    // Obtener detalles del producto en el movimiento
    const [detalle] = await connection.query(
      "SELECT cantidad, total FROM detalle_movimiento WHERE movimiento_id = ? AND producto_id = ?",
      [id_movimiento, id_producto]
    );

    if (detalle.length === 0) {
      return res.status(404).json({
        message: "No se encontró el detalle del movimiento.",
        error: 1,
      });
    }

    const { cantidad, total } = detalle[0];

    // Eliminar el producto del movimiento
    const [deleteResult] = await connection.query(
      "DELETE FROM detalle_movimiento WHERE movimiento_id = ? AND producto_id = ?",
      [id_movimiento, id_producto]
    );

    if (deleteResult.affectedRows === 0) {
      return res.status(400).json({
        message: "No se pudo eliminar el detalle del movimiento.",
        error: 1,
      });
    }

    // Actualizar el stock del producto
    await connection.query(
      "UPDATE productos SET cantidad = cantidad + ? WHERE id = ?",
      [cantidad, id_producto]
    );

    // Actualizar el total del movimiento
    await connection.query(
      "UPDATE movimiento SET total = total - ? WHERE id = ?",
      [total, id_movimiento]
    );

    await connection.commit();
    res.json({
      message: "Producto eliminado del movimiento y total actualizado.",
      error: 0,
    });
  } catch (error) {
    if (connection) await connection.rollback();
    res.status(500).json({
      message: "Error al eliminar el producto del movimiento.",
      error: 1,
    });
  } finally {
    if (connection) await connection.end();
  }
};

// Agregar Un Detalle Movimiento
const agregarProductoAMovimiento = async (req, res) => {
  const { id_movimiento, id_producto, cantidad, precio } = req.body;
  let connection;

  try {
    connection = await connectionPromise();
    await connection.beginTransaction();

    // Verificar si el movimiento existe y obtener su tipo
    const [movimiento] = await connection.query(
      "SELECT tipo FROM movimiento WHERE id = ?",
      [id_movimiento]
    );

    if (movimiento.length === 0) {
      await connection.rollback();
      return res.status(404).json({
        message: "No se encontró el movimiento.",
        error: 1,
      });
    }

    const tipoMovimiento = movimiento[0].tipo;

    // Verificar stock antes de insertar si es una salida
    if (tipoMovimiento === "salida") {
      const [stockResult] = await connection.query(
        "SELECT cantidad FROM productos WHERE id = ?",
        [id_producto]
      );
      const stockDisponible = stockResult.length ? stockResult[0].cantidad : 0;

      if (stockDisponible < cantidad) {
        await connection.rollback();
        return res.status(400).json({
          message: `Stock insuficiente para el producto con ID ${id_producto}. Disponible: ${stockDisponible}, solicitado: ${cantidad}.`,
          error: 1,
        });
      }
    }

    // Calcular total del nuevo detalle
    const totalDetalle = cantidad * precio;

    // Insertar nuevo producto en detalle_movimiento
    await connection.query(
      "INSERT INTO detalle_movimiento (movimiento_id, producto_id, cantidad, precio, total) VALUES (?, ?, ?, ?, ?)",
      [id_movimiento, id_producto, cantidad, precio, totalDetalle]
    );

    // Ajustar stock del producto (se valida antes para 'salida')
    const ajusteStock = tipoMovimiento === "entrada" ? cantidad : -cantidad;
    await connection.query(
      "UPDATE productos SET cantidad = cantidad + ? WHERE id = ?",
      [ajusteStock, id_producto]
    );

    // Actualizar el total del movimiento
    await connection.query(
      "UPDATE movimiento SET total = total + ? WHERE id = ?",
      [totalDetalle, id_movimiento]
    );

    await connection.commit();
    res.json({ message: "Producto agregado al movimiento y total actualizado.", error: 0 });

  } catch (error) {
    if (connection) await connection.rollback();
    res.status(500).json({
      message: "Error al agregar el producto al movimiento.",
      error: 1,
    });
  } finally {
    if (connection) await connection.end();
  }
};



export {
  insertarMovimiento,
  actualizarTipoMovimiento,
  eliminarProductoDeMovimiento,
  agregarProductoAMovimiento,
};
