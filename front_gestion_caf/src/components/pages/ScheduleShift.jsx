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
                

                const response = await fetch(SERVICES_BACK.GET_USET_ALL_CAF + userEmail, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        credentials: 'include',
                    }
                });
                const data = await response.json();
                console.log(data)
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
                    console.log(oneCAFOptions)
                } else {
                    setError("El formato de datos de CAF es incorrecto.");
                }
            } catch (error) {
                setError(error.message);
            }
        };

        fetchUserInscriptionToCAF();
        fetchCAF();
        fetchuser();
        
    }, []);

    const fetchInstanceShif = async () => {
        try {
            console.log(SERVICES_BACK.GET_USER_INSTANCE_SHIFT + selectedCaf.code)
            const response = await fetch(
                SERVICES_BACK.GET_USER_INSTANCE_SHIFT + selectedCaf.code,
                {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        credentials: 'include',
                    }
                }
            );

            const data = await response.json();
            setShifts(data);
            console.log(data);

        } catch (error) {
            setError(error.message);
        }
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
            MessagesError("Por favor selecciona un CAF antes de agendar.");
            return;
        }
        try {
            const response = await fetch(SERVICES_BACK.POST_SHIFT_RESERVE, {
                method: 'POST', 
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: 0,
                    idShiftInstance: "cafId",
                    idDayAssignment: "day",
                    userId: user.id,
                    dateReservation: null,
                    reservationEnum: null,
                })
                
            });
            
            if (!response.ok) {
                console.log('Error:', response.status);  // Verifica el código de estado
                const errorData = await response.json();
                console.log('Error Data:', errorData);  // Imprime la respuesta completa de error
                if (response.status === 400) {
                    MessagesError('Bad request');
                } else {
                    MessagesError('Hubo un error en el servidor');
                }
                return;
            }

            const data = await response.json();
            console.log(data);  // Agrega esto para ver la respuesta completa


            if (data) {
                MessagesSuccess('Se creo instancia');
            }
            else {
                MessagesError('No se pudieron guardar los datos');
            }
            MessagesSuccess("Turno Apartado correctamente.");
        } catch (error) {
            MessagesError('Hubo un error en el servidor. Inténtalo nuevamente.');
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
        const options = { day: '2-digit', month: 'long' }; // day con dos dígitos y month en formato largo
        return new Date(date).toLocaleDateString('es-CO', options);
    };

    const handleShiftChange = (event) =>{
        const shiftId = parseInt(event.target.value);
        setSelectedShift(shifts.find(item => item.code === shiftId)); // Guarda el CAF seleccionado
        if(shiftId){
            setSelectedShift();
        }
    }

    const handleCafChange = (event) => {
        const cafId = parseInt(event.target.value);
        if(cafId){
            setSelectedCaf(oneCAFOptions.find(item => item.code === cafId)); // Guarda el CAF seleccionado
            setShifts([]);
            fetchInstanceShif();   
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
                                <option disabled>Cargando caf...</option>
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
                                        {`Turno ${index+1}: ${formatDate(shift.date)}
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
