import {
  Card,
  CardContent,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Fade,
  CardMedia,
  CardHeader,
  CardActions,
  Grid,
  Modal,
  IconButton,
  Typography,
  Button,
  CircularProgress,
} from "@mui/material";
import { DeleteOutlined, EditOffOutlined } from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Paginacion from "./Paginacion";
import { Box } from "@mui/system";

export default function TaskLists({ taskType, searchQuery }) {
  const [tasks, setTasks] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const limit = 18;
  const [selectedCardId, setSelectedCardId] = useState(null);
  const [selectedCardDel, setSelectedCardDel] = useState(null);
  const [selectedAction, setSelectedAction] = useState();
  const [loading, setLoading] = useState(false);
  const [addExit, setAddExit] = useState({
    cantidad: "",
    uso: "",
    recibio: "",
  });
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const page = parseInt(searchParams.get("page")) || 1;
  const [currentPage, setCurrentPage] = useState(page);
  const [totalPages, setTotalPages] = useState(1);
  const localono = "localhost:4000" //localhost:4000 192.168.100.5:4000

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const navigate = useNavigate();

  //Para el dialogo de eliminar tarjetas
  const handleOpenDelete = (id) => {
    setSelectedCardDel(id);
  };
  const handleCloseDelete = () => {
    setSelectedCardDel(null);
  };

  //Dialogo para añadir nuevas entradas o salidas en el inventario
  const handleOpenDialog = (id, type) => {
    setSelectedCardId(id);
    setSelectedAction(type);
    console.log("handle open dialog:" + selectedCardId);
  };
  const handleCloseDialog = () => {
    setSelectedCardId(null);
    setAddExit({ cantidad: "", uso: "", recibio: "" });
  };

  const handleQuantityChange = (e) =>
    setAddExit({ ...addExit, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    //logica de enviar a Salidas o Entradas
    await fetch(
      `http://${localono}/tasks/${selectedAction}/${selectedCardId}`,
      {
        method: "POST",
        body: JSON.stringify(addExit),
        headers: { "Content-Type": "application/json" },
      }
    );
    await fetch(`http://${localono}/tasks/`, {
      method: "PUT",
    });
    setLoading(false);
    handleCloseDialog();
  };

  //Para abrir o cerrar la imagen
  const handleOpen = (image) => {
    setSelectedImage(image);
  };
  const handleClose = () => {
    setSelectedImage(null);
  };

  useEffect(() => {
    try {
      const loadTasks = async () => {
        const response = await fetch(
          `http://${localono}/tasks/${taskType}?page=${currentPage}&limit=${limit}&search=${searchQuery}`
        );
        const data = await response.json();
        setTasks(data.tasks);
        setTotalPages(data.totalPages);
      };
      loadTasks();
    } catch (error) {}
  }, [taskType, currentPage, limit, totalPages, setTotalPages, searchQuery]);

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      await fetch(
        `http://${localono}/tasks/${taskType}/${selectedCardDel}`,
        {
          method: "DELETE",
        }
      );
      await fetch(`http://${localono}/tasks/`, {
      method: "PUT",
    });
      setTasks(tasks.filter((task) => task.id !== selectedCardDel));
    } catch (error) {
      console.log(error);
    }
    handleCloseDelete();
  };

  function formatDate(timestamp) {
    const date = new Date(timestamp);
    const options = { year: "numeric", month: "short", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  }
  function colorDeCard(taskType) {
    switch (taskType) {
      case "entrada":
        return "#6EB200"; // green
      case "salida":
        return "#FFCA28"; // yellow
      case "inventario":
        return "#006CBF"; // blue
      default:
        return "#6EB200";
    }
  }

  return (
    <>
      <h1>Lista de {taskType}</h1>
      <Box sx={{ display: "flex", justifyContent: "center", mt: 2, mb: 2 }}>
        <Paginacion
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          setTotalPages={setTotalPages}
          colordeBoton={colorDeCard(taskType)}
        />
      </Box>
      <Grid container spacing={2}>
        {tasks.map((task) => (
          <Grid item key={task.id} xs={15} md={10} lg={4}>
            <Card
              style={{
                position: "relative",
                marginBottom: ".5rem",
                backgroundColor: colorDeCard(taskType),
              }}
              key={task.id}
              elevation={1}
            >
              <CardHeader
                sx={{
                  color: "white",
                  position: "relative",
                  zIndex: 1,
                  p: 1.5,
                  height: "100%",
                  textShadow: "1px 1px 2px rgba(0,0,0,0.5)",
                }}
                action={
                  <div>
                    <IconButton
                      onClick={() => navigate(`/${taskType}/${task.id}/editar`)}
                    >
                      <EditOffOutlined />
                    </IconButton>
                    {/*<IconButton onClick={() => handleDelete(task.id)}>*/}
                    <IconButton onClick={() => handleOpenDelete(task.id)}>
                      <DeleteOutlined />
                    </IconButton>
                    <Dialog
                      open={selectedCardDel === task.id}
                      onClose={handleCloseDelete}
                    >
                      <DialogTitle align="center">
                        ¡Está a punto de eliminar {task.nombre}!
                      </DialogTitle>
                      <DialogContent>
                        <Typography
                          align="center"
                          sx={{color: "red"}}
                        >
                          {taskType === "inventario"
                            ? "Eliminar esta entrada en el almacen, eliminará todas las entradas y salidas relacionadas."
                            : " Solo se eliminara esta entrada de la base de datos."}
                        </Typography>
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={handleCloseDelete}>Cancelar</Button>
                        <Button
                          onClick={handleDelete}
                          variant="contained"
                          sx={{
                            background: "#FFCA28",
                          }}
                        >
                          {loading ? (
                            <CircularProgress color="inherit" size={24} />
                          ) : (
                            "Eliminar"
                          )}
                        </Button>
                      </DialogActions>
                    </Dialog>
                  </div>
                }
                title={task.nombre}
                subheader={
                  taskType === "inventario"
                    ? task.grupo
                    : formatDate(task.fecha)
                }
              />
              <CardMedia
                image={task.imagen}
                title={task.nombre}
                src={task.nombre}
                sx={{
                  height: 250,
                  cursor: "pointer",
                }}
                onClick={() => handleOpen(task.imagen)}
                loading="lazy"
              />

              <CardContent
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  backgroundImage:
                    "linear-gradient(to bottom, transparent, rgba(0,0,0,0.5))",
                  //textShadow: "1px 1px 2px rgba(0,0,0,0.5)",
                  textShadow:
                    "0 0 2px black, 0 0 2px black, 0 0 2px black, 0 0 2px black",
                  marginTop: "-130px",
                }}
              >
                <div style={{ color: "white" }}>
                  <Typography>
                    {(() => {
                      switch (taskType) {
                        case "inventario":
                          return "Lugar: " + task.posicion;
                        case "entrada":
                          return "Descripcion: " + task.uso;
                        case "salida":
                          return "Razon de salida: " + task.uso;
                        case "herramienta":
                          return "Número:";
                        default:
                          return "";
                      }
                    })()}
                  </Typography>
                  <Typography>
                    {(() => {
                      switch (taskType) {
                        case "inventario":
                          return "Existencias: ";
                        case "entrada":
                          return "Entradas: ";
                        case "salida":
                          return "Se recibieron: ";
                        case "herramienta":
                          return "Número:";
                        default:
                          return "";
                      }
                    })()}{" "}
                    {task.cantidad} {task.unidad}
                  </Typography>
                  <Typography>
                    {taskType === "salida" ? "Recibio: " + task.recibio : ""}
                  </Typography>
                </div>
              </CardContent>
              <CardActions
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                }}
              >
                {taskType === "inventario" && (
                  <>
                    <Button
                      size="small"
                      style={{
                        color: "white",
                        //textShadow: "1px 1px 2px rgba(0,0,0,0.5)",
                        textShadow:
                          "0 0 2px black, 0 0 2px black, 0 0 2px black, 0 0 2px black",
                      }}
                      onClick={() => handleOpenDialog(task.id, "entrada")}
                    >
                      Añadir
                    </Button>
                    <Button
                      size="small"
                      style={{
                        color: "white",
                        textShadow:
                          "0 0 2px black, 0 0 2px black, 0 0 2px black, 0 0 2px black",
                      }}
                      onClick={() => handleOpenDialog(task.id, "salida")}
                    >
                      Tomar
                    </Button>{" "}
                  </>
                )}
                <Dialog
                  open={selectedCardId === task.id}
                  onClose={handleCloseDialog}
                  // BackdropProps={{ invisible: true }}
                >
                  <DialogTitle>
                    {selectedAction === "entrada"
                      ? "Entrada de:"
                      : "Salida de:"}{" "}
                    {task.nombre}
                  </DialogTitle>
                  <DialogContent>
                    <TextField
                      margin="dense"
                      id="cantidad"
                      label="Cantidad"
                      name="cantidad"
                      value={addExit.cantidad}
                      onChange={handleQuantityChange}
                      fullWidth
                    />
                    <TextField
                      margin="dense"
                      id="uso"
                      label={
                        selectedAction === "entrada" ? "Descripcion" : "Uso"
                      }
                      name="uso"
                      value={addExit.uso}
                      onChange={handleQuantityChange}
                      fullWidth
                    />
                    {selectedAction === "salida" ? (
                      <TextField
                        margin="dense"
                        id="recibio"
                        label="Recibe"
                        name="recibio"
                        value={addExit.recibio}
                        onChange={handleQuantityChange}
                        fullWidth
                      />
                    ) : (
                      ""
                    )}
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleCloseDialog}>Cancelar</Button>
                    {selectedAction === "entrada" ? (
                      <Button
                        onClick={handleSubmit}
                        variant="contained"
                        disabled={!addExit.cantidad}
                        sx={{
                          background: "#6EB200",
                        }}
                      >
                        {loading ? (
                          <CircularProgress color="inherit" size={24} />
                        ) : (
                          "Añadir"
                        )}
                      </Button>
                    ) : (
                      <Button
                        onClick={handleSubmit}
                        variant="contained"
                        disabled={!addExit.cantidad}
                        sx={{
                          background: "#FFCA28",
                        }}
                      >
                        {loading ? (
                          <CircularProgress color="inherit" size={24} />
                        ) : (
                          "Tomar"
                        )}
                      </Button>
                    )}
                  </DialogActions>
                </Dialog>

                <Button
                  style={{
                    color: "white",
                    textShadow:
                      "0 0 2px black, 0 0 2px black, 0 0 2px black, 0 0 2px black",
                  }}
                  onClick={() => handleOpen(task.imagen)}
                >
                  Expandir imagen
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Box sx={{ display: "flex", justifyContent: "center", mt: 2, mb: 2 }}>
        <Paginacion
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          setTotalPages={setTotalPages}
          colordeBoton={colorDeCard(taskType)}
        />
      </Box>
      <Modal
        open={Boolean(selectedImage)}
        onClose={handleClose}
        closeAfterTransition
        onClick={handleClose}
      >
        <Fade in={Boolean(selectedImage)}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
              width: "100vw",
              position: "absolute",
              top: 0,
              left: 0,
            }}
          >
            <img
              src={selectedImage}
              alt="Imagen Ampliada"
              style={{
                maxHeight: "90vh",
                maxWidth: "90vw",
                objectFit: "contain",
              }}
            />
          </div>
        </Fade>
      </Modal>
    </>
  );
}