import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import "./styles/PagesAdmin.css";
import "./styles/FitnessCenterCordinator.css";
import {IoMdSearch} from "react-icons/io";
import {FiEdit} from "react-icons/fi";
import {FaRegEye} from "react-icons/fa6";

const initialUsers = [
    {code: "202501180", name: "Juan", lastname: "Perez", email: "juan.perez@example.com", status: "Activo"},
    {code: "U2", name: "Ana", lastname: "Lopez", email: "ana.lopez@example.com", status: "Inactivo"},
    {code: "U3", name: "Juan", lastname: "Perez", email: "juan.perez1@example.com", status: "Activo"},
    {code: "U4", name: "Ana", lastname: "Lopez", email: "ana.lopez1@example.com", status: "Inactivo"},
    {code: "U5", name: "Ana", lastname: "Lopez", email: "ana.lopez1@example.com", status: "Inactivo"}
    // Agrega más usuarios aquí según sea necesario
];

const RegisteredUsers = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState(initialUsers);
    const [search, setSearch] = useState("");

    const editUser = (index) => {
        navigate("/admin/RegisteredUsers/modify");
    };

    const removeUser = (index) => {
        navigate("/admin/RegisteredUsers/view")
    };

    const newUser = () => {
        navigate("/admin/RegisteredUsers/registerNew");
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
                <SearchBar search={search} handleSearch={handleSearch} newUser={newUser}/>
                <div className="table-content">
                    <UserTable users={filteredUsers} editUser={editUser} removeUser={removeUser}/>
                </div>
            </div>
        </div>
    );
};

const SearchBar = ({search, handleSearch, newUser}) => (
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

const UserTable = ({users, editUser, removeUser}) => (
    <table className="table">
        <thead className="table-header-head">
        <tr className="table-row">
            <th className="table-header">Código</th>
            <th className="table-header">Nombre Completo</th>
            <th className="table-header">Correo</th>
            <th className="table-header">Estado</th>
            <th className="table-header">Opciones</th>
        </tr>
        </thead>
        <tbody>{users.map((user, index) => (
            <tr className="table-row" key={user.code}>
                <td className="table-cell">{user.code}</td>
                <td className="table-cell">{user.name + " " + user.lastname}</td>
                <td className="table-cell">{user.email}</td>
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
        ))}</tbody>
    </table>
);

const Status = ({status}) => {
    const statusClass = status.toLowerCase() === "activo" ? "status-active" : "status-inactive";
    return <span className={`status ${statusClass}`}>{status}</span>;
};
export default RegisteredUsers;