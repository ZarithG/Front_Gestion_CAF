import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./styles/PagesAdmin.css";
import "./styles/FitnessCenterCordinator.css";
import { IoMdSearch } from "react-icons/io";
import { SERVICES_BACK } from "../../../constants/constants";
import { MessagesError, MessagesInfo, MessagesSuccess, MessagesWarning, showToastPromise } from "../../gestion-caf/Messages";
import { Toaster } from "sonner";

const RegisterAttendance = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [cafId, setCafId] = useState(0);
    const [shiftReservations, setShiftReservations] = useState([]);
    const [shift, setShift] = useState([]);
    const [search, setSearch] = useState("");
    const [shiftSchedule, setShiftSchedule] = useState("");
    const [shiftActual, setShiftActual] = useState({
        id: 0, // ID del turno
        dayAssignment: 0,
        startTime: "",
        endTime: "", // Fecha del turno
        placeAvailable: "",
        status: 0,
        shiftInstanceId: 0
    });

    const token = localStorage.getItem("authToken");

    useEffect(() => {
        getCafId();
        if (cafId > 0) {
            console.log("CAF ID recibido:", cafId);
            handleViewShift();

            fetchShiftReservations();
        } else {
            console.log("No se recibió cafId");

        }
    }, [cafId]);

    const handleViewShift = async () => {
        try {
            const token = localStorage.getItem("authToken");
            const response = await fetch(SERVICES_BACK.GET_SHIFT_INTANCE_ACT + cafId, {
                method: "GET",
                headers: {
                    'Authorization': `Bearer ${token}`,
                    credentials: "include"
                },
            });
            console.log("respuesta", response);
            if (response.status === 204) {
                MessagesWarning("No hay un turno actual.");
                return;
            }
            if (response.ok) {
                const data = await response.json();
                console.log("ACTUAL", data);
                setShiftActual({
                    id: data.id, // ID del turno
                    dayAssignment: data.dayAssignment,
                    startTime: data.startTime,
                    endTime: data.endTime, // Fecha del turno
                    placeAvailable: data.maximumPlaceAvailable,
                    status: data.status,
                    shiftInstanceId: data.shiftInstanceId
                });
                setShiftSchedule(`${formatTime(data.startTime)} a ${formatTime(data.endTime)}`);
            } else if (response.status === 204) {
                MessagesWarning("No hay un turno actual.");
                return;
            } else if (response.status === 404) {
                MessagesError("Error en el servidor");
                return;
            }
        } catch (error) {
            MessagesError("Error al cargar el turno.");
            console.error("Error al cargar el turno:", error);
        }
    };

    //Método par aobtener el id del CAF de un coodinador
    const getCafId = async () => {

        try {
            const token = localStorage.getItem("authToken");
            const response = await fetch(SERVICES_BACK.GET_IDCAF_BY_USER_EMAIL + localStorage.getItem('userName'), {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    credentials: 'include',
                },
            });
            const data = await response.json();
            setCafId(data);

        } catch (error) {
            console.error("Error al obtener id del fitnessCenter:", error);
            MessagesError("Error al obtener id del CAF.");
        }

    };


    const handleShift = async () => {
        console.log(shiftActual)
        try {
            const response = await fetch(SERVICES_BACK.GET_RESERVE_BY_SHIFT + shiftActual.id, {
                method: "GET",
                headers: {
                    'Authorization': `Bearer ${token}`,
                    credentials: "include",
                    'Content-Type': 'application/json'
                },
            });
            const data = await response.json();

            console.log("Datos del turno:", data);
            setShift({ data })
        } catch (error) {
            console.error("Error al obtener usuarios del turno:", error);
            MessagesError("Error al obtener usuarios del turno.");
        }
    };

    const fetchShiftReservations = async () => {
        if (shiftActual.shiftInstanceId != 0) {
            const token = localStorage.getItem("authToken");
            const response = await fetch(SERVICES_BACK.GET_RESERVE_BY_SHIFT + shiftActual.shiftInstanceId, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    credentials: 'include',
                },
            });
            
            console.log(response.status)
            if (response.status === 200) {   
                const data = await response.json();
                if (Array.isArray(data))
                    setShiftReservations(data);
                else
                    MessagesError("Ocurrió un error")

            } else if (response.status === 204) {
                MessagesInfo("No se encontraron reservaciones para el turno actual.")
                return;
            } else{
                MessagesError("Error en el servidor al cargar las reserevaciones del turno actual.")
                return;
            }
        }
    };

    const fetchRegisterAttendance = async (userReservation) => {
        try {
            const token = localStorage.getItem("authToken");
            const response = await fetch(SERVICES_BACK.POST_REGISTRY_ATTENDED_RESERVE, {
                method: "POST",
                headers: {
                    'Authorization': `Bearer ${token}`,
                    credentials: "include",
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: userReservation.idReservation,  // ID de la reservación
                    idShiftInstance: userReservation.idShiftInstance,  // ID de la instancia de turno
                    idDayAssignment: shiftActual.dayAssignment,  // ID del día asignado (puedes ajustarlo si es diferente)
                    userId: userReservation.userBasicDTO.id,  // ID del usuario
                    dateReservation: null,
                    reservationEnum: "SCHEDULED",  // Estado de la reservación (ajustalo según tu lógica)
                })
            });
            
            const data = await response.json();
            console.log("Respuesta del registro de asistencia:", data);
            if (data.id) {
                MessagesSuccess("Asistencia registrada correctamente.");
                window.location.reload()
            } else {
                throw new Error("Error en el formato de la respuesta.");
            }
        } catch (error) {
            console.error("Error al registrar la asistencia:", error);
            MessagesError("Error al registrar la asistencia.");
        }
    };

    const fetchFinishShiftInstanceActual = async () => {
        if (shiftActual.id != 0) {
            console.log("ID ACTUAL" + shiftActual.id);
            try {
                const token = localStorage.getItem("authToken");
                const response = await fetch(SERVICES_BACK.POST_FINISH_INSTANCE_ACT + shiftActual, {
                    method: "POST",
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        credentials: "include"
                    }
                });

                if (response.status !== 200) {
                    if (response.status === 204) {
                        MessagesInfo("No fue posible finalizar el turno actual, por favor intente de nuevo.");
                        return;
                    } else {
                        MessagesInfo("Error al finalizar el turno actual");
                        return;

                    }
                } else {
                    const data = await response.json();
                    MessagesSuccess("Se finalizó exitosamente el turno actual.");
                }

            } catch (error) {
                console.error("Error al cargar el turno:", error);
                MessagesError("Error al cargar el turno.");
            }
        } else {
            MessagesInfo("No hay un turno actual.");
        }
    };
    const handleSearch = (event) => setSearch(event.target.value);

    const filteredshiftReservations = shiftReservations.filter(
        (reservation) =>
            reservation.userBasicDTO.name.toLowerCase().includes(search.toLowerCase()) ||
            reservation.userBasicDTO.documentNumber.toLowerCase().includes(search.toLowerCase())
    );

    const registerAttendance = (index) => {
        // Enviar el objeto específico del usuario a la función
        const userReservation = shiftReservations[index];
        fetchRegisterAttendance(userReservation);
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
            <h1>Registrar asistencia</h1>
            <div className="body-containerBody">
                <div className="Turn-Shift">
                    <div className="containerViewShift">
                        <h1>Turno actual</h1>
                        {typeof shiftSchedule === 'string' ? (
                            <p>Horario: {shiftSchedule}</p>
                        ) : (
                            <p>No se pudo cargar el horario</p>
                        )}
                    </div>
                    <SearchBar search={search} handleSearch={handleSearch} />
                </div>
                <div className="table-content">
                    <ReservationTable shiftReservations={filteredshiftReservations} registerAttendance={registerAttendance} />
                </div>
                <div className="ContainerTurno">
                    <button onClick={fetchFinishShiftInstanceActual}>Finalizar Turno</button>
                </div>
            </div>
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



const SearchBar = ({ search, handleSearch }) => (
    <div className="containerSearch">
        <div className="search-bar-field">
            <label className="lbInItem">Ingrese el código o el número de documento del estudiante</label>
            <div className="search-bar-field-icon">
                <input
                    type="search"
                    value={search}
                    onChange={handleSearch}
                    placeholder="Buscar..."
                    className="search-bar-input"
                />
                <IoMdSearch className="search-icon" />
            </div>
        </div>
    </div>
);

const ReservationTable = ({ shiftReservations, registerAttendance }) => (
    <table className="table">
        <thead className="table-header-head">
            <tr className="table-row">
                <th className="table-cell">Código</th>
                <th className="table-cell">Documento</th>
                <th className="table-cell">Nombre</th>
                <th className="table-cell">Email</th>
                <th className="table-cell">Opciones</th>
            </tr>
        </thead>
        <tbody>
            {shiftReservations.map((reservation, index) => (
                <ReservationTableRow
                    key={`${reservation.code}-${index}`}
                    reservation={reservation}
                    index={index}
                    registerAttendance={registerAttendance}
                />
            ))}
        </tbody>
    </table>
);

const ReservationTableRow = ({ reservation, index, registerAttendance }) => (
    <tr className="table-row">
        <td className="table-cell">{reservation.universityCode}</td>
        <td className="table-cell">{reservation.userBasicDTO.documentNumber}</td>
        <td className="table-cell">{reservation.userBasicDTO.name}</td>
        <td className="table-cell">{reservation.userBasicDTO.email}</td>
        <td className="table-cell">
            <div className="button-container">
                <button className="button" onClick={() => registerAttendance(index)} type="submit">
                    Registrar
                </button>
            </div>
        </td>
    </tr>
);

const Status = ({ status }) => {
    const statusClass = status.toLowerCase() === "asistencia" ? "status-active" : "status-inactive";
    return <span className={`status ${statusClass}`}>{status}</span>;
};

export default RegisterAttendance;
