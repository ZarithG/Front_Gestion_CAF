import React from "react";
import LogoBienestar from "../components/CAF-images/logoBienestar.png"

const Home = () => {
    return (
        <div className="HomeContainer"> 
            <text className="HomeText">Agendamiento de Turnos</text>
            <img className="HomeImage" src={LogoBienestar} alt="LogoBienestar"></img>
        </div>
    )
    
}

export default Home;
