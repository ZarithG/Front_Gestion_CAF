import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/PagesAdmin.css";
import "./styles/FitnessCenterCordinator.css";
import { IoMdSearch } from "react-icons/io";
import { SERVICES_BACK } from "../../../constants/constants";
import { showToastPromise } from "../../gestion-caf/Messages";
import { Toaster,toast } from "sonner";

const initialUsers = [
    { code: "", fullName: " ", email: "", status: "" },
];

const ManageCenterDirector = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState(initialUsers);
    const [search, setSearch] = useState("");
    const [token, setToken] = useState("");
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
                console.log(data)
                if (Array.isArray(data)) {
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


    const assignCoordinador = (index) => {
        alert(`Coordinador asignado: ${users[index].name} ${users[index].lastname}`);
    };

    const handleSearch = (event) => setSearch(event.target.value);

    const filteredUsers = users.filter(
        (user) =>
            user.code.toLowerCase().includes(search.toLowerCase()) ||
            user.fullName.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="containerBody">
            <Toaster
                position="top-center"
                dir="auto"
                duration={2000}
                visibleToasts={4}
                richColors
            />
            <h1>Asignar Director de Bienestar</h1>
            <div className="body-containerBody">
                <SearchBar search={search} handleSearch={handleSearch} />
                <div className="table-content">
                    <UserTable users={filteredUsers} assignCoordinador={assignCoordinador} />
                </div>
            </div>
        </div>
    );
};

const SearchBar = ({ search, handleSearch }) => (
    <div className="containerSearch">
        <div className="search-bar-field">
            <label className="lbInItem">Ingrese el código o el número de documento del director</label>
            <div className="search-bar-field-icon">
                <input
                    type="search"
                    value={search}
                    onChange={handleSearch}
                    placeholder="Buscar coordinador"
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

export default ManageCenterDirector;