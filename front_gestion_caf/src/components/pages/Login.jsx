import React, {useState} from "react";
import "../styles/Login.css"
import LogoBienestar from "../../components/CAF-images/logoBienestar.png";
import { Link, useNavigate } from "react-router-dom"; 
import { FcGoogle } from "react-icons/fc";
import {SERVICES_BACK} from "../../constants/constants"


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');  

        if (!password) {
            setError('La contraseña es obligatoria');
            return;
        }

        try {
            const response = await fetch('http://localhost:9091/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                }),
            });

            if (response.data.success) {
                navigate('/');  
            } else {
                setError('Credenciales incorrectas');
            }
        } catch (error) {
            if (error.response && error.response.status === 400) {
                setError('Credenciales incorrectas');
            } else {
                setError('Hubo un error en el servidor');
            }
        }
    };

    const googleLogin = () =>{
        window.location.href = SERVICES_BACK.GOOGLELOGIN
    }
    return (
        <div className="LoginPage">
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
                            <button className="iniciarButtom" type="submit">Iniciar</button>
                            <button onClick={googleLogin} type="button" className="google-button">
                                Iniciar con Google <FcGoogle />
                            </button>
                            <Link to="/register">
                                <label className="registerName">Registrarse en el Sistema</label>
                            </Link>
                        </div>
                    </form>
            </div>
            </div>
        </div>
    );
};

export default Login;
