import React, { useState, useEffect } from "react";
import "./styles/PagesAdmin.css";
import { Outlet, useNavigate } from "react-router-dom";
import { SERVICES_BACK } from "../../../constants/constants";
import { useLocation } from "react-router-dom";
import { format } from "date-fns";
import { Toaster, toast } from "sonner";
import { MessagesError, MessagesSuccess } from "../../gestion-caf/Messages";

const UserDataDetail = () => {
    const [questions, setQuestions] = useState("");
    const [consents, setConsents] = useState({});
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    const userData = location.state?.userData;
    const [userCompleteData, setUserCompleteData] = useState({});
    const [userBirthDate, setUserBirthDate] = useState(""); 

    useEffect(() => {
        
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem("authToken");
                if (!token) {
                    throw new Error("Token de autenticación no encontrado.");
                }

                const response = await fetch(SERVICES_BACK.GET_COMPLETE_USER_BY_EMAIL + userData.email, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.status !== 200) {
                    throw new Error(`Error en la respuesta del servidor`);
                }

                const data = await response.json();
                setUserCompleteData(data);
                setUserBirthDate(format(new Date(data?.birthDate), "dd/MM/yyyy") || '');
            } catch (error) {
                console.error("Error al obtener las preguntas:", error);
                setError(error.message);
            }
        };

        toast.promise(
            fetchUserData(),
            {
                loading: 'Cargando datos de usuario...',
                success: <b>Datos del usuario cargados correctamente.</b>,
                error: <b>Error al cargar los datos del usuario.</b>,
            }
        );

        const fetchQuestions = async () => {
            try {
                const token = localStorage.getItem("authToken");
                if (!token) {
                    throw new Error("Token de autenticación no encontrado.");
                }

                const response = await fetch(SERVICES_BACK.GET_USER_RESPONSES_BY_INSCRIPTION + userData.inscriptionId, {
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

        toast.promise(
            fetchQuestions(),
            {
                loading: 'Cargando respuestas de usuario...',
                success: <b>Respuestas del formulario PAR-Q cargados correctamente.</b>,
                error: <b>Error al cargar las respuestas del usuario.</b>,
            }
        );

        const fetchConsents = async () => {
            try {
                const token = localStorage.getItem("authToken");
                if (!token) {
                    throw new Error("Token de autenticación no encontrado.");
                }

                const response = await fetch(SERVICES_BACK.GET_USER_CONSENTS_BY_INSCRIPTION + userData.inscriptionId, {
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
                setConsents(data);
            } catch (error) {
                console.error("Error al obtener los consentimientos:", error);
                setError(error.message);
            }
        };

        toast.promise(
            fetchConsents(),
            {
                loading: 'Cargando consentimientos de usuario...',
                success: <b>Consentimientos cargados correctamente.</b>,
                error: <b>Error al cargar los consentimientos del usuario.</b>,
            }
        );
    }, [userData]);

    const classifyUser = (userType) => {
        if(userType === "STUDENT"){
            return "ESTUDIANTE";
        }else{
            if(userType === "EXTERN"){
                return "EXTERNO";
            }else{
                if(userType === "ADMINISTRATIVE"){
                    return "ADMINISTRATIVO";
                }
            }
        }
        return "NA";
    }

    const handleDownload = async (inscriptionId, consentType) =>{
        try{
            const token = localStorage.getItem("authToken");
            if (!token) {
                throw new Error("Token de autenticación no encontrado.");
            }

            const response = await fetch(
              `${SERVICES_BACK.GET_USER_INSCRIPTION_FILE}?inscriptionId=${inscriptionId}&consentType=${consentType}`,
              {
                method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
              }
            );
        
              if (response.ok) {
                console.log(response)
                const blob = await response.blob();
                const url = window.URL.createObjectURL(blob);
                
                // Crear un enlace temporal para descargar el archivo
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', `${inscriptionId}_${consentType}.pdf`); // Puedes cambiar el nombre según lo necesites
                document.body.appendChild(link);
                link.click();
                
                // Limpiar el enlace temporal
                link.parentNode.removeChild(link);

                MessagesSuccess("Consentimiento descargado correctamente.");
              } else {
                MessagesError("No se pudo descargar el consentimiento");
              }
            }catch (error) {
              console.error("Error al descargar el archivo:", error);
            }    
    }

    return (
        <div className="containerBody">
            <Toaster
                position="top-center"
                dir="auto"
                duration={2000}
                visibleToasts={4}
                richColors
            />
            <h1 style={{ textAlign: "center" }} className="InformationDataPageTitle">
                Detalle de la inscripción del usuario
            </h1>

            {/* Información personal */}
            {userCompleteData ? (
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
                                <input type="text" value={userCompleteData?.name || ''} readOnly/>
                            </div>

                            <div className="form-group">
                                <label className="lbInItem">Tipo de documento</label>
                                <input type="text" value={userCompleteData?.documentType || ''} readOnly />
                            </div>

                            <div className="form-group">
                                <label className="lbInItem">Número de documento</label>
                                <input type="text" value={userCompleteData?.documentNumber || ''} readOnly />
                            </div>

                            <div className="form-group">
                                <label className="lbInItem">Número de teléfono</label>
                                <input type="text" value={userCompleteData?.phoneNumber || ''} readOnly />
                            </div>

                            <div className="form-group">
                                <label className="lbInItem">Fecha de nacimiento</label>
                                <input type="text" value={userBirthDate} readOnly />
                            </div>

                            <div className="form-group">
                                <label className="lbInItem">Correo electrónico</label>
                                <input type="text" value={userCompleteData?.email || ''} readOnly />
                            </div>

                            <div className="form-group">
                                <label className="lbInItem">Dirección</label>
                                <input type="text" value={userCompleteData?.residenceAddress || ''} readOnly />
                            </div>

                            
                            <div className="form-group">
                                <label className="lbInItem">Estamento</label>
                                <input type="text" value={classifyUser(userCompleteData?.userType) || ''} readOnly />
                            </div>

                        </form>
                    </div>
                </div>
            ) : (
                <p>Cargando datos...</p>
            )}

            {/* Información de salud */}
            {userCompleteData.medicalInformation ? (
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
                                <input type="text" value={userCompleteData?.medicalInformation.eps || ''} readOnly/>
                            </div>

                            <div className="form-group">
                                <label className="lbInItem">Grupo sanguineo RH</label>
                                <input type="text" value={userCompleteData?.medicalInformation.bloodGroup || ''} readOnly/>
                            </div>

                            <div className="form-group">
                                <label className="lbInItem">Alergias</label>
                                <input type="text" value={userCompleteData?.medicalInformation.allergies || ''} readOnly/>
                            </div>

                        </form>
                    </div>
                </div>
            ) : (
                <p>Cargando datos...</p>
            )}
            
            {userCompleteData?.userType === "STUDENT" && (
                <div className="containerPersonalInformation">
                <br /><br />
                <h2 style={{ textAlign: "center" }}>
                    Información universitaria
                </h2>
                <p style={{ textAlign: "center" }}>
                    Datos personales sobre carrera y facultad a la que pertenece el estudiante.    
                </p>
                <div className="containerForm">
                    <form className="info-form" >

                        <div className="form-group">
                            <label className="lbInItem">Programa</label>
                            <input type="text" value={userCompleteData?.universityInformation.program.programName || ''} readOnly/>
                        </div>

                        <div className="form-group">
                            <label className="lbInItem">Facultad</label>
                            <input type="text" value={userCompleteData?.universityInformation.program.faculty.facultyName || ''} readOnly/>
                        </div>

                        <div className="form-group">
                            <label className="lbInItem">Semestre Actual</label>
                            <input type="text"value={userCompleteData?.universityInformation.actualSemester || ''} readOnly/>
                        </div>
                    </form>
                </div>
            </div>
            )}
            
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
                                                {item.parqQuestionDTO.questionText}
                                            </label>
                                        </div>
                                        <br />
                                        <div className="form-option" style={{ textAlign: "center" }}>
                                            <input style={{ textAlign: "center" }}
                                                type="text"
                                                id={`question_${item.id}_no`}
                                                value={item.questionAnswer}
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
                            
            <div className="containerConsents">
            <br />
            <br />
            
            <h2 style={{ textAlign: "center" }}>
            Consentimientos adjuntos a la inscripción.
            </h2>
                <br />
                <div className="containerForm">
                    <form className="user-info-form" >
                        <div className="form-table">
                            {consents.length > 0 ? (
                                consents.map((item) => (
                                    <div className="consent-item">
                                        {item.consentType === "RISKS" && (
                                            <button 
                                                type="button" 
                                                onClick={() => handleDownload(userData.inscriptionId, item.consentType)} // Reemplaza por tu función
                                                className="risk-button"
                                            >
                                                Descargar Consentimiento de Riesgos
                                            </button>
                                        )}
                                        {item.consentType === "MEDICAL" && (
                                            <button 
                                                type="button" 
                                                onClick={() => handleDownload(userData.inscriptionId, item.consentType)} // Reemplaza por tu función
                                                className="risk-button"
                                            >
                                                Descargar Recomendación Médica
                                            </button>
                                        )}
                                        {item.consentType === "TUTOR" && (
                                            <button 
                                                type="button" 
                                                onClick={() => handleDownload(userData.inscriptionId, item.consentType)} // Reemplaza por tu función
                                                className="risk-button"
                                            >
                                                Descargar Consentimiento de Tutor
                                            </button>
                                        )}
                                    </div>
                                ))
                            ) : (
                                <div>No se encontraron consentimientos.</div>
                            )}
                        </div>

                        
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UserDataDetail;
