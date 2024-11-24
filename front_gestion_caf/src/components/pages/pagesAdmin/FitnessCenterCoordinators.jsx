import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/PagesAdmin.css";
import "./styles/FitnessCenterCordinator.css";
import { IoMdSearch } from "react-icons/io";
import { showToastPromise, MessagesError } from "../../gestion-caf/Messages";
import { SERVICES_BACK } from "../../../constants/constants";
import { toast, Toaster } from "sonner";

const initialUsers = [
    { code: "", fullName: "", email: "", status: "" }
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
                if (Array.isArray(data)) {
                    const specificRole = "ROLE_CAF_COORDINATOR"; // Rol específico a filtrar
                    return data
                        .filter((user) => user.roles.includes(specificRole))
                        .map((user) => ({
                            code: user.id.toString(),
                            fullName: user.name,
                            email: user.userName,
                            status: user.active ? "Activo" : "Inactivo",
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
                MessagesError(error.message); // Mostrar mensaje de error
            }
        };

        fetchCUserAll();
    }, []);

    const newUser = () => navigate("/admin/fitnessCenterCoordinators/registerNew");

    const handleSearch = (event) => setSearch(event.target.value);

    const filteredUsers = users.filter(user =>
        user.code.toLowerCase().includes(search.toLowerCase()) ||
        user.fullName.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase())
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
            <h1 className="h1FormAdm">Gestionar Coordinadores CAF</h1>
            <div className="body-containerBody">
                <SearchBar search={search} handleSearch={handleSearch} newUser={newUser} />
                <div className="table-content">
                    <UserTable users={filteredUsers} />
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
                <IoMdSearch className="search-icon" />
            </div>
        </div>
        <div className="register-new-button-container">
            <button onClick={newUser} className="register-new-button">Registrar nuevo</button>
        </div>
    </div>
);

const UserTable = ({ users }) => (
    <table className="table">
        <thead className="table-header-head">
            <tr className="table-row">
                <th className="table-cell">Código</th>
                <th className="table-cell">Nombre Completo</th>
                <th className="table-cell">Correo</th>
                <th className="table-cell">Estado</th>
            </tr>
        </thead>
        <tbody>
            {users.map((user, index) => (
                <UserTableRow key={`${user.code}-${index}`} user={user} />
            ))}
        </tbody>
    </table>
);

const UserTableRow = ({ user }) => (
    <tr className="table-row">
        <td className="table-cell">{user.code}</td>
        <td className="table-cell">{user.fullName}</td>
        <td className="table-cell">{user.email}</td>
        <td className="table-cell">
            <Status status={user.status} />
        </td>
    </tr>
);

const Status = ({ status }) => {
    const statusClass = status.toLowerCase() === "activo" ? "status-active" : "status-inactive";
    return <span className={`status ${statusClass}`}>{status}</span>;
};

export default FitnessCenterCoordinators;
