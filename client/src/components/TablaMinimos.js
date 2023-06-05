import * as React from "react";
import { DataGrid, esES } from "@mui/x-data-grid";
import { useState, useEffect } from "react";
import { Button, Menu, MenuItem, TextField } from "@mui/material";

export default function TablaMinimos({usuario, urlActual}) {
  const [tasks, setTasks] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [editAnchorEl, setEditAnchorEl] = useState(null);
  const [editedItemId, setEditedItemId] = useState(null);
  const [minimo, setMinimo] = useState("");
  const isUserTipuser = usuario.tipuser === "user";
  const isDisabled = isUserTipuser ? true : false;

  const handleEditClick = (event, id) => {
    event.stopPropagation();
    setEditedItemId(id);
    setMinimo("");
    setEditAnchorEl(event.currentTarget);
  };
  const handleEditSubmit = async (event) => {
    event.preventDefault();
    try {
      await fetch(`${urlActual}/tasks/minimo/${editedItemId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ minimo }),
      });
      // Update the tasks array with the new minimo value
      setTasks((prevTasks) =>
        prevTasks.map((task) => {
          if (task.id_item === editedItemId) {
            return { ...task, minimo: minimo };
          }
          return task;
        })
      );
      setEditAnchorEl(null);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCloseEditMenu = () => {
    setEditAnchorEl(null);
  };

  useEffect(() => {
    try {
      const loadTasks = async () => {
        const response = await fetch(`${urlActual}/tasks/minimos`);
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
          await fetch(`${urlActual}/tasks/minimo/${id}`, {
            method: "DELETE",
          });
        })
      );
      setTasks(tasks.filter((task) => !selectedRows.includes(task.id_item)));
      setSelectedRows([]);
    } catch (error) {
      console.log(error);
    }
  };

  const blep = tasks.map((task) => {
    return {
      id: task.id_item,
      nombre: task.nombre,
      grupo: task.grupo,
      unidad: task.unidad,
      cantidad: task.cantidad,
      minimo: task.minimo,
    };
  });

  const columns = [
    { field: "id", headerName: "ID", width: 30 },
    { field: "nombre", headerName: "Nombre", width: 250 },
    { field: "grupo", headerName: "Categoría", width: 250 },
    { field: "unidad", headerName: "Unidades", width: 100 },
    {
      field: "cantidad",
      headerName: "Cantidad actual",
      width: 120,
    },
    {
      field: "minimo",
      headerName: "Cantidad mínima",
      description: "Cantidad mínima asignada en el menú de creación o edición",
      width: 120,
    },
    {
      field: "acciones",
      headerName: "Acciones",
      sortable: false,
      width: 120,
      renderCell: (params) => {
        return (
          <div>
            <Button
              variant="contained"
              color="success"
              size="small"
              onClick={(event) => handleEditClick(event, params.row.id)}
              disabled={isDisabled}
            >
              Editar
            </Button>
            <Menu
              anchorEl={editAnchorEl}
              open={Boolean(editAnchorEl && editedItemId === params.row.id)}
              onClose={handleCloseEditMenu}
            >
              <form onSubmit={handleEditSubmit}>
                <MenuItem>
                  <TextField
                    label="Cantidad Mínima Nueva"
                    value={minimo}
                    onChange={(event) => setMinimo(event.target.value)}
                  />
                </MenuItem>
                <MenuItem>
                  <Button type="submit">Guardar</Button>
                </MenuItem>
              </form>
            </Menu>
          </div>
        );
      },
    },
  ];
  // Custom CSS class based on the condition
  const getRowClassName = (params) => {
    const cantidad = params.row.cantidad;
    const minimo = params.row.minimo;
    return cantidad < minimo ? "red-row" : "";
  };
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
        <Button
          size="small"
          variant="contained"
          color="error"
          onClick={handleDelete}
          disabled={isDisabled}
        >
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
        getRowClassName={getRowClassName}
      />
      {/* Inline CSS */}
      <style>
        {`
        .red-row {
          background-color: red;
          color: white;
        }
        .red-row:hover {
          background-color: darkred !important;
        }
      `}
      </style>
    </div>
  );
}
