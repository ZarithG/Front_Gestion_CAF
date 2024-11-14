import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const initialUsers = [
    { code: "U1", name: "Juan", lastname: "Perez", email: "juan.perez@example.com", status: "activo" },
    { code: "U2", name: "Ana", lastname: "Lopez", email: "ana.lopez@example.com", status: "activo" },
    // Agrega más usuarios aquí según sea necesario
];

const FitnessCenterDirector = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState(initialUsers);
    const [search, setSearch] = useState("");

    const editUser = (index) => {
        navigate("/admin/fitnessCenterCoordinators/modify");
    };

    const removeUser = (index) => {
        if (window.confirm("¿Estás seguro de que deseas eliminar este coordinador?")) {
            const updatedUsers = users.filter((_, i) => i !== index);
            setUsers(updatedUsers);
        }
    };

    const newUser = () => {
        navigate("/admin/fitnessCenterCoordinators/registerNew");
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
        <div className="contairnerBody">
            <h1>Gestionar Directores CAF</h1>
            <div className="conteinerSearch">
                <label className="lbInItem">Ingrese el código o el número de documento del coordinador</label>
                <input
                    type="search"
                    value={search}
                    onChange={handleSearch}
                    placeholder="Buscar coordinador"
                />
                <button onClick={newUser}>Registrar nuevo</button>
            </div>
            <table className="tableFiCeUs">
                <thead className="thFiCeUs">
                    <tr className="trFiCeUs">
                        <th className="thFiCeUs">Código</th>
                        <th className="thFiCeUs">Nombre</th>
                        <th className="thFiCeUs">Apellido</th>
                        <th className="thFiCeUs">Correo</th>
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

export default FitnessCenterDirector;
