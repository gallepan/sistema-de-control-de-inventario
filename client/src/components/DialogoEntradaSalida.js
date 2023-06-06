import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  CircularProgress,
} from "@mui/material";
import Alert from "@mui/material/Alert";

function DialogoEntradaSalida({
  task,
  taskType,
  handleDelete,
  handleCloseDialog,
  handleCloseDelete,
  handleQuantityChange,
  handleSubmit,
  selectedCardDel,
  selectedCardId,
  loading,
  addExit,
  selectedAccion,
}) {
  return (
    <>
      {" "}
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
              Eliminar esta entrada en el almacen, eliminará todas las entradas
              y salidas relacionadas.
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
    </>
  );
}

export default DialogoEntradaSalida;
