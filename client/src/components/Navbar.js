import { Box, Toolbar, Typography, useMediaQuery } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import MuiAppBar from "@mui/material/AppBar";
import MenuIcon from "@mui/icons-material/Menu";
import { styled } from "@mui/material/styles";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

import BarraBusqueda from "./BarraBusqueda";
import Cajonpaginas from "./Cajonpaginas";
import FormIniciar from "./FormIniciar";
import FadeMenu from "./AdministrarPerfil";

import iconLeft from "../img/icon-left.png";
import SearchIcon from "@mui/icons-material/Search";
//import iconRight from "../img/icon-right.png";

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

export default function Navbar({
  setSearchQuery,
  iniciado,
  setIniciado,
  usuario,
  urlActual,
}) {
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const location = useLocation();
  const [isHomePage, setIsHomePage] = useState(false);
  const isMobile = useMediaQuery("(max-width: 600px)");
  const [buscar, setBuscar] = useState(false);

  useEffect(() => {
    setIsHomePage(location.pathname === "/");
  }, [location.pathname]);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleBuscarOpen = () => {
    setBuscar((prevState) => !prevState);
  };

  const shouldDisplaySearchBar =
    location.pathname.includes("/Inventario") ||
    location.pathname.includes("/inventario") ||
    location.pathname.includes("/Salidas") ||
    location.pathname.includes("/Entradas");

  const navbarStyle = {
    backgroundColor: isHomePage ? "#1e272e" : "transparent",
    // Add other styling properties as needed
  };

  return (
    <div>
      <Box sx={{ display: "flex" }}>
        <AppBar position="fixed" sx={navbarStyle} open={open}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{ mr: 3, ...(open && { display: "none" }) }}
            >
              <MenuIcon />
            </IconButton>
            
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <img
            src={iconLeft}
            alt="Icon Left"
            style={{ width: "55px", height: "55px", marginTop: "2px", marginBottom: "2px" }}
          />
          <Typography variant="h6" noWrap component="div" sx={{ marginTop: "2px", marginBottom: "2px" }}>
            <Link
              to="/Inventario"
              style={{ textDecoration: "none", color: "#eee" }}
            >
              CONSUMIBLES
            </Link>
          </Typography>
        </Box>
            
            <Box sx={{ flexGrow: 1 }} />
            {!isMobile && shouldDisplaySearchBar && (
              <BarraBusqueda setSearchQuery={setSearchQuery} />
            )}
            {isMobile && shouldDisplaySearchBar && (
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleBuscarOpen}
              >
                <SearchIcon />
              </IconButton>
            )}
            
            {!iniciado ? (
              <Box sx={{ marginLeft: '1px' }}>
              <FormIniciar
                open={openModal}
                onClose={handleCloseModal}
                setIniciado={setIniciado}
                urlActual={urlActual}
              />
            </Box>
            ) : (
              <FadeMenu setIniciado={setIniciado} usuario={usuario} urlActual={urlActual}/>
            )}
          </Toolbar>
          
        </AppBar>
        {isMobile && shouldDisplaySearchBar && buscar && (
          <AppBar
            position="fixed"
            sx={{ marginTop: "56px", backgroundColor: "transparent" }}
          >
            <BarraBusqueda setSearchQuery={setSearchQuery} />
          </AppBar>
        )}
        <Toolbar />
      </Box>
      <Cajonpaginas handleDrawerClose={handleDrawerClose} open={open} />
    </div>
  );
}
