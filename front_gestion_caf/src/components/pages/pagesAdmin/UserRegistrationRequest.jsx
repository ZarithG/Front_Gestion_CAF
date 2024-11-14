import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/PagesAdmin.css";

const initialUsers = [
    { code: "202012575", name: "Juan", lastname: "Perez", estate: "Docente" },
    { code: "202418764", name: "Ana", lastname: "Lopez", estate: "Estudinate" },
    // Agrega más usuarios aquí según sea necesario
];

const UserRegistrationRequest = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState(initialUsers);
    const [search, setSearch] = useState("");

    const viewUser = (index) => {
        navigate("/admin/fitnessCenterUser/detail");
    };

    const declineUser = (index) => {
        if (window.confirm("¿Estás seguro de que deseas rechazar la solicitud?")) {
            const updatedUsers = users.filter((_, i) => i !== index);
            setUsers(updatedUsers);
        }
    };

    const acceptUser = (index) => {
        if (window.confirm("¿Estás seguro de que deseas aceptar la solicitud?")) {
        }
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
            <h1>Usuarios CAF</h1>
            <div className="conteinerSearch">
                <label className="lbInItem">Ingrese el código o el número de documento del estudiante</label>
                <input
                    type="search"
                    value={search}
                    onChange={handleSearch}
                    placeholder="Buscar..."
                />
            </div>
            <table className="tableFiCeUs">
                <thead className="thFiCeUs">
                    <tr className="trFiCeUs">
                        <th className="thFiCeUs">Código estudiante</th>
                        <th className="thFiCeUs">Nombre</th>
                        <th className="thFiCeUs">Apellidos</th>
                        <th className="thFiCeUs">Estamento</th>
                        <th className="thFiCeUs">Opciones</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredUsers.map((user, index) => (
                        <tr className="trFiCeUs" key={user.code}>
                            <td className="tdFiCeUs">{user.code}</td>
                            <td className="tdFiCeUs">{user.name}</td>
                            <td className="tdFiCeUs">{user.lastname}</td>
                            <td className="tdFiCeUs">{user.email}</td>
                            <td className="tdFiCeUs">{user.estate}</td>
                            <td className="tdFiCeUs">
                                <div className="buttomFiCeUs">
                                    <button className="buttomFiCeUs" onClick={() => acceptUser(index)}>
                                        ok
                                    </button>
                                    <button className="buttomFiCeUs" onClick={() => declineUser(index)}>
                                        X
                                    </button>
                                    <button className="buttomFiCeUs" onClick={() => viewUser(index)}>
                                        view
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserRegistrationRequest;
