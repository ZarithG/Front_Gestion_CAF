import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/PagesAdmin.css";

const initialUsers = [
    { code: "U1", sede: "Sede Central", name: "CAF UPTC Estudiantes", coordinator: "juan.perez@example.com",  },
    { code: "U2", sede: "Sede Central", name: "CAF UPTC Funcionarios", coordinator: "juan.perez@example.com",  },
    { code: "U1", sede: "Sede Salud", name: "CAF UPTC Estudiantes", coordinator: "juan.perez@example.com",  },
    // Agrega más usuarios aquí según sea necesario

];

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

    const filteredUsers = users.filter(user =>
        user.code.toLowerCase().includes(search.toLowerCase()) ||
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.sede.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="contairnerBody">
            <h1>Gestionar Coordinadores CAF</h1>
            <div className="conteinerSearch">
                <label className="lbInItem">Ingrese el código o el número de documento del coordinador</label>
                <input
                    type="search"
                    value={search}
                    onChange={handleSearch}
                    placeholder="Buscar coordinador"
                />
            </div>
            <table className="tableFiCeUs">
                <thead className="thFiCeUs">
                    <tr className="trFiCeUs">
                        <th className="thFiCeUs">Código</th>
                        <th className="thFiCeUs">Sede</th>
                        <th className="thFiCeUs">Nombre</th>
                        <th className="thFiCeUs">Coordinador</th>
                        <th className="thFiCeUs">Opciones</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredUsers.map((user, index) => (
                        <tr className="trFiCeUs" key={user.code}>
                            <td className="tdFiCeUs">{user.code}</td>
                            <td className="tdFiCeUs">{user.sede}</td>
                            <td className="tdFiCeUs">{user.name}</td>
                            <td className="tdFiCeUs">{user.coordinator}</td>
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

export default FitnessCenters;
