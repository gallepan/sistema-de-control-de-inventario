const pool = require("../postgresql");

const getAllAlmacen = async (req, res, next) => {
  const { page, limit, search, grupo } = req.query;
  const searchTerm = `%${search}%`;
  try {
    const offset = (page - 1) * limit;
    let tasks, totalCount;
    if (search && grupo) {
      // Search for results with both search and grupo
      const { rows } = await pool.query(
        "SELECT * FROM almacen WHERE nombre ILIKE $1 AND grupo = $2 ORDER BY id DESC LIMIT $3 OFFSET $4",
        [searchTerm, grupo, limit, offset]
      );
      tasks = rows;
      const { rows: countRows } = await pool.query(
        "SELECT COUNT(*) as totalCount FROM almacen WHERE nombre ILIKE $1 AND grupo = $2",
        [searchTerm, grupo]
      );
      totalCount = countRows[0].totalcount;
    } else if (search) {
      // Search for results with only search
      const { rows } = await pool.query(
        "SELECT * FROM almacen WHERE nombre ILIKE $1 ORDER BY id DESC LIMIT $2 OFFSET $3",
        [searchTerm, limit, offset]
      );
      tasks = rows;
      const { rows: countRows } = await pool.query(
        "SELECT COUNT(*) as totalCount FROM almacen WHERE nombre ILIKE $1",
        [searchTerm]
      );
      totalCount = countRows[0].totalcount;
    } else if (grupo) {
      // Search for results with only grupo
      const { rows } = await pool.query(
        "SELECT * FROM almacen WHERE grupo = $1 ORDER BY id DESC LIMIT $2 OFFSET $3",
        [grupo, limit, offset]
      );
      tasks = rows;
      const { rows: countRows } = await pool.query(
        "SELECT COUNT(*) as totalCount FROM almacen WHERE grupo = $1",
        [grupo]
      );
      totalCount = countRows[0].totalcount;
    } else {
      // Take all elements if there is no search or grupo
      const { rows } = await pool.query(
        "SELECT * FROM almacen ORDER BY id DESC LIMIT $1 OFFSET $2",
        [limit, offset]
      );
      tasks = rows;
      const { rows: countRows } = await pool.query(
        "SELECT COUNT(*) as totalCount FROM almacen"
      );
      totalCount = countRows[0].totalcount;
    }

    const currentPage = Math.floor(offset / limit) + 1;
    const totalPages = Math.ceil(totalCount / limit);

    res.json({
      tasks,
      totalCount,
      currentPage,
      totalPages,
    });
  } catch (error) {
    next(error);
  }
};

const getAllEntradas = async (req, res, next) => {
  const { page, limit, search, year, month, sort } = req.query;
  const searchTerm = `%${search}%`;
  const ordenarTerm = sort === "DESC" ? "DESC" : "ASC";

  try {
    const offset = (page - 1) * limit;
    let tasks, totalCount;
    if (search && year && month) {
      const { rows } = await pool.query(
        "SELECT i.nombre, i.imagen, i.unidad, e.id, e.id_item, e.cantidad, e.fecha, e.uso FROM almacen i JOIN entradas e ON i.id = e.id_item WHERE i.nombre ILIKE $1 AND EXTRACT(MONTH FROM e.fecha) = $2 AND EXTRACT(YEAR FROM e.fecha) = $3 ORDER BY CASE WHEN $4::text = 'ASC' THEN e.fecha ELSE NULL END ASC, CASE WHEN $4::text = 'DESC' THEN e.fecha ELSE NULL END DESC LIMIT $5 OFFSET $6",
        [searchTerm, month, year, sort, limit, offset]
      );
      tasks = rows;
      const { rows: countRows } = await pool.query(
        "SELECT COUNT(*) as totalCount FROM almacen i JOIN entradas e ON i.id = e.id_item WHERE i.nombre ILIKE $1 AND EXTRACT(MONTH FROM e.fecha) = $2 AND EXTRACT(YEAR FROM e.fecha) = $3",
        [searchTerm, month, year]
      );
      totalCount = countRows[0].totalcount;
    } else if (search) {
      // Search for results with only search
      const { rows } = await pool.query(
        "SELECT i.nombre, i.imagen, i.unidad, e.id, e.id_item, e.cantidad, e.fecha, e.uso FROM almacen i JOIN entradas e ON i.id = e.id_item WHERE i.nombre ILIKE $1 ORDER BY CASE WHEN $2::text = 'ASC' THEN e.fecha ELSE NULL END ASC, CASE WHEN $2::text = 'DESC' THEN e.fecha ELSE NULL END DESC LIMIT $3 OFFSET $4",
        [searchTerm, sort, limit, offset]
      );
      tasks = rows;
      const { rows: countRows } = await pool.query(
        "SELECT COUNT(*) as totalCount FROM almacen i JOIN entradas e ON i.id = e.id_item WHERE i.nombre ILIKE $1",
        [searchTerm]
      );
      totalCount = countRows[0].totalcount;
    } else if (month && year) {
      // Resultados solo por mes y año
      const { rows } = await pool.query(
        "SELECT i.nombre, i.imagen, i.unidad, e.id, e.id_item, e.cantidad, e.fecha, e.uso FROM almacen i JOIN entradas e ON i.id = e.id_item WHERE EXTRACT(MONTH FROM e.fecha) = $1 AND EXTRACT(YEAR FROM e.fecha) = $2 ORDER BY CASE WHEN $3::text = 'ASC' THEN e.fecha ELSE NULL END ASC, CASE WHEN $3::text = 'DESC' THEN e.fecha ELSE NULL END DESC LIMIT $4 OFFSET $5",
        [month, year, sort, limit, offset]
      );
      tasks = rows;
      const { rows: countRows } = await pool.query(
        "SELECT COUNT(*) as totalCount FROM almacen i JOIN entradas e ON i.id = e.id_item WHERE EXTRACT(MONTH FROM e.fecha) = $1 AND EXTRACT(YEAR FROM e.fecha) = $2",
        [month, year]
      );
      totalCount = countRows[0].totalcount;
    } else {
      // Take all elements if there is no search or grupo
      const { rows } = await pool.query(
        "SELECT i.nombre, i.imagen, i.unidad, e.id, e.id_item, e.cantidad, e.fecha, e.uso FROM almacen i JOIN entradas e ON i.id = e.id_item ORDER BY CASE WHEN $1::text = 'ASC' THEN e.fecha ELSE NULL END ASC, CASE WHEN $1::text = 'DESC' THEN e.fecha ELSE NULL END DESC LIMIT $2 OFFSET $3",
        [sort, limit, offset]
      );
      tasks = rows;
      const { rows: countRows } = await pool.query(
        "SELECT COUNT(*) as totalCount FROM almacen i JOIN entradas e ON i.id = e.id_item"
      );
      totalCount = countRows[0].totalcount;
    }

    const currentPage = Math.floor(offset / limit) + 1;
    const totalPages = Math.ceil(totalCount / limit);

    res.json({
      tasks,
      totalCount,
      currentPage,
      totalPages,
    });
  } catch (error) {
    next(error);
  }
};

const getAllSalidas = async (req, res, next) => {
  const { page, limit, search, year, month, sort } = req.query;
  const searchTerm = `%${search}%`;
  const ordenarTerm = sort === "DESC" ? "DESC" : "ASC";

  try {
    const offset = (page - 1) * limit;
    let tasks, totalCount;
    if (search && year && month) {
      const { rows } = await pool.query(
        "SELECT i.nombre, i.imagen, i.unidad, e.id, e.id_item, e.cantidad, e.fecha, e.uso, e.recibio FROM almacen i JOIN salidas e ON i.id = e.id_item WHERE i.nombre ILIKE $1 AND EXTRACT(MONTH FROM e.fecha) = $2 AND EXTRACT(YEAR FROM e.fecha) = $3 ORDER BY CASE WHEN $4::text = 'ASC' THEN e.fecha ELSE NULL END ASC, CASE WHEN $4::text = 'DESC' THEN e.fecha ELSE NULL END DESC LIMIT $5 OFFSET $6",
        [searchTerm, month, year, sort, limit, offset]
      );
      tasks = rows;
      const { rows: countRows } = await pool.query(
        "SELECT COUNT(*) as totalCount FROM almacen i JOIN salidas e ON i.id = e.id_item WHERE i.nombre ILIKE $1 AND EXTRACT(MONTH FROM e.fecha) = $2 AND EXTRACT(YEAR FROM e.fecha) = $3",
        [searchTerm, month, year]
      );
      totalCount = countRows[0].totalcount;
    } else if (search) {
      // Search for results with only search
      const { rows } = await pool.query(
        "SELECT i.nombre, i.imagen, i.unidad, e.id, e.id_item, e.cantidad, e.fecha, e.uso, e.recibio FROM almacen i JOIN salidas e ON i.id = e.id_item WHERE i.nombre ILIKE $1 ORDER BY CASE WHEN $2::text = 'ASC' THEN e.fecha ELSE NULL END ASC, CASE WHEN $2::text = 'DESC' THEN e.fecha ELSE NULL END DESC LIMIT $3 OFFSET $4",
        [searchTerm, sort, limit, offset]
      );
      tasks = rows;
      const { rows: countRows } = await pool.query(
        "SELECT COUNT(*) as totalCount FROM almacen i JOIN salidas e ON i.id = e.id_item WHERE i.nombre ILIKE $1",
        [searchTerm]
      );
      totalCount = countRows[0].totalcount;
    } else if (month && year) {
      // Resultados solo por mes y año
      const { rows } = await pool.query(
        "SELECT i.nombre, i.imagen, i.unidad, e.id, e.id_item, e.cantidad, e.fecha, e.uso, e.recibio FROM almacen i JOIN salidas e ON i.id = e.id_item WHERE EXTRACT(MONTH FROM e.fecha) = $1 AND EXTRACT(YEAR FROM e.fecha) = $2 ORDER BY CASE WHEN $3::text = 'ASC' THEN e.fecha ELSE NULL END ASC, CASE WHEN $3::text = 'DESC' THEN e.fecha ELSE NULL END DESC LIMIT $4 OFFSET $5",
        [month, year, sort, limit, offset]
      );
      tasks = rows;
      const { rows: countRows } = await pool.query(
        "SELECT COUNT(*) as totalCount FROM almacen i JOIN salidas e ON i.id = e.id_item WHERE EXTRACT(MONTH FROM e.fecha) = $1 AND EXTRACT(YEAR FROM e.fecha) = $2",
        [month, year]
      );
      totalCount = countRows[0].totalcount;
    } else {
      // Take all elements if there is no search or grupo
      const { rows } = await pool.query(
        "SELECT i.nombre, i.imagen, i.unidad, e.id, e.id_item, e.cantidad, e.fecha, e.uso, e.recibio FROM almacen i JOIN salidas e ON i.id = e.id_item ORDER BY CASE WHEN $1::text = 'ASC' THEN e.fecha ELSE NULL END ASC, CASE WHEN $1::text = 'DESC' THEN e.fecha ELSE NULL END DESC LIMIT $2 OFFSET $3",
        [sort, limit, offset]
      );
      tasks = rows;
      const { rows: countRows } = await pool.query(
        "SELECT COUNT(*) as totalCount FROM almacen i JOIN salidas e ON i.id = e.id_item"
      );
      totalCount = countRows[0].totalcount;
    }

    const currentPage = Math.floor(offset / limit) + 1;
    const totalPages = Math.ceil(totalCount / limit);

    res.json({
      tasks,
      totalCount,
      currentPage,
      totalPages,
    });
  } catch (error) {
    next(error);
  }
};

const getAlmacen = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await pool.query("SELECT * FROM almacen WHERE id = $1", [
      id,
    ]);

    if (result.rows.length === 0)
      return res.status(404).json({ message: "Objeto no encontrado" });

    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};
const getEntrada = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      "SELECT i.nombre, i.grupo, i.unidad, i.imagen, i.posicion, e.id, e.id_item, e.cantidad, e.uso, e.fecha FROM almacen i JOIN entradas e ON i.id = e.id_item WHERE e.id=$1",
      [id]
    );

    if (result.rows.length === 0)
      return res.status(404).json({ message: "Objeto no encontrado" });

    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};
const getSalida = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      "SELECT i.nombre, i.grupo, i.unidad, i.imagen, i.posicion, e.id, e.id_item, e.cantidad, e.fecha, e.uso, e.recibio FROM almacen i JOIN salidas e ON i.id = e.id_item WHERE e.id=$1",
      [id]
    );

    if (result.rows.length === 0)
      return res.status(404).json({ message: "Objeto no encontrado" });

    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};
//Funcion hecha para los nuevos objetos añadidos al almacen se guarda en dos tablas
const creaNuevo = async (req, res, next) => {
  const { grupo, nombre, cantidad, unidad, posicion, uso, imagen } = req.body;
  try {
    const result = await pool.query(
      "WITH nueva_entrada AS (INSERT INTO almacen (nombre, grupo, unidad, posicion,imagen) VALUES ($1, $2, $3, $4, $5) RETURNING id) INSERT INTO entradas (id_item, cantidad, uso) SELECT id, $6, $7 FROM nueva_entrada;",
      [nombre, grupo, unidad, posicion, imagen, cantidad, uso]
    );

    res.json(result.rows[0]);
    console.log(result);
  } catch (error) {
    next(error);
  }
};

//Funcion para cuando entran objetos que ya están en el almacen
const entradaNueva = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { cantidad, uso } = req.body;
    const result = await pool.query(
      "INSERT INTO entradas (id_item, cantidad, uso) VALUES($1, $2, $3) RETURNING *",
      [id, cantidad, uso]
    );
    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};
const salidaNueva = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { cantidad, uso, recibio } = req.body;

    const result = await pool.query(
      "INSERT INTO salidas (id_item, cantidad, uso, recibio) VALUES($1, $2, $3, $4) RETURNING *",
      [id, cantidad, uso, recibio]
    );
    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};
//Aunque no se deberia de eliminar las entradas
const eliminarAlmacen = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await pool.query("DELETE FROM almacen WHERE id = $1", [id]);
    await pool.query("DELETE FROM entradas WHERE id_item = $1", [id]);
    await pool.query("DELETE FROM salidas WHERE id_item = $1", [id]);

    if (result.rowCount === 0)
      return res.status(404).json({
        message: "Tarea no encontrada",
      });

    return res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};
const eliminarEntradas = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await pool.query("DELETE FROM entradas WHERE id = $1", [id]);

    if (result.rowCount === 0)
      return res.status(404).json({
        message: "Entrada no encontrada",
      });

    return res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};
const eliminarSalidas = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await pool.query("DELETE FROM salidas WHERE id = $1", [id]);

    if (result.rowCount === 0)
      return res.status(404).json({
        message: "Salida no encontrada",
      });

    return res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

const editarAlmacen = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { grupo, nombre, cantidad, unidad, posicion, imagen, usuarioNombre } = req.body;
    //const adjustedCantidad = cantidad;

    const existingItem = await pool.query(
      "SELECT * FROM almacen WHERE id = $1",
      [id]
    );
    if (existingItem.rows.length === 0) {
      return res.status(404).json({
        message: "Objeto no encontrado",
      });
    }

    const oldCantidad = existingItem.rows[0].cantidad;
    const adjustedCantidad = parseInt(cantidad);

    let descripcion = "";
    let tipoMovimiento = "";
    try {
      if (adjustedCantidad < oldCantidad) {
        descripcion = "Ajuste de existencias - Salida";
        tipoMovimiento = "salida";
        const diffCantidad = Math.abs(oldCantidad - adjustedCantidad);

        await pool.query(
          "INSERT INTO salidas (id_item, cantidad, uso, recibio) VALUES ($1, $2, $3, $4) RETURNING *",
          [id, diffCantidad, descripcion, usuarioNombre]
        );
        //  return res.json(result.rows[0]);
      } else if (adjustedCantidad > oldCantidad) {
        descripcion = "Ajuste de existencias hecha por: " + usuarioNombre;
        tipoMovimiento = "entrada";
        const diffCantidad = Math.abs(oldCantidad - adjustedCantidad);

        await pool.query(
          "INSERT INTO entradas (id_item, cantidad, uso) VALUES ($1, $2, $3)",
          [id, diffCantidad, descripcion]
        );
      }
    } catch (error) {
      return next(error);
    }
    const result = await pool.query(
      "UPDATE almacen SET grupo = $1, nombre = $2, unidad = $3, posicion = $4, imagen = $5 WHERE id = $6 RETURNING *",
      [grupo, nombre, unidad, posicion, imagen, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Objeto no encontrado",
      });
    }

    return res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

//Para entradas y salidas, id se refiere a la entrada en especifico no al objeto en Almacen
const editarEntradas = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { cantidad, uso } = req.body;

    //console.log(id, grupo, nombre, existencia, unidad, posicion);

    const result = await pool.query(
      "UPDATE entradas SET cantidad = $1, uso =$2 WHERE id = $3 RETURNING *",
      [cantidad, uso, id]
    );
    if (result.rows.length === 0)
      return res.status(404).json({
        message: "Objeto no encontrada",
      });

    return res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};
const editarSalidas = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { cantidad, uso, recibio } = req.body;

    //console.log(id, grupo, nombre, existencia, unidad, posicion);

    const result = await pool.query(
      "UPDATE salidas SET cantidad = $1, uso = $2, recibio = $3 WHERE id = $4 RETURNING *",
      [cantidad, uso, recibio, id]
    );
    if (result.rows.length === 0)
      return res.status(404).json({
        message: "Objeto no encontrada",
      });

    return res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};
const actualizaCantidad = async (req, res, next) => {
  try {
    await pool.query(
      "UPDATE almacen a SET cantidad = COALESCE((SELECT SUM(e.cantidad) FROM entradas e WHERE e.id_item = a.id),0) - COALESCE((SELECT SUM(x.cantidad) FROM salidas x WHERE x.id_item = a.id),0)"
    );

    return res.status(204).json({
      message: "Operacion realizada",
    });
  } catch (error) {
    next(error);
  }
};

//Para controlar el inicio/cierre de sesion
const getAllUsuarios = async (req, res, next) => {
  try {
    const result = await pool.query(
      "SELECT id, nombre, alias, tipuser, ultimologin, creacion FROM usuarios"
    );
    if (result.rows.length === 0)
      return res.status(404).json({ message: "Error no hay usuarios" });
    res.json(result.rows);
  } catch (error) {
    next(error);
  }
};

const getUsuarioEditar = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "SELECT id, nombre, alias, tipuser, ultimologin, creacion FROM usuarios WHERE id=$1",
      [id]
    );

    if (result.rows.length === 0)
      return res.status(404).json({ message: "Objeto no encontrado" });

    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

const getUsuario = async (req, res, next) => {
  try {
    const userId = req.session.userId;
    const result = await pool.query(
      "SELECT id, nombre, alias, tipuser, ultimologin, creacion FROM usuarios WHERE id=$1",
      [userId]
    );

    if (result.rows.length === 0)
      return res.status(404).json({ message: "Objeto no encontrado" });

    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};
const nuevoUsuario = async (req, res, next) => {
  try {
    const { nombre, alias, contra, tipuser } = req.body;

    // Check if alias already exists in the database
    const aliasExists = await pool.query(
      "SELECT * FROM usuarios WHERE alias = $1",
      [alias]
    );

    if (aliasExists.rows.length > 0) {
      return res.status(409).json({ message: "Alias está en uso" });
    }

    // Si no hay alias repetido, se puede continuar
    const result = await pool.query(
      "INSERT INTO usuarios (nombre, alias, contra, tipuser) VALUES ($1, $2, crypt($3, gen_salt('bf')), $4) RETURNING *",
      [nombre, alias, contra, tipuser]
    );
    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

const editaUsuario = async (req, res, next) => {
  try {
    const { nombre, alias, tipuser, contra } = req.body;
    const id = req.params.id;

    // Checa si el alias está ya en uso.
    const result = await pool.query(
      "SELECT * FROM usuarios WHERE alias = $1 AND id != $2",
      [alias, id]
    );
    if (result.rowCount > 0) {
      return res.status(400).json({ message: "El alias ya está en uso" });
    }

    const updateQuery =
      "UPDATE usuarios SET nombre = $1, alias = $2, tipuser = $3, contra = crypt($4, gen_salt('bf')) WHERE id = $5 RETURNING *";
    const updateValues = [nombre, alias, tipuser, contra, id];
    const updateResult = await pool.query(updateQuery, updateValues);

    res.json(updateResult.rows[0]);
  } catch (error) {
    next(error);
  }
};

/*
const editaUsuario = async (req, res, next) => {
  try {
    const { nombre, alias, tipuser, contra } = req.body;
    const id = req.params.id;

    // Checa si el alias está ya en uso.
    const result = await pool.query(
      "SELECT * FROM usuarios WHERE alias = $1 AND id != $2",
      [alias, id]
    );
    if (result.rowCount > 0) {
      return res.status(400).json({ message: "El alias ya está en uso" });
    }

    let updateQuery = "UPDATE usuarios SET nombre = $1, alias = $2, tipuser = $3";
    const updateValues = [nombre, alias, tipuser];

    // Only update the password if it is not blank and has at least 6 characters
    if (contra && contra.length >= 6) {
      updateQuery += ", contra = crypt($4, gen_salt('bf'))";
      updateValues.push(contra);
    }

    updateQuery += " WHERE id = $4 RETURNING *";
    updateValues.push(id);

    const updateResult = await pool.query(updateQuery, updateValues);

    res.json(updateResult.rows[0]);
  } catch (error) {
    next(error);
  }
};
*/
const eliminaUsuario = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await pool.query("DELETE FROM usuarios WHERE id = $1", [id]);

    if (result.rowCount === 0)
      return res.status(404).json({
        message: "No encontró al usuario",
      });

    return res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

const loginUsuario = async (req, res, next) => {
  // Check if there is an active session
  if (req.session && req.session.userId) {
    console.log("Hay una sesión activa");
    return next();
  }

  // Otherwise, try to log in the user
  try {
    const { alias, contra } = req.body;
    const result = await pool.query(
      "SELECT * FROM usuarios WHERE alias = $1 AND contra = crypt($2, contra)",
      [alias, contra]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({
        message: "Credenciales incorrectas",
      });
    }
    await pool.query("UPDATE usuarios SET ultimologin = now() WHERE id = $1", [
      result.rows[0].id,
    ]);
    // If the credentials are correct, set the session variable and send a success response
    req.session.userId = result.rows[0].id;
    res.status(200).json({
      message: "Login correcto",
    });
  } catch (error) {
    next(error);
  }
};

const logoutUsuario = async (req, res, next) => {
  req.session.destroy(() => {
    console.log("Sesión terminada con exito");
    res.status(200).json({ message: "Logout successful" });
  });
};

const sesionActiva = async (req, res, next) => {
  if (req.session && req.session.userId) {
    const userId = req.session.userId;
    try {
      const result = await pool.query(
        "SELECT id, nombre, alias, tipuser, ultimologin, creacion FROM usuarios WHERE id = $1",
        [userId]
      );

      if (result.rows.length === 0) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }

      const user = result.rows[0];
      res.status(200).json({ sessionExists: true, user });
    } catch (error) {
      next(error);
    }
  } else {
    res.status(200).json({ sessionExists: false });
  }
};

const seleccionarGrupo = async (req, res, next) => {
  try {
    const result = await pool.query(
      "SELECT DISTINCT grupo FROM almacen ORDER BY grupo ASC"
    );
    if (result.rows.length === 0)
      return res.status(404).json({ message: "Objeto no encontrado" });
    res.json(result.rows);
  } catch (error) {
    next(error);
  }
};

const seleccionarRazon = async (req, res, next) => {
  try {
    const result = await pool.query(
      "SELECT DISTINCT uso FROM salidas ORDER BY uso ASC"
    );
    if (result.rows.length === 0)
      return res.status(404).json({ message: "Objeto no encontrado" });
    res.json(result.rows);
  } catch (error) {
    next(error);
  }
};

const getAllMinimos = async (req, res, next) => {
  try {
    const result = await pool.query(
      "SELECT i.nombre, i.grupo, i.unidad, i.cantidad, e.id_item, e.minimo FROM almacen i JOIN minimos e ON i.id = e.id_item ORDER BY e.id_item DESC"
    );
    res.json(result.rows);
  } catch (error) {
    next(error);
  }
};
const getMinimos = async (req, res, next) => {
  try {
    const id = req.params.id;
    const result = await pool.query(
      "SELECT minimo FROM minimos WHERE id_item=$1",
      [id]
    );
    res.json(result.rows);
  } catch (error) {
    next(error);
  }
};

const editaMinimo = async (req, res, next) => {
  try {
    const { minimo } = req.body;
    const id = req.params.id;

    // Check if the item with the given ID exists
    const itemExists = await pool.query(
      "SELECT * FROM minimos WHERE id_item = $1",
      [id]
    );

    if (itemExists.rows.length === 0) {
      // If the item doesn't exist, create a new entry
      const result = await pool.query(
        "INSERT INTO minimos (id_item, minimo) VALUES ($1, $2) RETURNING *",
        [id, minimo]
      );
      res.json(result.rows[0]);
    } else {
      // If the item exists, update the existing entry
      const result = await pool.query(
        "UPDATE minimos SET minimo = $1 WHERE id_item = $2 RETURNING *",
        [minimo, id]
      );
      res.json(result.rows[0]);
    }
  } catch (error) {
    next(error);
  }
};

const eliminaMinimo = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await pool.query("DELETE FROM minimos WHERE id_item = $1", [
      id,
    ]);

    if (result.rowCount === 0)
      return res.status(404).json({
        message: "No encontró entrada",
      });

    return res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

//Para sacar el numero actual de la secuencia generada para el id
const getSecuencias = async (req, res, next) => {
  try {
    const sequences = [
      "almacen_id_seq",
      "entradas_id_seq",
      "salidas_id_seq",
      "usuarios_id_seq",
    ];
    const sequenceValues = {};

    for (const sequence of sequences) {
      const result = await pool.query(`SELECT last_value FROM ${sequence};`);
      if (result.rows.length > 0) {
        sequenceValues[sequence] = result.rows[0].last_value;
      }
    }

    const tableIds = {};

    const tables = ["almacen", "entradas", "salidas", "usuarios"];

    for (const table of tables) {
      const result = await pool.query(
        `SELECT MAX(id) as highest_id FROM ${table};`
      );
      if (result.rows.length > 0) {
        tableIds[table] = result.rows[0].highest_id;
      }
    }

    res.json({ sequenceValues, tableIds });
  } catch (error) {
    next(error);
  }
};

const editarSecuencias = async (req, res, next) => {
  try {
    let editedSequences = req.body;

    // Si un solo objeto es enviado cambia el tipo de archivo a un arreglo
    if (!Array.isArray(editedSequences)) {
      editedSequences = [editedSequences];
    }

    for (const sequence of editedSequences) {
      await pool.query("SELECT setval($1, $2);", [
        sequence.secuencia,
        sequence.nuevoValor,
      ]);
    }

    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
};

//Exportar datos
// Funcion para convertir la informacion a CSV

const convertToCSV = (data) => {
  const csvRows = [];

  // Extract the headers from each column
  const headers = Object.keys(data[0]);
  csvRows.push(headers.join(","));

  // Extract the formatted values for each object
  for (const row of data) {
    const values = headers.map((header) => {
      if (header === "fecha") {
        const date = new Date(row[header]);
        const truncatedDate = date.toISOString().split("T")[0];
        return truncatedDate;
      } else {
        return row[header];
      }
    });
    csvRows.push(values.join(","));
  }

  // Combine all lines into a single string
  return csvRows.join("\n");
};

const exportarAlmacenCSV = async (req, res, next) => {
  try {
    const result = await pool.query("SELECT * FROM almacen");
    const data = result.rows;

    // Convert data to CSV format
    const csv = convertToCSV(data);

    // Set the appropriate headers for the file download
    res.setHeader("Content-Disposition", 'attachment; filename="almacen.csv"');
    res.setHeader("Content-Type", "text/csv");

    // Send the CSV data as the response
    res.send(csv);
  } catch (error) {
    next(error);
  }
};

const exportarEntradasCSV = async (req, res, next) => {
  const { year, month } = req.query;
  const { selectedOption } = req.body;
  let data;

  try {
    if (month && year) {
      // Resultados solo por mes y año
      const result = await pool.query(
        "SELECT i.nombre, e.cantidad, i.unidad, e.fecha, e.uso FROM almacen i JOIN entradas e ON i.id = e.id_item WHERE EXTRACT(MONTH FROM e.fecha) = $1 AND EXTRACT(YEAR FROM e.fecha) = $2",
        [month, year]
      );
      data = result.rows;
    } else {
      let query = "SELECT * FROM entradas";
      if (selectedOption === "name") {
        query = "SELECT i.nombre, e.* FROM almacen i JOIN entradas e ON i.id = e.id_item";
      }

      const result = await pool.query(query);
      data = result.rows;
    }

    // Convert data to CSV format
    const csv = convertToCSV(data);

    // Set the appropriate headers for the file download
    res.setHeader("Content-Disposition", 'attachment; filename="almacen.csv"');
    res.setHeader("Content-Type", "text/csv");

    // Send the CSV data as the response
    res.send(csv);
  } catch (error) {
    next(error);
  }
};

const exportarSalidasCSV = async (req, res, next) => {
  const { year, month } = req.query;
  const { selectedOption } = req.body;
  let data;

  try {
    if (month && year) {
      // Resultados solo por mes y año
      const result = await pool.query(
        "SELECT i.nombre, e.cantidad, i.unidad, e.fecha, e.uso, e.recibio FROM almacen i JOIN salidas e ON i.id = e.id_item WHERE EXTRACT(MONTH FROM e.fecha) = $1 AND EXTRACT(YEAR FROM e.fecha) = $2",
        [month, year]
      );
      data = result.rows;
    } else {
      let query = "SELECT * FROM salidas";
      if (selectedOption === "name") {
        query = "SELECT i.nombre, e.* FROM almacen i JOIN salidas e ON i.id = e.id_item";
      }

      const result = await pool.query(query);
      data = result.rows;
    }

    // Convert data to CSV format
    const csv = convertToCSV(data);

    // Set the appropriate headers for the file download
    res.setHeader("Content-Disposition", 'attachment; filename="almacen.csv"');
    res.setHeader("Content-Type", "text/csv");

    // Send the CSV data as the response
    res.send(csv);
  } catch (error) {
    next(error);
  }
};


module.exports = {
  getAllAlmacen,
  getAllEntradas,
  getAllSalidas,
  getAlmacen,
  getEntrada,
  getSalida,
  creaNuevo,
  entradaNueva,
  salidaNueva,
  editarAlmacen,
  editarEntradas,
  editarSalidas,
  eliminarAlmacen,
  eliminarEntradas,
  eliminarSalidas,
  actualizaCantidad,
  getAllUsuarios,
  getUsuario,
  getUsuarioEditar,
  nuevoUsuario,
  editaUsuario,
  eliminaUsuario,
  loginUsuario,
  logoutUsuario,
  sesionActiva,
  seleccionarGrupo,
  seleccionarRazon,
  getAllMinimos,
  getMinimos,
  editaMinimo,
  eliminaMinimo,
  getSecuencias,
  editarSecuencias,
  exportarAlmacenCSV,
  exportarEntradasCSV,
  exportarSalidasCSV,
};
