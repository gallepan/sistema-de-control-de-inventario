import React from 'react';
import { Box, Button, Container, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import { useNavigate } from 'react-router-dom';

export default function PaginaNoEncontrada({iniciado}) {
  const navigate = useNavigate();

  const handleRegresarClick = () => {
    navigate('/inventario')
  };
  const handleRegresarIniciado = () => {
    navigate('/')
  }

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh'
      }}
    >
      <Container maxWidth="md">
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography variant="h1">
              404
            </Typography>
            <Typography variant="h6">
              La página que buscas no existe.
            </Typography>
            {iniciado ? (<Button variant="contained" onClick={handleRegresarClick}>Regresar a inventario</Button>) : (<Button variant="contained" onClick={handleRegresarIniciado}>Regresar a inicio</Button>)}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}