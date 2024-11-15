import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/FormAdm.css";

const ManageFitnessCenters = () => {
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

    const handleChangeCoordinador = () => {
        navigate("/admin/fitnessCenterCoordinators/manage");
    }


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
                    <h2 className="h2FormAdm">Información del CAF</h2>
                    <p className="pFormAdm">Datos de información</p>
                    <form className="info-form" onSubmit={handleSubmit}>
                        <div className="informationCAFMaFiCe" >
                            <div className="form-group-FormAdmHo">
                                <label className="lbFormAdm">Nombre</label>
                                <input
                                    className="inMaFi"
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                />
                                {submitted && errors.name && <span className="error">{errors.name}</span>}
                            </div>

                            <div className="form-group-FormAdmHo">
                                <label className="lbFormAdm">Número de Usuarios inscritos</label>
                                <input
                                    type="text"
                                    name="numberOfUsers"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                />
                                {submitted && errors.lastName && <span className="error">{errors.lastName}</span>}
                            </div>
                        </div>
                        <div>
                            <h2 className="h2FormAdm">Tipos de usuarios</h2>
                            <p className="pFormAdm">Seleccione el rol de llos usuarios que pueden acceder al CAF</p>
                            <div className="form-group-FormAdm-check">
                                <div>
                                    <input
                                        className="check-Form-Adm"
                                        type="checkbox"
                                        name="CAF"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                    />
                                    <label className="lbInItemMaFiCe">Estudiante</label>
                                </div>
                                <div>
                                    <input
                                        type="checkbox"
                                        name="CAF"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                    />
                                    <label className="lbInItemMaFiCe">Docente</label>
                                </div>
                                <div>
                                    <input
                                        type="checkbox"
                                        name="CAF"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                    />
                                    <label className="lbInItemMaFiCe">Funcionario</label>
                                </div>
                            </div>
                            <div className="form-group-FormAdm">
                                <label className="lbInItemMaFiCe">Nombre</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                />
                                {submitted && errors.name && <span className="error">{errors.name}</span>}
                            </div>

                            <div className="form-group-FormAdm">
                                <label className="lbInItemMaFiCe">Número de Usuarios inscritos</label>
                                <input
                                    type="text"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                />
                                {submitted && errors.lastName && <span className="error">{errors.lastName}</span>}
                            </div>
                        </div>
                        <h2 className="h2MaFiCe">Información del Coordinador encargado</h2>
                        <button onClick={handleChangeCoordinador}> Cambiar coordinador</button>
                        <p>Datos básicos del coordinador</p>
                        <div className="form-group-FormAdm">
                            <label className="lbInItemMaFiCe">Nombre</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                            />
                            {submitted && errors.name && <span className="error">{errors.name}</span>}
                        </div>

                        <div className="form-group-FormAdm">
                            <label className="lbInItemMaFiCe">Apellidos</label>
                            <input
                                type="text"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                            />
                            {submitted && errors.lastName && <span className="error">{errors.lastName}</span>}
                        </div>
                        <div className="form-group-FormAdm">
                            <label className="lbInItemMaFiCe">Número de documento de identidad</label>
                            <input
                                type="text"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                            />
                            {submitted && errors.lastName && <span className="error">{errors.lastName}</span>}
                        </div>
                        <div className="form-group-FormAdm">
                            <label className="lbInItemMaFiCe">Número de teléfono</label>
                            <input
                                type="text"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                            />
                            {submitted && errors.lastName && <span className="error">{errors.lastName}</span>}
                        </div>
                        <div className="form-group-FormAdm">
                            <label className="lbInItemMaFiCe">Correo electrónico</label>
                            <input
                                type="text"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                            />
                            {submitted && errors.lastName && <span className="error">{errors.lastName}</span>}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ManageFitnessCenters;
