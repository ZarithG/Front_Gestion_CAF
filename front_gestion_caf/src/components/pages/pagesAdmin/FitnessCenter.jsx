import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import "./styles/PagesAdmin.css";
import "./styles/FitnessCenterCordinator.css";
import {IoMdSearch} from "react-icons/io";
import {FiEdit} from "react-icons/fi";
import {FaRegEye} from "react-icons/fa6";
import { SERVICES_BACK } from "../../../constants/constants";
import { MessagesError, showToastPromise } from "../../gestion-caf/Messages";

// Datos iniciales
const initialCAF = [
    {
        code: "",
        fullName: "",
        email: "",
        status: "", // Agrega esta propiedad
    },
];

// Componente principal
const FitnessCenters = () => {
    const navigate = useNavigate();
    const [CAF, setCAF] = useState(initialCAF);
    const [search, setSearch] = useState("");
    const [error, setError] = useState("");

    const fetchCAFAll = async () => {
        const token = localStorage.getItem("authToken");

        const fetchCAF = async () => {
            const response = await fetch(SERVICES_BACK.GET__ALL_CAF, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                    credentials: "include",
                },
            });
        
            if (!response.ok) {
                throw new Error("Error al obtener los datos de los usuarios");
            }
        
            const data = await response.json();
            
            if (Array.isArray(data)) {
                // Filtrar y procesar los datos al formato deseado
                const specificRole = "ROLE_CAF_COORDINATOR"; // Rol específico a filtrar
                return data
                    .map((user) => ({
                        code: user.id.toString(), // Convertir el ID a una cadena
                        fullName: user.name, // Usar el nombre completo del objeto
                        description: user.description,
                        email: user.coordinatorEmail, // Usar el correo como email
                    }));
            } else {
                throw new Error("El formato de datos de CAF es incorrecto.");
            }
        };
        
        try {
            await showToastPromise(
                fetchCAF().then((processedCAF) => setCAF(processedCAF)),
                "Datos cargados correctamente",
                "Error al cargar los datos"
            );
        } catch (error) {
            setError(error.message);
        }
        
    };

    fetchCAFAll();
    
    const editUser = (index) => {
        navigate("/admin/fitnessCenters/manageFitnessCenters");
    };

    const removeUser = (index) => {
        
    };

    const handleSearch = (event) => {
        setSearch(event.target.value);
    };

    const filteredCAF = CAF.filter(
        (user) =>
            user.code.toLowerCase().includes(search.toLowerCase()) ||
            user.fullName.toLowerCase().includes(search.toLowerCase()) ||
            user.email.toLowerCase().includes(search.toLowerCase())
    );
    

    return (
        <div className="containerBody">
            <h1>Gestionar Centros de Acondicionamiento</h1>
            <div className="body-containerBody">
                <SearchBar search={search} handleSearch={handleSearch}/>
                <div className="table-content">
                    
                    <UserTable CAF={filteredCAF} editUser={editUser} removeUser={removeUser}/>
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

const UserTable = ({ CAF }) => (
    <table className="table">
        <thead className="table-header-head">
            <tr className="table-row">
                <th className="table-cell">Código</th>
                <th className="table-cell">Sede</th>
                <th className="table-cell">Descripción</th>
                <th className="table-cell">Coordinador</th>
                <th className="table-cell">Opciones</th>
            </tr>
        </thead>
        <tbody>
            
            {CAF.map((user, index) => (
                <UserTableRow
                    key={`${user.code}-${index}`}
                    user={user}
                    index={index}
                />
            ))}
        </tbody>
    </table>
);

const UserTableRow = ({ user, index }) => (

    <tr className="table-row">
        <td className="table-cell">{user.code}</td>
        <td className="table-cell">{user.fullName}</td>
        <td className="table-cell">{user.description}</td>
        <td className="table-cell">{user.coordinator}</td>
        
        <td className="table-cell">
            <div className="button-container">
                <button className="button" >
                    Asignar
                </button>
            </div>
        </td>
    </tr>
);

export default FitnessCenters;