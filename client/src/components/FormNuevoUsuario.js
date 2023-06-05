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
import { useNavigate, useParams } from "react-router-dom";
import { Radio, RadioGroup, FormControlLabel } from "@mui/material";

export default function TaskForm({ typeAction, usuario, urlActual }) {
  const [repetirContra, setRepetirContra] = useState("");

  const [task, setTask] = useState({
    nombre: "",
    alias: "",
    contra: "",
    tipuser: "",
  });

  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);
  const [usuarioId, setUsuarioId] = useState("")

  const navigate = useNavigate();
  const params = useParams();

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!editing && task.contra !== repetirContra) {
      alert("Las contraseñas no coinciden");
      setLoading(false);
      return;
    }

    if (editing) {
      const response = await fetch(`${urlActual}/tasks/usuarios/${usuarioId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(task),
      });
      if (response.status === 409) {
        alert("El alias ya está en uso");
        setLoading(false);
        return;
      }
    } else {
      const response = await fetch(`${urlActual}/tasks/usuarios`, {
        method: "POST",
        body: JSON.stringify(task),
        headers: { "Content-Type": "application/json" },
      });
      if (response.status === 409) {
        alert("El alias ya está en uso");
        setLoading(false);
        return;
      }
    }
    setLoading(false);
    navigate("/usuarios/administrar");
  };
  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
    if (e.target.name === "contra2") {
      setRepetirContra(e.target.value);
    }
  };
  useEffect(() => {
    const loadTask = async (id) => {
      if (typeAction === "editar") {
        const res = await fetch(`${urlActual}/tasks/usuario/${id}`);
        const data = await res.json();
        setTask({
          nombre: data.nombre,
          alias: data.alias,
          contra: data.contra,
          tipuser: data.tipuser,
        });

        setEditing(true);
      }
    };
    if (params.id) {
      loadTask(params.id);
      setUsuarioId(params.id)
      return;
    }
    if (usuario.id) {
      loadTask(usuario.id)
      setUsuarioId(usuario.id)
      return;
    }
  }, [params.id, params.taskType, typeAction, urlActual, usuario.id]);

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justifyContent="center"
    >
      <Card
        sx={{ mt: 4 }}
        style={{ backgroundColor: "#1e272e", padding: "2rem" }}
      >
        <Typography variant="5" textAlign="center" color="white">
          {editing ? "Editar usuario" : "Nuevo usuario"}
        </Typography>
        <CardContent>
          <form onSubmit={handleOnSubmit}>
            <Grid container spacing={2} direction="column">
              <Grid container item spacing={1}>
                <Grid item>
                  <TextField
                    variant="filled"
                    label="Nombre:"
                    name="nombre"
                    value={task.nombre ?? ""}
                    onChange={handleChange}
                    sx={{
                      display: "block",
                      margin: ".5rem 0",
                      "& .MuiInputBase-input.Mui-disabled": {
                        WebkitTextFillColor: "#363839",
                      },
                    }}
                    inputProps={{ style: { color: "white" } }}
                    InputLabelProps={{ style: { color: "white" } }}
                  ></TextField>
                </Grid>
                <Grid item>
                  <TextField
                    variant="filled"
                    label="Alias:"
                    name="alias"
                    value={task.alias ?? ""}
                    onChange={handleChange}
                    sx={{
                      display: "block",
                      margin: ".5rem 0",
                      "& .MuiInputBase-input.Mui-disabled": {
                        WebkitTextFillColor: "#363839",
                      },
                    }}
                    inputProps={{ style: { color: "white" } }}
                    InputLabelProps={{ style: { color: "white" } }}
                  ></TextField>
                </Grid>
              </Grid>
              <Grid container item spacing={1}>
                <Grid item>
                  <TextField
                    variant="filled"
                    label="Contraseña:"
                    type="password"
                    sx={{ display: "block", margin: ".5rem 0" }}
                    name="contra"
                    value={task.contra ?? ""}
                    onChange={handleChange}
                    inputProps={{ style: { color: "white" } }}
                    InputLabelProps={{ style: { color: "white" } }}
                  ></TextField>
                </Grid>
                <Grid item>
                  <TextField
                    variant="filled"
                    label="Por favor, repita su contraseña:"
                    type="password"
                    sx={{ display: "block", margin: ".5rem 0" }}
                    name="contra2"
                    value={repetirContra ?? ""}
                    onChange={handleChange}
                    inputProps={{ style: { color: "white" } }}
                    InputLabelProps={{ style: { color: "white" } }}
                    error={task.contra !== repetirContra}
                    helperText={
                      task.contra !== repetirContra &&
                      "Las contraseñas no coinciden"
                    }
                  ></TextField>
                </Grid>
              </Grid>
            </Grid>
            <RadioGroup
              row
              name="tipuser"
              value={task.tipuser}
              onChange={handleChange}
            >
              <Grid>
                <FormControlLabel
                  value="admin"
                  control={<Radio color="primary" />}
                  label={<span style={{ color: "white" }}>Administrador</span>}
                  disabled={
                    usuario.tipuser === "almacen" || usuario.tipuser === "user"
                  }
                />
                <FormControlLabel
                  value="almacen"
                  control={<Radio />}
                  label={<span style={{ color: "white" }}
                  >Almacenista</span>}
                  disabled={usuario.tipuser === "user"}
                />
                <FormControlLabel
                  value="user"
                  control={<Radio />}
                  label={<span style={{ color: "white" }}>Usuario</span>}
                />
              </Grid>
            </RadioGroup>
            <Button
              variant="contained"
              color="secondary"
              type="submit"
              disabled={
                !task.nombre ||
                !task.alias ||
                !task.tipuser ||
                (!editing && (!task.contra || !repetirContra))
              }
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
  );
}
