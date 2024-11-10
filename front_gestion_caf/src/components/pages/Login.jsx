import React, { useState } from "react";
import "../styles/Login.css";
import { MessagesError, MessagesSuccess } from '../gestion-caf/Messages';
import LogoBienestar from "../../components/CAF-images/logoBienestar.png";
import { Link, useNavigate } from "react-router-dom"; 
import { FcGoogle } from "react-icons/fc";
import { SERVICES_BACK } from "../../constants/constants";
import { Toaster } from "sonner";  // Importa Toaster si aún no lo tienes aquí

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');  

        if (!password) {
            MessagesError('La contraseña es obligatoria');
            return;
        }

        try {
            const response = await fetch(SERVICES_BACK.LOGINAUTH, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userName: email ,
                    password: password
                }),
            });
            
            if (!response.ok) {
                if (response.status === 400) {
                    MessagesError('Credenciales incorrectas');
                } else {
                    MessagesError('Hubo un error en el servidor');
                }
                return;
            }
    
            const data = await response.json();
    
            if (data) {
                MessagesSuccess('Inicio de sesión exitoso');
                navigate('/registration/terms');  
            } else {
                MessagesError('Credenciales incorrectas');
            }
        } catch (error) {
            MessagesError('Hubo un error en el servidor');
        }
    };

    const googleLogin = () => {
        
        window.location.href = SERVICES_BACK.GOOGLELOGIN;
    };

    return (
        <div className="LoginPage">
            <Toaster position="top-center" dir="auto" duration={5000} visibleToasts = {4} richColors/>
            <h1 className="loginPage-title">Sistema Centro de Acondicionamiento Físico UPTC</h1>
            <div className="contanerImg">
                <img className="HomeImage" src={LogoBienestar} alt="Logo Bienestar" />
            </div>
            <div className="containerForm">
                <div className="containerForm2">
                    <form className="login-form" onSubmit={handleLogin}>
                        <input
                            type="email"
                            name="email"
                            placeholder="Ingresa tu correo"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <p className="textMail">@uptc.edu.co</p>
                        <input
                            type="password"
                            name="password"
                            placeholder="Ingresa tu contraseña"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {error && <p className="error-message">{error}</p>}
                        <div className="containerButtom">
                            <button onClick={handleLogin} className="iniciarButtom" type="submit">Iniciar</button>
                            <button onClick={googleLogin} type="button" className="google-button">
                                Iniciar con Google <FcGoogle />
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
