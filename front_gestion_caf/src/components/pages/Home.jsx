import React from "react";
import '../styles/Home.css';
import Footer from "../gestion-caf/Footer";
import Header from "../gestion-caf/Header";
import Carousel from "../../components/gestion-caf/Carrusel"; 

const Home = () => {
    return (
        <div className="HomePage">
            <Header/>
            <div className="HomeContainer"> 
                <h1>Sistema Centro de Acondicionamiento Físico UPTC</h1>
                <div className="containerDescription">
                <div className="containerImages">
                    <Carousel className="Carrusel"/>
                </div>
                <div className="Description">
                    <h2>Acondicionamiento físico</h2>
                    <text>
                    El Centro de Acondicionamiento Físico (CAF) de la UPTC, son un espacio creado para promover hábitos y estilos de vida saludable a través de la actividad física, desarrollando y fortaleciendo valores disciplina, de autoestima, autocuidado, entre otros.
                    Contamos con profesionales capacitados para brindar la asesoría necesaria, que garantizan a los usuarios un óptimo servicio.
                    </text>
                    <text>Este sistema permite la inscripción a los CAF de la universidad y el agendamiento de turnos. </text>
                    <text>Para ingresar al sistema debes ser un estudiente, funcionario o docente activo de la universidad.</text>
                </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
    
}

export default Home;