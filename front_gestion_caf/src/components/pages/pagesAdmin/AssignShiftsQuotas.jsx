import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TurnoModal from "../../Admin/TurnoModal";
import "./styles/PagesAdmin.css";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { SERVICES_BACK } from "../../../constants/constants";
import { MessagesError } from "../../gestion-caf/Messages";
import { Toaster } from "sonner";



const initialTurnos = {
    LUNES: [],
    MARTES: [],
    MIERCOLES: [],
    JUEVES: [],
    VIERNES: [],
    SABADO: [],
    DOMINGO: [],
};

const AssignShiftsQuotas = () => {
    const [caf, setCaf] = useState([]);
    const [error, setError] = useState("");
    const [turnos, setTurnos] = useState(initialTurnos);
    const [activeDay, setActiveDay] = useState(null);
    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedDay, setSelectedDay] = useState(null);
    const [selectedCaf, setSelectedCaf] = useState(null); // Estado para almacenar el CAF seleccionado
    const [shift, setShift] = useState(null);
    const [token, setToken] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        setToken(localStorage.getItem("authToken"));
        const fetchCAF = async () => {
            try {
                const token = localStorage.getItem("authToken");
                const response = await fetch(SERVICES_BACK.GET__ALL_CAF, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        credentials: 'include',
                    }
                });
                const data = await response.json();

                if (Array.isArray(data)) {
                    setCaf(data);
                } else {
                    setError("El formato de datos de CAF es incorrecto.");
                }
            } catch (error) {
                setError(error.message);
            }
        };
        

        fetchCAF();
    }, []);

    const toggleDay = (day) => {
        setActiveDay(activeDay === day ? null : day);
        console.log(activeDay)
        setSelectedDay(day);
    };

    const handleCafChange = (event) => {
        const cafId = event.target.value;
        setSelectedCaf(caf.find(item => item.id === parseInt(cafId))); // Guarda el CAF seleccionado
    };

    const addTurno = (day) => {
        setModalOpen(true);
    };

    const editTurno = (index) => {
        // Redirige a la página de edición o muestra un formulario para editar el turno
        navigate("/admin/registerAttendance");
    };

    // Definición de la función removeTurno
    const removeTurno = (day, index) => {
        const updatedTurnos = turnos[day].filter((_, i) => i !== index);
        setTurnos({ ...turnos, [day]: updatedTurnos });
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

    const classifyShiftsByDay = (data) => {
        const classified = {
            LUNES: [],
            MARTES: [],
            MIERCOLES: [],
            JUEVES: [],
            VIERNES: [],
            SABADO: [],
            DOMINGO: [],
        };
    
        data.forEach((item) => {
            if (item.shifts && item.shifts.length > 0) {
                item.shifts.forEach((shift) => {
                    if (classified[item.day]) {
                        classified[item.day].push({
                            id: shift.id,
                            inicio: shift.startTime || "00:00", // Hora de inicio del turno
                            fin: shift.endTime || "00:00", // Hora de fin del turno
                            cupos: shift.placeAvailable || 0, // Cambiar según la propiedad real para "cupos"
                        });
                    }
                });
            }
        });
        return classified;
    };
    
    

    const handleViewShift = () => {
        const fetchShift = async () => {
            try {
                const response = await fetch(SERVICES_BACK.GET_SHIFT_LIST + selectedCaf.id, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        credentials: 'include',
                    },
                });
                const data = await response.json();
                console.log(data);
                if (Array.isArray(data)) {
                    const classifiedShifts = classifyShiftsByDay(data);
                    setTurnos(classifiedShifts);
                    
                } else {
                    setError("El formato de datos de CAF es incorrecto.");
                }
            } catch (error) {
                setError(error.message);
            }
        };
        if (selectedCaf) {
            fetchShift();
        } else {
            MessagesError("Seleccione un CAF");
        }
    };
    

    return (
        <div className="containerBody">
            <Toaster
                position="top-center"
                dir="auto"
                duration={2000}
                visibleToasts={4}
                richColors
            />
            <h1>Asignar turnos y cupos</h1>
            <div>
                <h2>CAF</h2>
                <div className="form-group-Reg">
                    <label className="lbRegItem">Centro de Acondicionamiento Físico al que se desea inscribir:</label>
                    <select className="sltRegItem" onChange={handleCafChange}>
                        <option value="">Seleccione un CAF</option>
                        {caf.length > 0 ? (
                            caf.map((item, index) => (
                                <option key={index} value={item.id}>{item.name}</option>
                            ))
                        ) : (
                            <option disabled>Cargando caf...</option>
                        )}
                    </select>
                </div>

                <p>Selecciona el día de la semana y añade los turnos disponibles y los cupos</p>
                <div className="containerDays">
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
                                                <th className="thbutton">Acciones</th>
                                            </tr>
                                        </thead>
                                        <tbody className="tdAsSh">
                                            {turnos[day].map((turno, index) => (
                                                <tr className="trAsSh" key={turno.id}>
                                                    <td>{turno.id}</td>
                                                    <td>{turno.inicio}</td>
                                                    <td>{turno.fin}</td>
                                                    <td>{turno.cupos}</td>
                                                    <td className="tdbutton">
                                                        <div className="containerButtons">
                                                            <button className="buttonAssign" onClick={() => editTurno(index)}><FaEdit /></button>
                                                            <button className="buttonAssign" onClick={() => removeTurno(day, index)}><MdDelete /></button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                    <div className="containerButtonNewShift">
                                        <button onClick={() => addTurno(day)}>Añadir turno</button>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                    <button onClick={handleViewShift}>Mostrar Turnos</button>
                    <button>Guardar cambios</button>
                </div>
            </div>

            <TurnoModal
                isOpen={isModalOpen}
                onClose={() => setModalOpen(false)}
                onSave={handleSaveTurno}
                day={selectedDay}
                cafId={selectedCaf?.id} // Pasa el ID del CAF seleccionado
            />
        </div>
    );
};

export default AssignShiftsQuotas;
