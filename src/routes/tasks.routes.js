const app = require("../index");
const { Router } = require("express");

const {
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
  nuevoUsuario,
  editaUsuario,
  eliminaUsuario,
  loginUsuario,
  logoutUsuario,
  sesionActiva,
  seleccionarGrupo,
  getAllMinimos,
  getMinimos,
  editaMinimo,
  eliminaMinimo,
  getSecuencias,
  editarSecuencias,
  exportarAlmacenCSV,
  exportarEntradasCSV,
  exportarSalidasCSV,
  getUsuarioEditar,
  seleccionarRazon,
} = require("../controllers/tasks.controller");

const router = Router();
//Para obtener todos lo datos
router.get("/tasks/inventario", getAllAlmacen);

router.get("/tasks/entrada", getAllEntradas);

router.get("/tasks/salida", getAllSalidas);
//Para obtener un dato en especifico
router.get("/tasks/inventario/:id", getAlmacen); //:id, para añadir un id

router.get("/tasks/entrada/:id", getEntrada);

router.get("/tasks/salida/:id", getSalida);
//Crea una nueva entrada
router.post("/tasks/", creaNuevo);

router.post("/tasks/entrada/:id", entradaNueva);

router.post("/tasks/salida/:id", salidaNueva);
//Elimina una entrada
router.delete("/tasks/inventario/:id", eliminarAlmacen);

router.delete("/tasks/entrada/:id", eliminarEntradas);

router.delete("/tasks/salida/:id", eliminarSalidas);
//Actualiza una entrada
router.put("/tasks/inventario/:id", editarAlmacen);

router.put("/tasks/entrada/:id", editarEntradas);

router.put("/tasks/salida/:id", editarSalidas);

router.put("/tasks", actualizaCantidad);

//usuarios
router.get("/tasks/usuarios", getAllUsuarios);

router.get("/tasks/usuario/:id", getUsuarioEditar)

router.get("/tasks/usuario", getUsuario);

router.post("/tasks/usuarios", nuevoUsuario);
 
router.put("/tasks/usuarios/:id", editaUsuario);

router.delete("/tasks/usuarios/:id", eliminaUsuario);

router.post("/tasks/login", loginUsuario)

router.post("/tasks/logout", logoutUsuario)

router.get("/tasks/sesion", sesionActiva)

router.get("/tasks/grupo", seleccionarGrupo)

router.get("/tasks/razon", seleccionarRazon)

router.get("/tasks/minimos", getAllMinimos)

router.get("/tasks/minimo/:id", getMinimos)

router.put("/tasks/minimo/:id", editaMinimo)

router.delete("/tasks/minimo/:id", eliminaMinimo)

router.get("/tasks/secuencias", getSecuencias)

router.post("/tasks/secuencias/editar", editarSecuencias)

router.get("/tasks/exportar/almacen", exportarAlmacenCSV);

router.post("/tasks/exportar/entradas", exportarEntradasCSV)

router.post("/tasks/exportar/salidas", exportarSalidasCSV)

module.exports = router;
