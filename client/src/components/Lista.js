import {
  Card,
  CardContent,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  CardMedia,
  IconButton,
  Typography,
  Button,
  CircularProgress,
  Divider,
  Grid,
} from "@mui/material";
import { EditOffOutlined, DeleteOutlined } from "@mui/icons-material";
import IndeterminateCheckBoxOutlinedIcon from "@mui/icons-material/IndeterminateCheckBoxOutlined";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import { styled } from "@mui/material/styles";
import { useState } from "react";
import Alert from "@mui/material/Alert";

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
}) => {
  const [selectedAccion, setSelectedAccion] = useState();
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
        <IconButton onClick={() => navigate(`/${taskType}/${task.id}/editar`)} disabled={isDisabled}>
          <EditOffOutlined />
        </IconButton>
        <IconButton onClick={() => handleOpenDelete(task.id)} disabled={isDisabled}>
          <DeleteOutlined />
        </IconButton>
        <Divider variant="middle" flexItem />
        <Dialog
          open={selectedCardDel === task.id}
          onClose={handleCloseDelete}
          sx={{ color: "#36393F" }}
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
          <Dialog open={selectedCardId === task.id} onClose={handleCloseDialog}>
            <DialogTitle>
              {selectedAccion === "entrada" ? "Entrada de:" : "Salida de:"}{" "}
              {task.nombre}
            </DialogTitle>
            <DialogContent>
              <TextField
              key="1"
                margin="dense"
                id="cantidad"
                label="Cantidad"
                name="cantidad"
                value={addExit.cantidad}
                onChange={handleQuantityChange}
                fullWidth
              />
              <TextField
              key="2"
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
                key="3"
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
        </div>{" "}
      </div>
    </Root>
  );
};

export default Lista;
