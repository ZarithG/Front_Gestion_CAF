import React, { useState } from "react";
import { Route, Navigate, useNavigate } from "react-router-dom";
import { USER_TYPE } from "../../constants/constants";
import "../styles/Register.css"

const initialUser = {
    code: "", fullName: " ", email: "ejemplo@email.com", status: ""
};

const Notifications = () => {
    const [user, setUser] = useState(initialUser);
    //const userName = localStorage.getItem("userName");
    return (
        <div className="rfConteiner">
            <h1> Usuario {user.email}</h1>
            <div>
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
            <div>
                <div className="rfRegister">
                    <h2 className="InformationDataPageTitle">Estado de inscripción</h2>
                    <label>Hola</label>
                </div>
            </div>
            <div>
                <h2>Turnos</h2>
                <label> </label>
            </div>
        </div>
    )
};

export default Notifications;


