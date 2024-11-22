import React, { useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import "./styles/PagesAdmin.css";
import { IoMdSearch } from "react-icons/io";
import { MessagesError, MessagesSuccess } from '../../gestion-caf/Messages';
import { SERVICES_BACK } from "../../../constants/constants";
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

    const declineUser = (index) => {
        if (window.confirm("¿Estás seguro de que deseas rechazar la solicitud?")) {
            const updatedUsers = users.filter((_, i) => i !== index);
            setUsers(updatedUsers);
        }
    };

    const acceptUser = (index) => {
        if (window.confirm("¿Estás seguro de que deseas aceptar la solicitud?")) {
            alert("Usuario aceptado");
        }
    };

    const handleSearch = (event) => setSearch(event.target.value);

    const filteredUsers = users.filter(
        (user) =>
            user.code.toLowerCase().includes(search.toLowerCase()) ||
            user.name.toLowerCase().includes(search.toLowerCase()) ||
            user.lastname.toLowerCase().includes(search.toLowerCase())
    );

    const fetchCAFInscriptions = async () => {
        try {
            const token = localStorage.getItem("authToken");
            console.log(token)
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
                documentNumber: item.documentNumber,
                name: item.name,
                email: item.email,
                userType: item.userType,
            }));

            setUsers(formattedUsers);
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
            index={index}
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