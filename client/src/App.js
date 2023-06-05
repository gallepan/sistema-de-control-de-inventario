import { BrowserRouter, Routes, Route } from "react-router-dom";
import TaskForm from "./components/TaskForm";
import { Container } from "@mui/material";
import Menu from "./components/Navbar";
import { useState, useEffect } from "react";
import TaskLists from "./components/TaskLists";
import TablaUsuarios from "./components/TablaUsuarios";
import FormNuevoUsuario from "./components/FormNuevoUsuario";
import TablaMinimos from "./components/TablaMinimos";
import PaginaNoEncontrada from "./components/PaginaNoEncontrada";
import AdministrarDatos from "./components/AdministrarDatos";
import PaginaInicio from "./components/PaginaInicio";

export default function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [iniciado, setIniciado] = useState();

  const [usuario, setUsuario] = useState({
    id: "",
    nombre: "",
    alias: "",
    tipuser: "user",
  });

  // Get the current page URL
const currentUrl = window.location.href;

// Extract the server URL from the current page URL
const urlActual = currentUrl.substring(0, currentUrl.lastIndexOf(":")) + ":4000";

  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await fetch(`${urlActual}/tasks/sesion`, {
          credentials: "include",
        });
        if (response.ok) {
          const data = await response.json();
          setIniciado(data.sessionExists);
          if (!data.sessionExists) {
            setUsuario((prevUsuario) => ({ ...prevUsuario }));
          }
        } else {
          console.error("No se encontró información sobre la sesión");
        }
      } catch (error) {
        console.error(error);
      }
    };

    checkSession();
  }, [urlActual]);

  useEffect(() => {
    const updateUser = async () => {
      try {
        const response = await fetch(`${urlActual}/tasks/usuario`, {
          credentials: "include",
        });
        if (response.ok) {
          const data = await response.json();
          setUsuario(data);
        } else {
          console.error("No se encontró información sobre el usuario");
        }
      } catch (error) {
        console.error(error);
      }
    };

    if (iniciado) {
      updateUser();
    }
  }, [iniciado, urlActual]);

  // ...

  return (
    <BrowserRouter>
      <Menu
        setSearchQuery={setSearchQuery}
        iniciado={iniciado}
        setIniciado={setIniciado}
        usuario={usuario}
        urlActual={urlActual}
      />
      <Container>
        <Routes>
          {iniciado && (
            <>
              <Route
                path="/entradas"
                element={
                  <TaskLists
                    taskType="entrada"
                    searchQuery={searchQuery}
                    usuario={usuario}
                    urlActual={urlActual}
                  />
                }
              />
              <Route
                path="/salidas"
                element={
                  <TaskLists
                    taskType="salida"
                    searchQuery={searchQuery}
                    usuario={usuario}
                    urlActual={urlActual}
                  />
                }
              />
              <Route
                path="/inventario"
                element={
                  <TaskLists
                    taskType="inventario"
                    searchQuery={searchQuery}
                    usuario={usuario}
                    urlActual={urlActual}
                  />
                }
              />
              <Route
                path="/minimos"
                element={<TablaMinimos usuario={usuario} urlActual={urlActual}/>}
              />
              {usuario.tipuser === "admin" && (
                <Route
                  path="/usuarios/administrar"
                  element={<TablaUsuarios urlActual={urlActual}/>}
                />
              )}
              {(usuario.tipuser === "admin" ||
                usuario.tipuser === "almacen") && (
                <Route
                  path="/usuario/nuevo"
                  element={<FormNuevoUsuario usuario={usuario} urlActual={urlActual}/>}
                />
              )}
              {(usuario.tipuser === "admin" ||
                usuario.tipuser === "almacen") && (
                <Route
                  path="/usuario/editar/:id"
                  element={<FormNuevoUsuario usuario={usuario} urlActual={urlActual} typeAction="editar"/>}
                />
              )}
              <Route
                  path="/usuario/editar/perfil"
                  element={<FormNuevoUsuario usuario={usuario} urlActual={urlActual} typeAction="editar"/>}
                />
              {(usuario.tipuser === "admin" ||
                usuario.tipuser === "almacen") && (
                <Route
                  path="/:taskType/:id/editar"
                  element={<TaskForm typeAction="editar" usuario={usuario} urlActual={urlActual}/>}
                />
              )}
              {(usuario.tipuser === "admin" ||
                usuario.tipuser === "almacen") && (
                <Route
                  path="/nuevo"
                  element={<TaskForm typeAction="inventario" usuario={usuario} urlActual={urlActual}/>}
                />
              )}
              {usuario.tipuser === "admin" && (
                <Route
                path="/administrar/base-de-datos"
                element={<AdministrarDatos urlActual={urlActual}/>}
              />
              )}
              {usuario.tipuser === "admin" && (
                <Route
                path="/administrar/base-de-datos/exportar"
                element={<AdministrarDatos urlActual={urlActual}/>}
              />
              )}
              {usuario.tipuser === "admin" && (
                <Route
                path="/administrar/base-de-datos/importar"
                element={<AdministrarDatos urlActual={urlActual}/>}
              />
              )}
              {usuario.tipuser === "admin" && (
                <Route
                path="/administrar/base-de-datos/configuracion"
                element={<AdministrarDatos urlActual={urlActual}/>}
              />
              )}
            </>
          )}
          <Route path="/*" element={<PaginaNoEncontrada iniciado={iniciado}/>} />
          <Route path="/" element={<PaginaInicio urlActual={urlActual}/>}/>
        </Routes>
      </Container>
    </BrowserRouter>
  );
}
