import * as React from "react";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Autocomplete from "@mui/material/Autocomplete";
import { useEffect, useState } from "react";

export default function OrdenarRazon({searchGrupo, setSearchGrupo}) {
  const [grupos, setGrupos] = useState([]);
  // Get the current page URL
const currentUrl = window.location.href;

// Extract the server URL from the current page URL
const urlActual = currentUrl.substring(0, currentUrl.lastIndexOf(":")) + ":4000";
  useEffect(() => {
    try {
      const loadGrupos = async () => {
        const response = await fetch(`${urlActual}/tasks/razon`);
        const data = await response.json();
        setGrupos(data);
      };
      loadGrupos();
    } catch (error) {}
  }, [urlActual]);

  const handleInputChange = (event, value) => {
    setSearchGrupo(value);
  };

  const stopPropagationForTab = (event) => {
    if (event.key === "Tab") {
      event.stopPropagation();
    }
  };
  return (
    <Stack spacing={2} sx={{ width: 300 }}>
      <Autocomplete
        autoFocus
        freeSolo
        id="grupo"
        options={grupos.map((option) => option.grupo)}
        inputValue={searchGrupo}
        onInputChange={handleInputChange}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Categoría"
            onKeyDown={stopPropagationForTab}
            InputProps={{
              ...params.InputProps,

            }}
          />
        )}
      />
    </Stack>
  );
}