import React, { useState } from "react";
import "./styles/PagesAdmin.css";

const ModifyUserData = () => {
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
    // Estado inicial para indicar si está activo o inactivo
    const [isActive, setIsActive] = useState(true);

    // Función para alternar el estado entre activo e inactivo
    const toggleActiveState = () => {
        setIsActive((prevState) => !prevState);
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
            <h1 className="InformationDataPageTitle">Completar datos básicos</h1>
            <div>
                <h2>Rol de usuario</h2>
                <div className="containerGeneralUser">
                    <div className="containerRolUser">
                        <div className="RolOption"><input name="role" type="radio" value="STUDENT" onChange={handleChange} /><label>Estudiante</label></div>
                        <div className="RolOption"><input name="role" type="radio" value="DEPORTISTA" onChange={handleChange} /><label>Deportista</label></div>
                    </div>
                    <div className="RolEstatus">
                        <label>Estudiante</label>
                        <input type="text" placeholder="Activo" readOnly />
                    </div>
                    <div className="RolButtonStatus">
                        <button onClick={toggleActiveState}>
                            {isActive ? "Inactivar" : "Activar"}
                        </button>
                        <button>Eliminar</button>
                    </div>
                </div>
            </div>

            {/* Información personal */}
            <div className="containerPersonalInformation">
                <h2>Información personal</h2>
                <p>Agregue sus datos personales</p>
                <div className="containerForm">
                    <form className="info-form">

                        <div className="form-group">
                            <label className="lbInItem">Nombre</label>
                            <input type="text" />
                        </div>

                        <div className="form-group">
                            <label className="lbInItem">Apellidos</label>
                            <input type="text" />
                        </div>

                        <div className="form-group">
                            <label className="lbInItem">Número de documento de identidad</label>
                            <input type="text" />
                        </div>

                        <div className="form-group">
                            <label className="lbInItem">Número de teléfono</label>
                            <input type="text" />
                        </div>

                        <div className="form-group">
                            <label className="lbInItem">Fecha de nacimiento</label>
                            <input type="text" />
                        </div>

                        <div className="form-group">
                            <label className="lbInItem">Correo electrónico</label>
                            <input type="text" />
                        </div>

                        <div className="form-group">
                            <label className="lbInItem">Dirección</label>
                            <input type="text" />
                        </div>

                    </form>
                </div>
            </div>

            {/* Información de salud */}
            <div className="containerPersonalInformation">
                <h2>Información salud</h2>
                <p>Datos personales sobre salud</p>
                <div className="containerForm">
                    <form className="info-form">

                        <div className="form-group">
                            <label className="lbInItem">EPS</label>
                            <input type="text" />
                        </div>

                        <div className="form-group">
                            <label className="lbInItem">Grupo sanguineo RH</label>
                            <input type="text" />
                        </div>

                        <div className="form-group">
                            <label className="lbInItem">Número de documento de identidad</label>
                            <input type="text" />
                        </div>

                        <div className="form-group">
                            <label className="lbInItem">Alergias</label>
                            <input type="text" />
                        </div>

                    </form>
                </div>
            </div>
        </div>
    );
};

export default ModifyUserData;
