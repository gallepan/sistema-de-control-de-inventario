import {
  Card,
  CardContent,
  CardMedia,
  CardHeader,
  CardActions,
  IconButton,
  Typography,
  Button,
} from "@mui/material";
import { EditOffOutlined, DeleteOutlined } from "@mui/icons-material";

export default function TaskCard({
  task,
  taskType,
  handleOpen,
  usuario,
  handleOpenDialog,
  handleOpenDelete,
  colorDeCard,
  setSelectedAccion,
  navigate,
  formatDate,
}) {
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
