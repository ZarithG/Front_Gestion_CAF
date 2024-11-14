import React, { useState } from "react";
import "./styles/PagesAdmin.css";
import { Outlet, } from "react-router-dom";


const UserDataDetail = () => {
    return (
        <div className="containerBody">
            <h1 className="InformationDataPageTitle">Completar datos básicos</h1>

            {/* Información personal */}
            <div className="containerPersonalInformation">
                <h2>Información personal</h2>
                <p>Agregue sus datos personales</p>
                <div className="containerForm">
                    <form className="info-form" >

                        <div className="form-group">
                            <label className="lbInItem">Nombre</label>
                            <input type="text" />
                        </div>

                        <div className="form-group">
                            <label className="lbInItem">Apellidos</label>
                            <input type="text" />
                        </div>

                        <div className="form-group">
                            <label className="lbInItem">Número de documento de identidad</label>
                            <input type="text" />
                        </div>

                        <div className="form-group">
                            <label className="lbInItem">Número de teléfono</label>
                            <input type="text" />
                        </div>

                        <div className="form-group">
                            <label className="lbInItem">Fecha de nacimiento</label>
                            <input type="text" />
                        </div>

                        <div className="form-group">
                            <label className="lbInItem">Correo electrónico</label>
                            <input type="text" />
                        </div>

                        <div className="form-group">
                            <label className="lbInItem">Dirección</label>
                            <input type="text" />
                        </div>

                    </form>
                </div>
            </div>
            
            {/* Información de salud */}
            <div className="containerPersonalInformation">
                <h2>Información salud</h2>
                <p>Datos personales sobre salud </p>
                <div className="containerForm">
                    <form className="info-form" >

                        <div className="form-group">
                            <label className="lbInItem">EPS</label>
                            <input type="text" />
                        </div>

                        <div className="form-group">
                            <label className="lbInItem">Grupo sanguineo RH</label>
                            <input type="text" />
                        </div>

                        <div className="form-group">
                            <label className="lbInItem">Número de documento de identidad</label>
                            <input type="text" />
                        </div>

                        <div className="form-group">
                            <label className="lbInItem">Alergias</label>
                            <input type="text" />
                        </div>

                    </form>
                </div>
            </div>
        </div>
    );
};

export default UserDataDetail;
