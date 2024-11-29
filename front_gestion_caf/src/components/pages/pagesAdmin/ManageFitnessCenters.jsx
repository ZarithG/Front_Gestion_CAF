import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { showToastPromise } from "../../gestion-caf/Messages"; // Asegúrate de importar correctamente
import { IoMdSearch } from "react-icons/io";
import "./styles/FormAdm.css";
import { SERVICES_BACK } from "../../../constants/constants";

const initialUsers = [
    { code: "", fullName: " ", email: "", status: "" },
];

const ManageFitnessCenters = () => {
    const [users, setUsers] = useState(initialUsers);
    const [search, setSearch] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        lastName: "",
        documentType: "",
        documentNumber: "",
        phoneNumber: "",
        birthDate: "",
        email: "",
        address: "",
        department: "",
        city: "",
        password: "",
        confirmPassword: "",
    });
    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);

    const handleSearch = (event) => setSearch(event.target.value);

    const filteredUsers = users.filter(
        (user) =>
            user.code.toLowerCase().includes(search.toLowerCase()) ||
            user.name.toLowerCase().includes(search.toLowerCase()) ||
            user.lastname.toLowerCase().includes(search.toLowerCase())
    );

    const validateForm = () => {
        const newErrors = {};

        if (!formData.name) newErrors.name = "Este campo es obligatorio.";
        if (!formData.lastName) newErrors.lastName = "Este campo es obligatorio.";
        if (!formData.documentType) newErrors.documentType = "Este campo es obligatorio.";
        if (!formData.documentNumber) newErrors.documentNumber = "Este campo es obligatorio.";
        if (!formData.phoneNumber) newErrors.phoneNumber = "Este campo es obligatorio.";
        if (!formData.birthDate) newErrors.birthDate = "Este campo es obligatorio.";
        if (!formData.email) newErrors.email = "Este campo es obligatorio.";
        if (!formData.address) newErrors.address = "Este campo es obligatorio.";
        if (!formData.department) newErrors.department = "Este campo es obligatorio.";
        if (!formData.city) newErrors.city = "Este campo es obligatorio.";
        if (!formData.password) newErrors.password = "Este campo es obligatorio.";
        if (!formData.confirmPassword) newErrors.confirmPassword = "Este campo es obligatorio.";
        if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Las contraseñas no coinciden.";

        return newErrors;
    };

    useEffect(() => {
        // const fetchCUserAll = async () => {
        //     const token = localStorage.getItem("authToken");

        //     const fetchUsers = async () => {
        //         const response = await fetch(SERVICES_BACK.GET_USER_ALL, {
        //             method: "GET",
        //             headers: {
        //                 Authorization: `Bearer ${token}`,
        //                 credentials: "include",
        //             },
        //         });

        //         if (!response.ok) {
        //             throw new Error("Error al obtener los datos de los usuarios");
        //         }

        //         const data = await response.json();
        //         console.log(data)
        //         if (Array.isArray(data)) {
        //             // Procesar los datos al formato deseado
        //             return data.map((user) => ({
        //                 code: user.id.toString(), // Convertir el ID a una cadena
        //                 fullName: user.name, // Usar el nombre completo del objeto
        //                 email: user.userName, // Usar el correo como email
        //                 status: user.active ? "Activo" : "Inactivo", // Convertir boolean a texto
        //             }));
        //         } else {
        //             throw new Error("El formato de datos de CAF es incorrecto.");
        //         }
        //     };

        //     try {
        //         await showToastPromise(
        //             fetchUsers().then((processedUsers) => setUsers(processedUsers)),
        //             "Datos cargados correctamente",
        //             "Error al cargar los datos"
        //         );
        //     } catch (error) {
        //         setError(error.message);
        //     }
        // };

        // fetchCUserAll();
    }, []); // Dependencias vacías para ejecutar solo al montar

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({}); // Limpiar los errores antes de validar

        const newErrors = validateForm();
        if (Object.keys(newErrors).length === 0) {
            // Simula una solicitud asincrónica usando showToastPromise
            try {
                await showToastPromise(
                    new Promise((resolve) => setTimeout(resolve, 2000)), // Simula un tiempo de espera
                    "Formulario enviado correctamente",
                    "Error al enviar el formulario"
                );
                setSubmitted(true);
                navigate("/register/information");
            } catch (error) {
                setErrors({ general: "Ocurrió un error al enviar el formulario." });
            }
        } else {
            setErrors(newErrors);
        }
    };

    const handleChangeCoordinador = () => {
        navigate("/admin/fitnessCenterCoordinators/manage");
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    return (
        <div className="containerBody">
            <h1 className="InformationDataPageTitleFormAdm">Datos Centro de Acondicionamiento Físico</h1>

            {/* Información personal */}
            <div className="containerPersonalInformationFormAdm">
                <div className="containerForm">
                    <div>
                        <h2 className="h2FormAdm">Información del CAF</h2>
                        <p className="pFormAdm">Datos de información</p>
                        <form className="info-form" onSubmit={handleSubmit}>
                            <div className="informationCAFMaFiCe">
                                <div className="form-group-FormAdmHo">
                                    <label className="lbFormAdm">Nombre</label>
                                    <input
                                        className="inMaFi"
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        readOnly
                                    />
                                    {submitted && errors.name && <span className="error">{errors.name}</span>}
                                </div>
                                <div className="form-group-FormAdmHo">
                                    <label className="lbFormAdm">Descripción</label>
                                    <input
                                        className="inMaFi"
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        readOnly
                                    />
                                    {submitted && errors.name && <span className="error">{errors.name}</span>}
                                </div>
                                <div className="form-group-FormAdmHo">
                                    <label className="lbFormAdm">Número de Usuarios inscritos</label>
                                    <input
                                        type="text"
                                        name="numberOfUsers"
                                        value={formData.lastName}
                                        readOnly
                                    />
                                    {submitted && errors.lastName && <span className="error">{errors.lastName}</span>}
                                </div>
                            </div>
                        </form>
                    </div>
                    <div>
                        <h2>Coordinador</h2>
                        <div className="form-group-FormAdmHo">
                            <label className="lbFormAdm">Nombre</label>
                            <input
                                className="inMaFi"
                                type="text"
                                name="name"
                                value={formData.name}
                                readOnly
                            />
                            {submitted && errors.name && <span className="error">{errors.name}</span>}
                        </div>
                        <div className="form-group-FormAdmHo">
                            <label className="lbFormAdm">Correo</label>
                            <input
                                className="inMaFi"
                                type="text"
                                name="name"
                                value={formData.name}
                                readOnly
                            />
                            {submitted && errors.name && <span className="error">{errors.name}</span>}
                        </div>
                        <button onClick={handleChangeCoordinador}>Cambiar Coordinador</button>
                    </div>
                    {/* Más campos... */}
                    {/* <div className="body-containerBody">
                        <SearchBar search={search} handleSearch={handleSearch} />
                        <div className="table-content">
                            <UserTable users={filteredUsers} />
                        </div>
                    </div> */}
                </div>
            </div>
        </div >
    );
};


const SearchBar = ({ search, handleSearch }) => (
    <div className="containerSearch">
        <div className="search-bar-field">
            <label className="lbInItem">Ingrese el código o el número de documento del usuario</label>
            <div className="search-bar-field-icon">
                <input
                    type="search"
                    value={search}
                    onChange={handleSearch}
                    placeholder="Buscar usuario"
                    className="search-bar-input"
                />
                <IoMdSearch className="search-icon" />
            </div>
        </div>

    </div>
);

const UserTable = ({ users }) => (
    <table className="table">
        <thead className="table-header-head">
            <tr className="table-row">
                <th className="table-cell">Código</th>
                <th className="table-cell">Nombre Completo</th>
                <th className="table-cell">Correo</th>
                <th className="table-cell">Estado</th>
            </tr>
        </thead>
        <tbody>
            {users.map((user, index) => (
                <UserTableRow key={`${user.code}-${index}`} user={user} />
            ))}
        </tbody>
    </table>
);

const UserTableRow = ({ user }) => (
    <tr className="table-row">
        <td className="table-cell">{user.code}</td>
        <td className="table-cell">{user.fullName}</td>
        <td className="table-cell">{user.email}</td>
        <td className="table-cell">
            <Status status={user.status} />
        </td>
    </tr>
);

const Status = ({ status }) => {
    const statusClass = status.toLowerCase() === "activo" ? "status-active" : "status-inactive";
    return <span className={`status ${statusClass}`}>{status}</span>;
};

export default ManageFitnessCenters;
