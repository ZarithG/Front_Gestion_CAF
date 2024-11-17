import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useRegFormContext } from "../../../providers/RegFormProvider";
import { SERVICES_BACK } from "../../../constants/constants";
import { MessagesError, MessagesSuccess } from "../../gestion-caf/Messages";
import { toast, Toaster } from "sonner"; 

const InformedConsent = () => {
    const [state, dispatch] = useRegFormContext();
    const navigate = useNavigate();
    const [token, setToken] = useState("");

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

    useEffect(() => {
        const storedToken = localStorage.getItem("authToken");
        if (storedToken) {
            setToken(storedToken);
        }

    }, []);

    const onSubmit = async (values) => {
        setSubmitted(true);
        console.log("Valores del formulario:", state);
        console.log("Historial médico:", medicalHistory);
    
        try {
            const userId = localStorage.getItem("userName");
            console.log(userId)
            if (!userId) {
                MessagesError("No se encontró el ID de usuario.");
                return;
            }
    
            
    
            // Crear el userResponseDTOList a partir de las respuestas del formulario
            console.log(medicalHistory)
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
            console.log(cafInformation)
            // Construir el payload
            const payload = {
                fitnessCenterDTO: {
                    id: cafInformation.id, // ID del CAF
                },
                userResponseDTOList: userResponseDTOList, // Lista de respuestas
            };
            console.log(payload)
            
            console.log("Payload enviado:", JSON.stringify(payload, null, 2));
    
            // Realizar la solicitud POST
            const response = await fetch(SERVICES_BACK.POST_CAF_INSCRIPTION + userId, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            console.log(payload)
    
            if (!response.ok) {
                const errorMessage = response.status === 400
                    ? "Datos inválidos enviados al servidor."
                    : `Error del servidor: ${response.statusText}`;
                MessagesError(errorMessage);
                return;
            }
    
            const data = await response.json();
            MessagesSuccess("Datos guardados exitosamente.");
            console.log("Respuesta del servidor:", data);
    
            navigate("/registration/medicalDocument");
        } catch (error) {
            console.error("Error al enviar datos:", error);
            MessagesError("Hubo un error en el servidor.");
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
                    descargue el consentimiento informado y entréguelo totalmente diligenciado y firmado
                    en el CAF donde se desea inscribir. Una vez revisado, le pondrán una estampilla al carnet
                    la cual es indispensable para el ingreso diario.</p>

                <div className="containerForm">
                    <form className="personal-info-form" onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-group">
                            <label>Archivo de consentimiento informado</label>
                            <input
                                type="file"
                                {...register("consentFile", { required: "Este campo es obligatorio." })}
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
