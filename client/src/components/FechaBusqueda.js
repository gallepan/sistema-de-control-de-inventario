import * as React from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { esES } from "@mui/x-date-pickers/locales";
import dayjs from "dayjs";
import "dayjs/locale/es-mx"; // Import the es-mx locale

dayjs.locale("es-mx"); // Set the locale to es-mx

export default function FechaBusqueda({
  setSearchMonth,
  setSearchYear,
  selectedDate,
  setSelectedDate,
}) {
  const handleAccept = (date) => {
    setSelectedDate(date);
    const formattedDate = dayjs(date).format("MM-YYYY");
    const [month, year] = formattedDate.split("-");
    if (dayjs(date).isValid()) {
      setSearchMonth(month);
      setSearchYear(year);
    } else {
      setSearchMonth("");
      setSearchYear("");
    }
  };

  const disabledDatesBeforeYear = dayjs().year(2022);

  return (
    <LocalizationProvider
      dateAdapter={AdapterDayjs}
      localeText={
        esES.components.MuiLocalizationProvider.defaultProps.localeText
      }
    >
      <DatePicker
        disableFuture
        minDate={disabledDatesBeforeYear}
        label={"MES/AÑO"}
        value={selectedDate}
        views={["month", "year"]}
        onChange={handleAccept}
      />
    </LocalizationProvider>
  );
}
