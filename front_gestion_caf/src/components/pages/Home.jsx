import React, { useEffect, useState } from "react";
import "../styles/Home.css";
import Footer from "../gestion-caf/Footer";
import Carousel from "../../components/gestion-caf/Carrusel"; 

const Home = () => {
    const [authToken, setAuthToken] = useState("");
    const [userName, setUserName] = useState('');
    const [roleName, setRoleName] = useState('');

    useEffect(() => {
        const storedUserName = localStorage.getItem("userName");
        
        if (storedUserName) {    
            setUserName(storedUserName);
        }else{
            handleRedirect();
        }
    }, []);

    const handleRedirect = () => {
        const params = new URLSearchParams(window.location.search);
        if (params) {
            const authUserJson = params.get("authUser");
    
            if (authUserJson) {
                const authUser = JSON.parse(decodeURIComponent(authUserJson));
    
                if (authUser && authUser.token && authUser.token.token) {
                    const token = authUser.token.token;
                    localStorage.setItem("authToken", token);
                    setAuthToken(token);
    
                    const userName = authUser.userName;
                    const roleName = authUser.roles[0]?.roleName;
    
                    localStorage.setItem("userName", userName);
                    localStorage.setItem("roleName", roleName);
                }
            }
        }
    };
    
    return (
        <div className="HomePage">
            <div className="HomeContainer">
                <h1>Sistema Centro de Acondicionamiento Físico UPTC</h1>
                <div className="containerDescription">
                    <div className="containerImages">
                        <Carousel className="Carrusel" />
                    </div>
                    <div className="Description">
                        <h2>Acondicionamiento físico</h2>
                        <p>
                            El Centro de Acondicionamiento Físico (CAF) de la UPTC, es un espacio creado para promover hábitos y estilos de vida saludable a través de la actividad física, desarrollando y fortaleciendo valores como disciplina, autoestima, autocuidado, entre otros.
                            Contamos con profesionales capacitados para brindar la asesoría necesaria, que garantizan a los usuarios un óptimo servicio.
                        </p>
                        <p>Este sistema permite la inscripción a los CAF de la universidad y el agendamiento de turnos.</p>
                        <p>Para ingresar al sistema debes ser un estudiante, funcionario o docente activo de la universidad.</p>

                        {roleName === "ADMIN" && (
                            <p>Bienvenido, Administrador. Puedes gestionar usuarios y acceder a funciones avanzadas.</p>
                        )}

                        {roleName === "USER" && (
                            <p>Bienvenido, Usuario. Puedes reservar turnos y consultar información sobre los CAF.</p>
                        )}
                    </div>
                </div>
            </div>
            
        </div>
    );
};

export default Home;
