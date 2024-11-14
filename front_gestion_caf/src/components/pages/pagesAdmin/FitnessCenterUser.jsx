import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/PagesAdmin.css";

const initialUsers = [
    { code: "U1", name: "Juan", lastname: "Perez", status: "activo" },
    { code: "U2", name: "Ana", lastname: "Lopez", status: "activo" },
    // Agrega más usuarios aquí según sea necesario
];

const FitnessCenterUser = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState(initialUsers);
    const [search, setSearch] = useState("");

    const editUser = (index) => {
        navigate("/admin/fitnessCenterUser/modify");
    };

    const removeUser = (index) => {
        if (window.confirm("¿Estás seguro de que deseas eliminar este coordinador?")) {
            const updatedUsers = users.filter((_, i) => i !== index);
            setUsers(updatedUsers);
        }
    };

    const viewApplications = () => {
        navigate("/admin/fitnessCenterUser/registrationRequest");
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
                <button onClick={viewApplications}>Ver solicitudes</button>
            </div>
            <table className="tableFiCeUs">
                <thead className="thFiCeUs">
                    <tr className="trFiCeUs">
                        <th className="thFiCeUs">Código estudiante</th>
                        <th className="thFiCeUs">Nombre</th>
                        <th className="thFiCeUs">Apellidos</th>
                        <th className="thFiCeUs">Estado</th>
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
                            <td className="tdFiCeUs">{user.status}</td>
                            <td className="tdFiCeUs">
                                <div className="buttomFiCeUs">
                                    <button className="buttomFiCeUs" onClick={() => editUser(index)}>
                                        Editar
                                    </button>
                                    <button className="buttomFiCeUs" onClick={() => removeUser(index)}>
                                        🗑
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

export default FitnessCenterUser;
