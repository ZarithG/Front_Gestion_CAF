import React, { useState, useEffect } from "react";
import "../styles/TurnoModal.css";
import DatePicker from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import { SERVICES_BACK } from "../../constants/constants";
import { MessagesError, MessagesSuccess } from "../gestion-caf/Messages";
import { format } from 'date-fns';


const TurnoModal = ({ isOpen, onClose, onSave, day, cafId }) => {
    const [inicio, setInicio] = useState(null);
    const [fin, setFin] = useState(null);
    const [cupos, setCupos] = useState(1);
    const [storageToken, setToken] = useState('');
    const [selectedDay, setSelectedDay] = useState(""); // Define selectedDay como estado
    useEffect(() => {
        const token = localStorage.getItem("authToken");
        setToken(token);
    }, []);

    // Maneja el cambio de hora de inicio y calcula el fin automáticamente
    const handleInicioChange = (newDateTime) => {
        const inicioDate = newDateTime ? new Date(newDateTime) : new Date();
        setInicio(inicioDate);

        // Calcula la hora de fin sumando 75 minutos
        const newFin = new Date(inicioDate);
        newFin.setMinutes(newFin.getMinutes() + 75);
        setFin(newFin);
    };

    // Maneja la hora de fin manualmente si se modifica
    const handleFinChange = (newDateTime) => {
        const finDate = newDateTime ? new Date(newDateTime) : new Date();
        setFin(finDate);
    };

    // Función para guardar los datos
    const handleSave = async () => {
        if (!inicio || !fin || fin <= inicio) {
            alert("La hora de fin debe ser posterior a la hora de inicio.");
            return;
        }

        if (cupos < 1) {
            alert("El número de cupos debe ser al menos 1.");
            return;
        }

        const formatTo24Hours = (date) => {
            const hours = date.getHours(); // Obtiene las horas en formato 24 horas
            const minutes = date.getMinutes(); // Obtiene los minutos
            const strMinutes = minutes < 10 ? `0${minutes}` : minutes; // Añade un 0 si los minutos son menores a 10
            return `${hours}:${strMinutes}`; // Devuelve la hora en formato 24 horas
        };

        const formattedInicio = inicio instanceof Date
            ? formatTo24Hours(inicio)
            : '';
        const formattedFin = fin instanceof Date
            ? formatTo24Hours(fin)
            : '';

            
        console.log(JSON.stringify({
            id: 0,
            fitnessCenter: cafId,
            day: day,
            shifts: [{
                id: 0,
                dayAssignment: 1,
                startTime: formattedInicio,
                endTime: formattedFin,
                placeAvailable: cupos
            }
            ]
        }))
        try {
            const token = storageToken;

            const response = await fetch(SERVICES_BACK.POST_SAVE_SHIFT, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: 0,
                    fitnessCenter: cafId,
                    day: day,
                    shifts: [{
                        id: 0,
                        dayAssignment: 1,
                        startTime: formattedInicio,
                        endTime: formattedFin,
                        placeAvailable: cupos
                    }
                    ]
                })
            });

            if (!response.ok) {
                if (response.status === 400) {
                    MessagesError('Hubo un problema guardando la contraseña');
                } else {
                    MessagesError('Hubo un error en el servidor');
                }
                return;
            }

            const data = await response.json();

            if (data) {
                console.log(data)
                MessagesSuccess('Datos guardados exitosamente');
                //onClose();
            } else {
                MessagesError('No se pudieron guardar los datos');
            }
        } catch (error) {
            MessagesError('Hubo un error en el servidor');
        }



    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Añadir Turno</h2>
                <div className="containerNewShift">
                    <label>Hora de inicio</label>
                    <DatePicker
                        disableDayPicker
                        value={inicio}
                        onChange={handleInicioChange}
                        format="hh:mm A"
                        plugins={[<TimePicker position="bottom" />]}
                    />
                </div>
                <div className="containerNewShift">
                    <label className="lbNewShift">Hora de fin</label>
                    <DatePicker
                        disableDayPicker
                        value={fin}
                        onChange={handleFinChange} // Actualizar el valor de fin con la nueva hora
                        format="hh:mm A"
                        plugins={[<TimePicker position="bottom" />]}
                    />
                </div>
                <div className="containerNewShift">
                    <label className="lbNewShift">Cupos</label>
                    <input
                        type="number"
                        value={cupos}
                        onChange={(e) => setCupos(Math.max(1, e.target.value))}
                        min="1"
                    />
                </div>
                <div className="modal-buttons">
                    <button onClick={onClose}>Cancelar</button>
                    <button onClick={handleSave}>Añadir</button>
                </div>
            </div>
        </div>
    );
};

export default TurnoModal;
