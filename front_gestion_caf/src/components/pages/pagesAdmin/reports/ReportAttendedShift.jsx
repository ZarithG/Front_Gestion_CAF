import React, { useState, useEffect } from "react";
import ReactDatePickerCustomRange from "./ReactDatePickerCustomRange"; 
import GraphicBarShift from "./GraphicBarShift"; 
import "./ReportAttendedShift.css";
import "../styles/PagesAdmin.css";
import "../styles/FitnessCenterCordinator.css";
import { SERVICES_BACK } from "../../../../constants/constants";
import { MessagesError, MessagesInfo, MessagesSuccess, showToastPromise,showToastWarning } from "../../../gestion-caf/Messages";
import AttendanceTable from "./AttendanceTable";
import { Toaster, toast } from "sonner";
import { is } from "date-fns/locale";

const ReportAttendedShift = () => {
    
    const [shifts, setShifts] = useState([
        //{ dayName: "Lunes", shift: "7:00 a 8:00", placeAvailable:40,attended: 15, noAttended: 5, total: 20 },
        //{ dayName: "Martes", shift: "8:10 a 9:00",placeAvailable:40, attended: 18, noAttended: 2, total: 20 },
        //{ dayName: "Miércoles", shift: "9:10 a 10:00", placeAvailable:40,attended: 10, noAttended: 10, total: 20 },
    ]);
    const [token, setToken] = useState("");
    const [labelShifts, setLabelShifts] = useState([
        { id: 1, name: "LUNES" },
        { id: 2, name: "MARTES" },
        { id: 3, name: "MIERCOLES" },
        { id: 4, name: "JUEVES" },
        { id: 5, name: "VIERNES" },
    ]);
    const [caf, setCaf] = useState([]);
    const [days, setDays] = useState(labelShifts);
    const [selectedCaf, setSelectedCaf] = useState(null);
    const [selectedDay, setSelectedDay] = useState(null);
    const [startDate, setStartDate] = useState(new Date()); // Inicializa con la fecha actual
    const [endDate, setEndDate] = useState(null); // Fecha final inicializada como null
    

    // Tablas de resultados
    const columnsSummaryResults = ["Día", "Turno","Capacidad máxima", "Asistentes", "No asistieron", "Total"];
    const columnsGlobalResults =  ["Día", "Turno", "Capacidad máxima","Asistentes", "No asistieron", "Total"];
    


    useEffect(() => {
        setToken(localStorage.getItem("authToken"));
        const fetchCAF = async () => {
            const promiseFn = async () => {
                const token = localStorage.getItem("authToken");
                const response = await fetch(SERVICES_BACK.GET__ALL_CAF, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        credentials: 'include',
                    },
                });
                const data = await response.json();
    
                if (Array.isArray(data)) {
                    setCaf(data);
                } else {
                    throw new Error("El formato de datos de CAF es incorrecto.");
                }
            };
    
            await showToastPromise(
                promiseFn(),
                "Datos del CAF cargados correctamente.",
                "Error al cargar los datos."
            );
        };
    
        fetchCAF();
    }, []);

    const fetchShifts = async () => {
        // Validar que todos los campos estén completos
        if(setSelectedCaf == null){
            MessagesError("Debe seleccionar un caf para generar el reporte.");
            return;
        }
        if(setSelectedDay == null){
            MessagesError("Debe seleccionar un día para generar el reporte.");
            return;
        }

        if(endDate == null){
            if(endDate > startDate){
                MessagesError("Debe seleccionar un rango de fecha válido para generar el reporte.");
                return;
            }
            MessagesError("Debe seleccionar una fecha fin generar el reporte.");
            return;
        }
        try{
            const token = localStorage.getItem("authToken");
            console.log(selectedCaf);
            console.log(selectedDay);
            console.log(formatDateToLocalDate(startDate));
            console.log(formatDateToLocalDate(endDate));
            const response = await fetch(SERVICES_BACK.POST_SHIFTS_REPORTS_ATTENDED, {
                method: "POST",
                headers: {
                    'Authorization': `Bearer ${token}`,
                    credentials: "include",
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify(
                    {
                        "fitnessCenter": selectedCaf,
                        "day": selectedDay,
                        "startDate": formatDateToLocalDate(startDate),
                        "endDate":formatDateToLocalDate(endDate)
                    }
                )
            });
            
            console.log(response.status)

            if (response.status !== 200) {
                if(response.status === 204){
                    MessagesInfo("No se encontraron turnos para el periodo de tiempo seleccionado");
                    return;
                }else{
                    throw new Error('Error al obtener los datos del reporte de turnos');
                }
            }else{
                const data = await response.json();
                const auxShiftsList = [];
                
                if (Array.isArray(data) && (data.length >0)) {
                    auxShiftsList.forEach((shift) => {
                        const auxShif = {
                            dayName: shift.day,
                            shift: `${formatTime(shift.startTime)} a ${formatTime(shift.endTime)}`,
                            placeAvailable: shift.maximumPlaceAvailable,
                            attended: shift.attendedCount,
                            noAttended: shift.noAttendedCount,
                            total: shift.attendedCount + shift.noAttendedCount
                        };
                        auxShiftsList.push(auxShif);
                    });

                    if(auxShiftsList.length > 0){
                        if(auxShiftsList[0].total == 0){
                            MessagesError("No se encontraron turnos para el periodo de tiempo seleccionado"); 
                        }else{
                            MessagesSuccess("Reporte generado"); 
                        }
                    }else{
                        MessagesError("No se encontraron turnos para el periodo de tiempo seleccionado"); 
                    }
                } 
    
                setShifts(auxShiftsList);
               
            }
        } catch (error) {
            console.error('Error al obtener el reporte de turnos:', error);
        }
    } 

    const formatTime = (time24) => {
        // Separar la hora, minuto y segundo
        const [hours, minutes, seconds] = time24.split(":");
    
        // Convertir la hora de 24 horas a 12 horas
        const hour12 = hours % 12 || 12; // Si la hora es 0 (medianoche), se muestra como 12.
        
        // Determinar AM o PM
        const ampm = hours >= 12 ? "pm" : "am";
    
        // Retornar la hora en formato de 12 horas
        return `${hour12}:${minutes} ${ampm}`;
    };

    const formatDateToLocalDate = (date) => {
        if (!date) return null;
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Mes con 2 dígitos
        const day = date.getDate().toString().padStart(2, '0'); // Día con 2 dígitos
        return `${year}-${month}-${day}`; // Formato "YYYY-MM-DD"
    };

    const handleCafChange = (event) => {
        const cafId = event.target.value;
        const selected = caf.find((item) => item.id === parseInt(cafId, 10));
        setSelectedCaf(selected);
        console.log(selectedCaf);
    };

    const handleDayChange = (event) => {
        const dayId = event.target.value;
        const selected = days.find((item) => item.id === parseInt(dayId, 10));
        setSelectedDay(selected);
        
    };

    const ComboBoxCaf = () => (
        <div className="form-group-Reg">
            <label htmlFor="cafSelect" className="lbRegItem">
                Centro de Acondicionamiento Físico
            </label>
            <select
                id="cafSelect"
                className="sltRegItem"
                onChange={handleCafChange}
                value={selectedCaf?.id || ""}
                
            >
                <option value="" disabled>
                    Seleccione un CAF
                </option>
                {caf.length > 0 ? (
                    caf.map((item, index) => (
                        <option key={index} value={item.id}>
                            {item.name}
                        </option>
                    ))
                ) : (
                    <option disabled>Cargando CAF...</option>
                )}
            </select>
        </div>
    );

    const ComboBoxDay = () => (
        <div className="form-group-Reg">
            <label htmlFor="daySelect" className="lbRegItem">
                Día de la semana
            </label>
            <select
                id="daySelect"
                className="sltRegItem"
                onChange={handleDayChange}
                value={selectedDay?.id || ""}
            >
                <option value="" disabled>
                    Seleccione un día
                </option>
                {days.length > 0 ? (
                    days.map((item, index) => (
                        <option key={index} value={item.id}>
                            {item.name}
                        </option>
                    ))
                ) : (
                    <option disabled>Cargando días...</option>
                )}
            </select>
        </div>
    );

    

    return (
        <div className="containerBody">
            <Toaster
                position="top-center"
                dir="auto"
                duration={2000}
                visibleToasts={4}
                richColors
            />
            <h1>Reportes</h1>
            <div className="body-containerBody">
            <div className="FiltersReport">
            <div className="FiltersContainer">

                <div className="ComboBoxes">
                    <p>Seleccione el CAF, el día de la semana y un rango de fechas para generar el reporte de asistencia</p>
                    <h2>Seleccione el CAF</h2>
                    <h2>CAF</h2>
                    <ComboBoxCaf />
                    <h2>Día de la semana</h2>
                    <ComboBoxDay />
                    <button onClick={fetchShifts}>Generar reporte</button>
                </div>
                
                <div className="Calendar">
                    
                    <ReactDatePickerCustomRange
                        startDate={startDate}
                        endDate={endDate}
                        setStartDate={setStartDate}
                        setEndDate={setEndDate}
                    />
                </div>
                
            </div>
            </div>

                <div className="Graphic">
                    {/* Gráfico de barras */}
                    <h3>Gráfica del reporte de turnos más concurridos</h3>
                    <GraphicBarShift shifts={shifts}/>
                </div>
                <div className="Results">
                        <h1>Resumen reporte de Asistencias</h1>
                        <p>El turno mas concurrido en el periodo de {startDate.toLocaleDateString()} al {endDate ? endDate.toLocaleDateString() : "No seleccionada"
                        } es el turno de 8:00 a 9:00 pm</p>
                        <AttendanceTable columns={columnsGlobalResults} data={shifts} />
                    
                </div>
                <div className="ResultsDateil">
                    
                    <h1>Reporte Detallado de Asistencias</h1>
                    <AttendanceTable columns={columnsSummaryResults} data={shifts} />
                    
                    <div className="ContainerTurno">
                        {/* Contenido adicional */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReportAttendedShift;
