import {
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
  Divider,
  Grid,
} from "@mui/material";
import { EditOffOutlined, DeleteOutlined } from "@mui/icons-material";
import IndeterminateCheckBoxOutlinedIcon from "@mui/icons-material/IndeterminateCheckBoxOutlined";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import { styled } from "@mui/material/styles";

const Root = styled(Card)({
  display: "flex",
  marginBottom: "0.5rem",
  alignItems: "center",
});

const Media = styled(CardMedia)({
  minWidth: "70px",
  minHeight: "70px",
});

const Content = styled(CardContent)({
  flexGrow: 1,
});

const Lista = ({
  task,
  taskType,
  handleOpen,
  usuario,
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
  setSelectedAccion,
}) => {
  
  const isUserTipuser = usuario.tipuser === "user";
  const isDisabled = isUserTipuser ? true : false;

  function colorTexto(taskType) {
    switch (taskType) {
      case "entrada":
        return "#FFFFFF"; // green
      case "salida":
        return "#000000"; // yellow
      case "inventario":
        return "#FFFFFF"; // blue
      default:
        return "#6EB200";
    }
  }
  return (
    <Root
      style={{
        position: "relative",
        backgroundColor: colorDeCard(taskType),
      }}
      key={task.id}
      elevation={1}
    >
      
      <IconButton onClick={() => handleOpen(task.imagen)}>
        <Media
          image={task.imagen}
          nombre={task.nombre}
          src={task.nombre}
          style={{ border: "2px solid #003258", borderRadius: "10%" }}
        />
      </IconButton>
      <Content>
        <Grid container spacing={1} alignItems="center" justifyContent="center">
          <Grid item xs={4} md={2} textAlign="center">
            <Typography
              variant="body2"
              color="textSecondary"
              component="p"
              style={{
                color: colorTexto(taskType),
                textShadow: "1px 1px 1px rgba(0, 0, 0, 0.5)",
              }}
            >
              Nombre
            </Typography>{" "}
            <Typography
              variant="body2"
              color="textSecondary"
              component="p"
              style={{
                color: colorTexto(taskType),
                textShadow: "1px 1px 1px rgba(0, 0, 0, 0.5)",
              }}
            >
              {task.nombre}
            </Typography>{" "}
          </Grid>
          <Divider
            orientation="vertical"
            variant="middle"
            flexItem
            sx={{
              borderLeftWidth: "1px",
              borderRightWidth: "1px",
            }}
          />
          <Grid item xs={4} md={2} textAlign="center">
            <Typography
              variant="body2"
              color="textSecondary"
              component="p"
              style={{
                color: colorTexto(taskType),
                textShadow: "1px 1px 1px rgba(0, 0, 0, 0.5)",
              }}
            >
              {taskType === "inventario" ? "Categoría:" : "Fecha:"}
            </Typography>
            <Typography
              variant="body2"
              color="textSecondary"
              component="p"
              style={{
                color: colorTexto(taskType),
                textShadow: "1px 1px 1px rgba(0, 0, 0, 0.5)",
              }}
            >
              {taskType === "inventario" ? task.grupo : formatDate(task.fecha)}
            </Typography>{" "}
          </Grid>
          <Divider
            orientation="vertical"
            variant="middle"
            flexItem
            sx={{
              borderLeftWidth: "1px",
              borderRightWidth: "1px",
            }}
          />
          <Grid item xs={4} md={2} textAlign="center">
            <Typography
              variant="body2"
              color="textSecondary"
              component="p"
              style={{
                color: colorTexto(taskType),
                textShadow: "1px 1px 1px rgba(0, 0, 0, 0.5)",
              }}
            >
              {(() => {
                switch (taskType) {
                  case "inventario":
                    return "Existencias: ";
                  case "entrada":
                    return "Entradas: ";
                  case "salida":
                    return "Se recibieron";
                  case "herramienta":
                    return "Número:";
                  default:
                    return "";
                }
              })()}{" "}
            </Typography>
            <Typography
              variant="body2"
              color="textSecondary"
              component="p"
              style={{
                color: colorTexto(taskType),
                textShadow: "1px 1px 1px rgba(0, 0, 0, 0.5)",
              }}
            >
              {task.cantidad} {task.unidad}
            </Typography>
          </Grid>
          <Divider
            orientation="vertical"
            variant="middle"
            flexItem
            sx={{
              borderLeftWidth: "1px",
              borderRightWidth: "1px",
            }}
          />
          <Grid item xs={4} md={2} textAlign="center">
            <Typography
              variant="body2"
              color="textSecondary"
              component="p"
              style={{
                color: colorTexto(taskType),
                textShadow: "1px 1px 1px rgba(0, 0, 0, 0.5)",
              }}
            >
              {(() => {
                switch (taskType) {
                  case "inventario":
                    return "Lugar";
                  case "entrada":
                    return "Descripcion";
                  case "salida":
                    return "Razon de salida";
                  case "herramienta":
                    return "Número:";
                  default:
                    return "";
                }
              })()}
            </Typography>
            <Typography
              variant="body2"
              color="textSecondary"
              component="p"
              style={{
                color: colorTexto(taskType),
                textShadow: "1px 1px 1px rgba(0, 0, 0, 0.5)",
              }}
            >
              {(() => {
                switch (taskType) {
                  case "inventario":
                    return task.posicion;
                  case "entrada":
                    return task.uso;
                  case "salida":
                    return task.uso;
                  case "herramienta":
                    return "Número:";
                  default:
                    return " ";
                }
              })()}
            </Typography>
          </Grid>
          <Divider
            orientation="vertical"
            variant="middle"
            flexItem
            sx={{
              borderLeftWidth: "1px",
              borderRightWidth: "1px",
            }}
          />
          {taskType === "salida" ? (
            <Grid item textAlign="center" xs={4} md={3}>
              <Typography
                variant="body2"
                color="textSecondary"
                component="p"
                style={{
                  color: colorTexto(taskType),
                  textShadow: "1px 1px 1px rgba(0, 0, 0, 0.5)",
                }}
              >
                Recibió
              </Typography>
              <Typography
                variant="body2"
                color="textSecondary"
                component="p"
                style={{
                  color: colorTexto(taskType),
                  textShadow: "1px 1px 1px rgba(0, 0, 0, 0.5)",
                }}
              >
                {task.recibio}
              </Typography>
            </Grid>
          ) : (
            " "
          )}
        </Grid>
      </Content>
      <Divider
        orientation="vertical"
        variant="middle"
        flexItem
        sx={{
          borderLeftWidth: "1px",
          borderRightWidth: "1px",
        }}
      />
      <div>
        <IconButton
          onClick={() => navigate(`/${taskType}/${task.id}/editar`)}
          disabled={isDisabled}
        >
          <EditOffOutlined />
        </IconButton>
        <IconButton
          onClick={() => handleOpenDelete(task.id)}
          disabled={isDisabled}
        >
          <DeleteOutlined />
        </IconButton>
        <Divider variant="middle" flexItem />
        <div>
          {taskType === "inventario" && (
            <>
              <IconButton
                onClick={() => {
                  handleOpenDialog(task.id, "entrada");
                  setSelectedAccion("entrada");
                }}
                disabled={isDisabled}
              >
                <AddBoxOutlinedIcon />
              </IconButton>
              <IconButton
                onClick={() => {
                  handleOpenDialog(task.id, "salida");
                  setSelectedAccion("salida");
                }}
              >
                <IndeterminateCheckBoxOutlinedIcon />
              </IconButton>
            </>
          )}
        </div>{" "}
      </div>
    </Root>
  );
};

export default Lista;
