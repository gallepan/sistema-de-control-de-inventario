import { Fade, Grid, Modal, Typography } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Paginacion from "./Paginacion";
import { Box } from "@mui/system";
import TaskCard from "./TaskCard";
import Lista from "./Lista";
import ModoVista from "./ModoVista";
import MenuOrdenar from "./MenuOrdenar";

export default function TaskLists({
  taskType,
  searchQuery,
  usuario,
  urlActual
}) {
  const [tasks, setTasks] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const limit = 18;
  const [selectedCardId, setSelectedCardId] = useState(null);
  const [selectedCardDel, setSelectedCardDel] = useState(null);
  const [selectedAction, setSelectedAction] = useState();
  const [loading, setLoading] = useState(false);
  //Variables de busqueda
  const [searchGrupo, setSearchGrupo] = useState("");
  const [searchMonth, setSearchMonth] = useState("");
  const [searchYear, setSearchYear] = useState("");
  const [ordenar, setOrdenar] = useState("DESC");

  const [selectedDate, setSelectedDate] = useState("");

  const [addExit, setAddExit] = useState({
    cantidad: "",
    uso: "",
    recibio: usuario.nombre,
  });
  //Para seleccionar el modo de vista actual
  const [modoVista, setModoVista] = useState(() => {
    const savedModoVista = localStorage.getItem("modoVista");
    return savedModoVista !== null ? savedModoVista : "lista";
  });
  useEffect(() => {
    localStorage.setItem("modoVista", modoVista);
  }, [modoVista]);

  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const page = parseInt(searchParams.get("page")) || 1;
  const [currentPage, setCurrentPage] = useState(page);
  const [totalPages, setTotalPages] = useState(1);

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
    setAddExit({recibio: usuario.nombre});
    setSelectedAction(type);
  };
  const handleCloseDialog = () => {
    setSelectedCardId(null);
    setAddExit({ cantidad: "", uso: "", recibio: usuario.nombre });
  };
  
  const handleQuantityChange = (e) =>
    setAddExit({ ...addExit, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    //logica de enviar a Salidas o Entradas
    await fetch(
      `${urlActual}/tasks/${selectedAction}/${selectedCardId}`,
      {
        method: "POST",
        body: JSON.stringify(addExit),
        headers: { "Content-Type": "application/json" },
      }
    );
    await fetch(`${urlActual}/tasks/`, {
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
          `${urlActual}/tasks/${taskType}?page=${currentPage}&limit=${limit}&search=${searchQuery}&grupo=${searchGrupo}&month=${searchMonth}&year=${searchYear}&sort=${ordenar}`
        );
        const data = await response.json();
        setTasks(data.tasks);
        setTotalPages(data.totalPages);
      };
      loadTasks();
    } catch (error) {}
  }, [
    taskType,
    currentPage,
    limit,
    totalPages,
    setTotalPages,
    searchGrupo,
    searchMonth,
    searchYear,
    ordenar,
    searchQuery,
    urlActual,
  ]);

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      await fetch(`${urlActual}/tasks/${taskType}/${selectedCardDel}`, {
        method: "DELETE",
      });
      await fetch(`${urlActual}/tasks/`, {
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
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <h1 style={{ flex: 1 }}>Lista de {taskType}</h1>
          <MenuOrdenar
            searchGrupo={searchGrupo}
            setSearchGrupo={setSearchGrupo}
            setSearchMonth={setSearchMonth}
            setSearchYear={setSearchYear}
            taskType={taskType}
            color={colorDeCard(taskType)}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            ordenar={ordenar}
            setOrdenar={setOrdenar}
          />
        </div>
        <div>
          <Typography>Modo de vista:</Typography>
          <ModoVista
            modoVista={modoVista}
            setModoVista={setModoVista}
            color={colorDeCard(taskType)}
          />
        </div>
      </div>

      <Box sx={{ display: "flex", justifyContent: "center", mt: 2, mb: 2 }}>
        <Paginacion
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          setTotalPages={setTotalPages}
          colordeBoton={colorDeCard(taskType)}
        />
      </Box>
      <Grid container spacing={1}>
        {tasks.map((task) =>
          modoVista === "cuadrada" ? (
            <Grid item key={task.id} xs={15} md={10} lg={4}>
              <TaskCard
                usuario={usuario}
                task={task}
                taskType={taskType}
                handleOpen={handleOpen}
                handleDelete={handleDelete}
                handleOpenDialog={handleOpenDialog}
                handleCloseDialog={handleCloseDialog}
                handleOpenDelete={handleOpenDelete}
                handleCloseDelete={handleCloseDelete}
                handleQuantityChange={handleQuantityChange}
                handleSubmit={handleSubmit}
                selectedCardDel={selectedCardDel}
                selectedCardId={selectedCardId}
                selectedCardAction={selectedAction}
                loading={loading}
                colorDeCard={colorDeCard}
                navigate={navigate}
                addExit={addExit}
                formatDate={formatDate}
              />
            </Grid>
          ) : (
            <Grid item key={task.id} xs={12} md={12} lg={12}>
              <Lista
                usuario={usuario}
                task={task}
                taskType={taskType}
                handleOpen={handleOpen}
                handleDelete={handleDelete}
                handleOpenDialog={handleOpenDialog}
                handleCloseDialog={handleCloseDialog}
                handleOpenDelete={handleOpenDelete}
                handleCloseDelete={handleCloseDelete}
                handleQuantityChange={handleQuantityChange}
                handleSubmit={handleSubmit}
                selectedCardDel={selectedCardDel}
                selectedCardId={selectedCardId}
                selectedCardAction={selectedAction}
                loading={loading}
                colorDeCard={colorDeCard}
                navigate={navigate}
                addExit={addExit}
                formatDate={formatDate}
              />{" "}
            </Grid>
          )
        )}
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
