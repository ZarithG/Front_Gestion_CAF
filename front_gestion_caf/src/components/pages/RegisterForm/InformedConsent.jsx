import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useRegFormContext } from "../../../providers/RegFormProvider";
import { SERVICES_BACK } from "../../../constants/constants";
import { MessagesError, MessagesSuccess } from "../../gestion-caf/Messages";
import { toast, Toaster } from "sonner"; 

const InformedConsent = () => {
    const [state, dispatch] = useRegFormContext();
    const [consentFile, setConsentFile] = useState();
    const [inscriptionId, setInscriptionId] = useState();
    const navigate = useNavigate();

    const [submitted, setSubmitted] = useState(false);
    const {
        medicalHistory, 
        cafInformation
    } = state;
    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm({ mode: "onChange" });
    
    const onSubmit = async (values) => {
        setSubmitted(true);
        console.log("Valores del formulario:", state);
        console.log("Historial médico:", medicalHistory);
    
        try {
            const userId = localStorage.getItem("userName");
            if (!userId) {
                MessagesError("No se encontró el ID de usuario.");
                return;
            }

            // Crear el userResponseDTOList a partir de las respuestas del formulario
            const userResponseDTOList = medicalHistory.map((question) => ({
                parqQuestionDTO: {
                    id: question.id
                },
                questionAnswer: values[`question_${question.id}`] === "true" // Convertir a booleano
            }));
    
            console.log("userResponseDTOList:", userResponseDTOList);
    
            if (!userResponseDTOList.length) {
                MessagesError("No hay respuestas válidas para enviar.");
                return;
            }

            // Construir el payload
            const payload = {
                fitnessCenterDTO: {
                    id: cafInformation.id, // ID del CAF
                },
                userResponseDTOList: userResponseDTOList, // Lista de respuestas
            };
    
            // // Realizar la solicitud POST
            // const token = localStorage.getItem("authToken")
            // const response = await fetch(SERVICES_BACK.POST_CAF_INSCRIPTION + userId, {
            //     method: "POST",
            //     headers: {
            //         "Authorization": `Bearer ${token}`,
            //         "Content-Type": "application/json",
            //         credentials: "include"
            //     },
            //     body: JSON.stringify(payload),
            // });
    
            // if (!response.ok) {
            //     const errorMessage = response.status === 400
            //         ? "Datos inválidos enviados al servidor."
            //         : `Hubo un error en el servidor`;
            //     MessagesError(errorMessage);
            //     return;
            // }else{
            //     setInscriptionId(response.body.id);
            // }
    
            // const data = await response.json();
            // MessagesSuccess("Datos guardados exitosamente.");
            // console.log("Respuesta del servidor:", data);
            
            // const informationConsentResponse = sendInformationConsent();
            // console.log("TRUE")
            // if (informationConsentResponse != null){
            //     const isAnyResponseTrue = hasTrueResponse(medicalHistory);
            //     if (isAnyResponseTrue){
            //         navigate("/registration/medicalDocument", { state: { inscriptionId: inscriptionId } });
            //     }else{
            //         verifyIsUserOldMayor();
            //     }
            // }
            setInscriptionId(2);
            const isAnyResponseTrue = hasTrueResponse(medicalHistory);
            if (isAnyResponseTrue){
                navigate("/registration/medicalDocument", { state: { inscriptionId: inscriptionId } });
            }else{
                verifyIsUserOldMayor();
            }

            
        } catch (error) {
            console.error("Error al enviar datos:", error);
            MessagesError("Hubo un error en el servidor.");
        }
    };
    
    const hasTrueResponse = (transformedData) => {
        return transformedData.some(item => item.response === 'true');
    };

    const sendInformationConsent = async () => {
        const formData = new FormData();
        formData.append("inscriptionFile", consentFile)
        formData.append("fileType", "RISKS")

        const token = localStorage.getItem("authToken")
        const response = null;
        try {
             response = await fetch(SERVICES_BACK.POST_CONSENT_FILE + inscriptionId, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                    credentials: "include"
                },
                body: formData
            });        
        
            if (response.ok) {
                MessagesSuccess("Consentimiento enviado correctamente");
            }
        }catch (error) {
            MessagesError("Error al eviar el consentimiento");
        }
        return response;
    }

    const verifyIsUserOldMayor = async () => {
        const token = localStorage.getItem("authToken")
        const response = await fetch(SERVICES_BACK.GET_IS_USER_OLD_MAYOR + localStorage.getItem("userName"), {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
                credentials: "include"
            }
        });
        
        if(response.status === 204){
            navigate("/registration/tutorConsent");
        }else{
            if(response.status === 200){
                MessagesSuccess("Inscripción almacenada de forma correcta")
                navigate("/");
            }else{
                MessagesError("Hubo un error en el servidor, intentelo más tarde");
            }
            
        }
    };


    return (
        <div className="Register">
            <Toaster
                    position="top-center"
                    dir="auto"
                    duration={2000}
                    visibleToasts={4}
                    richColors
                />
            <div className="containerPersonalInformation">
                <h2>Carga de consentimiento informado</h2>
                <p>Por favor ingrese desde su cuenta institucional, descargue el reglamento
                    y léalo cuidadosamente. Si está dispuesto a cumplir con lo estipulado en este,
                    diligencie el consentimiento y suba el archivo en formato PDF para ser revisado.
                    Una vez revisado, le pondrán una estampilla al carnet al momento en que vaya al CAF 
                    en el que se inscribio, y luego de que verifique en el apartado de Notificaciones
                    que su inscripción ha sido aceptada.</p>
                <br />
                <h3>Enlace plantilla consentimiento informado</h3>
                <a href="https://drive.google.com/file/d/1vY3vnB_I79746xxRKkvVGl2rzcKigdoo/view">
                        PLANTILLA CONSENTIMIENTO INFORMADO
                    </a>
                <div className="containerForm">
                    <form className="personal-info-form" onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-group">
                        <label>Archivo de consentimiento informado</label>
                            <input
                                type="file"
                                accept=".pdf"
                                {...register("consentFile", { required: "Este campo es obligatorio." })}
                                onChange={(e) => {
                                    const file = e.target.files[0];
                                    if (file) {
                                        setConsentFile(file);
                                        console.log(consentFile)
                                    }
                                }}
                            />
                            {submitted && errors.consentFile && (
                                <span className="error">{errors.consentFile.message}</span>
                            )}
                        </div>
                        <button type="submit" disabled={!isValid}>
                            Siguiente
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default InformedConsent;
