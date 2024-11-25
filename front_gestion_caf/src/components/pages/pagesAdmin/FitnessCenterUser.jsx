import React, { useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import "./styles/PagesAdmin.css";
import {FiEdit, FiAlertOctagon} from "react-icons/fi";
import {FaRegEye} from "react-icons/fa6";
import {IoMdSearch} from "react-icons/io";
import { SERVICES_BACK } from "../../../constants/constants";
import { MessagesError, MessagesSuccess, showToastPromise } from "../../gestion-caf/Messages";
import { Toaster } from "sonner";

const initialUsers = [];

const FitnessCenterUser = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState(initialUsers);
    const [search, setSearch] = useState("");

    useEffect(() => {
        const userRole = localStorage.getItem("roleName");

        if (userRole === "ROLE_WELLBEING_DIRECTOR" || userRole === "ROLE_ADMIN"){
            fetchAllUsers();
        }else{
            fetchCAFActiveInscriptions(); // Llama a la función al cargar el componente
        }

        
      }, []);

    const editUser = (index) => navigate("/admin/fitnessCenterUser/modify");

    const inactiveInscription = async (index) => {
        const token = localStorage.getItem("authToken");
        const response = await fetch(SERVICES_BACK.POST_CAF_INACTIVE_INSCRIPTION + index, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                credentials: 'include'
            }
        });
        if (!response.ok) {
            if (response.status === 204) {
                MessagesError('No se pudo inactivar la inscripción correctamente');
            } else {
                MessagesError('Hubo un error en el servidor');
            }
            return;
        }else{
            MessagesSuccess("Inscripción inactivada correctamente");
            window.location.reload();
        }
    };

    const activeInscription = async (index) => {
        const token = localStorage.getItem("authToken");
        const response = await fetch(SERVICES_BACK.POST_CAF_ACTIVE_INSCRIPTION + index, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                credentials: 'include'
            }
        });
        if (!response.ok) {
            if (response.status === 204) {
                MessagesError('No se pudo activar la inscripción correctamente');
            } else {
                MessagesError('Hubo un error en el servidor');
            }
            return;
        }else{
            MessagesSuccess("Inscripción activada correctamente");
            window.location.reload();
        }
    };

    const viewApplications = () => navigate("/admin/fitnessCenterUser/registrationRequest");

    const handleSearch = (event) => setSearch(event.target.value);

    const filteredUsers = users.filter(
        (user) =>
            user.inscriptionId ||
            user.documentNumber ||
            user.name.toLowerCase().includes(search.toLowerCase()) ||
            user.email.toLowerCase().includes(search.toLowerCase()) ||
            user.userType.toLowerCase().includes(search.toLowerCase())
    );

    const classifyUser = (userType) => {
        if(userType === "STUDENT"){
            return "ESTUDIANTE";
        }else{
            if(userType === "EXTERN"){
                return "EXTERNO";
            }else{
                if(userType === "ADMINISTRATIVE"){
                    return "ADMINISTRATIVO";
                }
            }
        }
        return "NA";
    }

    const fetchCAFActiveInscriptions = async () => {
        try {
            const token = localStorage.getItem("authToken");
            const promiseFn = async () => {
                const response = await fetch(SERVICES_BACK.GET_ALL_CAF_ACTIVE_INSCRIPTIONS + localStorage.getItem("userName"), {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                        credentials: 'include'
                    }
                });
                if (!response.ok) {
                    if (response.status === 204) {
                        MessagesError('No hay inscripciones registradas en el CAF');
                    } else {
                        MessagesError('Hubo un error en el servidor');
                    }
                    return;
                }
                
                const data = await response.json(); // Convierte la respuesta a JSON
                // Mapea los datos del backend al formato requerido por initialUsers
                const formattedUsers = data.map((item) => ({
                    inscriptionId: item.inscriptionId,
                    documentNumber: item.userAllDataDTO.documentNumber,
                    name: item.userAllDataDTO.name,
                    email: item.userAllDataDTO.email,
                    userType: classifyUser(item.userAllDataDTO.userType),
                    inscriptionStatus: item.inscriptionStatus
                }));
                setUsers(formattedUsers);
            };
            await showToastPromise(
                promiseFn(),
                "Datos del CAF cargados correctamente.",
                "Error al cargar los datos."
            );
        } catch (error) {
            MessagesError('Hubo un error en el servidor');
        }
    }

    const fetchAllUsers = async () => {
        try {
            const token = localStorage.getItem("authToken");
            const promiseFn = async () => {
                const response = await fetch(SERVICES_BACK.GET_USER_ALL, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                        credentials: 'include'
                    }
                });
                if (!response.ok) {
                    if (response.status === 204) {
                        MessagesError('No hay usuarios en el sistema');
                    } else {
                        MessagesError('Hubo un error en el servidor');
                    }
                    return;
                }
                
                const data = await response.json(); // Convierte la respuesta a JSON
                console.log(data)
                // Mapea los datos del backend al formato requerido por initialUsers
                const formattedUsers = data.map((item) => ({
                    inscriptionId: item.id,
                    documentNumber: item.userAllDataDTO.documentNumber,
                    name: item.userAllDataDTO.name,
                    email: item.userAllDataDTO.email,
                    userType: classifyUser(item.userAllDataDTO.userType),
                    inscriptionStatus: item.active
                }));
                setUsers(formattedUsers);
            };
            await showToastPromise(
                promiseFn(),
                "Datos del CAF cargados correctamente.",
                "Error al cargar los datos."
            );
        } catch (error) {
            MessagesError('Hubo un error en el servidor');
        }
    }

    return (
        <div className="containerBody">
            <Toaster
                position="top-center"
                dir="auto"
                duration={5000}
                visibleToasts={4}
                richColors
            />
            <h1>Usuarios CAF</h1>
            <div className="body-containerBody">
                <SearchBar search={search} handleSearch={handleSearch} viewApplications={viewApplications}/>
                <div className="table-content">
                    <UserTable users={filteredUsers} editUser={editUser} inactiveInscription={inactiveInscription} activeInscription={activeInscription}/>
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

const UserTable = ({users, editUser, inactiveInscription, activeInscription}) => (
    <table className="table">
        <thead className="table-header-head">
        <tr className="table-row">
            <th className="table-cell">Número Documento</th>
            <th className="table-cell">Nombre</th>
            <th className="table-cell">Estamento</th>
            <th className="table-cell">Estado</th>
            <th className="table-cell">Opciones</th>
        </tr>
        </thead>
        <tbody>
        {users.map((user, index) => (
            <UserTableRow
                key={`${user.code}-${index}`}
                user={user}
                index={user.inscriptionId}
                editUser={editUser}
                inactiveInscription={inactiveInscription}
                activeInscription={activeInscription}
            />
        ))}
        </tbody>
    </table>
);

const UserTableRow = ({ user, index, editUser, inactiveInscription, activeInscription }) => {
    // Determinar la acción y el texto del botón según el estado
    const isAccepted = user.inscriptionStatus === 'ACCEPTED';
    const isInactive = user.inscriptionStatus === 'INACTIVE';

    return (
        <tr className="table-row">
            <td className="table-cell">{user.documentNumber}</td>
            <td className="table-cell">{user.name}</td>
            <td className="table-cell">{user.userType}</td>
            <td className="table-cell">
                <Status status={user.inscriptionStatus} />
            </td>
            <td className="table-cell">
                <div className="button-container">
                    <button className="button" onClick={() => editUser(index)}>
                        <FiEdit />
                    </button>
                    {/* Renderizar el botón basado en el estado */}
                    {isAccepted ? (
                        <button className="button" onClick={() => {inactiveInscription(index)}}>
                            ❌
                        </button>
                    ) : isInactive ? (
                        <button className="button" onClick={() => {activeInscription(index)}}>
                            ✅
                        </button>
                    ) : null}
                </div>
            </td>
        </tr>
    );
};

const classifyInscriptionStatus = (status) =>{
    if(status === "ACCEPTED"){
        return "ACTIVO";
    }else{
        if(status === "INACTIVE"){
            return "INACTIVO";
        }
    }
    return "N/A";
}

const Status = ({status}) => {
    const statusClass = status === "ACCEPTED" ? "status-active" : "status-inactive";
    return <span className={`status ${statusClass}`}>{classifyInscriptionStatus(status)}</span>;
};

export default FitnessCenterUser;