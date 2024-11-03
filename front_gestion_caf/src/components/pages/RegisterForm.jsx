import React, { useState } from "react";
import "../styles/RegisterForm.css";
import { Outlet, } from "react-router-dom";
import RegFormProvider from "../../providers/RegFormProvider";

const RegisterForm = () => {
    return (
        <div className="rfConteiner">
            <RegFormProvider className="RegFormProvider">
                <div className="rfRegister">
                    <h1 className="RegisterPageTitle">Inscripción de usuarios</h1>
                    <Outlet></Outlet>
                </div>
            </RegFormProvider>
        </div>
    );
};

export default RegisterForm;
