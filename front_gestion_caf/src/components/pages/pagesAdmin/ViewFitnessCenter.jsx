import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/PagesAdmin.css";
import "./styles/FitnessCenterCordinator.css";
import { IoMdSearch } from "react-icons/io";
import { SERVICES_BACK } from "../../../constants/constants";
import { MessagesError, MessagesSuccess, showToastPromise } from "../../gestion-caf/Messages";
import { Toaster, toast } from "sonner";
import { ConfirmToast } from 'react-confirm-toast'
import swal from 'sweetalert2';

const initialUsers = [
    { code: "", fullName: " ", email: "", status: "" },
];

const ViewFitnessCenter = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState(initialUsers);
    const [search, setSearch] = useState("");
    const [token, setToken] = useState("");
    const [error, setError] = useState("");
    const [show, setShow] = useState(false)

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
            <h1>Detalles CAF</h1>
            <div className="body-containerBody">
                <SearchBar search={search} handleSearch={handleSearch} />
                <div className="table-content">
                    <UserTable users={filteredUsers} show={show} setShow={setShow} />
                </div>
            </div>
        </div>
    );
}

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

const UserTable = ({ users, assignCoordinador, show, setShow }) => (
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
                    show={show}
                    setShow={setShow}
                />
            ))}
        </tbody>
    </table>
);

const UserTableRow = ({ user, assignCoordinador, show, setShow }) => (

    <tr className="table-row">
        <td className="table-cell">{user.code}</td>
        <td className="table-cell">{user.fullName}</td>
        <td className="table-cell">{user.email}</td>
        <td className="table-cell">
            <Status status={user.status} />
        </td>
        <td className="table-cell">
            <div className="button-container">
                <button className="button" onClick={() => assignCoordinador(user)}>
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


export default ViewFitnessCenter