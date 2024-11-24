import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { showToastPromise } from "../../gestion-caf/Messages"; // Asegúrate de importar correctamente
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
                        {/* Más campos... */}
                        <button type="submit" className="submit-button">Enviar</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ManageFitnessCenters;
