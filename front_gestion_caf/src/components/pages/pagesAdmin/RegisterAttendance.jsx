import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./styles/PagesAdmin.css";
import "./styles/FitnessCenterCordinator.css";
import { IoMdSearch } from "react-icons/io";
import { SERVICES_BACK } from "../../../constants/constants";
import { MessagesSuccess, MessagesError, showToastPromise } from "../../gestion-caf/Messages";

const RegisterAttendance = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { cafId } = location.state || {}
    const [shiftReservations, setShiftReservations] = useState([]);

    const [search, setSearch] = useState("");
    const [shiftActual, setShiftActual] = useState({
        id:0,
        state:true,
        shift:0,
        date:null,
        placeAvailable:0
    });
    const [reservation, setReservation] = useState({
        id: 0, // ID de la reservación
        idShiftInstance: 0, // ID de la instancia de turno
        idDayAssignment: 0, // ID del día asignado
        userId: 0, // ID del usuario
        dateReservation: null, // Fecha y hora de la reservación
        reservationEnum: '', // Estado de la reservación (puede ser un string o un valor predeterminado)
      });
    const [shift, setShift] = useState("");
    const token = localStorage.getItem("authToken");
    const [turno,setTurno] = useState("T-0 0:00 a 0:00 ");

    useEffect(() => {
        if (cafId) {
            console.log("CAF ID recibido:", cafId);
            handleViewShift();
            handleShift();
            fetchShiftReservations();
        } else {
            console.error("No se recibió cafId");
            MessagesError("Seleccione un CAF.");
        }
    }, [cafId]);

    const handleViewShift = async () => {
        try {
            const response = await fetch(SERVICES_BACK.POST_SHIFT_INTANCE_ACT + cafId, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    credentials: "include",
                },
            });
            const data = await response.json();
            if (data.id) {
                setTurno(`T ${data.startTime} a ${data.endTime}`)
                setShiftActual({
                    id: data.id, // ID del turno
                    state: data.state, // Estado del turno
                    shift: data.shift, // Número del turno
                    date: data.date, // Fecha del turno
                    placeAvailable: data.placeAvailable, // Lugares disponibles
                });
                
            } else {
                throw new Error("El formato de datos de CAF es incorrecto.");
            }
        } catch (error) {
            console.error("Error al cargar el turno:", error);
            MessagesError("Error al cargar el turno.");
        }
    };

    const handleShift = async () => {
        console.log(shiftActual)
        try {
            const response = await fetch(SERVICES_BACK.GET_RESERVE_BY_SHIFT + shiftActual, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                    credentials: "include",
                },
            });
            const data = await response.json();
            
            console.log("Datos del turno:", data);
            setShift({data})
        } catch (error) {
            console.error("Error al obtener usuarios del turno:", error);
            MessagesError("Error al obtener usuarios del turno.");
        }
    };

    const fetchShiftReservations  = async (id) => {
        const response = await fetch(SERVICES_BACK.GET_ONE_reservation_ID+ id, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
                credentials: "include",
            },
        });

        if (!response.ok) {
            throw new Error("Error al obtener los datos de los usuarios");
        }

        const data = await response.json();
        setShiftReservations(data);
    };

    const fetchRegisterAttendance = async () => {
        try {
            const token = localStorage.getItem("authToken");
            const response = await fetch(SERVICES_BACK.POST_REGISTRY_ATTENDED_RESERVE, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    credentials: "include",
                },
                body:JSON.stringify({
                    reservation
                })
            });
            const data = await response.json();
            if (data.id) {
                setTurno(`T ${data.startTime} a ${data.endTime}`)
                setShiftActual({
                    id: data.id, // ID del turno
                    state: data.state, // Estado del turno
                    shift: data.shift, // Número del turno
                    date: data.date, // Fecha del turno
                    placeAvailable: data.placeAvailable, // Lugares disponibles
                });
                
            } else {
                throw new Error("El formato de datos de CAF es incorrecto.");
            }
        } catch (error) {
            console.error("Error al cargar el turno:", error);
            MessagesError("Error al cargar el turno.");
        }
    };

    const fetchFinishShiftInstanceActual = async () => {
        try {
            const token = localStorage.getItem("authToken");
            const response = await fetch(SERVICES_BACK.POST_FINISH_INSTANCE_ACT + shiftActual, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    credentials: "include",
                }
            });
            const data = await response.json();
            
        } catch (error) {
            console.error("Error al cargar el turno:", error);
            MessagesError("Error al cargar el turno.");
        }
    };
    const handleSearch = (event) => setSearch(event.target.value);

    const filteredshiftReservations = shiftReservations.filter(
        (reservation) =>
            reservation.code.toLowerCase().includes(search.toLowerCase()) ||
            reservation.name.toLowerCase().includes(search.toLowerCase()) ||
            reservation.lastname.toLowerCase().includes(search.toLowerCase())
    );

    const registerAttendance = (index) => {
        fetchRegisterAttendance();
        //alert(`Coordinador asignado: ${shiftReservations[index].name} ${shiftReservations[index].lastname}`);
    };

    return (
        <div className="containerBody">
            <h1>Registrar asistencia</h1>
            <div className="body-containerBody">
                <div className="Turn-Shift">
                    <ViewShift turno={turno} />
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

const ViewShift = ({ turno }) => (
    <div className="containerViewShift">
        <h1>Turno actual</h1>
        <p>{turno}</p>
    </div>
);

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
        <td className="table-cell">{reservation.userBasicDTOuniversityCode}</td>
        <td className="table-cell">{reservation.userBasicDTO.documentNumber}</td>
        <td className="table-cell">{reservation.userBasicDTO.name}</td>
        <td className="table-cell">{reservation.userBasicDTO.email}</td>
        <td className="table-cell">
            <div className="button-container">
                {reservation.status.toLowerCase() !== "asistencia" && (
                    <button className="button" onClick={() => registerAttendance(index)}>
                        Registrar
                    </button>
                )}
            </div>
        </td>
    </tr>
);

const Status = ({ status }) => {
    const statusClass = status.toLowerCase() === "asistencia" ? "status-active" : "status-inactive";
    return <span className={`status ${statusClass}`}>{status}</span>;
};

export default RegisterAttendance;
