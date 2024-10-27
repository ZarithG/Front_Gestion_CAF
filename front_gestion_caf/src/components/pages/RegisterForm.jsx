import React, { useState } from "react";
import "../styles/Register.css";
import { Outlet, useNavigate } from "react-router-dom";
import RegFormProvider from "../../providers/RegFormProvider";

const RegisterForm = () => {
    return (
        <RegFormProvider>
        <div className="Register">
            <h1 className="RegisterPageTitle">Inscripción de usuarios</h1>
            
            <Outlet></Outlet>
        </div>
        </RegFormProvider>
    );
};

export default RegisterForm;
