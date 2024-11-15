import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import "./styles/PagesAdmin.css";
import {FiEdit} from "react-icons/fi";
import {FaRegEye} from "react-icons/fa6";
import {IoMdSearch} from "react-icons/io";

const initialUsers = [
    {code: "U1", name: "Juan", lastname: "Perez", status: "activo"},
    {code: "U2", name: "Ana", lastname: "Lopez", status: "activo"},
];

const FitnessCenterUser = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState(initialUsers);
    const [search, setSearch] = useState("");

    const editUser = (index) => navigate("/admin/fitnessCenterUser/modify");

    const removeUser = (index) => {
        if (window.confirm("¿Estás seguro de que deseas eliminar este coordinador?")) {
            const updatedUsers = users.filter((_, i) => i !== index);
            setUsers(updatedUsers);
        }
    };

    const viewApplications = () => navigate("/admin/fitnessCenterUser/registrationRequest");

    const handleSearch = (event) => setSearch(event.target.value);

    const filteredUsers = users.filter(
        (user) =>
            user.code.toLowerCase().includes(search.toLowerCase()) ||
            user.name.toLowerCase().includes(search.toLowerCase()) ||
            user.lastname.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="containerBody">
            <h1>Usuarios CAF</h1>
            <div className="body-containerBody">
                <SearchBar search={search} handleSearch={handleSearch} viewApplications={viewApplications}/>
                <div className="table-content">
                    <UserTable users={filteredUsers} editUser={editUser} removeUser={removeUser}/>
                </div>
            </div>
        </div>
    );
};

const SearchBar = ({search, handleSearch, viewApplications}) => (
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
                <IoMdSearch className="search-icon"/>
            </div>
        </div>
        <div className="register-new-button-container">
            <button onClick={viewApplications} className="register-new-button">Ver solicitudes</button>
        </div>
    </div>
);

const UserTable = ({users, editUser, removeUser}) => (
    <table className="table">
        <thead className="table-header-head">
        <tr className="table-row">
            <th className="table-cell">Código estudiante</th>
            <th className="table-cell">Nombre</th>
            <th className="table-cell">Apellidos</th>
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
        <td className="table-cell">{user.name}</td>
        <td className="table-cell">{user.lastname}</td>
        <td className="table-cell">
            <Status status={user.status}/>
        </td>
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

const Status = ({status}) => {
    const statusClass = status.toLowerCase() === "activo" ? "status-active" : "status-inactive";
    return <span className={`status ${statusClass}`}>{status}</span>;
};

export default FitnessCenterUser;