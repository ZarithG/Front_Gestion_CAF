import React, { useState, useEffect } from "react";
import "./styles/PagesAdmin.css";
import { Outlet, useNavigate } from "react-router-dom";
import { SERVICES_BACK } from "../../../constants/constants";
import { useLocation } from "react-router-dom";


const UserDataDetail = () => {
    const [questions, setQuestions] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    const userData = location.state?.userData;

    useEffect(() => {
        console.log(userData)

        //GET_COMPLETE_USER_BY_EMAIL
        
        const fetchUserData = async () => {
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
    }, [userData])

    return (
        <div className="containerBody">
            <h1 style={{ textAlign: "center" }} className="InformationDataPageTitle">
                Detalle de la inscripción del usuario
            </h1>

            {/* Información personal */}
            <div className="containerPersonalInformation">
                <h2 style={{ textAlign: "center" }}>
                    Información personal
                </h2>
                <p style={{ textAlign: "center" }}>
                    Datos personales del usuario que realizo la inscripción.
                </p>
                <div className="containerForm">
                    <form className="info-form" >

                        <div className="form-group">
                            <label className="lbInItem">Nombre</label>
                            <input type="text" readOnly/>
                        </div>

                        <div className="form-group">
                            <label className="lbInItem">Apellidos</label>
                            <input type="text" readOnly />
                        </div>

                        <div className="form-group">
                            <label className="lbInItem">Número de documento de identidad</label>
                            <input type="text" readOnly />
                        </div>

                        <div className="form-group">
                            <label className="lbInItem">Número de teléfono</label>
                            <input type="text" readOnly />
                        </div>

                        <div className="form-group">
                            <label className="lbInItem">Fecha de nacimiento</label>
                            <input type="text" readOnly />
                        </div>

                        <div className="form-group">
                            <label className="lbInItem">Correo electrónico</label>
                            <input type="text" readOnly />
                        </div>

                        <div className="form-group">
                            <label className="lbInItem">Dirección</label>
                            <input type="text" readOnly />
                        </div>

                    </form>
                </div>
            </div>

            {/* Información de salud */}
            <div className="containerPersonalInformation">
                <br /><br />
                <h2 style={{ textAlign: "center" }}>
                    Información salud
                </h2>
                <p style={{ textAlign: "center" }}>
                    Datos personales sobre salud     
                </p>
                <div className="containerForm">
                    <form className="info-form" >

                        <div className="form-group">
                            <label className="lbInItem">EPS</label>
                            <input type="text" readOnly/>
                        </div>

                        <div className="form-group">
                            <label className="lbInItem">Grupo sanguineo RH</label>
                            <input type="text" readOnly/>
                        </div>

                        <div className="form-group">
                            <label className="lbInItem">Número de documento de identidad</label>
                            <input type="text" readOnly/>
                        </div>

                        <div className="form-group">
                            <label className="lbInItem">Alergias</label>
                            <input type="text" readOnly/>
                        </div>

                    </form>
                </div>
            </div>
            
            <div className="containerPersonalInformation">
            <br />
            <br />
            <h2 style={{ textAlign: "center" }}>
            Respuestas Formulario de valoración e Historia médica
            </h2>
                <br />
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
                                        <br />
                                        <div className="form-option" style={{ textAlign: "center" }}>
                                            <input style={{ textAlign: "center" }}
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
                        </div>

                        
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UserDataDetail;
