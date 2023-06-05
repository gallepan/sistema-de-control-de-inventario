import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  CardHeader,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import { DeleteOutlined, EditOffOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

export default function TaskList({ taskList }) {
  const [tasks, setTasks] = useState([]);
  


  const navigate = useNavigate();


  const loadTasks = async () => {
    const response = await fetch("http://192.168.100.3:4000/tasks/inventario");
    const data = await response.json();
    setTasks(data);
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`http://192.168.100.3:4000/tasks/inventario/${id}`, {
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
  return (
    <>
      <h1>Lista de inventario</h1>
      <Grid container spacing={2}>
      {tasks.map((task) => (
          <Grid item key={task.id} xs={15} md={10} lg={4}>
            <Card
              style={{
                marginBottom: ".5rem",
                backgroundColor: "#006CBF",
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
                subheader={task.cantidad + " " + task.unidad}
                color="Primary"
              />
              <CardMedia
                sx={{ height: 140 }}
                image="http://www.semar.gob.mx/INIDETAM/assets/images/spartaam-1-757x426.jpg"
                title="spartaam"
              />
              <CardContent
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <div style={{ color: "white" }}>
                  <Typography>{task.grupo}</Typography>
                  <Typography>{task.posicion}</Typography>
                </div>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
}
