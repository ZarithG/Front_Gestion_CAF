import React, { useState, useEffect } from "react";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // Importa los estilos básicos de react-calendar
import "../styles/SheduleShift.css";
import { useNavigate } from "react-router-dom";
import { MessagesError, MessagesSuccess } from "../gestion-caf/Messages";
import { SERVICES_BACK } from "../../constants/constants";
import { Toaster, toast } from "sonner";

const ScheduleShift = () => {
    const [date, setDate] = useState(new Date());
    const [error, setError] = useState("");
    const [selectedCaf, setSelectedCaf] = useState("");
    const [selectedShift, setSelectedShift] = useState("");
    const [user, setUser] = useState("");
    const [CAFOptions, setCAFOptions] = useState([]);
    const [oneCAFOptions, setOneCAFOptions] = useState([]);
    const [shifts, setShifts] = useState([]);
    const [shiftsView, setShiftsView] = useState([]);
    const navigate = useNavigate();
    const userEmail = localStorage.getItem("userName");
    const token = localStorage.getItem("authToken");
    const today = new Date();
    const maxDate = new Date(today);
    maxDate.setDate(today.getDate());

    useEffect(() => {
        const fetchUserInscriptionToCAF = async () => {
            try {

                const response = await fetch(
                    SERVICES_BACK.GET_USER_ACTIVE_INSCRIPTION + userEmail,
                    {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            credentials: 'include',
                        }
                    }
                );

                const data = await response.json();
                setCAFOptions(data);
            } catch (error) {
                setError(error.message);
            }
        };


        const fetchCAF = async () => {
            try {
                const response = await fetch(SERVICES_BACK.GET_USER_ACTIVE_INSCRIPTION + userEmail, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        credentials: 'include',
                    }
                });
                const data = await response.json();
                if (Array.isArray(data)) {
                    const processedInscriptions = data.map((item) => ({
                        code: item.fitnessCenterDTO.id, // Código de la inscripción
                        fitnessCenterName: item.fitnessCenterDTO.name, // Nombre del centro de fitness
                        description: item.fitnessCenterDTO.description, // Descripción del centro de fitness
                        sectional: item.fitnessCenterDTO.sectional.name, // Nombre de la sede
                        inscriptionDate: new Date(item.inscriptionDate).toLocaleString(), // Fecha de inscripción
                        status: item.inscriptionStatus === "ACCEPTED" ? "Aceptado" : "Pendiente", // Estado de la inscripción
                    }));
                    setOneCAFOptions(processedInscriptions);

                } else {
                    setError("El formato de datos de CAF es incorrecto.");
                }
            } catch (error) {
                setError(error.message);
            }
        };

        toast.promise(
            fetchUserInscriptionToCAF(),
            {
                loading: 'Cargando inscripciones...',
                success: <b>Inscripciones cargadas correctamente.</b>,
                error: <b>No se pudieron cargar las inscripciones.</b>,
            }
        );

        toast.promise(
            fetchCAF(),
            {
                loading: 'Cargando datos de CAF...',
                success: <b>Datos de CAF cargados correctamente.</b>,
                error: <b>Error al cargar los datos de CAF.</b>,
            }
        );

        toast.promise(
            fetchuser(),
            {
                loading: 'Cargando datos del usuario...',
                success: <b>Datos del usuario cargados correctamente.</b>,
                error: <b>Error al cargar los datos del usuario.</b>,
            }
        );
    }, []);

    const fetchInstanceShif = async () => {
        toast.promise(
            (async () => {
                console.log(selectedCaf)
                const response = await fetch(SERVICES_BACK.GET_USER_INSTANCE_SHIFT + selectedCaf.code, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        credentials: 'include',
                    }
                });
                const data = await response.json();
                setShifts(data);
            })(),
            {
                loading: 'Cargando turnos disponibles...',
                success: <b>Turnos cargados correctamente.</b>,
                error: <b>Error al cargar los turnos.</b>,
            }
        );
    };

    const fetchuser = async () => {
        try {
            const response = await fetch(
                SERVICES_BACK.GET_ONE_USER + userEmail,
                {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        credentials: 'include',
                    }
                }
            );

            const data = await response.json();
            setUser(data);

        } catch (error) {
            setError(error.message);
        }
    };

    const handleScheduleShift = async (e) => {
        e.preventDefault();
        if (!selectedCaf) {
            MessagesError("Por favor selecciona un opción antes de agendar.");
            return;
        }
        if (window.confirm(`Desea apartar un turno en el horario ${selectedCaf}`)) {
            toast.promise(
                (async () => {
                    const response = await fetch(SERVICES_BACK.POST_SHIFT_RESERVE, {
                        method: 'POST',
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            id: 0,
                            idShiftInstance: selectedShift.id,
                            idDayAssignment: selectedShift.dayAssignment.id,
                            userId: user.id,
                            dateReservation: null,
                            reservationEnum: null,
                        })
                    });

                    if (!response.ok) {
                        throw new Error('Error al agendar turno.');
                    }

                    const data = await response.json();
                    if (data) {
                        MessagesSuccess("Turno apartado correctamente.");
                    }
                })(),
                {
                    loading: 'Agendando turno...',
                    success: <b>Turno agendado correctamente.</b>,
                    error: <b>No se pudo agendar el turno.</b>,
                }
            );
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

    const formatTime = (time) => {
        if (!time) {
            return "--:--"; // Devuelve un valor predeterminado si time no es válido
        }
        const [hours, minutes] = time.split(':');
        return `${hours}:${minutes}`; // Retorna el formato HH:mm
    };

    const formatDate = (date) => {
        const options = { day: '2-digit', month: 'long', year: 'numeric' };
        return new Date(date + 'Z').toLocaleDateString('es-CO', options);
    };


    const handleShiftChange = (event) => {
        const shiftId = parseInt(event.target.value);
        if (shiftId) {
            setSelectedShift(shifts.find(item => item.id === shiftId)); // Guarda el CAF seleccionado

        }
    }

    const handleCafChange = (event) => {
        const cafId = parseInt(event.target.value);
        if (cafId) {
            const selectedCaf = oneCAFOptions.find(item => item.code === cafId); // Guarda el CAF seleccionado
            setShifts([]);
            toast.promise(
                (async () => {
                    console.log(selectedCaf.code)
                    const response = await fetch(SERVICES_BACK.GET_USER_INSTANCE_SHIFT + selectedCaf.code, {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            credentials: 'include',
                        }
                    });
                    const data = await response.json();
                    setShifts(data);
                })(),
                {
                    loading: 'Cargando turnos disponibles...',
                    success: <b>Turnos cargados correctamente.</b>,
                    error: <b>Error al cargar los turnos.</b>,
                }
            );
        }
    };

    return (
        <div className="containerBodyScheduleShift">
            <Toaster
                position="top-center"
                dir="auto"
                duration={2000}
                visibleToasts={4}
                richColors
            />
            <h1 className="titleScheduleShift">Agendar Turno</h1>
            <div className="flexContainer">
                <div className="verticalContainer">
                    <div className="containerCAFSelection">
                        <h2 className="titleCAF">CAF</h2>
                        <p className="descriptionCAF">Seleccione el CAF en el cual desee agendar un turno.</p>
                        <select className="sltRegItem" onChange={handleCafChange}>
                            <option value="">Seleccione un CAF</option>
                            {oneCAFOptions.length > 0 ? (
                                oneCAFOptions.map((item, index) => (
                                    <option key={index} value={item.code}>{item.fitnessCenterName}</option>
                                ))
                            ) : (
                                <option disabled>No se ha inscrito a ningun CAF aún</option>
                            )}
                        </select>

                    </div>
                    <div className="containerShiftsAvailable">
                        <h2 className="titleShiftsAvailable">Turnos Disponibles</h2>
                        <p className="descriptionShiftsAvailable">Seleccione el turno al cual desea asistir</p>
                        <select className="sltRegItem" onChange={handleShiftChange}>
                            <option value={0}>Seleccione un turno</option>
                            {shifts.length > 0 ? (
                                shifts.map((shift, index) => (
                                    <option key={index} value={shift.id}>
                                        {`Turno ${index + 1}: ${(shift.date)}
                                        ${formatTime(shift.startTime)} a 
                                        ${formatTime(shift.endTime)}`}
                                    </option>
                                ))
                            ) : (
                                <option value="">No hay turnos disponibles</option>
                            )}
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
