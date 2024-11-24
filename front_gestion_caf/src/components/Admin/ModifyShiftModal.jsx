import React, { useState, useEffect } from "react";
import "../styles/TurnoModal.css";
import DatePicker from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import { SERVICES_BACK } from "../../constants/constants";
import { MessagesError, MessagesSuccess } from "../gestion-caf/Messages";

const ModifyShiftModal = ({ isOpen, onClose,  day, cafId, shiftIdEdit,startTimeEdit,endTimeEdit, placeAvailableEdit }) => {
    const [shiftId, setShiftId] = useState(shiftIdEdit);
    const [startTime, setStartTime] = useState(startTimeEdit);
    const [endTime, setEndTime] = useState(endTimeEdit);
    const [places, setPlaces] = useState(placeAvailableEdit);
    const [storageToken, setToken] = useState('');
    const [selectedDay, setSelectedDay] = useState(""); // Define selectedDay como estado
    useEffect(() => {
        const token = localStorage.getItem("authToken");
        setToken(token);
    }, []);

    // Maneja el cambio de hora de startTime y calcula el endTime automáticamente
    const handleInicioChange = (newDateTime) => {
        const inicioDate = newDateTime ? new Date(newDateTime) : new Date();
        setStartTime(inicioDate);

        // Calcula la hora de endTime sumando 75 minutos
        const newFin = new Date(inicioDate);
        newFin.setMinutes(newFin.getMinutes() + 75);
        setEndTime(newFin);
    };

    // Maneja la hora de endTime manualmente si se modifica
    const handleFinChange = (newDateTime) => {
        const finDate = newDateTime ? new Date(newDateTime) : new Date();
        setEndTime(finDate);
    };

    // Función para guardar los datos
    const handleSave = async () => {
        if (!startTime || !endTime || endTime <= startTime) {
            alert("La hora de fin debe ser posterior a la hora de startTime.");
            return;
        }

        if (places < 1) {
            alert("El número de cupos debe ser al menos 1.");
            return;
        }

        const formatTo24Hours = (date) => {
            const hours = String(date.getHours()).padStart(2, '0'); // Asegura 2 dígitos para horas
            const minutes = String(date.getMinutes()).padStart(2, '0'); // Asegura 2 dígitos para minutos
            const seconds = String(date.getSeconds()).padStart(2, '0'); // Asegura 2 dígitos para segundos
            return `${hours}:${minutes}:${seconds}`; // Retorna en formato HH:mm:ss

        };

        const formattedInicio = startTime ? formatTo24Hours(startTime) : "00:00:00";
        const formattedFin = endTime ? formatTo24Hours(endTime) : "00:00:00";

        console.log(JSON.stringify({
            id: 0,
            fitnessCenter: cafId,
            day: day,
            shifts: [{
                id: 0,
                dayAssignment: 1,
                startTime: formattedInicio,
                endTime: formattedFin,
                placeAvailable: places
            }
            ]
        }))
        try {
            const token = storageToken;

            const response = await fetch(SERVICES_BACK.PUT_EDIT_SHIFT, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: 0,
                    fitnessCenter: cafId,
                    day: day,
                    shifts: [{
                        id: shiftIdEdit,
                        dayAssignment: 1,
                        startTime: formattedInicio,
                        endTime: formattedFin,
                        placeAvailable: places
                    }
                    ]
                })
            });

            if (!response.ok) {
                if (response.status === 400) {

                } else {
                    MessagesError('Hubo un error en el servidor');
                }
                return;
            }

            const data = await response.json();

            if (data) {
                MessagesSuccess('Datos modificados exitosamente');
                setStartTime(null);
                setEndTime(null);
                setPlaces(1);
                onClose(); // Opcional, según tu flujo
            }
            else {
                MessagesError('No se pudieron modificar los datos');
            }
        } catch (error) {
            MessagesError('Hubo un error en el servidor');
        }

    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Editar Turno</h2>
                <div className="containerNewShift">
                    <label>Hora de inicio</label>
                    <DatePicker
                        disableDayPicker
                        value={startTime}
                        onChange={handleInicioChange}
                        format="HH:mm:ss"
                        plugins={[<TimePicker position="bottom" />]}
                    />
                </div>
                <div className="containerNewShift">
                    <label className="lbNewShift">Hora de fin</label>
                    <DatePicker
                        disableDayPicker
                        value={endTime}
                        onChange={handleFinChange}
                        format="HH:mm:ss"
                        plugins={[<TimePicker position="bottom" />]}
                    />
                </div>
                <div className="containerNewShift">
                    <label className="lbNewShift">Cupos</label>
                    <input
                        type="number"
                        value={places}
                        onChange={(e) => {
                            const value = parseInt(e.target.value, 10);
                            setPlaces(isNaN(value) ? 1 : Math.max(1, value));
                        }}
                        min="1"
                    />
                </div>
                <div className="modal-buttons">
                    <button onClick={onClose}>Cancelar</button>
                    <button onClick={handleSave}>Editar</button>
                </div>
            </div>
        </div>
    );
};

export default ModifyShiftModal;
