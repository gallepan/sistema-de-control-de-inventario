import React from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  CardActions,
  CardMedia,
} from "@mui/material";
import { Link } from "react-router-dom";
import { StorageOutlined, ArrowForwardOutlined } from "@mui/icons-material";
import background from "../img/icon-right.png";

export default function PaginaInicio() {
  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justifyContent="center"
    >
      <Card
        sx={{
          mt: 2,
          maxWidth: 600,
          backgroundColor: "#1e272e",
          padding: -1,
          position: "relative", 
        }}
      >
        <CardMedia
          component="img"
          image={background}
          alt="Background Image"
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "100%",
            height: "100%",
            filter: "brightness(0.4)",
            zIndex: 0,
          }}
          style={{ width: "500px", height: "500px"}}
        />
        <CardContent
          sx={{
            position: "relative",
            zIndex: 1,
            padding: "2rem",
          }}
        >
          <Typography variant="h6" gutterBottom color="white">
            ¡Bienvenidos al Sistema de Control de Inventario!
          </Typography>
          <Typography variant="body1" gutterBottom color="white">
            Nuestro sistema está diseñado para brindar un control sobre la cantidad de consumibles en nuestro inventario.
          </Typography>
          <Typography variant="body1" gutterBottom color="white">
            Mantener un inventario adecuado es crucial para garantizar que
            siempre tengamos suficientes suministros disponibles cuando los
            necesitemos.
          </Typography>
          <Typography variant="body1" gutterBottom color="white">
            El sistema consta de tres páginas principales: Inventario, Entradas y
            Salidas. Cada una de estas páginas desempeña un papel importante en
            el control y seguimiento de nuestros consumibles.
          </Typography>
          <Typography variant="body1" gutterBottom color="white">
            Con este sistema, puedes acceder a las siguientes secciones:
          </Typography>
          <Grid container spacing={2} sx={{ mt: 4 }}>
          <Grid item xs={12} sm={4}>
              <Card>
                <CardContent>
                  <Typography variant="subtitle1" gutterBottom>
                    Inventario
                  </Typography>
                  <StorageOutlined
                    fontSize="large"
                    color="primary"
                  />
                </CardContent>
                <CardActions>
                  <Button
                    component={Link}
                    to="/inventario"
                    endIcon={<ArrowForwardOutlined />}
                  >
                    Ver más
                  </Button>
                </CardActions>
              </Card>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Card>
                <CardContent>
                  <Typography variant="subtitle1" gutterBottom>
                    Entradas
                  </Typography>
                  <StorageOutlined
                    fontSize="large"
                    sx={{ color: "#4caf50" }}
                  />
                </CardContent>
                <CardActions>
                  <Button
                    component={Link}
                    to="/entradas"
                    endIcon={<ArrowForwardOutlined />}
                  >
                    Ver más
                  </Button>
                </CardActions>
              </Card>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Card>
                <CardContent>
                  <Typography variant="subtitle1" gutterBottom>
                    Salidas
                  </Typography>
                  <StorageOutlined
                    fontSize="large"
                    sx={{ color: "#ffab00" }}
                  />
                </CardContent>
                <CardActions>
                  <Button
                    component={Link}
                    to="/salidas"
                    endIcon={<ArrowForwardOutlined />}
                  >
                    Ver más
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <Card sx={{ mt: 1, maxWidth: 400, backgroundColor: "#0A1929", color: "#FFFFFF" }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Material-UI
          </Typography>
          <Typography variant="body1" gutterBottom>
            El diseño y los iconos utilizados en este proyecto son
            proporcionados por Material-UI.
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            component={Link}
            to="https://mui.com/"
            endIcon={<ArrowForwardOutlined />}
          >
            Ver más
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
}
