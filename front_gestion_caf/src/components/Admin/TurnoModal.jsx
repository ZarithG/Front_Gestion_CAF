import React, { useState, useEffect } from "react";
import "../styles/TurnoModal.css";
import DatePicker from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import { SERVICES_BACK } from "../../constants/constants";
import { MessagesError, MessagesSuccess } from "../gestion-caf/Messages";

export const TurnoModal = ({ isOpen, onClose, onSave, day, cafId }) => {
    const [inicio, setInicio] = useState(null);
    const [fin, setFin] = useState(null);
    const [cupos, setCupos] = useState(1);
    const [storageToken, setToken] = useState('');
    const [selectedDay, setSelectedDay] = useState(""); // Define selectedDay como estado
    useEffect(() => {
        const token = localStorage.getItem("authToken");
        setToken(token);
        console.log(cafId)
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
            const hours = String(date.getHours()).padStart(2, '0'); // Asegura 2 dígitos para horas
            const minutes = String(date.getMinutes()).padStart(2, '0'); // Asegura 2 dígitos para minutos
            const seconds = String(date.getSeconds()).padStart(2, '0'); // Asegura 2 dígitos para segundos
            return `${hours}:${minutes}:${seconds}`; // Retorna en formato HH:mm:ss

        };

        const formattedInicio = inicio ? formatTo24Hours(inicio) : "00:00:00";
        const formattedFin = fin ? formatTo24Hours(fin) : "00:00:00";

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
            console.log(cupos)
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
                        maximumPlaceAvailable: cupos,
                        status:1
                    }
                    ]
                })
            });

            console.log(response.status)
            if (response.status !== 200) {
                if (response.status == 409) {
                    MessagesError('No se pudo crear el turno debido a un conflicto entre los horarios');
                    
                } else if (response.status === 422){
                    MessagesError('Error: La hora de inicio y fin son incorrectas');
                }else{
                    MessagesError("Hubo un error en el servidor");
                }
                onClose();
                return;
            }else{
                MessagesSuccess("Turno creado exitosamente");
            }

            const data = await response.json();

            if (data) {
                MessagesSuccess('Datos guardados exitosamente');
                setInicio(null);
                setFin(null);
                setCupos(1);
                
                onClose(); // Opcional, según tu flujo
                onSave();
            }
            else {
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
                        format="HH:mm:ss"
                        plugins={[<TimePicker position="bottom" />]}
                    />
                </div>
                <div className="containerNewShift">
                    <label className="lbNewShift">Hora de fin</label>
                    <DatePicker
                        disableDayPicker
                        value={fin}
                        onChange={handleFinChange}
                        format="HH:mm:ss"
                        plugins={[<TimePicker position="bottom" />]}
                    />
                </div>
                <div className="containerNewShift">
                    <label className="lbNewShift">Cupos</label>
                    <input
                        type="number"
                        value={cupos}
                        onChange={(e) => {
                            const value = parseInt(e.target.value, 10);
                            setCupos(isNaN(value) ? 1 : Math.max(1, value));
                        }}
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

export const TurnoModalEdit = ({ isOpen, onClose, onSave, day, oneShift }) => {
    console.log("oneShift", oneShift); // Verifica que se recibe correctamente
    const [inicio, setInicio] = useState(null);
    const [fin, setFin] = useState(null);
    const [cupos, setCupos] = useState(1);
    const [cafId, setCafId] = useState("");
    const [storageToken, setToken] = useState('');

    // When the modal opens and `oneShift` changes, update the state
    useEffect(() => {
        console.log("turno", oneShift)
        if (oneShift) {
            const inicioDate = new Date(`1970-01-01T${oneShift.inicio}Z`);
            const finDate = new Date(`1970-01-01T${oneShift.fin}Z`);
            setInicio(inicioDate);
            setFin(finDate);
            setCupos(oneShift.cupos);
        }
        const token = localStorage.getItem("authToken");
        setToken(token);
    }, [oneShift]); // Depend on `oneShift` so it updates when the shift is selected for editing

    // Format date to HH:mm:ss
    const formatTo24Hours = (date) => {
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');
        return `${hours}:${minutes}:${seconds}`;
    };

    const handleInicioChange = (newDateTime) => {
        const inicioDate = newDateTime ? new Date(newDateTime) : new Date();
        setInicio(inicioDate);

        const newFin = new Date(inicioDate);
        newFin.setMinutes(newFin.getMinutes() + 75); // Assuming duration is 75 minutes
        setFin(newFin);
    };

    const handleFinChange = (newDateTime) => {
        const finDate = newDateTime ? new Date(newDateTime) : new Date();
        setFin(finDate);
    };

    const handleSave = async () => {
        if (!inicio || !fin || fin <= inicio) {
            alert("La hora de fin debe ser posterior a la hora de inicio.");
            return;
        }

        if (cupos < 1) {
            alert("El número de cupos debe ser al menos 1.");
            return;
        }

        const formattedInicio = formatTo24Hours(inicio);
        const formattedFin = formatTo24Hours(fin);

        try {
            const response = await fetch(SERVICES_BACK.POST_SAVE_SHIFT, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${storageToken}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: oneShift.id, // Use the existing ID when editing
                    fitnessCenter: cafId,
                    day: day,
                    shifts: [{
                        id: oneShift.id,
                        dayAssignment: 1,
                        startTime: formattedInicio,
                        endTime: formattedFin,
                        maximumPlaceAvailable: cupos,
                        status: 1
                    }]
                })
            });

            if (response.status !== 200) {
                const errorData = await response.json();
                if (response.status == 409) {
                    MessagesError('Conflicto de horarios');
                } else {
                    MessagesError("Error al guardar el turno");
                }
                return;
            } else {
                MessagesSuccess("Turno actualizado correctamente");
                onSave();  // Inform the parent component that the shift was saved
                onClose();  // Close the modal
            }
        } catch (error) {
            MessagesError("Hubo un error en el servidor");
        }
    };

    return (
        isOpen ? (
            <div className="modal">
                <div className="modal-content">
                    <h2>Editar Turno</h2>
                    <label>Hora de inicio:</label>
                    <TimePicker value={inicio} onChange={handleInicioChange} />

                    <label>Hora de fin:</label>
                    <TimePicker value={fin} onChange={handleFinChange} />

                    <label>Cupos:</label>
                    <input type="number" value={cupos} onChange={(e) => setCupos(e.target.value)} />

                    <div className="modal-actions">
                        <button onClick={onClose}>Cancelar</button>
                        <button onClick={handleSave}>Guardar</button>
                    </div>
                </div>
            </div>
        ) : null
    );
};
