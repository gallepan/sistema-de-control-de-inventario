import { Button } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";

export default function Paginacion({
  currentPage,
  totalPages,
  onPageChange,
  colordeBoton,
}) {
  const navigate = useNavigate();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const page = parseInt(searchParams.get('page')) || 1;

  const handlePageChange = (pageNumber) => {
    navigate(`?page=${pageNumber}`);
    onPageChange(pageNumber);
  };

  const displayedPages = [];

  if (page > 1) {
    displayedPages.push(
      <Button key="Primera" onClick={() => handlePageChange(1)} size="small" sx={{
        background:colordeBoton,
        color: "white",
        textShadow: "1px 1px 2px rgba(0,0,0,0.5)",
        minWidth: 30,
        minHeight: 30,
        padding: 0,
        fontSize: 15,
    }}>
        {"<<"}
      </Button>
    );
    displayedPages.push(
      <Button
        key="Anterior"
        onClick={() => handlePageChange(page - 1)}
        size="small"
        sx={{
            background:colordeBoton,
            color: "white",
            textShadow: "1px 1px 2px rgba(0,0,0,0.5)",
            minWidth: 30,
            minHeight: 30,
            padding: 0,
            fontSize: 15,
        }}

      >
        {"<"}
      </Button>
    );
  }

  displayedPages.push(
    <Button
      key={currentPage}
      onClick={() => handlePageChange(page)}
      sx={{
        background: colordeBoton,
        color: "white",
        textShadow: "1px 1px 2px rgba(0,0,0,0.5)",
        minWidth: 70,
        minHeight: 30,
        padding: 0,
        fontSize: 15,
      }}
    >
      {page} de {totalPages}
    </Button>
  );
  if (page < totalPages) {
    displayedPages.push(
      <Button
        key="next"
        onClick={() => handlePageChange(page + 1)}
        size="small"
        sx={{
          background:colordeBoton,
          color: "white",
          textShadow: "1px 1px 2px rgba(0,0,0,0.5)",
          minWidth: 30,
          minHeight: 30,
          padding: 0,
          fontSize: 15,
      }}
      >
        {">"}
      </Button>
    );
    displayedPages.push(
      <Button
        key={"Ultima"}
        onClick={() => handlePageChange(totalPages)}
        size="small"
        sx={{
          background:colordeBoton,
          color: "white",
          textShadow: "1px 1px 2px rgba(0,0,0,0.5)",
          minWidth: 30,
          minHeight: 30,
          padding: 0,
          fontSize: 15,
      }}
      >
        {">>"}
      </Button>
    );
  }

  return <div>{displayedPages}</div>;
}