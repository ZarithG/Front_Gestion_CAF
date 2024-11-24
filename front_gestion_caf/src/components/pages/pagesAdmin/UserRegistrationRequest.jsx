import React, { useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import "./styles/PagesAdmin.css";
import { IoMdSearch } from "react-icons/io";
import { SERVICES_BACK } from "../../../constants/constants";
import { MessagesError, MessagesSuccess, showToastPromise } from "../../gestion-caf/Messages";
import { Toaster } from "sonner";

const initialUsers = [];

const UserRegistrationRequest = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState(initialUsers);
    const [search, setSearch] = useState("");

    const viewUser = (index) => navigate("/admin/fitnessCenterUser/view");

    useEffect(() => {
        fetchCAFInscriptions(); // Llama a la función al cargar el componente
      }, []);

    const declineUser = async (index) => {
        const token = localStorage.getItem("authToken");
        const response = await fetch(SERVICES_BACK.POST_CAF_REJECT_INSCRIPTION + index, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                credentials: 'include'
            }
        });
        if (!response.ok) {
            if (response.status === 204) {
                MessagesError('No se pudo rechazar la inscripción correctamente');
            } else {
                MessagesError('Hubo un error en el servidor');
            }
            return;
        }else{
            MessagesSuccess("Inscripción rechazada correctamente");
            window.location.reload();
        }
    };

    const acceptUser = async (index) => {
        const token = localStorage.getItem("authToken");
        const response = await fetch(SERVICES_BACK.POST_CAF_ACCEPT_INSCRIPTION + index, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                credentials: 'include'
            }
        });
        if (!response.ok) {
            if (response.status === 204) {
                MessagesError('No se pudo aceptar la inscripción correctamente');
            } else {
                MessagesError('Hubo un error en el servidor');
            }
            return;
        }else{
            MessagesSuccess("Inscripción aceptada correctamente");
            window.location.reload();
        }
    };

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

    const fetchCAFInscriptions = async () => {
        try {
            const token = localStorage.getItem("authToken");
            const promiseFn = async () => {
                const response = await fetch(SERVICES_BACK.GET_ALL_CAF_INSCRIPTIONS + localStorage.getItem("userName"), {
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
            <h1>Solicitud de Inscripción de Usuarios CAF</h1>
            <div className="body-containerBody">
                <SearchBar search={search} handleSearch={handleSearch} />
                <div className="table-content">
                    <UserTable users={filteredUsers} acceptUser={acceptUser} declineUser={declineUser}
                        viewUser={viewUser} />
                </div>
            </div>
        </div>
    );
};

const SearchBar = ({ search, handleSearch }) => (
    <div className="containerSearch">
        <div className="search-bar-field">
            <label className="lbInItem">Ingrese el código o el número de documento del aspirante</label>
            <div className="search-bar-field-icon">
                <input
                    type="search"
                    value={search}
                    onChange={handleSearch}
                    placeholder="Buscar..."
                    className="search-bar-input"
                />
                <IoMdSearch className="search-icon" />
            </div>
        </div>
    </div>
);

const UserTable = ({ users, acceptUser, declineUser, viewUser }) => (
    <table className="table">
        <thead className="table-header-head">
            <tr className="table-row">
                <th className="table-cell">Número Inscripción</th>
                <th className="table-cell">Documento</th>
                <th className="table-cell">Nombre</th>
                <th className="table-cell">Correo Electrónico</th>
                <th className="table-cell">Estamento</th>
                <th className="table-cell">Opciones</th>
            </tr>
        </thead>
        <tbody>
            {users.map((user, index) => (
                <UserTableRow
                    key={`${user.code}- ${ index }`}
            user={user}
            index={user.inscriptionId}
            acceptUser={acceptUser}
            declineUser={declineUser}
            viewUser={viewUser}
            />
        ))}
        </tbody>
    </table>
);

const UserTableRow = ({ user, index, acceptUser, declineUser, viewUser }) => (
    <tr className="table-row">
        <td className="table-cell">{user.inscriptionId}</td>
        <td className="table-cell">{user.documentNumber}</td>
        <td className="table-cell">{user.name}</td>
        <td className="table-cell">{user.email}</td>
        <td className="table-cell">{user.userType}</td>
        <td className="table-cell">
            <div className="button-container">
                <button className="button" onClick={() => acceptUser(index)}>
                    ✅
                </button>
                <button className="button" onClick={() => declineUser(index)}>
                    ❌
                </button>
                <button className="button" onClick={() => viewUser(index)}>
                    👁
                </button>
            </div>
        </td>
    </tr>
);

export default UserRegistrationRequest;