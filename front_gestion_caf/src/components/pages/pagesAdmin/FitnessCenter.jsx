import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import "./styles/PagesAdmin.css";
import "./styles/FitnessCenterCordinator.css";
import {IoMdSearch} from "react-icons/io";
import {FiEdit} from "react-icons/fi";
import {FaRegEye} from "react-icons/fa6";

// Datos iniciales
const initialUsers = [
    {code: "U1", sede: "Sede Central", name: "CAF UPTC Estudiantes", coordinator: "juan.perez@example.com"},
    {code: "U2", sede: "Sede Central", name: "CAF UPTC Funcionarios", coordinator: "juan.perez@example.com"},
    {code: "U1", sede: "Sede Salud", name: "CAF UPTC Estudiantes", coordinator: "juan.perez@example.com"},
];

// Componente principal
const FitnessCenters = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState(initialUsers);
    const [search, setSearch] = useState("");

    const editUser = (index) => {
        navigate("/admin/fitnessCenters/manageFitnessCenters");
    };

    const removeUser = (index) => {
        if (window.confirm("¿Estás seguro de que deseas eliminar este coordinador?")) {
            const updatedUsers = users.filter((_, i) => i !== index);
            setUsers(updatedUsers);
        }
    };

    const handleSearch = (event) => {
        setSearch(event.target.value);
    };

    const filteredUsers = users.filter(
        (user) =>
            user.code.toLowerCase().includes(search.toLowerCase()) ||
            user.name.toLowerCase().includes(search.toLowerCase()) ||
            user.sede.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="containerBody">
            <h1>Gestionar Centros de Acondicionamiento</h1>
            <div className="body-containerBody">
                <SearchBar search={search} handleSearch={handleSearch}/>
                <div className="table-content">
                    <UserTable users={filteredUsers} editUser={editUser} removeUser={removeUser}/>
                </div>
            </div>
        </div>
    );
};

const SearchBar = ({search, handleSearch}) => (
    <div className="containerSearch">
        <div className="search-bar-field">
            <label className="lbInItem">Ingrese nombre del CAF</label>
            <div className="search-bar-field-icon">
                <input
                    type="search"
                    value={search}
                    onChange={handleSearch}
                    placeholder="Buscar CAF"
                    className="search-bar-input"
                />
                <IoMdSearch className="search-icon"></IoMdSearch>
            </div>
        </div>
    </div>
);

const UserTable = ({users, editUser, removeUser}) => (
    <table className="table">
        <thead className="table-header-head">
        <tr className="table-row">
            <th className="table-cell">Código</th>
            <th className="table-cell">Sede</th>
            <th className="table-cell">Nombre</th>
            <th className="table-cell">Coordinador</th>
            <th className="table-cell">Opciones</th>
        </tr>
        </thead>
        <tbody>
        {users.map((user, index) => (
            <UserTableRow
                key={`${user.code}-${index}`}
                user={user}
                index={index}
                editUser={editUser}
                removeUser={removeUser}
            />
        ))}
        </tbody>
    </table>
);

const UserTableRow = ({user, index, editUser, removeUser}) => (
    <tr className="table-row">
        <td className="table-cell">{user.code}</td>
        <td className="table-cell">{user.sede}</td>
        <td className="table-cell">{user.name}</td>
        <td className="table-cell">{user.coordinator}</td>
        <td className="table-cell">
            <div className="button-container">
                <button className="button" onClick={() => editUser(index)}>
                    <FiEdit/>
                </button>
                <button className="button" onClick={() => removeUser(index)}>
                    <FaRegEye/>
                </button>
            </div>
        </td>
    </tr>
);

export default FitnessCenters;