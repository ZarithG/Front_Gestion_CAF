import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./styles/PagesAdmin.css";
import "./styles/FitnessCenterCordinator.css";
import { IoMdSearch } from "react-icons/io";
import { SERVICES_BACK } from "../../../constants/constants";
import { MessagesError, MessagesInfo, MessagesSuccess, showToastPromise } from "../../gestion-caf/Messages";

const RegisterAttendance = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [cafId ,setCafId] = useState(0);
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
        getCafId();
        if (cafId > 0) {
            console.log("CAF ID recibido:", cafId);
            handleViewShift();
            //handleShift();
            fetchShiftReservations();
        } else {
            console.error("No se recibió cafId");
            MessagesError("Seleccione un CAF.");
        }
    }, [cafId]);

    const handleViewShift = async () => {
        try {
            const token = localStorage.getItem("authToken");
            const response = await fetch(SERVICES_BACK.GET_SHIFT_INTANCE_ACT + cafId, {
                method: "GET",
                headers: {
                    'Authorization': `Bearer ${token}`,
                    credentials: "include",
                },
            });
            
            if (response.status === 200) {
                const data = await response.json();
                console.log("ACTUAL"+data);
                setTurno(`T ${data.startTime} a ${data.endTime}`)
                setShiftActual({
                    id: data.id, // ID del turno
                    state: data.state, // Estado del turno
                    shift: data.shift, // Número del turno
                    date: data.date, // Fecha del turno
                    placeAvailable: data.placeAvailable, // Lugares disponibles
                });
                
            } else if(response.status === 204){
                MessagesInfo("No hay un turno actual.");
                return;
            } else{
                MessagesError("Error en el servidor");
                return;
            }
        } catch (error) {
            console.error("Error al cargar el turno:", error);
            MessagesError("Error al cargar el turno.");
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
                console.log(data)
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
            setShift({data})
        } catch (error) {
            console.error("Error al obtener usuarios del turno:", error);
            MessagesError("Error al obtener usuarios del turno.");
        }
    };

    const fetchShiftReservations  = async () => {
        if(shiftActual.id != 0){
            const token = localStorage.getItem("authToken");
        const response = await fetch(SERVICES_BACK.GET_RESERVE_BY_SHIFT + shiftActual.id, {
            method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    credentials: 'include',
                },
        });

        if (response.ok) {
            const data = await response.json();
            if(Array.isArray(data))
                setShiftReservations(data);
            else
                MessagesError("Ocurrió un error")
            
        }else if(response.status === 204){
                MessagesInfo("No se encontraron reservaciones para el turno actual.")
                return;
        }else{
            MessagesError("Error en el servidor al cargar las reserevaciones del turno actual.")
            return;
        }
        }
    };

    const fetchRegisterAttendance = async () => {
        try {
            const token = localStorage.getItem("authToken");
            const response = await fetch(SERVICES_BACK.POST_REGISTRY_ATTENDED_RESERVE, {
                method: "POST",
                headers: {
                    'Authorization': `Bearer ${token}`,
                    credentials: "include",
                    'Content-Type': 'application/json'
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
        if(shiftActual.id != 0){
            console.log("ID ACTUAL"+shiftActual.id );
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
                    if(response.status === 204){
                        MessagesInfo("No fue posible finalizar el turno actual, por favor intente de nuevo.");
                        return;
                    }else{
                        MessagesInfo("Error al finalizar el turno actual");
                        return;
                        
                    }
                }else{
                    const data = await response.json();
                    MessagesSuccess("Se finalizó exitosamente el turno actual.");
                }
                
            } catch (error) {
                console.error("Error al cargar el turno:", error);
                MessagesError("Error al cargar el turno.");
            }
        }else{
            MessagesInfo("No hay un turno actual.");
        }
    };
    const handleSearch = (event) => setSearch(event.target.value);

    const filteredshiftReservations = shiftReservations.filter(
        (reservation) =>
            reservation.userBasicDTO.universityCode.toLowerCase().includes(search.toLowerCase()) ||
            reservation.userBasicDTO.name.toLowerCase().includes(search.toLowerCase()) ||
            reservation.userBasicDTO.documentNumber.toLowerCase().includes(search.toLowerCase())
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
