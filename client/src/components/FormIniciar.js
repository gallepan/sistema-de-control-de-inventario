import { Button, TextField, Menu, MenuItem, IconButton } from "@mui/material";
import { useState, useRef } from "react";
import Alert from "@mui/material/Alert";
import NotificacionAlerta from "./NotificacionAlerta";
import LoginIcon from "@mui/icons-material/Login";


export default function FormIniciar({ setIniciado, urlActual }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [alias, setAlias] = useState("");
  const [contra, setContra] = useState("");
  const [error, setError] = useState(false);
  const passwordRef = useRef(null);
  const [mostrarMensaje, setMostrarMensaje] = useState(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${urlActual}/tasks/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ alias, contra }),
        credentials: "include",
      });
      if (response.ok) {
        // Entonces el login esta correcto
        setIniciado(true);
        setMostrarMensaje(true);
        handleClose();
      } else {
        const error = await response.text();
        console.error(error);
        setError(true);
      }
    } catch (error) {
      console.error(error);
      setError(true);
    }
  };

  const stopPropagationForTab = (event) => {
    if (event.key === "Tab") {
      event.stopPropagation();
    }
  };
  return (
    <>
      <IconButton
        color="inherit"
        aria-label="Abre login"
        edge="start"
        onClick={handleClick}
      >
        <LoginIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        PaperProps={{ style: { backgroundColor: "#2B2D32" } }}
        className="login-form"
        autoFocus
      >
        <MenuItem>
          <TextField
            label="&#8288;Alias"
            value={alias}
            onChange={(e) => setAlias(e.target.value)}
            inputProps={{ style: { color: "white" } }}
            InputLabelProps={{ style: { color: "white" } }}
            className={error ? "error" : ""}
            onKeyDown={stopPropagationForTab}
          />
        </MenuItem>
        <MenuItem>
          <TextField
            label="&#8288;Contraseña"
            type="password"
            value={contra}
            onChange={(e) => setContra(e.target.value)}
            inputRef={passwordRef}
            inputProps={{ style: { color: "white" } }}
            InputLabelProps={{ style: { color: "white" } }}
            onKeyDown={stopPropagationForTab}
          />
        </MenuItem>
        {error ? (
          <MenuItem>
            <Alert
              variant="outlined"
              severity="error"
              style={{
                color: "#ff0000",
                fontSize: "14px",
              }}
            >
              &#8288;Contraseña o Alias incorrecto
            </Alert>
          </MenuItem>
        ) : (
          ""
        )}
        <MenuItem>
          <Button onClick={handleLogin}>&#8288;Iniciar Sesión</Button>
        </MenuItem>
      </Menu>
      {mostrarMensaje && (
        <NotificacionAlerta
          message={`Bienvenido ${alias}`}
          open={mostrarMensaje}
          setOpen={setMostrarMensaje}
        />
      )}
    </>
  );
}
