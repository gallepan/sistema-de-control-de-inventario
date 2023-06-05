import * as React from "react";
import {IconButton} from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";
import { Link } from "react-router-dom";
import {Divider} from "@mui/material"
import AccountBoxIcon from '@mui/icons-material/AccountBox';

export default function FadeMenu({ setIniciado, usuario, urlActual }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${urlActual}/tasks/logout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      if (response.ok) {
        console.log("Cerrando sesion");
        setIniciado(false);
        handleClose();
        window.location.reload(); 
      } else {
        const error = await response.text();
        console.error(error);
      }
    } catch (error) {
      console.error(error);
    }
    handleClose();
  };

  return (
    <div>
      <IconButton
        id="fade-button"
        color="inherit"
        aria-controls={open ? "fade-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <AccountBoxIcon sx={{ fontSize: 40 }} />
      </IconButton>
      <Menu
        id="fade-menu"
        MenuListProps={{
          "aria-labelledby": "fade-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
        PaperProps={{ style: { backgroundColor: "#2B2D32" } }}
      >
        <MenuItem style={{ textDecoration: "none", color: "#eee" }}>Bienvenido {usuario.nombre}</MenuItem>
        <Divider/>
        {usuario.tipuser === "user" ? "" : (<MenuItem onClick={handleClose}>
          <Link
            to="/usuario/nuevo"
            style={{ textDecoration: "none", color: "#eee" }}
            onMouseEnter={(e) => (e.target.style.color = "#1976D2")}
            onMouseLeave={(e) => (e.target.style.color = "#ffffff")}
          >
            Nuevo usuario
          </Link>
        </MenuItem>) }
        {usuario.tipuser === "admin" ? (<MenuItem onClick={handleClose}>
          <Link
            to="/usuarios/administrar"
            style={{ textDecoration: "none", color: "#eee" }}
            onMouseEnter={(e) => (e.target.style.color = "#1976D2")}
            onMouseLeave={(e) => (e.target.style.color = "#ffffff")}
          >
            Administrar usuarios
          </Link>
        </MenuItem>) : "" }
        {usuario.tipuser === "admin" ? (<MenuItem onClick={handleClose}>
          <Link
            to="/administrar/base-de-datos"
            style={{ textDecoration: "none", color: "#eee" }}
            onMouseEnter={(e) => (e.target.style.color = "#1976D2")}
            onMouseLeave={(e) => (e.target.style.color = "#ffffff")}
          >
            Administrar base de datos
          </Link>
        </MenuItem>) : ""}
        <MenuItem>
        <Link
            to="/usuario/editar/perfil"
            style={{ textDecoration: "none", color: "#eee" }}
            onMouseEnter={(e) => (e.target.style.color = "#1976D2")}
            onMouseLeave={(e) => (e.target.style.color = "#ffffff")}
          >
            Editar perfil
          </Link>
          </MenuItem>
        <MenuItem
          onClick={handleLogout}
          style={{ textDecoration: "none", color: "#eee" }}
          onMouseEnter={(e) => (e.target.style.color = "#1976D2")}
          onMouseLeave={(e) => (e.target.style.color = "#ffffff")}
        >
          Cerrar sesión
        </MenuItem>
      </Menu>
    </div>
  );
}
