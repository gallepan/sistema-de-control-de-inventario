import * as React from "react";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Autocomplete from "@mui/material/Autocomplete";
import { useEffect, useState } from "react";

export default function CategoriaForm({ valor, handleChange, desactivado, urlActual }) {
  const [grupos, setGrupos] = useState([]);
  useEffect(() => {
    try {
      const loadGrupos = async () => {
        const response = await fetch(`${urlActual}/tasks/grupo`);
        const data = await response.json();
        setGrupos(data);
      };
      loadGrupos();
    } catch (error) {}
  }, []);
  return (
    <Stack spacing={2} sx={{ width: 300 }}>
      <Autocomplete
        freeSolo
        id="grupo"
        disableClearable
        options={grupos.map((option) => option.grupo)}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Categoría"
            value={valor}
            onChange={handleChange}
            disabled={desactivado}
            name="grupo"
            sx={{
              display: "block",
              margin: ".5rem 0",
              "& .MuiInputBase-input.Mui-disabled": {
                WebkitTextFillColor: "#363839",
              },
            }}
            inputProps={{ style: { color: "white" } }}
            InputLabelProps={{ style: { color: "white" } }}
            InputProps={{
              ...params.InputProps,
              type: "search",
            }}
          />
        )}
      />
    </Stack>
  );
}
