import React from "react";
import { Route, Navigate, useNavigate } from "react-router-dom";
import { USER_TYPE } from "../../constants/constants";
import "../styles/Register.css"

const Notifications = () => {
    const userName = localStorage.getItem("userName");
    return (
    <div className="rfConteiner">
        <h1> Usuario {userName}</h1>
        <div className="rfRegister">
            <h2 className="InformationDataPageTitle">CAF inscripto</h2>
            <label></label>
        </div>
        <div className="rfRegister">
            <h2 className="InformationDataPageTitle">Fecha de inscripción</h2>
            <label></label>
        </div>
        <div className="rfRegister">
            <h2 className="InformationDataPageTitle">Estado de inscripción</h2>
            <label></label>
        </div>
    </div>
    )
};

export default Notifications;


