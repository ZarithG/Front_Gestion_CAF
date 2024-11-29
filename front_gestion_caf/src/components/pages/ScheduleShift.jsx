import React, { useState, useEffect } from "react";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // Importa los estilos básicos de react-calendar
import "../styles/SheduleShift.css";
import { useNavigate } from "react-router-dom";
import { SERVICES_BACK, USER_TYPE } from "../../constants/constants";
import { Toaster, toast } from "sonner";
import { MessagesError, MessagesInfo, MessagesSuccess, MessagesWarning, showToastPromise } from "../gestion-caf/Messages";
import Swal from 'sweetalert2';

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


        if (localStorage.getItem("roleName") === USER_TYPE.SPORTSMAN) {
            const fetchAllCAF = async () => {
                try {
                    const response = await fetch(SERVICES_BACK.GET__ALL_CAF, {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            credentials: 'include',
                        }
                    });
                    const data = await response.json();
                    if (Array.isArray(data)) {
                        const processedInscriptions = data.map((item) => ({
                            code: item.id, // Código de la inscripción
                            fitnessCenterName: item.name, // Nombre del centro de fitness
                            description: item.description, // Descripción del centro de fitness
                            sectional: item.sectional.name, // Nombre de la sede
                            inscriptionDate: "", // Fecha de inscripción
                            status: "" // Estado de la inscripción
                        }));
                        setOneCAFOptions(processedInscriptions);
                        // if(oneCAFOptions.length != 0){
                        //     console.log("Mayor a 0 arriba")
                        //     const hasPending = oneCAFOptions.some(
                        //         (inscription) =>
                        //             inscription.status === "Pendiente" && inscription.code === selectedCaf.code
                        //     );
                        //     if(hasPending){
                        //         console.log("Pendiente")
                        //         MessagesWarning("Tu inscripción al CAF aún está siento revisada, pronto te notificaremos.");
                        //     }
                        // }else{
                        //     MessagesWarning("Para acceder a los serivicios del CAF, primero debes completar tu inscripción.");
                        // }
                       

                    } else {
                        setError("El formato de datos de CAF es incorrecto.");
                    }
                } catch (error) {
                    setError(error.message);
                }
            };

            toast.promise(
                fetchAllCAF(),
                {
                    loading: 'Cargando datos de CAF...',
                    success: <b>Datos de CAF cargados correctamente.</b>,
                    error: <b>Error al cargar los datos de CAF.</b>,
                }
            );
        } else {
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

                        // if(oneCAFOptions.length != 0){
                        //     console.log("Mayor a 0")
                        //     const hasPending = oneCAFOptions.some(
                        //         (inscription) =>
                        //             inscription.status === "Pendiente" && inscription.code === selectedCaf.code
                        //     );
                        //     if(hasPending){
                        //         console.log("Pendiente")
                        //         MessagesWarning("Tu inscripción al CAF aún está siento revisada, pronto te notificaremos.");
                        //     }
                        // }else{
                        //     MessagesWarning("Para acceder a los serivicios del CAF, primero debes completar tu inscripción.");
                        // }
                        
                    } else {
                        setError("El formato de datos de CAF es incorrecto.");
                    }
                } catch (error) {
                    setError(error.message);
                }
            };

            toast.promise(
                fetchCAF(),
                {
                    loading: 'Cargando datos de CAF...',
                    success: <b>Datos de CAF cargados correctamente.</b>,
                    error: <b>Error al cargar los datos de CAF.</b>,
                }
            );
        }

        fetchUserInscriptionToCAF()

        fetchuser()
        
    }, []);

    

    useEffect(() => {
        const fetchShifts = async () => {
            try {
                const response = await fetch(
                    `${SERVICES_BACK.GET_USER_INSTANCE_SHIFT}${selectedCaf.code}`,
                    {
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                const data = await response.json();

                if (response.ok) {
                    setShifts(data); // Actualiza el estado
                } else {
                    console.error("Error al cargar turnos:", data.message || "Error desconocido");
                }
            } catch (error) {
                console.error("Error al cargar turnos:", error.message);
            }
        };

        if (selectedCaf) {
            fetchShifts();
        }
    }, [selectedCaf, token])


    const fetchInstanceShif = async () => {
        toast.promise(
            (async () => {

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
    
        Swal.fire({
            title: "Agendar Turno",
            text: `Desea apartar un turno en el horario `,
            icon: "warning",
            showDenyButton: true,
            showCancelButton: true, // Muestra el botón "No"
            confirmButtonText: 'Sí', // Botón "Sí"
            denyButtonText: 'No',  // Botón "No"
        }).then(response => {
            if (response.isConfirmed) {
                toast.promise(
                    (async () => {
                        try {
                            const res = await fetch(SERVICES_BACK.POST_SHIFT_RESERVE, {
                                method: 'POST',
                                headers: {
                                    'Authorization': `Bearer ${token}`,
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({
                                    idShiftInstance: selectedShift.id,
                                    idDayAssignment: selectedShift.shift.dayAssignment.id,
                                    userId: user.id
                                })
                            });
                            if (res.status === 200) {
                                // Mensaje de advertencia para el código 204
                                MessagesSuccess("El turno ha sido creado con exito");
                            } else
                            if (res.status === 204) {
                                // Mensaje de advertencia para el código 204
                                MessagesWarning("Ya ha agendado un turno para ese día.");
                                return;
                            } 
    
                            if (!res.ok) {
                                throw new Error('Error al agendar turno.');
                            }
    
                            return "Turno agendado correctamente."; // Se utilizará este mensaje para el success
    
                        } catch (error) {
                            setError(error.message);
                            throw error; // Lanzamos el error para que lo maneje `toast.promise`
                        }
                    })(),
                    {
                        loading: 'Agendando turno...',
                        error: <b>No se pudo agendar el turno.</b>,
                    }
                );
            } else if (response.isDismissed) {
                console.log('El usuario canceló la acción');
            }
        });
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

    const formatDate = (date) => {
        const options = { day: '2-digit', month: 'long', year: 'numeric' };
        return new Date(date + 'Z').toLocaleDateString('es-CO', options);
    };


    const handleShiftChange = (event) => {
        const shiftId = parseInt(event.target.value);
        if (shiftId) {
            const select = shifts.find(item => item.id === shiftId);
            setSelectedShift(select)
        }
    }

    const handleCafChange = (event) => {
        const cafId = parseInt(event.target.value);
        if (cafId) {
            const select = oneCAFOptions.find(item => item.code === cafId);
            setSelectedCaf(select)
            toast.promise(
                (async () => {
                    const response = await fetch(SERVICES_BACK.GET_USER_INSTANCE_SHIFT + select.code, {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            credentials: 'include',
                        }
                    });
                    const data = await response.json();
                    if (response.ok) {

                        setShifts(data);
                    } else if (response.status == 204) {
                        MessagesInfo("No se encontraron turnos.");
                    } else if (response.status == 404) {
                        MessagesInfo("Error al listar los turnos.");
                    }

                })(),
                {
                    loading: 'Cargando turnos disponibles...',
                    success: <b>Turnos cargados correctamente.</b>,
                    error: <b>Error al cargar los turnos.</b>,
                }
            );
        }
    };

    const ComboBoxShifts = () => (

        <div className="containerShiftsAvailable">
            <h2 className="titleShiftsAvailable">Turnos Disponibles</h2>
            <p className="descriptionShiftsAvailable">Seleccione el turno al cual desea asistir</p>
            <label htmlFor="shiftSelect" className="lbRegItem">
                Día de la semana
            </label>
            <select
                className="sltRegItem"
                id="shiftSelect"
                value={selectedShift?.id || ""}
                onChange={handleShiftChange}>
                <option value={""}>Seleccione un turno</option>
                {shifts.length > 0 ? (
                    shifts.map((shift, index) => (

                        <option key={index} value={shift.id}>

                            {`Turno ${index + 1}: ${(shift.date)}
                            ${formatTime(shift.shift.startTime)} a 
                            ${formatTime(shift.shift.endTime)}`}
                        </option>
                    ))
                ) : (
                    <option value="">No hay turnos disponibles</option>
                )}
            </select>

        </div>
    );

    const ComboBoxCafs = () => (
        <div className="containerCAFSelection">
            <h2 className="titleCAF">CAF</h2>
            <p className="descriptionCAF">Seleccione el CAF en el cual desee agendar un turno.</p>
            <label htmlFor="cafSelect" className="lbRegItem">
                Centro de Acondicionamiento Físico
            </label>
            <select className="sltRegItem"
                id="cafSelect"
                value={selectedCaf?.id || ""}
                onChange={handleCafChange}>
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
    );

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
                    <ComboBoxCafs />
                    <ComboBoxShifts />
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
            <button onClick={handleScheduleShift} className="btScheduleShift" >Agendar Turno</button>
        </div>
    );
};

export default ScheduleShift;
