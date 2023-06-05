import React, { useState } from "react";
import { Card, Typography, Tabs, Tab } from "@mui/material";
import ConfigurarSecuencias from "./tabsDatos/ConfigurarSecuencias";
import ExportarDatos from "./tabsDatos/ExportarDatos";
import ImportarDatos from "./tabsDatos/ImportarDatos";
import { useNavigate } from "react-router-dom";

function AdministrarDatos({urlActual}) {
  const [activeTab, setActiveTab] = useState(0);
  const navigate = useNavigate();

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
    navigate(`/Administrar/Base-de-datos/${getTabPath(newValue)}`);
  };

  const getTabPath = (tabIndex) => {
    switch (tabIndex) {
      case 0:
        return "Exportar";
      case 1:
        return "Importar";
      case 2:
        return "Configuracion";
      default:
        return "";
    }
  };

  return (
    <Card
      sx={{ mt: 2 }}
      style={{ backgroundColor: "#1F2430", padding: "2rem" }}
    >
      <Typography variant="h5" textAlign="center" color="white">
        Base de datos
      </Typography>

      <Tabs value={activeTab} onChange={handleTabChange} centered>
        <Tab label="Exportar" sx={{ color: "white" }} />
        <Tab label="Importar" sx={{ color: "white" }} />
        <Tab label="Configuración" sx={{ color: "white" }} />
      </Tabs>

      {activeTab === 0 && (
        <div>
          <Typography variant="h6" color="white">
            Exportar datos
          </Typography>
          <ExportarDatos urlActual={urlActual}/>
        </div>
      )}

      {activeTab === 1 && (
        <div>
          <Typography variant="h6" color="white">
            Importar datos
          </Typography>
          <ImportarDatos urlActual={urlActual}/>
        </div>
      )}

      {activeTab === 2 && (
        <div>
          <Typography variant="h6" color="white">
            Configuración de secuencias
          </Typography>
          <ConfigurarSecuencias urlActual={urlActual}/>
        </div>
      )}
    </Card>
  );
}

export default AdministrarDatos;
