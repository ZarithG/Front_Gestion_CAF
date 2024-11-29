import React, { useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import "./styles/PagesAdmin.css";
import {FiEdit, FiAlertOctagon} from "react-icons/fi";
import {FaRegEye} from "react-icons/fa6";
import {IoMdSearch} from "react-icons/io";
import { SERVICES_BACK } from "../../../constants/constants";
import { MessagesError, MessagesSuccess, showToastPromise } from "../../gestion-caf/Messages";
import { Toaster, toast } from "sonner";
import Swal from 'sweetalert2';
import { USER_TYPE } from "../../../constants/constants";

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

    const inactiveUser = async (index, user) => {
        Swal.fire({
            title: "Inactivar usuario",
            text: `¿Esta seguro de inactivar el usuario ${user.name}?`,
            icon: "warning",
            showDenyButton: true,
            showCancelButton: true, // Muestra el botón "No"
            confirmButtonText: 'Sí', // Botón "Sí"
            denyButtonText: 'No',  // Botón "No"
        }).then(response => {
            if (response.isConfirmed) {
                toast.promise(
                    (async () => {
                        try{
                            const token = localStorage.getItem("authToken");
                            const response = await fetch(SERVICES_BACK.INACTIVE_USER + index, {
                                method: 'POST',
                                headers: {
                                    'Authorization': `Bearer ${token}`,
                                    'Content-Type': 'application/json',
                                    credentials: 'include'
                                }
                            });
                            if (response.status !== 200) {
                                if (response.status === 204) {
                                    MessagesError('No hay usarios registrados en el sistema.');
                                } else {
                                    MessagesError('Hubo un error en el servidor');
                                }
                                return;
                            }else{
                                MessagesSuccess("Usuario desactivado correctamente");
                                setTimeout(() => {
                                    window.location.reload();
                                }, 3000);
                            }
                        } catch (error) {
                            console.log(error)
                        }
                    })(),
                    {
                        loading: 'Inactivando usuario...',
                        success: <b>Usuario inactivado satisfactoriamente.</b>,
                        error: <b>No se pudo inactivar el usuario.</b>,
                    }
                );
            } else if (response.isDismissed) {
                console.log('El usuario canceló la acción');
            }
        });      
    };

    const activeUser = async (index, user) => {
        Swal.fire({
            title: "Activar usuario",
            text: `¿Esta seguro de activar el usuario ${user.name}?`,
            icon: "warning",
            showDenyButton: true,
            showCancelButton: true, // Muestra el botón "No"
            confirmButtonText: 'Sí', // Botón "Sí"
            denyButtonText: 'No',  // Botón "No"
        }).then(response => {
            if (response.isConfirmed) {
                toast.promise(
                    (async () => {
                        try{
                            const token = localStorage.getItem("authToken");
                            const response = await fetch(SERVICES_BACK.ACTIVE_USER + index, {
                                method: 'POST',
                                headers: {
                                    'Authorization': `Bearer ${token}`,
                                    'Content-Type': 'application/json',
                                    credentials: 'include'
                                }
                            });
                            if (response.status !== 200) {
                                if (response.status === 204) {
                                    MessagesError('No hay usarios registrados en el sistema.');
                                } else {
                                    MessagesError('Hubo un error en el servidor');
                                }
                                return;
                            }else{
                                MessagesSuccess("Usuario activado correctamente");
                                setTimeout(() => {
                                    window.location.reload();
                                }, 3000);
                            }
                        } catch (error) {
                            console.log(error)
                        }
                    })(),
                    {
                        loading: 'Activado usuario...',
                        success: <b>Usuario activado satisfactoriamente.</b>,
                        error: <b>No se pudo activado el usuario.</b>,
                    }
                );
            } else if (response.isDismissed) {
                console.log('El usuario canceló la acción');
            }
        });  
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
                // Mapea los datos del backend al formato requerido por initialUsers
                const allowedRoles = ['ROLE_SPORTSMAN', 'ROLE_USER', 'ROLE_CAF_COORDINATOR'];

                const filteredUsers = data.filter((item) =>
                    item.roles.some((role) => allowedRoles.includes(role))
                );

                const formattedUsers = filteredUsers.map((item) => ({
                    name: item.name,
                    email: item.userName,
                    active: item.active,
                    roles: item.roles
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

                {localStorage.getItem("roleName") === "ROLE_CAF_COORDINATOR" ? (
                    <UserTable users={filteredUsers} editUser={editUser} inactiveInscription={inactiveInscription} activeInscription={activeInscription}/>
                ) : localStorage.getItem("roleName") !== "ROLE_CAF_COORDINATOR" ? (
                    <UserTableForDirectorAndAdmin users={filteredUsers} activeUser={activeUser} inactiveUser={inactiveUser} editUser={editUser}/>
                ) : null}
                    
                   
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
        {(localStorage.getItem("roleName") === "ROLE_CAF_COORDINATOR") && (
            <div className="register-new-button-container">
                <button onClick={viewApplications} className="register-new-button">Ver solicitudes</button>
            </div>
        )}
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

const UserTableForDirectorAndAdmin = ({users, inactiveUser, activeUser, editUser}) => (
    <table className="table">
        <thead className="table-header-head">
        <tr className="table-row">
            <th className="table-cell">Nombre</th>
            <th className="table-cell">Correo Electrónico</th>
            <th className="table-cell">Rol</th>
            <th className="table-cell">Estado</th>
            <th className="table-cell">Opciones</th>
        </tr>
        </thead>
        <tbody>
        {users.map((user, index) => (
            <UserTableRowForDirectorAndAdmin
                key={`${user.code}-${index}`}
                user={user}
                index={user.inscriptionId}
                inactiveUser={inactiveUser}
                activeUser={activeUser}
                editUser={editUser}
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

const UserTableRowForDirectorAndAdmin = ({ user, inactiveUser, activeUser, editUser}) => {
    const allowedRoles = ['ROLE_SPORTSMAN', 'ROLE_USER'];
    
    // Determinar la acción y el texto del botón según el estado
    return (
        <tr className="table-row">
            <td className="table-cell">{user.name}</td>
            <td className="table-cell">{user.email}</td>
            {user.roles && user.roles.length > 0 && (
                <td className="table-cell">{classifyUserByRole(user.roles[0])}</td>
            )}
                        
            <td className="table-cell">
                <StatusUser status={user.active} />
            </td>
            <td className="table-cell">
                <div className="button-container">
                {
                    // Verificar si el usuario tiene un rol permitido
                    user.roles.some((role) => allowedRoles.includes(role)) && (
                        <button className="button" onClick={() => { editUser(user.email); }}>
                            MODIFICAR
                        </button>
                    )
                }
                    {/* Renderizar el botón basado en el estado */}
                    {user.active ? (
                        <button className="button" onClick={() => { inactiveUser(user.email, user); }}>
                            INACTIVAR
                        </button>
                    ) : (
                        <button className="button" onClick={() => { activeUser(user.email, user); }}>
                            ACTIVAR
                        </button>
                    )}
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

const classifyUserByRole = (status) =>{
    if(status === "ROLE_SPORTSMAN"){
        return "DEPORTISTA";
    }else{
        if(status === "ROLE_USER"){
            return "USUARIO";
        }else{
            if(status === "ROLE_CAF_COORDINATOR"){
                return "COORDINADOR";
            }
        }
    }
    return "N/A";
}

const Status = ({status}) => {
    const statusClass = status === "ACCEPTED" ? "status-active" : "status-inactive";
    return <span className={`status ${statusClass}`}>{classifyInscriptionStatus(status)}</span>;
};

const StatusUser = ({status}) => {
    const statusClass = status ? "status-active" : "status-inactive";
    return <span className={`status ${statusClass}`}>{status ? "ACTIVO" : "INACTIVO"}</span>;
};


export default FitnessCenterUser;