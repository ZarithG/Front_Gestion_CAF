import React from "react";
import "../styles/Register.css";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const navigate = useNavigate();
    const handleLogin = () => navigate('/login');
    return (
        <div className="Register">
            <h1 className="RegisterPageTitle">Completar datos básicos</h1>

            <div className="containerPersonalInformation">
                <h2>Información personal</h2>
                <p>Agregue sus datos personales para complementar el ingreso al sistema.</p>
                
                <div className="containerForm">
                    <form className="personal-info-form">
                        <div className="form-group">
                            <label>Nombre</label>
                            <input type="text" name="nombre" />
                        </div>

                        <div className="form-group">
                            <label>Apellidos</label>
                            <input type="text" name="apellidos" />
                        </div>

                        <div className="form-group">
                            <label>Número de documento de identidad</label>
                            <input type="text" name="documento" />
                        </div>

                        <div className="form-group">
                            <label>Número de teléfono</label>
                            <input type="text" name="telefono" />
                        </div>

                        <div className="form-group">
                            <label>Correo Electrónico</label>
                            <input type="email" name="correo" />
                        </div>
                    </form>
                </div>
            </div>

            <div className="containerUser">
                <h2>Usuario y contraseña</h2>
                <p>Tu usuario para ingresar al sistema de CAF UPTC será el nombre y apellido registrado en el correo electrónico, y deberás elegir una contraseña segura a continuación.</p>
                
                <div className="containerForm">
                    <form className="user-info-form">
                        <div className="form-group">
                            <label>Usuario</label>
                            <input type="text" name="usuario" placeholder="nombre.apellido" />
                        </div>

                        <div className="form-group">
                            <label>Contraseña</label>
                            <input type="password" name="contraseña" />
                        </div>

                        <div className="form-group">
                            <label>Confirmación de la contraseña</label>
                            <input type="password" name="confirmacionContraseña" />
                        </div>
                        <button onClick={handleLogin}>Guardar</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;
