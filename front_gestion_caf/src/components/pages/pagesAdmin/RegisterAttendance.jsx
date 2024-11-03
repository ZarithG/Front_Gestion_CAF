import React, { useState } from "react";
import "../styles/RegisterForm.css";
import { Outlet, } from "react-router-dom";
import RegFormProvider from "../../providers/RegFormProvider";

const RegisterForm = () => {
    return (
        <div className="asqConteiner">
            Registrar Asistencia
        </div>
    );
};

export default RegisterForm;
