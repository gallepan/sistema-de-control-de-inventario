import {
  Button,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useState, useEffect } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import { useNavigate, useParams } from "react-router-dom";
import { styled } from "@mui/material/styles";

const StyledAutocomplete = styled(Autocomplete)({
  "& .MuiInputLabel-outlined:not(.MuiInputLabel-shrink)": {
    // Default transform is "translate(14px, 20px) scale(1)""
    // This lines up the label with the initial cursor position in the input
    // after changing its padding-left.
    transform: "translate(34px, 20px) scale(1);",
  },
  "&.Mui-focused .MuiInputLabel-outlined": {
    color: "purple",
  },
  "& .MuiAutocomplete-inputRoot": {
    color: "white",
    // This matches the specificity of the default styles at https://github.com/mui-org/material-ui/blob/v4.11.3/packages/material-ui-lab/src/Autocomplete/Autocomplete.js#L90
    '&[class*="MuiOutlinedInput-root"] .MuiAutocomplete-input:first-of-type': {
      // Default left padding is 6px
      paddingLeft: 26,
    },
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "green",
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "red",
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "purple",
    },
  },
});

export default function TaskForm({ typeAction, usuario, urlActual }) {
  const [task, setTask] = useState({
    nombre: "",
    grupo: "",
    cantidad: "",
    unidad: "",
    uso: "",
    posicion: "",
    imagen: "",
    recibio: "",
    minimo: "",
  });

  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);

  const navigate = useNavigate();
  const params = useParams();

  const [grupos, setGrupos] = useState([]);
  useEffect(() => {
    try {
      const loadGrupos = async () => {
        const response = await fetch(`${urlActual}/tasks/grupo`);
        const data = await response.json();
        setGrupos(data);
      };
      loadGrupos();
    } catch (error) {}
  }, [urlActual]);

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (editing) {
      const updatedTask = { ...task, usuarioNombre: usuario.nombre };

      await fetch(`${urlActual}/tasks/${params.taskType}/${params.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedTask),
      });
      await fetch(`${urlActual}/tasks`, {
        method: "PUT",
      });
      await fetch(`${urlActual}/tasks/minimo/${params.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(task),
      });
    } else {
      await fetch(`${urlActual}/tasks`, {
        method: "POST",
        body: JSON.stringify(task),
        headers: { "Content-Type": "application/json" },
      });
      await fetch(`${urlActual}/tasks/`, {
        method: "PUT",
      });
    }
    setLoading(false);
    navigate("/inventario");
  };
  const handleChange = (e) =>
    setTask({ ...task, [e.target.name]: e.target.value });

  const handleGrupoChange = (event, value) => {
    setTask({ ...task, grupo: value });
  };
  useEffect(() => {
    const loadTask = async (id) => {
      if (typeAction === "editar") {
        const res = await fetch(
          `${urlActual}/tasks/${params.taskType}/${id}`
        );
        const data = await res.json();
        setTask({
          nombre: data.nombre,
          grupo: data.grupo,
          cantidad: data.cantidad,
          unidad: data.unidad,
          uso: data.uso,
          posicion: data.posicion,
          imagen: data.imagen,
          recibio: data.recibio,
        });
        setEditing(true);
      }
    };
    if (params.id) {
      loadTask(params.id);
    }
  }, [params.id, params.taskType, typeAction, urlActual]);

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justifyContent="center"
    >
      <Grid item xs={12} md={8}>
        <Card
          sx={{ mt: 2 }}
          style={{ backgroundColor: "#1e272e", padding: "2rem" }}
        >
          <Typography variant="5" textAlign="center" color="white">
            {editing ? "Editar " + params.taskType : "Nuevo inventario"}
          </Typography>
          <CardContent>
            <form onSubmit={handleOnSubmit}>
              <Grid container spacing={2} direction="column">
                <Grid container item spacing={1}>
                  <Grid item>
                    <TextField
                      focused
                      color="primary"
                      variant="filled"
                      label="Nombre:"
                      //cambiar cosas
                      name="nombre"
                      value={task.nombre ?? ""}
                      onChange={handleChange}
                      disabled={
                        params.taskType === "salida" ||
                        params.taskType === "entrada"
                          ? true
                          : false
                      }
                      sx={{
                        display: "block",
                        margin: ".5rem 0",
                        "& .MuiInputBase-input.Mui-disabled": {
                          WebkitTextFillColor: "#363839",
                        },
                      }}
                      inputProps={{ style: { color: "white" } }}
                      InputLabelProps={{ style: { color: "white" } }}
                    />
                  </Grid>
                  <Grid item xs={8} md={6}>
                    <StyledAutocomplete
                      selectOnFocus
                      clearOnBlur
                      handleHomeEndKeys
                      id="FreeSolo"
                      freeSolo
                      disableClearable
                      options={grupos.map((option) => option.grupo)}
                      value={task.grupo ?? undefined}
                      onChange={handleGrupoChange}
                      renderInput={(params) => (
                        <TextField
                          focused
                          color="primary"
                          name="grupo"
                          variant="filled"
                          onChange={handleChange}
                          {...params}
                          label="Categoría:"
                          InputLabelProps={{ style: { color: "white" } }}
                        />
                      )}
                    />
                  </Grid>{" "}
                </Grid>
                <Grid container item spacing={1}>
                  <Grid item>
                    <TextField
                      focused
                      color="primary"
                      variant="filled"
                      label="Cantidad:"
                      sx={{ display: "block", margin: ".5rem 0" }}
                      //cambiar cosas
                      name="cantidad"
                      value={task.cantidad ?? ""}
                      onChange={handleChange}
                      inputProps={{ style: { color: "white" } }}
                      InputLabelProps={{ style: { color: "white" } }}
                    />
                  </Grid>
                  <Grid item>
                    <TextField
                      focused
                      color="primary"
                      variant="filled"
                      label="Unidad"
                      //cambiar cosas
                      name="unidad"
                      value={task.unidad ?? ""}
                      onChange={handleChange}
                      disabled={
                        params.taskType === "salida" ||
                        params.taskType === "entrada"
                          ? true
                          : false
                      }
                      sx={{
                        display: "block",
                        margin: ".5rem 0",
                        "& .MuiInputBase-input.Mui-disabled": {
                          WebkitTextFillColor: "#363839",
                        },
                      }}
                      inputProps={{ style: { color: "white" } }}
                      InputLabelProps={{ style: { color: "white" } }}
                    />
                  </Grid>
                </Grid>
                <Grid container item spacing={1}>
                  <Grid item>
                    <TextField
                      focused
                      variant="filled"
                      color="primary"
                      label="Posicion en el estante"
                      //cambiar cosas
                      name="posicion"
                      value={task.posicion ?? ""}
                      onChange={handleChange}
                      disabled={
                        params.taskType === "salida" ||
                        params.taskType === "entrada"
                          ? true
                          : false
                      }
                      sx={{
                        display: "block",
                        margin: ".5rem 0",
                        "& .MuiInputBase-input.Mui-disabled": {
                          WebkitTextFillColor: "#363839",
                        },
                      }}
                      inputProps={{ style: { color: "white" } }}
                      InputLabelProps={{ style: { color: "white" } }}
                    />
                  </Grid>
                  <Grid item>
                    <TextField
                      focused
                      color="primary"
                      variant="filled"
                      label={
                        params.taskType === "salida"
                          ? "Razon de salida: "
                          : "Uso: "
                      }
                      sx={{ display: "block", margin: ".5rem 0" }}
                      //cambiar cosas
                      name="uso"
                      value={task.uso ?? ""}
                      onChange={handleChange}
                      inputProps={{ style: { color: "white" } }}
                      InputLabelProps={{ style: { color: "white" } }}
                      disabled={params.taskType === "inventario" ? true : false}
                    />
                  </Grid>
                </Grid>
                <Grid container item spacing={1}>
                  <Grid item>
                    <TextField
                      focused
                      color="primary"
                      variant="filled"
                      label="Cantidad Minima: "
                      sx={{ display: "block", margin: ".5rem 0" }}
                      //cambiar cosas
                      name="minimo"
                      value={task.minimo ?? ""}
                      onChange={handleChange}
                      inputProps={{ style: { color: "white" } }}
                      InputLabelProps={{ style: { color: "white" } }}
                      disabled={editing ? false : true}
                    />
                  </Grid>{" "}
                  {params.taskType === "salida" ? (
                    <Grid item>
                      <TextField
                        focused
                        color="primary"
                        variant="filled"
                        label="Recibio: "
                        sx={{ display: "block", margin: ".5rem 0" }}
                        //cambiar cosas
                        name="recibio"
                        value={task.recibio ?? ""}
                        onChange={handleChange}
                        inputProps={{ style: { color: "white" } }}
                        InputLabelProps={{ style: { color: "white" } }}
                      />{" "}
                    </Grid>
                  ) : (
                    " "
                  )}
                </Grid>
              </Grid>

              <TextField
                variant="filled"
                focused
                color="primary"
                label="Añade un enlace a una imagen"
                multiline
                rows={4}
                fullWidth
                name="imagen"
                value={task.imagen ?? ""}
                onChange={handleChange}
                disabled={
                  params.taskType === "salida" || params.taskType === "entrada"
                    ? true
                    : false
                }
                sx={{
                  display: "block",
                  margin: ".6rem 0",
                  "& .MuiInputBase-input.Mui-disabled": {
                    WebkitTextFillColor: "#363839",
                  },
                }}
                inputProps={{ style: { color: "white" } }}
                InputLabelProps={{ style: { color: "white" } }}
              />

              <Button
                variant="contained"
                color="secondary"
                type="submit"
                disabled={!task.nombre || !task.cantidad}
              >
                {loading ? (
                  <CircularProgress color="inherit" size={24} />
                ) : editing ? (
                  "Editar"
                ) : (
                  "Crear"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
