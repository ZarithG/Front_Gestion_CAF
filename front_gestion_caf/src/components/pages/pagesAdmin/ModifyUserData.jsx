import React, { useState } from "react";
import "./styles/PagesAdmin.css";

const ModifyUserData = () => {
    // Estado inicial para indicar si está activo o inactivo
    const [isActive, setIsActive] = useState(true);

    // Función para alternar el estado entre activo e inactivo
    const toggleActiveState = () => {
        setIsActive((prevState) => !prevState);
    };

    return (
        <div className="containerBody">
            <h1 className="InformationDataPageTitle">Completar datos básicos</h1>
            <div>
                <h2>Rol de usuario</h2>
                <div>
                    <div><input type="radio"/><label>Estudiante</label></div>
                    <div><input type="radio"/><label>Deportista</label></div>
                    <div><label>Deportista</label><input type="text"/></div>
                    
                    {/* Botón que cambia entre "Activo" e "Inactivo" */}
                    <button onClick={toggleActiveState}>
                        {isActive ? "Inactivar" : "Activar"}
                    </button>
                    
                    <button>Eliminar</button>
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
