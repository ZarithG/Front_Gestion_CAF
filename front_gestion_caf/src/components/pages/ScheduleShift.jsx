import React, { useState } from "react";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // Importa los estilos básicos de react-calendar
import "../styles/SheduleShift.css";
import { useNavigate } from "react-router-dom";
import { MessagesError, MessagesSuccess } from "../gestion-caf/Messages";

const ScheduleShift = () => {
    const [date, setDate] = useState(new Date());
    const navigate = useNavigate();
    const today = new Date();
    const maxDate = new Date(today);
    maxDate.setDate(today.getDate());

    const handleScheduleShift = async (e) => {
        e.preventDefault();
        try {
            MessagesSuccess("Turno Apartado");
            // Aquí podrías agregar la lógica para agendar el turno y luego navegar a otra página si es necesario
            // navigate('/ruta-a-la-que-deseas-navegar'); // Ejemplo
        } catch (error) {
            MessagesError('Hubo un error en el servidor');
        }
    };

    const handleDateChange = (newDate) => {
        if (newDate <= maxDate) {
            setDate(newDate);
        }
    };

    // Custom navigation label
    const renderNavigation = ({ date }) => {
        return (
            <div className="custom-navigation">
                <span>
                    {`${date.toLocaleString('default', { month: 'long' })} ${date.getFullYear()}`}
                </span>
            </div>
        );
    };

    return (
        <div className="containerBodyScheduleShift">
            <h1 className="titleScheduleShift">Agendar Turno</h1> 
            <div className="flexContainer">
                <div className="verticalContainer"> 
                    <div className="containerCAFSelection">
                        <h2 className="titleCAF">CAF</h2>
                        <p className="descriptionCAF">Seleccione el CAF en el cual desee agendar un turno.</p>
                        <select>
                            <option value="tunja">Tunja</option>
                            <option value="Sogamoso">Salud</option>
                            <option value="Seccional Salud">Seccional Salud</option>
                        </select>
                    </div>
                    <div className="containerShiftsAvailable">
                        <h2 className="titleShiftsAvailable">Turnos Disponibles</h2>
                        <p className="descriptionShiftsAvailable">Seleccione el turno al cual desea asistir</p>
                        <select>
                            <option value={1}>Turno 1 6:30 AM a 7:45 AM</option>
                            <option value={2}>Turno 2 7:50 AM a 9:05 AM</option>
                            <option value={3}>Turno 3 9:10 AM a 10:25 AM</option>
                            <option value={4}>Turno 4 10:30 AM a 11:45 AM</option>
                            <option value={5}>Turno 5 11:50 AM a 01:05 AM</option>
                            <option value={6}>Turno 6 3:00 AM a 4:15 AM</option>
                            <option value={7}>Turno 7 4:25 AM a 05:40 AM</option>
                            <option value={8}>Turno 8 5:50 AM a 07:05 AM</option>
                            <option value={9}>Turno 9 7:15 AM a 08:20 AM</option>
                        </select>
                    </div>
                </div>
                <div className="containerCalendar">
                    <Calendar 
                        onChange={handleDateChange}
                        value={date}
                        className="custom-calendar"
                        locale="es-CO"
                        minDate={today} // Deshabilita los días pasados
                        maxDate={maxDate} // Limita la selección a una semana desde hoy
                        view="month" // Establece la vista en mes
                        prevLabel={null} // Oculta el botón de mes anterior
                        nextLabel={null} // Oculta el botón de mes siguiente
                        renderNavigation={renderNavigation} // Personaliza la navegación
                    />
                </div>
            </div>
            <button onClick={handleScheduleShift} className="btScheduleShift" type="submit">Agendar Turno</button>
        </div>
    );
};

export default ScheduleShift;
