import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Importar estilos
import "./ReportAttendedShift.css"
import { es } from "date-fns/locale"; 

function ReactDatePickerCustomRange({ startDate, endDate, setStartDate, setEndDate }) {
    const onChange = (dates) => {
        const [start, end] = dates;
        setStartDate(start); // Actualiza el estado en el componente padre
        setEndDate(end); // Actualiza el estado en el componente padre
    };

    const formatDate = (date) => {
        if (!date) return "No seleccionada";
        return date.toLocaleDateString("es-ES"); // Formato "DD/MM/AAAA" en español
    };

    return (
        <div style={{ fontFamily: "Arial, sans-serif", textAlign: "center" }}>
            <div>
                <h2>Fecha inicio</h2>
                <h4 className="date">{startDate ? formatDate(startDate) : "No seleccionada"}</h4>
            </div>
            <div>
                <h2>Fecha fin</h2>
                <h4 className="date">{endDate ? formatDate(endDate) : "No seleccionada"}</h4>
            </div>
            <DatePicker
                selected={startDate}
                onChange={onChange}
                startDate={startDate}
                endDate={endDate}
                selectsRange
                inline
                locale={es}
            />
        </div>
    );
}

export default ReactDatePickerCustomRange;
