import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import { DeleteOutlined, EditOffOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

export default function TaskList() {
  const [tasks, setTasks] = useState([]);

  const navigate = useNavigate();

  const loadTasks = async () => {
    const response = await fetch("http://192.168.100.3:4000/tasks/salida");
    const data = await response.json();
    setTasks(data);
  };
  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:4000/tasks/salida/${id}`, {
        method: "DELETE",
      });

      setTasks(tasks.filter((task) => task.id !== id));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    loadTasks();
  }, []);

  function formatDate(timestamp) {
    const date = new Date(timestamp);
    const options = { year: "numeric", month: "short", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  }
  return(
    <>
      <h1>Lista de salidas</h1>
      <Grid container spacing={2}>
        {tasks.map((task) => ( 
          <Grid item key={task.id} xs={15} md={10} lg={4}>
            <Card
              style={{
                marginBottom: ".5rem",
                backgroundColor: "#FFCA28",
              }}
              key={task.id}
              elevation={1}
            >
              <CardHeader
                action={
                  <div>
                    <IconButton
                      onClick={() => navigate(`/tasks/${task.id}/edit`)}
                    >
                      <EditOffOutlined />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(task.id)}>
                      <DeleteOutlined />
                    </IconButton>
                  </div>
                }
                title={task.nombre}
                subheader={formatDate(task.fecha)}
                color="Primary"
              />
              <CardContent
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <div style={{ color: "white" }}>
                  <Typography>Razon de uso: {task.uso}</Typography>
                  <Typography>Recibio: {task.recibio}</Typography>
                  <Typography>Recibido: {task.cantidad}</Typography>
                </div>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
}
