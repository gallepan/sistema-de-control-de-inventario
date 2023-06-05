import React, { useState } from "react";
import {
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  TextField,
  MenuItem,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { esES } from "@mui/x-date-pickers/locales";
import dayjs from "dayjs";
import "dayjs/locale/es-mx"; // Import the es-mx locale

function ExportarDatos({urlActual}) {
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleAlmacenExportClick = () => {
    const url = `${urlActual}/tasks/exportar/almacen`;
    const fileName = "almacen.csv";

    fetch(url)
      .then((response) => response.blob())
      .then((blob) => {
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = fileName;
        link.click();
        URL.revokeObjectURL(link.href);
      })
      .catch((error) => {
        console.error("Error exporting data:", error);
      });
  };

  const handleEntradasExportClick = () => {
    let url = `${urlActual}/tasks/exportar/entradas`;
    let fileName = "";

    if (selectedOption === "name") {
      fileName = "entradas.csv";
    } else if (selectedOption === "monthYear") {
      const formattedDate = dayjs(selectedDate).format("MM-YYYY");
      const [month, year] = formattedDate.split("-");
      url += `?month=${month}&year=${year}`;
      fileName = `entradas_${formattedDate}.csv`;
    } else {
      fileName = "entradas.csv";
    }

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ selectedOption }),
    })
      .then((response) => response.blob())
      .then((blob) => {
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = fileName;
        link.click();
        URL.revokeObjectURL(link.href);
      })
      .catch((error) => {
        console.error("Error exporting data:", error);
      });
  };

  const handleSalidasExportClick = () => {
    let url = `${urlActual}/tasks/exportar/salidas`;
    let fileName = "";

    if (selectedOption === "name") {
      fileName = "salidas.csv";
    } else if (selectedOption === "monthYear") {
      const formattedDate = dayjs(selectedDate).format("MM-YYYY");
      const [month, year] = formattedDate.split("-");
      url += `?month=${month}&year=${year}`;
      fileName = `salidas_${formattedDate}.csv`;
    } else {
      fileName = "salidas.csv";
    }

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ selectedOption }),
    })
      .then((response) => response.blob())
      .then((blob) => {
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = fileName;
        link.click();
        URL.revokeObjectURL(link.href);
      })
      .catch((error) => {
        console.error("Error exportando datos:", error);
      });
  };

  const handleAccept = (date) => {
    setSelectedDate(date);
  };

  return (
    <div style={{ backgroundColor: "#f0f0f0" }}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Tabla</TableCell>
              <TableCell>Opciones</TableCell>
              <TableCell>Acción</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>Almacen</TableCell>
              <TableCell></TableCell>
              <TableCell>
                <Button onClick={handleAlmacenExportClick}>Exportar</Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Entradas</TableCell>
              <TableCell>
                <TextField
                  select
                  value={selectedOption}
                  onChange={handleOptionChange}
                >
                  <MenuItem value="">Simple</MenuItem>
                  <MenuItem value="name">Exportar con Nombre</MenuItem>
                  <MenuItem value="monthYear">Exportar por Mes/Año</MenuItem>
                </TextField>
                {selectedOption === "monthYear" && (
                  <LocalizationProvider
                    dateAdapter={AdapterDayjs}
                    localeText={
                      esES.components.MuiLocalizationProvider.defaultProps
                        .localeText
                    }
                  >
                    <DatePicker
                      disableFuture
                      label={"MES/AÑO"}
                      value={selectedDate}
                      views={["month", "year"]}
                      onChange={handleAccept}
                    />
                  </LocalizationProvider>
                )}
              </TableCell>
              <TableCell>
                <Button onClick={handleEntradasExportClick}>Exportar</Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Salidas</TableCell>
              <TableCell>
                <TextField
                  select
                  value={selectedOption}
                  onChange={handleOptionChange}
                >
                  <MenuItem value="">Simple</MenuItem>
                  <MenuItem value="name">Exportar con Nombre</MenuItem>
                  <MenuItem value="monthYear">Exportar por Mes/Año</MenuItem>
                </TextField>
                {selectedOption === "monthYear" && (
                  <LocalizationProvider
                    dateAdapter={AdapterDayjs}
                    localeText={
                      esES.components.MuiLocalizationProvider.defaultProps
                        .localeText
                    }
                  >
                    <DatePicker
                      disableFuture
                      label={"MES/AÑO"}
                      value={selectedDate}
                      views={["month", "year"]}
                      onChange={handleAccept}
                    />
                  </LocalizationProvider>
                )}
              </TableCell>
              <TableCell>
                <Button onClick={handleSalidasExportClick}>Exportar</Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default ExportarDatos;

