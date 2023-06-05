import {
  Typography,
  Drawer,
  List,
  ListItemIcon,
  ListItem,
  ListItemText,
  ListItemButton,
  Divider,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { styled, useTheme } from "@mui/material/styles";
import { useState, useEffect } from "react";

import { Link } from "react-router-dom";
import { SubjectOutlined, AddCircleOutlineOutlined } from "@mui/icons-material";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";

import bannerImage1 from "../img/banner.png";
import bannerImage2 from "../img/banner2.png";

const drawerWidth = 240;
const pages = [
  {
    text: "Inventario",
    icon: <SubjectOutlined color="secondary" />,
    color: "#006CBF",
  },
  {
    text: "Entradas",
    icon: <SubjectOutlined color="secondary" />,
    color: "#6EB200",
  },
  {
    text: "Salidas",
    icon: <SubjectOutlined color="secondary" />,
    color: "#FFCA28",
  },
  {
    text: "Minimos",
    icon: <SubjectOutlined color="secondary" />,
    color: "#1B1C1F",
  },
];

const nuevo = [
  {
    text: "Nuevo consumible",
    page: "nuevo",
    icon: <AddCircleOutlineOutlined color="secondary" />,
  },
];
//Se mueve al abrirse el cajon de la izquierda

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  position: "relative",
  zIndex: 1, // Increase the z-index value
  ...theme.mixins.toolbar,
}));

const Banner = styled("div")(({ theme }) => ({
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  height: "240px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  transition: "opacity 0.5s ease-in-out",
  zIndex: 0,
}));
const DrawerHeaderTitle = styled(Typography)(({ theme }) => ({
  display: "inline-block",
  alignItems: "center",
  marginLeft: "14px",
  color: theme.palette.primary.contrastText,
  fontSize: "0.9rem",
  fontFamily: "Roboto, sans-serif",
  overflow: "hidden",
  whiteSpace: "nowrap",
  paddingRight: theme.spacing(1),
  maxWidth: "240px",
  boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.3)",
  textOverflow: "ellipsis",
}));

export default function Cajonpaginas({ handleDrawerClose, open }) {
  const theme = useTheme();
  const [bannerImages] = useState([bannerImage1, bannerImage2]);
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBannerIndex((prevIndex) =>
        prevIndex === bannerImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, [bannerImages.length]);

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          backgroundColor: "#292B2F",
        },
      }}
      variant="temporary"
      anchor="left"
      onClose={() => {
        handleDrawerClose();
      }}
      open={open}
    >
      <Banner style={{ opacity: 1 }}>
        {bannerImages.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`banner-${index + 1}`}
            style={{
              width: "240px",
              height: "240px",
              position: "absolute",
              transition: "opacity 0.5s ease-in-out",
              opacity: currentBannerIndex === index ? 1 : 0,
            }}
          />
        ))}
      </Banner>
      <DrawerHeader>
        <DrawerHeaderTitle variant="h5">
          Laboratorio de Materiales Compuestos
        </DrawerHeaderTitle>
        <div>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon color="primary" />
            ) : (
              <ChevronRightIcon color="primary" />
            )}
          </IconButton>
        </div>
      </DrawerHeader>
      <Divider sx={{ marginTop: "170px" }} />
      <List>
        <ListItem
          key={"inicio"}
          disablePadding
          component={Link}
          to="/"
          sx={{ my: 1, color: "white", display: "block" }}
        >
          <ListItemButton sx={{ ":hover": { backgroundColor: "#1B1C1F" } }}>
            <ListItemIcon>
              <HomeOutlinedIcon color="secondary" />
            </ListItemIcon>
            <ListItemText primary="Inicio" />
          </ListItemButton>
        </ListItem>
        <Divider />
        {pages.map((page) => (
          <ListItem
            key={page.text}
            disablePadding
            component={Link}
            to={`/${page.text}?page=1`}
            sx={{ my: 1, color: "white", display: "block" }}
          >
            <ListItemButton sx={{ ":hover": { backgroundColor: page.color } }}>
              <ListItemIcon>{page.icon}</ListItemIcon>
              <ListItemText primary={page.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {nuevo.map((page) => (
          <ListItem
            key={page.text}
            disablePadding
            component={Link}
            to={`/${page.page}`}
            sx={{ my: 1, color: "white", display: "block" }}
          >
            <ListItemButton>
              <ListItemIcon>{page.icon}</ListItemIcon>
              <ListItemText primary={page.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}
