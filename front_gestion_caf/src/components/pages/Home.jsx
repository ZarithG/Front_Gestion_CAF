import React, { useEffect, useState } from "react";
import "../styles/Home.css";
import Footer from "../gestion-caf/Footer";
import Carousel from "../../components/gestion-caf/Carrusel";
import { USER_TYPE } from "../../constants/constants";

const Home = ({
    status, setStatus
}) => {
    const [authToken, setAuthToken] = useState("");
    const [userName, setUserName] = useState('');
    const [roleName, setRoleName] = useState('');

    useEffect(() => {
        const storedUserName = localStorage.getItem("userName");
        setRoleName(localStorage.getItem("roleName"));

        if (status === true) {
            setStatus(false);
        } else {
            setStatus(true);
        }

        if (storedUserName) {
            setUserName(storedUserName);
        } else {
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
                {console.log("rol", roleName)}
                {roleName === USER_TYPE.ADMIN && (
                    <h2>¡Bienvenido, Administrador! </h2>
                )}
                {roleName === USER_TYPE.COORDINATOR && (
                    <h2>¡Bienvenido, Coordinador! </h2>
                )}
                {roleName === USER_TYPE.DIRECTOR && (
                    <h2>¡Bienvenido, Director! </h2>
                )}
                {roleName === USER_TYPE.SPORTSMAN && (
                    <h2>¡Bienvenido, Desportista! </h2>
                )}
                {roleName === USER_TYPE.USER && (
                    <h2>¡Bienvenido, Usuario ! </h2>
                )}
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
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Home;
