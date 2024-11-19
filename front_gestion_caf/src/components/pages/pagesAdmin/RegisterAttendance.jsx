import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./styles/PagesAdmin.css";
import "./styles/FitnessCenterCordinator.css";
import { IoMdSearch } from "react-icons/io";
import { SERVICES_BACK } from "../../../constants/constants";
import { MessagesSuccess, MessagesError, showToastPromise } from "../../gestion-caf/Messages";

const initialUsers = [
    { code: "202026788", name: "Juan", lastname: "Perez", status: "Asistencia" },
    { code: "201915829", name: "Ana", lastname: "Lopez", status: "Activo" },
];

const RegisterAttendance = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { cafId } = location.state || {};
    const [users, setUsers] = useState(initialUsers);
    const [search, setSearch] = useState("");
    const [shiftActual, setShiftActual] = useState("");
    const [shift, setShift] = useState("");
    const token = localStorage.getItem("authToken");
    const [turno,setTurno] = useState("T-0 0:00 a 0:00 ");

    useEffect(() => {
        if (cafId) {
            console.log("CAF ID recibido:", cafId);
            handleViewShift();
            handleShift();
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
                setTurno(`T-1 ${data.startTime} a ${data.endTime}`)
                setShiftActual(data.id);
                
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

    const fetchUsers = async (id) => {
        const response = await fetch(SERVICES_BACK.GET_ONE_USER_ID+ id, {
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
        if (Array.isArray(data)) {
            console.log(data)
            // Procesar los datos al formato deseado
            return data.map((user) => ({
                code: user.id.toString(), // Convertir el ID a una cadena
                fullName: user.name, // Usar el nombre completo del objeto
                email: user.userName, // Usar el correo como email
                status: user.active ? "Activo" : "Inactivo", // Convertir boolean a texto
            }));
            
        } else {
            throw new Error("El formato de datos de CAF es incorrecto.");
        }
    };

    const handleSearch = (event) => setSearch(event.target.value);

    const filteredUsers = users.filter(
        (user) =>
            user.code.toLowerCase().includes(search.toLowerCase()) ||
            user.name.toLowerCase().includes(search.toLowerCase()) ||
            user.lastname.toLowerCase().includes(search.toLowerCase())
    );

    const assignCoordinador = (index) => {
        alert(`Coordinador asignado: ${users[index].name} ${users[index].lastname}`);
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
                    <UserTable users={filteredUsers} assignCoordinador={assignCoordinador} />
                </div>
                <div className="ContainerTurno">
                    <button onClick={handleShift}>Finalizar Turno</button>
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

const UserTable = ({ users, assignCoordinador }) => (
    <table className="table">
        <thead className="table-header-head">
            <tr className="table-row">
                <th className="table-cell">Código</th>
                <th className="table-cell">Nombre</th>
                <th className="table-cell">Apellido</th>
                <th className="table-cell">Estado</th>
                <th className="table-cell">Opciones</th>
            </tr>
        </thead>
        <tbody>
            {users.map((user, index) => (
                <UserTableRow
                    key={`${user.code}-${index}`}
                    user={user}
                    index={index}
                    assignCoordinador={assignCoordinador}
                />
            ))}
        </tbody>
    </table>
);

const UserTableRow = ({ user, index, assignCoordinador }) => (
    <tr className="table-row">
        <td className="table-cell">{user.code}</td>
        <td className="table-cell">{user.name}</td>
        <td className="table-cell">{user.lastname}</td>
        <td className="table-cell">
            <Status status={user.status} />
        </td>
        <td className="table-cell">
            <div className="button-container">
                {user.status.toLowerCase() !== "asistencia" && (
                    <button className="button" onClick={() => assignCoordinador(index)}>
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
