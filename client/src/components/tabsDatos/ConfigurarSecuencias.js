import React, { useState, useEffect } from "react";
import { Grid, Checkbox, Button, TextField } from "@mui/material";

function ConfigurarSecuencias({urlActual}) {
  const [sequences, setSequences] = useState([]);
  const isSaveDisabled = !sequences.some((sequence) => sequence.editable);

  useEffect(() => {
    const fetchSequences = async () => {
      try {
        const response = await fetch(`${urlActual}/tasks/secuencias`);
        const data = await response.json();

        const fetchedSequences = [
          {
            name: "almacen_id_seq",
            currentValue: data.sequenceValues.almacen_id_seq,
            currentId: data.tableIds.almacen,
            editable: false,
          },
          {
            name: "entradas_id_seq",
            currentValue: data.sequenceValues.entradas_id_seq,
            currentId: data.tableIds.entradas,
            editable: false,
          },
          {
            name: "salidas_id_seq",
            currentValue: data.sequenceValues.salidas_id_seq,
            currentId: data.tableIds.salidas,
            editable: false,
          },
          {
            name: "usuarios_id_seq",
            currentValue: data.sequenceValues.usuarios_id_seq,
            currentId: data.tableIds.usuarios,
            editable: false,
          },
        ];

        setSequences(fetchedSequences);
      } catch (error) {
        console.error(error);
      }
    };

    fetchSequences();
  }, [urlActual]);

  const handleEditToggle = (index) => {
    setSequences((prevState) => {
      const updatedSequences = [...prevState];
      updatedSequences[index].editable = !updatedSequences[index].editable;
      return updatedSequences;
    });
  };

  const handleValueChange = (index, event) => {
    const { value } = event.target;
    setSequences((prevState) => {
      const updatedSequences = [...prevState];
      updatedSequences[index].currentValue = value;
      return updatedSequences;
    });
  };

  const handleSave = async () => {
    try {
      const editedSequences = sequences
        .filter((sequence) => sequence.editable)
        .map((sequence) => ({
          secuencia: sequence.name,
          nuevoValor: sequence.currentValue,
        }));
  
      const response = await fetch(
        `{urlActual}/tasks/secuencias/editar`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editedSequences),
        }
      );
  
      if (response.ok) {
        console.log("Valores de la secuencia actualizados");
      } else {
        console.error("Fallo en actualización");
      }
    } catch (error) {
      console.error(error);
    }
  };
  
  

  return (
    <Grid container spacing={2}>
      {sequences.map((sequence, index) => (
        <Grid item xs={3} key={sequence.name}>
          <div
            style={{
              border: "1px solid #ccc",
              padding: "1rem",
              backgroundColor: "#f0f0f0",
            }}
          >
            <div>
              <strong>Secuencia: {sequence.name}</strong>
            </div>
            <div>
              Valor de la secuencia:{" "}
              {sequence.editable ? (
                <TextField
                  value={sequence.currentValue}
                  onChange={(event) => handleValueChange(index, event)}
                />
              ) : (
                sequence.currentValue
              )}
            </div>
            <div>ID actual de la tabla: {sequence.currentId}</div>
            <div>
              Editable:{" "}
              <Checkbox
                checked={sequence.editable}
                onChange={() => handleEditToggle(index)}
              />
            </div>
          </div>
        </Grid>
      ))}
      <Grid item xs={12}>
        <Button
          variant="contained"
          onClick={handleSave}
          disabled={isSaveDisabled}
        >
          Guardar
        </Button>
      </Grid>
    </Grid>
  );
}

export default ConfigurarSecuencias;
