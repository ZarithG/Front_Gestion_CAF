import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/PagesAdmin.css";

const RegisterNewCoordinator = () => {
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

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors({}); // Limpiar los errores antes de validar

        const newErrors = validateForm();
        if (Object.keys(newErrors).length === 0) {
            setSubmitted(true);
            navigate("/register/information");
        } else {
            setErrors(newErrors);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    return (
        <div className="contairnerBody">
            <h1 className="InformationDataPageTitle">Completar datos básicos</h1>

            {/* Información personal */}
            <div className="containerPersonalInformation">
                <h2>Información personal</h2>
                <p>Agregue sus datos personales para complementar el ingreso al sistema.</p>
                <div className="containerForm">
                    <form className="info-form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label className="lbInItem">Nombre</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                            />
                            {submitted && errors.name && <span className="error">{errors.name}</span>}
                        </div>

                        <div className="form-group">
                            <label className="lbInItem">Apellidos</label>
                            <input
                                type="text"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                            />
                            {submitted && errors.lastName && <span className="error">{errors.lastName}</span>}
                        </div>
                        <div>
                            <label className="lbInItem">Tipo de documento</label>
                            <select
                                name="documentType"
                                value={formData.documentType}
                                onChange={handleChange}
                            >
                                <option value="">Seleccione su estamento</option>
                                <option value="CC">Cédula de Ciudadanía</option>
                                <option value="TI">Tarjeta de identidad</option>
                                <option value="CE">Cédula de Extranjería</option>
                                <option value="PA">Pasaporte</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label className="lbInItem">Número de documento de identidad</label>
                            <input
                                type="text"
                                name="documentNumber"
                                value={formData.documentNumber}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group">
                            <label className="lbInItem">Número de teléfono</label>
                            <input
                                type="text"
                                name="phoneNumber"
                                value={formData.phoneNumber}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group">
                            <label className="lbInItem">Fecha de nacimiento</label>
                            <input
                                type="date"
                                name="birthDate"
                                value={formData.birthDate}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group">
                            <label className="lbInItem">Correo Electrónico</label>
                            <input
                                type="email"
                                className="lbDataUsername"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                readOnly
                            />
                        </div>

                        <div className="form-group">
                            <label className="lbInItem">Dirección</label>
                            <input
                                type="text"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                            />
                            {submitted && errors.address && <span className="error">{errors.address}</span>}
                        </div>
                        <div>
                        <label className="lbInItem">Departamento</label>
                        <select
                            name="department"
                            value={formData.department}
                            onChange={handleChange}
                        >
                            <option value="">Seleccione el departamento</option>
                            <option value="Boyaca">Boyacá</option>
                            <option value="Cundinamarca">Cundinamarca</option>
                            <option value="Antioquia">Antioquia</option>
                        </select>
                        </div>
                        <div>
                        <label className="lbInItem">Municipio</label>
                        <select
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                        >
                            <option value="">Seleccione su ciudad</option>
                            <option value="Tunja">Tunja</option>
                            <option value="Toca">Toca</option>
                            <option value="Boyaca">Boyacá</option>
                            <option value="Sogamoso">Sogamoso</option>
                        </select>
                        </div>
                    </form>
                </div>
            </div>

            {/* Usuario y contraseña */}
            <div className="containerUser">
                <h2>Usuario y contraseña</h2>
                <p>Tu usuario será el nombre y apellido registrado en el correo electrónico, elige una contraseña segura.</p>
                <div className="containerForm">
                    <form className="user-info-form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Usuario</label>
                            <input
                                type="text"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                readOnly
                            />
                        </div>
                        <div className="form-group">
                            <label>Contraseña</label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                            />
                            {submitted && errors.password && <span className="error">{errors.password}</span>}
                        </div>
                        <div className="form-group">
                            <label>Confirmación de la contraseña</label>
                            <input
                                type="password"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                            />
                            {submitted && errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}
                        </div>
                        <button type="submit">Guardar</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default RegisterNewCoordinator;
