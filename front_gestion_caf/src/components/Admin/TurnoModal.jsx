import React, { useState } from "react";
import "../styles/TurnoModal.css";
import DatePicker from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/time_picker";

const TurnoModal = ({ isOpen, onClose, onSave }) => {
    const [inicio, setInicio] = useState(null);
    const [fin, setFin] = useState(null);
    const [cupos, setCupos] = useState(1);

    const handleInicioChange = (newDateTime) => {
        // Verificar si newDateTime es un objeto DateTime y convertirlo a Date
        const inicioDate = newDateTime ? new Date(newDateTime) : new Date();

        setInicio(inicioDate);

        // Calcular la hora de fin (75 minutos después)
        const newFin = new Date(inicioDate);
        newFin.setMinutes(newFin.getMinutes() + 75);
        setFin(newFin);
    };

    const handleSave = () => {
        if (!inicio || !fin || fin <= inicio) {
            alert("La hora de fin debe ser posterior a la hora de inicio.");
            return;
        }
        if (cupos < 1) {
            alert("El número de cupos debe ser al menos 1.");
            return;
        }

        // Asegúrate de que `inicio` y `fin` son objetos Date antes de llamar a `toLocaleTimeString`
        const formattedInicio = inicio instanceof Date ? inicio.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '';
        const formattedFin = fin instanceof Date ? fin.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '';

        // Pasar los datos formateados a la función de guardado
        onSave({
            inicio: formattedInicio,
            fin: formattedFin,
            cupos,
        });
        onClose();
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
                        onChange={(date) => setFin(date)}
                        format="hh:mm A"
                        plugins={[<TimePicker position="bottom" />]}
                    />
                </div>
                <div className="containerNewShift">
                    <label className="lbNewShift">Cupos</label>
                    <input
                        type="number"
                        value={cupos}
                        onChange={(e) => setCupos(e.target.value)}
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
