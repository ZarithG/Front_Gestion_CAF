import React from "react";
import "../styles/Register.css";
import { Outlet } from "react-router-dom";
import RegProvider from "../../providers/RegProvider";

const Register = () => {
    return (
        <div className="rfConteiner">
            <RegProvider>
                <div className="rfRegister">
                    <h1 className="RegisterPageTitle">Inscripción de usuarios</h1>
                    <Outlet />
                </div>
            </RegProvider>
        </div>
    );
};

export default Register;
