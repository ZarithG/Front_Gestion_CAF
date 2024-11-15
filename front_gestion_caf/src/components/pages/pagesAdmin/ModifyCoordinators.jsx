import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/FormAdm.css";

const ModifyCoordinators = () => {
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
        <div className="containerBody">
            <h1 className="InformationDataPageTitleFormAdm">Gestión del Coordonador </h1>

            {/* Información personal */}
            <div className="containerPersonalInformationFormAdm">
                <div className="containerFormAdm">
                    <h2 className="h2FormAdm">Información personal</h2>
                    <p className="pFormAdm">Modifique la información del coordinador</p>

                    <form className="info-form" onSubmit={handleSubmit}>
                        <div className="form-group-FormAdm">
                            <label className="lbFormAdm">Nombre</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                            />
                            {submitted && errors.name && <span className="error">{errors.name}</span>}
                        </div>

                        <div className="form-group-FormAdm">
                            <label className="lbFormAdm">Apellidos</label>
                            <input
                                type="text"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                            />
                            {submitted && errors.lastName && <span className="error">{errors.lastName}</span>}
                        </div>
                        <div className="form-group-FormAdm">
                            <label className="lbFormAdm">Tipo de documento</label>
                            <select
                                className="sltFormAdmItem"
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
                        <div className="form-group-FormAdm">
                            <label className="lbFormAdm">Número de documento de identidad</label>
                            <input
                                type="text"
                                name="documentNumber"
                                value={formData.documentNumber}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group-FormAdm">
                            <label className="lbFormAdm">Número de teléfono</label>
                            <input
                                type="text"
                                name="phoneNumber"
                                value={formData.phoneNumber}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group-FormAdm">
                            <label className="lbFormAdm">Fecha de nacimiento</label>
                            <input
                                type="date"
                                name="birthDate"
                                value={formData.birthDate}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group-FormAdm">
                            <label className="lbFormAdm">Correo Electrónico</label>
                            <input
                                type="email"
                                className="inpEmailFormAdmItem"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                readOnly
                            />
                        </div>

                        <div className="form-group-FormAdm">
                            <label className="lbFormAdm">Dirección</label>
                            <input
                                type="text"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}

                            />
                            {submitted && errors.address && <span className="error">{errors.address}</span>}
                        </div>
                        <div className="form-group-FormAdm">
                            <label className="lbFormAdm">Departamento</label>
                            <select
                                className="sltFormAdmItem"
                                name="department"
                                value={formData.department}
                                onChange={handleChange}>
                                <option value="">Seleccione el departamento</option>
                                <option value="Boyaca">Boyacá</option>
                                <option value="Cundinamarca">Cundinamarca</option>
                                <option value="Antioquia">Antioquia</option>
                            </select>
                        </div>
                        <div className="form-group-FormAdm">
                            <label className="lbFormAdm">Municipio</label>
                            <select
                                className="sltFormAdmItem"
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
                        <div className="containerButtonAdm">
                        <button className="buttonFormAdm">Guardar</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ModifyCoordinators;
