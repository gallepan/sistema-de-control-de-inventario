import {
  Card,
  CardContent,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  CardMedia,
  CardHeader,
  CardActions,
  IconButton,
  Typography,
  Button,
  CircularProgress,
} from "@mui/material";
import { EditOffOutlined, DeleteOutlined } from "@mui/icons-material";
import { useState } from "react";
import Alert from "@mui/material/Alert";
//import NotificacionAlerta from "./NotificacionAlerta";

export default function TaskCard({
  task,
  taskType,
  usuario,
  handleOpen,
  handleDelete,
  handleOpenDialog,
  handleCloseDialog,
  handleOpenDelete,
  handleCloseDelete,
  handleQuantityChange,
  handleSubmit,
  selectedCardDel,
  selectedCardId,
  loading,
  colorDeCard,
  navigate,
  addExit,
  formatDate,
}) {
  const [selectedAccion, setSelectedAccion] = useState();
  const isUserTipuser = usuario.tipuser === "user";
  const isDisabled = isUserTipuser ? true : false;

  return (
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
              disabled={isDisabled}
            >
              <EditOffOutlined />
            </IconButton>
            <IconButton onClick={() => handleOpenDelete(task.id)} disabled={isDisabled}>
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
                {taskType === "inventario" ? (
                  <Alert variant="outlined" severity="error">
                    Eliminar esta entrada en el almacen, eliminará todas las
                    entradas y salidas relacionadas.
                  </Alert>
                ) : (
                  <Alert variant="outlined" severity="warning">
                    Solo se eliminara esta entrada de la base de datos.
                  </Alert>
                )}
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
          taskType === "inventario" ? task.grupo : formatDate(task.fecha)
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
              disabled={isDisabled}
              style={{
                color: "white",
                //textShadow: "1px 1px 2px rgba(0,0,0,0.5)",
                textShadow:
                  "0 0 2px black, 0 0 2px black, 0 0 2px black, 0 0 2px black",
              }}
              onClick={() => {
                handleOpenDialog(task.id, "entrada");
                setSelectedAccion("entrada");
              }}
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
              onClick={() => {
                handleOpenDialog(task.id, "salida");
                setSelectedAccion("salida");
              }}
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
            {selectedAccion === "entrada" ? "Entrada de:" : "Salida de:"}{" "}
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
              label={selectedAccion === "entrada" ? "Descripcion" : "Uso"}
              name="uso"
              value={addExit.uso}
              onChange={handleQuantityChange}
              fullWidth
            />
            {selectedAccion === "salida" ? (
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
            {selectedAccion === "entrada" ? (
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
  );
}
