import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/PagesAdmin.css";
import "./styles/FitnessCenterCordinator.css";
import { IoMdSearch } from "react-icons/io";
import { FiEdit } from "react-icons/fi";
import { FaRegEye } from "react-icons/fa6";
import { MessagesError, showToastPromise } from "../../gestion-caf/Messages";
import { SERVICES_BACK } from "../../../constants/constants";


const initialUsers = [
    { code: "", fullName: "", email: "", status: "" }
    // Agrega más usuarios aquí según sea necesario
];

const FitnessCenterCoordinators = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState(initialUsers);
    const [search, setSearch] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchCUserAll = async () => {
            const token = localStorage.getItem("authToken");

            const fetchUsers = async () => {
                const response = await fetch(SERVICES_BACK.GET_USER_ALL, {
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
                console.log(data);
                if (Array.isArray(data)) {
                    // Filtrar y procesar los datos al formato deseado
                    const specificRole = "ROLE_CAF_COORDINATOR"; // Rol específico a filtrar
                    return data
                        .filter((user) => user.roles.includes(specificRole)) // Filtrar usuarios con el rol específico
                        .map((user) => ({
                            code: user.id.toString(), // Convertir el ID a una cadena
                            fullName: user.name, // Usar el nombre completo del objeto
                            email: user.userName, // Usar el correo como email
                            status: user.active ? "Activo" : "Inactivo", // Convertir boolean a texto
                        }));
                } else {
                    throw new Error("El formato de datos de User es incorrecto.");
                }
            };
            
            try {
                await showToastPromise(
                    fetchUsers().then((processedUsers) => setUsers(processedUsers)),
                    "Datos cargados correctamente",
                    "Error al cargar los datos"
                );
            } catch (error) {
                setError(error.message);
            }
            
        };

        fetchCUserAll();
    }, []); // Dependencias vacías para ejecutar solo al montar


    const editUser = (index) => {
        navigate("/admin/fitnessCenterCoordinators/modify");
    };

    const removeUser = (index) => {
        navigate("/admin/fitnessCenterCoordinators/view")
    };

    const newUser = () => {
        navigate("/admin/fitnessCenterCoordinators/registerNew");
    };

    const handleSearch = (event) => {
        setSearch(event.target.value);
    };

    const filteredUsers = users.filter(user =>
        user.code.toLowerCase().includes(search.toLowerCase()) ||
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.lastname.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="containerBody">
            <h1 className="h1FormAdm">Gestionar Coordinadores CAF</h1>
            <div className="body-containerBody">
                <SearchBar search={search} handleSearch={handleSearch} newUser={newUser} />
                <div className="table-content">
                    <UserTable users={filteredUsers} editUser={editUser} removeUser={removeUser} />
                </div>
            </div>
        </div>
    );
};

const SearchBar = ({ search, handleSearch, newUser }) => (
    <div className="containerSearch">
        <div className="search-bar-field">
            <label className="lbInItem">Ingrese el código o el número de documento del coordinador</label>
            <div className="search-bar-field-icon">
                <input
                    type="search"
                    value={search}
                    onChange={handleSearch}
                    placeholder="Buscar coordinador"
                    className="search-bar-input"
                />
                <IoMdSearch className="search-icon"></IoMdSearch>
            </div>
        </div>
        <div className="register-new-button-container">
            <button onClick={newUser} className="register-new-button">Registrar nuevo</button>
        </div>
    </div>
);
const UserTable = ({ users, assignCoordinador }) => (
    <table className="table">
        <thead className="table-header-head">
            <tr className="table-row">
                <th className="table-cell">Código</th>
                <th className="table-cell">Nombre Completo</th>
                <th className="table-cell">Correo</th>
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
        <td className="table-cell">{user.fullName}</td>
        <td className="table-cell">{user.email}</td>
        <td className="table-cell">
            <Status status={user.status} />
        </td>
        <td className="table-cell">
            <div className="button-container">
                <button className="button" onClick={() => assignCoordinador(index)}>
                    Asignar
                </button>
            </div>
        </td>
    </tr>
);


const Status = ({ status }) => {
    const statusClass = status.toLowerCase() === "activo" ? "status-active" : "status-inactive";
    return <span className={`status ${statusClass}`}>{status}</span>;
};
export default FitnessCenterCoordinators;