import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TurnoModal from "../../Admin/TurnoModal";
import "./styles/PagesAdmin.css";

const initialTurnos = {
    LUNES: [{ id: "T1", inicio: "6:40 am", fin: "7:40 am", cupos: 40 }],
    MARTES: [],
    MIÉRCOLES: [],
    JUEVES: [],
    VIERNES: [],
    SÁBADO: [],
    DOMINGO: [],
};

const AssignShiftsQuotas = () => {
    const [turnos, setTurnos] = useState(initialTurnos);
    const [activeDay, setActiveDay] = useState(null);
    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedDay, setSelectedDay] = useState(null);
    const navigate = useNavigate();

    const toggleDay = (day) => {
        setActiveDay(activeDay === day ? null : day);
    };

    const addTurno = (day) => {
        setSelectedDay(day);
        setModalOpen(true);
    };

    const handleSaveTurno = (newTurno) => {
        const updatedTurno = {
            id: `T${turnos[selectedDay].length + 1}`,
            ...newTurno,
        };
        setTurnos({
            ...turnos,
            [selectedDay]: [...turnos[selectedDay], updatedTurno],
        });
    };

    // Definición de la función editTurno
    const editTurno = (index) => {
        // Redirige a la página de edición o muestra un formulario para editar el turno
        navigate("/admin/registerAttendance");
    };

    // Definición de la función removeTurno
    const removeTurno = (day, index) => {
        const updatedTurnos = turnos[day].filter((_, i) => i !== index);
        setTurnos({ ...turnos, [day]: updatedTurnos });
    };

    // Definición de la función duplicateTurnos
    const duplicateTurnos = () => {
        const updatedTurnos = {};
        Object.keys(turnos).forEach((day) => {
            updatedTurnos[day] = [...turnos["LUNES"]];
        });
        setTurnos(updatedTurnos);
    };

    return (
        <div className="containerBody">
            <h1>Asignar turnos y cupos</h1>
            <div>
                <h2>CAF</h2>
                <p>Selecciona el día de la semana y añade los turnos disponibles y los cupos</p>
                <div>
                    {Object.keys(turnos).map((day) => (
                        <div key={day} className="day-section">
                            <button onClick={() => toggleDay(day)} className="day-toggle">
                                {day}
                            </button>
                            {activeDay === day && (
                                <div className="turnos-list">
                                    <table className="tableAsSh">
                                        <thead className="thAsSh">
                                            <tr className="trAsSh">
                                                <th>Id</th>
                                                <th>Hora inicio</th>
                                                <th>Hora fin</th>
                                                <th>Cupos</th>
                                                <th>Acciones</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {turnos[day].map((turno, index) => (
                                                <tr key={turno.id}>
                                                    <td>{turno.id}</td>
                                                    <td>{turno.inicio}</td>
                                                    <td>{turno.fin}</td>
                                                    <td>{turno.cupos}</td>
                                                    <td>
                                                        <button onClick={() => editTurno(index)}>Editar</button>
                                                        <button onClick={() => removeTurno(day, index)}>🗑</button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                    <button onClick={() => addTurno(day)}>Añadir turno</button>
                                </div>
                            )}
                        </div>
                    ))}
                    <button onClick={duplicateTurnos}>Duplicar turnos en los demás días</button>
                    <button>Guardar cambios</button>
                </div>
            </div>

            <TurnoModal
                isOpen={isModalOpen}
                onClose={() => setModalOpen(false)}
                onSave={handleSaveTurno}
            />
        </div>
    );
};

export default AssignShiftsQuotas;
