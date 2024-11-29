import React, { useEffect, useState } from "react";
import { Route, Navigate, useNavigate } from "react-router-dom";
import { SERVICES_BACK, USER_TYPE } from "../../constants/constants";
import "../styles/Notification.css"
import { MessagesError, MessagesSuccess, MessagesWarning } from "../gestion-caf/Messages";
import { Toaster } from "sonner";

const initialUser = {
    code: "", fullName: " ", email: "ejemplo@email.com", status: ""
};

const Notifications = () => {
    const username = localStorage.getItem("userName");
    const token = localStorage.getItem("authToken");
    const [userData, setUserData] = useState("");
    const [inscription, setInscription] = useState("");
    const [shift, setShift] = useState("");
    const solicitudes = [
        { id: "SI-021213", caf: "Uptc-Sede Salud", estado: "EN REVISION", color: "blue" },
        { id: "SI-021213", caf: "Uptc-Sede central", estado: "ACEPTADO", color: "green" },
    ];
    const turnos = [
        { id: "SI-021213", caf: "Uptc-Sede Salud", turno: "10:00am - 11:15am" },
        { id: "SI-021213", caf: "Uptc-Sede Salud", turno: "10:00am - 11:15am" },

    ];

    useEffect(() => {
        const fetchInscripton = async () => {
            try {
                const response = await fetch(
                    `${SERVICES_BACK.GET_USET_ALL_CAF}${username}`,
                    {
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                const data = await response.json();

                if (response.ok) {
                    setInscription(data); // Actualiza el estado
                    console.log(inscription)
                } else {
                    console.error("Error al cargar turnos:", data.message || "Error desconocido");
                }
            } catch (error) {
                console.error("Error al cargar turnos:", error.message);
            }
        };

        const fetchUser = async () => {
            try {
                const response = await fetch(
                    `${SERVICES_BACK.GET_ONE_USER}${username}`,
                    {
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                const data = await response.json();

                if (response.ok) {
                    setUserData(data); // Actualiza el estado
                    console.log(userData);
                } else {
                    console.error("Error al cargar turnos:", data.message || "Error desconocido");
                }
            } catch (error) {
                console.error("Error al cargar turnos:", error.message);
            }
        };
        console.log(inscription);
        if (!inscription) {
            fetchInscripton();
        }
        if (!userData) {
            fetchUser();
            console.log("User")
        }
        const fetchShiftUser = async () => {
            try {
                const response = await fetch(
                    `${SERVICES_BACK.GET_RESERBE_BY_USER}${userData.id}`,
                    {
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },

                    }
                );

                const data = await response.json();

                if (response.ok) {
                    setShift(data); // Actualiza el estado
                } else if (response.status === 204) {
                    MessagesWarning("No hay reservaciones agendadas")
                } else {
                    console.error("Error al cargar turnos:", data.message || "Error desconocido");
                }
            } catch (error) {
                MessagesWarning("No tiene turnos registrados")
            }
        };
        if (!shift) {
            fetchShiftUser();
        }
        console.log("Turno:", shift)
    });

    const handleShiftCancel = (index) => {
        const shiftCancel = shift[index];
        console.log("Cancelar", shiftCancel)
        fetchRegisterAttendance(shiftCancel);
    }

    const fetchRegisterAttendance = async (userReservation) => {
        try {
            console.log(userReservation)
            console.log(JSON.stringify({
                id: userReservation.id,  // ID de la reservación
                idShiftInstance: userReservation.shiftInstance.id,  // ID de la instancia de turno
                idDayAssignment: 0,  // ID del día asignado (puedes ajustarlo si es diferente)
                userId: userReservation.userId,  // ID del usuario
                dateReservation: userReservation.dateReservation,
                reservationEnum: "SCHEDULED",  // Estado de la reservación (ajustalo según tu lógica)
            }))
            const token = localStorage.getItem("authToken");
            const response = await fetch(SERVICES_BACK.POST_SHIFTS_CANCEL, {
                method: "POST",
                headers: {
                    'Authorization': `Bearer ${token}`,
                    credentials: "include",
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: userReservation.id,  // ID de la reservación
                    idShiftInstance: userReservation.shiftInstance.id,  // ID de la instancia de turno
                    idDayAssignment: 0,  // ID del día asignado (puedes ajustarlo si es diferente)
                    userId: userReservation.userId,  // ID del usuario
                    dateReservation: userReservation.dateReservation,
                    reservationEnum: "SCHEDULED",  // Estado de la reservación (ajustalo según tu lógica)
                })
            });
            console.log(response.status)
            const data = await response.json();

            console.log("Respuesta de la cancelación del turno:", data);
            if (data.id) {
                MessagesSuccess("Turno cancelado correctamente.");
                window.location.reload();
            } else {
                throw new Error("Error en el formato de la respuesta.");
            }
        } catch (error) {
            console.error("Error al cancelar Turno:", error);
            MessagesError("Error al cacelar el turno");
        }
    };

    const handleViewHistory = () => {
        // Redirige o muestra información del historial
        console.log("Ver historial clickeado");
    };
    const formatTime = (time24) => {
        if (!time24) {
            return "--"; // O un valor predeterminado si lo prefieres
        }
        // Separar la hora, minuto y segundo
        const [hours, minutes, seconds] = time24.split(":");

        // Convertir la hora de 24 horas a 12 horas
        const hour12 = hours % 12 || 12; // Si la hora es 0 (medianoche), se muestra como 12.

        // Determinar AM o PM
        const ampm = hours >= 12 ? "pm" : "am";

        // Retornar la hora en formato de 12 horas
        return `${hour12}:${minutes} ${ampm}`;
    };
    const [user, setUser] = useState(initialUser);
    //const userName = localStorage.getItem("userName");
    return (
        <div className="Notification">
            <Toaster
                position="top-center"
                dir="auto"
                duration={2000}
                visibleToasts={4}
                richColors
            />
            <div className="containerTitle">
                <h1> Usuario {username}</h1>
            </div>

            <div className="ntContainer">
                <div className="notifications-container">
                    <table className="notifications-table">
                        <thead>
                            <tr>
                                <th className="id">ID</th>
                                <th>CAF</th>
                                <th>Descripción</th>
                                <th>Estado</th>
                            </tr>
                        </thead>
                        <tbody>
                            {inscription.length > 0 ? (
                                inscription.map((item) => (
                                    <tr
                                        key={item.id}
                                        className={`estado-${item.inscriptionStatus.toLowerCase()}`} // Añade clase dinámica
                                    >
                                        <td>{item.id}</td>
                                        <td>{item.fitnessCenterDTO.name}</td>
                                        <td>{item.fitnessCenterDTO.description}</td>
                                        <td>
                                            {item.inscriptionStatus === "ACCEPTED"
                                                ? "Aceptado"
                                                : item.inscriptionStatus === "PENDING"
                                                    ? "Pendiente"
                                                    : "Rechazado"}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4">No hay inscripciones disponibles</td>
                                </tr>
                            )}
                        </tbody>

                    </table>
                </div>

                <div className="containerTurnos">
                    <h1>Turnos</h1>
                    <div className="notifications-container">
                        <table className="notifications-table">
                            <thead>
                                <tr>
                                    <th>Fecha</th>
                                    <th>CAF</th>
                                    <th>Turno</th>
                                    <th>Opciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {shift.length > 0 ? (
                                    shift.map((item, index) => (
                                        <tr key={index}>
                                            <td>{item.shiftInstance.date}</td>
                                            <td>{item.shiftInstance.shift.dayAssignment.fitnessCenter}</td>
                                            <td>
                                                {`${formatTime(item.shiftInstance.shift.startTime)} a 
                                            ${formatTime(item.shiftInstance.shift.endTime)}`}
                                            </td>
                                            <td>
                                                <button onClick={() => handleShiftCancel(index)}>Cancelar</button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="4">No hay turnos disponibles</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Notifications;


