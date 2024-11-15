import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import "./styles/PagesAdmin.css";
import "./styles/FitnessCenterCordinator.css";
import {IoMdSearch} from "react-icons/io";

const initialUsers = [
    {code: "U1", name: "Juan", lastname: "Perez", email: "juan.perez@example.com", status: "activo"},
    {code: "U2", name: "Ana", lastname: "Lopez", email: "ana.lopez@example.com", status: "activo"},
];

const ManageCenterCoordinators = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState(initialUsers);
    const [search, setSearch] = useState("");

    const assignCoordinador = (index) => {
        alert(`Coordinador asignado: ${users[index].name} ${users[index].lastname}`);
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
            <h1>Gestionar Coordinadores CAF</h1>
            <div className="body-containerBody">
                <SearchBar search={search} handleSearch={handleSearch}/>
                <div className="table-content">
                    <UserTable users={filteredUsers} assignCoordinador={assignCoordinador}/>
                </div>
            </div>
        </div>
    );
};

const SearchBar = ({search, handleSearch}) => (
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
                <IoMdSearch className="search-icon"/>
            </div>
        </div>
    </div>
);

const UserTable = ({users, assignCoordinador}) => (
    <table className="table">
        <thead className="table-header-head">
        <tr className="table-row">
            <th className="table-cell">Código</th>
            <th className="table-cell">Nombre</th>
            <th className="table-cell">Apellido</th>
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

const UserTableRow = ({user, index, assignCoordinador}) => (
    <tr className="table-row">
        <td className="table-cell">{user.code}</td>
        <td className="table-cell">{user.name}</td>
        <td className="table-cell">{user.lastname}</td>
        <td className="table-cell">{user.email}</td>
        <td className="table-cell">
            <Status status={user.status}/>
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

const Status = ({status}) => {
    const statusClass = status.toLowerCase() === "activo" ? "status-active" : "status-inactive";
    return <span className={`status ${statusClass}`}>{status}</span>;
};

export default ManageCenterCoordinators;