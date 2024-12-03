import connection from "../config/db.js";

// Crear un nuevo producto
const crearProducto = async (req, res) => {
  const {
    cod_barra,
    nombre,
    descripcion,
    cantidad,
    precio,
    caracteristica_id,
    proveedor_id,
    sucursal_id,
  } = req.body;
  try {
    const query = `INSERT INTO productos (cod_barra, nombre, descripcion, cantidad, precio, caracteristica_id, proveedor_id, sucursal_id) 
                     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
    connection.query(
      query,
      [
        cod_barra,
        nombre,
        descripcion,
        cantidad,
        precio,
        caracteristica_id,
        proveedor_id,
        sucursal_id,
      ],
      (error, results) => {
        if (error) {
          return res
            .status(500)
            .json({ message: "Error al crear el producto", error: 1 });
        }
        res.status(201).json({
          message: "Producto creado con éxito",
          id: results.insertId,
          error: 0,
        });
      }
    );
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor", error: 1 });
  }
};

// Obtener todos los productos
const obtenerProductos = async (req, res) => {
  try {
    const query = "SELECT * FROM productos";
    connection.query(query, (error, results) => {
      if (error) {
        return res
          .status(500)
          .json({ message: "Error al obtener los productos", error: 1 });
      }
      res.json({ data: results, error: 0 });
    });
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor", error: 1 });
  }
};

// Obtener un producto por ID
const obtenerProductoPorId = async (req, res) => {
  const { id } = req.params;
  try {
    const query = "SELECT * FROM productos WHERE id = ?";
    connection.query(query, [id], (error, results) => {
      if (error) {
        return res
          .status(500)
          .json({ message: "Error al obtener el producto", error: 1 });
      }
      if (results.length === 0) {
        return res
          .status(404)
          .json({ message: "Producto no encontrado", error: 1 });
      }
      res.json({ data: results[0], error: 0 });
    });
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor", error: 1 });
  }
};
// Obtener Productos Activos
const obtenerProductosActivos = async (req, res) => {
  try {
    const query = "SELECT * FROM productos WHERE activo = 1";
    connection.query(query, (error, results) => {
      if (error) {
        return res
          .status(500)
          .json({
            message: "Error al obtener los productos activos",
            error: 1,
          });
      }
      res.json({ data: results, error: 0 });
    });
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor", error: 1 });
  }
};

// Obtener productos activos por sucursal
const obtenerProductosActivosPorSucursal = async (req, res) => {
  const { sucursalId } = req.params;

  try {
    const query =
      "SELECT * FROM productos WHERE activo = 1 AND sucursal_id = ?";
    connection.query(query, [sucursalId], (error, results) => {
      if (error) {
        return res
          .status(500)
          .json({
            message: "Error al obtener productos activos por sucursal",
            error: 1,
          });
      }
      res.json({ data: results, error: 0 });
    });
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor", error: 1 });
  }
};

// Actualizar un producto
const updateProducto = async (req, res) => {
  const { id } = req.params;
  const {
    cod_barra,
    nombre,
    descripcion,
    cantidad,
    precio,
    caracteristica_id,
    proveedor_id,
    sucursal_id,
  } = req.body;
  try {
    const query = `UPDATE productos SET cod_barra = ?, nombre = ?, descripcion = ?, cantidad = ?, precio = ?, 
                   caracteristica_id = ?, proveedor_id = ?, sucursal_id = ? WHERE id = ?`;
    connection.query(
      query,
      [
        cod_barra,
        nombre,
        descripcion,
        cantidad,
        precio,
        caracteristica_id,
        proveedor_id,
        sucursal_id,
        id,
      ],
      (error, results) => {
        if (error) {
          return res
            .status(500)
            .json({ message: "Error al actualizar el producto", error: 1 });
        }
        if (results.affectedRows === 0) {
          return res
            .status(404)
            .json({ message: "Producto no encontrado", error: 1 });
        }
        res.json({ message: "Producto actualizado con éxito", error: 0 });
      }
    );
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor", error: 1 });
  }
};

// Desactivar un producto
const desactivarProducto = async (req, res) => {
  const { id } = req.params;
  try {
    const query = "UPDATE productos SET activo = 0 WHERE id = ?";
    connection.query(query, [id], (error, results) => {
      if (error) {
        return res
          .status(500)
          .json({ message: "Error al desactivar el producto", error: 1 });
      }
      if (results.affectedRows === 0) {
        return res
          .status(404)
          .json({ message: "Producto no encontrado", error: 1 });
      }
      res.json({ message: "Producto desactivado con éxito", error: 0 });
    });
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor", error: 1 });
  }
};

// Activar un producto
const activarProducto = async (req, res) => {
  const { id } = req.params;
  try {
    const query = "UPDATE productos SET activo = 1 WHERE id = ?";
    connection.query(query, [id], (error, results) => {
      if (error) {
        return res
          .status(500)
          .json({ message: "Error al activar el producto", error: 1 });
      }
      if (results.affectedRows === 0) {
        return res
          .status(404)
          .json({ message: "Producto no encontrado", error: 1 });
      }
      res.json({ message: "Producto activado con éxito", error: 0 });
    });
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor", error: 1 });
  }
};

export {
  crearProducto,
  obtenerProductos,
  obtenerProductoPorId,
  obtenerProductosActivos,
  obtenerProductosActivosPorSucursal,
  updateProducto,
  desactivarProducto,
  activarProducto,
};
