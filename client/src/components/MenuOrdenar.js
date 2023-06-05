import { useState } from 'react';
import {
  Button,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {
  SortByAlpha as SortByAlphaIcon,
  Category as CategoryIcon,
  DateRange as DateRangeIcon,
} from '@mui/icons-material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import FechaBusqueda from './FechaBusqueda';
import OrdenarGrupo from './OrdenarGrupo';
import OrdenarRazon from './OrdenarRazon'

export default function MenuOrdenar({searchGrupo, setSearchGrupo, setSearchMonth, setSearchYear,selectedDate, setSelectedDate, ordenar, setOrdenar, taskType, color}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [dir, setDir] = useState("ASC")
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSortOrderChange = () => {
    setOrdenar(ordenar === 'ASC' ? 'DESC' : 'ASC');
    setDir(dir === 'ASC' ? 'DESC' : 'ASC')
  }
  return (
    <div>
      <Button variant="contained" size="small" endIcon={<KeyboardArrowDownIcon />} onClick={handleClick} sx={{
        background:color,}}>
        Ordenar
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleSortOrderChange}>
          <ListItemIcon>
            <SortByAlphaIcon />
          </ListItemIcon>
          <ListItemText primary="&#8288;Ordenar: " />
          <ListItemText secondary={ordenar}/>
        </MenuItem>
        {taskType === "inventario" ? (<MenuItem>
          <ListItemIcon>
            <CategoryIcon />
          </ListItemIcon>
          <ListItemText primary="&#8288;Categoría: " />
          <OrdenarGrupo searchGrupo={searchGrupo} setSearchGrupo={setSearchGrupo}/>
        </MenuItem>) : ""}
        {taskType === "salida" ? (<MenuItem>
          <ListItemIcon>
            <CategoryIcon />
          </ListItemIcon>
          <ListItemText primary="&#8288;Razon de salida: " />
          <OrdenarRazon searchGrupo={searchGrupo} setSearchGrupo={setSearchGrupo}/>
        </MenuItem>) : ""}
        {taskType !== "inventario" ? (<MenuItem>
          <ListItemIcon>
            <DateRangeIcon />
          </ListItemIcon>
          <ListItemText primary="&#8288;Buscar por fecha: " />
          <FechaBusqueda setSearchMonth={setSearchMonth} setSearchYear={setSearchYear} selectedDate={selectedDate} setSelectedDate={setSelectedDate}/>
        </MenuItem>) : ""}
      </Menu>
    </div>
  );
}