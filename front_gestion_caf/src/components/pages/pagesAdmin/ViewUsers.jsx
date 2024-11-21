import React, { useState, useEffect } from "react";
import "./styles/PagesAdmin.css";
import { Outlet, useNavigate } from "react-router-dom";
import { SERVICES_BACK } from "../../../constants/constants";


const UserDataDetail = () => {
    const [questions, setQuestions] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const token = localStorage.getItem("authToken");
                if (!token) {
                    throw new Error("Token de autenticación no encontrado.");
                }

                const response = await fetch(SERVICES_BACK.GETALLQUESTIONS, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.status !== 200) {
                    if (response.status === 500) {
                        navigate("/");
                    }
                    throw new Error(`Error en la respuesta del servidor`);
                }

                const data = await response.json();
                setQuestions(data);
            } catch (error) {
                console.error("Error al obtener las preguntas:", error);
                setError(error.message);
            }
        };

        fetchQuestions();
    }, [])

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
            <div className="containerPersonalInformation">
                <h2> Respuestas Formulario de valoración e Historia médica</h2>
                
                <div className="containerForm">
                    <form className="user-info-form" >
                        <div className="form-table">
                            {questions.length > 0 ? (
                                questions.map((item) => (
                                    <div key={item.id} className="form-row">
                                        <div className="form-question">
                                            <label htmlFor={`question_${item.id}`}>
                                                {item.questionText}
                                            </label>
                                        </div>
                                        <div className="form-option">
                                            <input
                                                type="text"
                                                id={`question_${item.id}_no`}
                                                value="false"
                                                readOnly
                                            />
                                            
                                        </div>
                                        <br />
                                    </div>
                                ))
                            ) : (
                                <div>No se encontraron preguntas.</div>
                            )}

                            { (
                                <div className="form-row">
                                    <label htmlFor="additionalInfo">
                                        Si en la anterior sección contestó una o varias preguntas de
                                        forma afirmativa, por favor complemente su respuesta.
                                    </label>
                                    <input
                                        type="text"
                                        id="additionalInfo"
                                        placeholder="Escriba detalles aquí..."
                                    />
                                </div>
                            )}
                        </div>

                        
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UserDataDetail;
