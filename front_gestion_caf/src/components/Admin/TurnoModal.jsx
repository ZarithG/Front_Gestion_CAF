// TurnoModal.jsx
import React, { useState } from "react";
import "../styles/TurnoModal.css";

const TurnoModal = ({ isOpen, onClose, onSave }) => {
    const [inicio, setInicio] = useState("");
    const [fin, setFin] = useState("");
    const [cupos, setCupos] = useState(1);

    const handleSave = () => {
        onSave({ inicio, fin, cupos });
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Añadir Turno</h2>
                <label>Hora de inicio</label>
                <input
                    type="time"
                    value={inicio}
                    onChange={(e) => setInicio(e.target.value)}
                />
                <label>Hora de fin</label>
                <input
                    type="time"
                    value={fin}
                    onChange={(e) => setFin(e.target.value)}
                />
                <label>Cupos</label>
                <input
                    type="number"
                    value={cupos}
                    onChange={(e) => setCupos(e.target.value)}
                    min="1"
                />
                <div className="modal-buttons">
                    <button onClick={onClose}>Cancelar</button>
                    <button onClick={handleSave}>Añadir</button>
                </div>
            </div>
        </div>
    );
};

export default TurnoModal;
