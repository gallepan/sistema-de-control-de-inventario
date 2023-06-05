import * as React from "react";
import { DataGrid, esES } from "@mui/x-data-grid";
import { useState, useEffect } from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function TablaUsuarios({urlActual}) {
  const [tasks, setTasks] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const loadTasks = async () => {
        const response = await fetch(`${urlActual}/tasks/usuarios`);
        const data = await response.json();
        setTasks(data);
      };
      loadTasks();
    } catch (error) {}
  }, [urlActual]);

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      const idsToDelete = selectedRows.map((row) => row.toString());
      await Promise.all(
        idsToDelete.map(async (id) => {
          await fetch(`${urlActual}/tasks/usuarios/${id}`, {
            method: "DELETE",
          });
        })
      );
      setTasks(tasks.filter((task) => !selectedRows.includes(task.id)));
      setSelectedRows([]);
    } catch (error) {
      console.log(error);
    }
    setTasks(tasks.filter((task) => !selectedRows.includes(task.id)));
  };

  const blep = tasks.map((task) => {
    return {
      id: task.id,
      nombre: task.nombre,
      alias: task.alias,
      contra: task.contra,
      tipuser: task.tipuser,
      ultimologin: new Date(task.ultimologin).toLocaleString("en-za"),
      creacion: new Date(task.creacion).toLocaleDateString("en-za"),
    };
  });

  const columns = [
    { field: "id", headerName: "ID", width: 30 },
    { field: "nombre", headerName: "Nombre", width: 200 },
    { field: "alias", headerName: "Alias", width: 100 },
    {
      field: "contra",
      headerName: "Contraseña",
      type: "password",
      width: 90,
    },
    {
      field: "tipuser",
      headerName: "Tipo de usuario",
      description: "This column has a value getter and is not sortable.",
      width: 130,
    },
    { field: "ultimologin", headerName: "Ultimo login", width: 160 },
    { field: "creacion", headerName: "Fecha de creación", width: 130 },
    {
      field: "acciones",
      headerName: "Acciones",
      sortable: false,
      width: 120,
      renderCell: (params) => {
        return (
          <Button
            size="small"
            onClick={() => navigate(`/usuario/editar/${params.row.id}`)}
          >
            Editar
          </Button>
        );
      },
    },
  ];
  return (
    <div
      style={{
        height: 650,
        width: "100%",
        backgroundColor: "#f0f0f0",
        marginTop: 20,
      }}
    >
      {selectedRows.length > 0 && (
        <Button size="small" color="primary" onClick={handleDelete}>
          Eliminar selección
        </Button>
      )}
      <DataGrid
        rows={blep}
        columns={columns}
        checkboxSelection
        onRowSelectionModelChange={(selection) => {
          setSelectedRows(selection);
        }}
        selectionModel={selectedRows}
        pageSizeOptions={[10, 20, 30]}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        localeText={esES.components.MuiDataGrid.defaultProps.localeText}
      />
    </div>
  );
}
