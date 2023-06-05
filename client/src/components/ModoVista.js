import * as React from 'react';

import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ViewListIcon from '@mui/icons-material/ViewList';
import ViewModuleIcon from '@mui/icons-material/ViewModule';

export default function ModoVista({modoVista, setModoVista, color}) {

  const handleVista = (event, nuevaVista) => {
    setModoVista(nuevaVista);
  };

  return (
    <ToggleButtonGroup
      value={modoVista}
      exclusive
      onChange={handleVista}
      aria-label="modo de vista"
    >
      <ToggleButton value="lista" aria-label="left aligned">
        <ViewListIcon sx={{color:color}} />
      </ToggleButton>
      <ToggleButton value="cuadrada" aria-label="centered">
      <ViewModuleIcon sx={{color:color}} />
      </ToggleButton>
    </ToggleButtonGroup>
  );
}