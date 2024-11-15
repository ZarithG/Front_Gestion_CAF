import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/PagesAdmin.css";
import { IoMdSearch } from "react-icons/io";

const initialUsers = [
    { code: "202012575", name: "Juan", lastname: "Perez", estate: "Docente" },
    { code: "202418764", name: "Ana", lastname: "Lopez", estate: "Estudiante" },
];

const UserRegistrationRequest = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState(initialUsers);
    const [search, setSearch] = useState("");

    const viewUser = (index) => navigate("/admin/fitnessCenterUser/detail");

    const declineUser = (index) => {
        if (window.confirm("¿Estás seguro de que deseas rechazar la solicitud?")) {
            const updatedUsers = users.filter((_, i) => i !== index);
            setUsers(updatedUsers);
        }
    };

    const acceptUser = (index) => {
        if (window.confirm("¿Estás seguro de que deseas aceptar la solicitud?")) {
            alert("Usuario aceptado");
        }
    };

    const handleSearch = (event) => setSearch(event.target.value);

    const filteredUsers = users.filter(
        (user) =>
            user.code.toLowerCase().includes(search.toLowerCase()) ||
            user.name.toLowerCase().includes(search.toLowerCase()) ||
            user.lastname.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="containerBody">
            <h1>Solicitud de Inscripción de Usuarios CAF</h1>
            <div className="body-containerBody">
                <SearchBar search={search} handleSearch={handleSearch} />
                <div className="table-content">
                    <UserTable users={filteredUsers} acceptUser={acceptUser} declineUser={declineUser}
                        viewUser={viewUser} />
                </div>
            </div>
        </div>
    );
};

const SearchBar = ({ search, handleSearch }) => (
    <div className="containerSearch">
        <div className="search-bar-field">
            <label className="lbInItem">Ingrese el código o el número de documento del aspirante</label>
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

const UserTable = ({ users, acceptUser, declineUser, viewUser }) => (
    <table className="table">
        <thead className="table-header-head">
            <tr className="table-row">
                <th className="table-cell">Código aspirante</th>
                <th className="table-cell">Nombre</th>
                <th className="table-cell">Apellidos</th>
                <th className="table-cell">Estamento</th>
                <th className="table-cell">Opciones</th>
            </tr>
        </thead>
        <tbody>
            {users.map((user, index) => (
                <UserTableRow
                    key={`${user.code}- ${ index }`}
            user={user}
            index={index}
            acceptUser={acceptUser}
            declineUser={declineUser}
            viewUser={viewUser}
            />
        ))}
        </tbody>
    </table>
);

const UserTableRow = ({ user, index, acceptUser, declineUser, viewUser }) => (
    <tr className="table-row">
        <td className="table-cell">{user.code}</td>
        <td className="table-cell">{user.name}</td>
        <td className="table-cell">{user.lastname}</td>
        <td className="table-cell">{user.estate}</td>
        <td className="table-cell">
            <div className="button-container">
                <button className="button" onClick={() => acceptUser(index)}>
                    ✅
                </button>
                <button className="button" onClick={() => declineUser(index)}>
                    ❌
                </button>
                <button className="button" onClick={() => viewUser(index)}>
                    👁
                </button>
            </div>
        </td>
    </tr>
);

export default UserRegistrationRequest;