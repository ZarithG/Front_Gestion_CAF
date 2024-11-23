import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useRegFormContext } from "../../../providers/RegFormProvider";
import { SERVICES_BACK } from "../../../constants/constants";
import { MessagesError, MessagesSuccess, showToastPromise, MessagesInformation} from "../../gestion-caf/Messages";
import { toast, Toaster } from "sonner"; 

const InformedConsent = () => {
    const [state, dispatch] = useRegFormContext();
    const [consentFile, setConsentFile] = useState();
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
                showToastPromise(Promise.reject("No se encontró el ID de usuario."), "Error", "No se encontró el ID de usuario.");
                return;
            }

            // Crear el userResponseDTOList a partir de las respuestas del formulario
            const userResponseDTOList = medicalHistory.map((question) => ({
                parqQuestionDTO: {
                    id: question.id
                },
                questionAnswer: question.response === "true" // Convertir a booleano el valor de la respuesta
            }));
    
            if (!userResponseDTOList.length) {
                showToastPromise(Promise.reject("No hay respuestas válidas para enviar."), "Error", "No hay respuestas válidas para enviar.");
                return;
            }

            // Construir el payload
            const payload = {
                fitnessCenterDTO: {
                    id: cafInformation.id, // ID del CAF
                },
                userResponseDTOList: userResponseDTOList, // Lista de respuestas
            };
    
            // Realizar la solicitud POST
            const token = localStorage.getItem("authToken")
            const response = await fetch(SERVICES_BACK.POST_CAF_INSCRIPTION + userId, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                    credentials: "include"
                },
                body: JSON.stringify(payload),
            });
            
            if (response.status !== 200) {
                const errorMessage = response.status === 400
                    ? "Datos inválidos enviados al servidor."
                    : `Hubo un error en el servidor`;
                showToastPromise(Promise.reject(errorMessage), "Error", errorMessage);
                return;
            }
    
            const data = await response.json();
            showToastPromise(Promise.resolve("Datos guardados exitosamente."), "Éxito", "Datos guardados exitosamente.");
            
            const informationConsentResponse = sendInformationConsent(data.id);

            if (informationConsentResponse){
                const isAnyResponseTrue = hasTrueResponse(medicalHistory);
                if (isAnyResponseTrue){
                    navigate("/registration/medicalDocument", { state: { inscriptionId: data.id } });
                }else{
                    verifyIsUserOldMayor(data.id);
                }
            }else{
                showToastPromise(Promise.reject("Hubo un error al guardar el consentimiento."), "Error", "Hubo un error al guardar el consentimiento.");
            }       
        } catch (error) {
            showToastPromise(Promise.reject("Hubo un error en el servidor."), "Error", "Hubo un error en el servidor.");
        }
    };

    const hasTrueResponse = (transformedData) => {
        return transformedData.some(item => item.response === "true");
    };

    const sendInformationConsent = async (inscriptionId) => {
        const formData = new FormData();

        if(consentFile !== undefined){
            formData.append("inscriptionFile", consentFile)
            formData.append("fileType", "RISKS")
            
            const token = localStorage.getItem("authToken")
            try {
                const response = await fetch(SERVICES_BACK.POST_CONSENT_FILE + inscriptionId, {
                    method: "POST",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        credentials: "include"
                    },
                    body: formData
                });        
            
                if (response.ok) {
                    showToastPromise(Promise.resolve("Consentimiento enviado correctamente"), "Éxito", "Consentimiento enviado correctamente");
                    return response;
                }
            }catch (error) {
                showToastPromise(Promise.reject("Error al enviar el consentimiento"), "Error", "Error al enviar el consentimiento");
            }
        }else{
            MessagesInformation("El archivo subido no cumple con el formato y tamaño necesario");
        }
        return null;
    }

    const verifyIsUserOldMayor = async (id) => {
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
            navigate("/registration/tutorConsent", { state: { inscriptionId: id} });
        }else{
            if(response.status === 200){
                showToastPromise(Promise.resolve("Inscripción almacenada de forma correcta"), "Éxito", "Inscripción almacenada de forma correcta");
            }else{
                showToastPromise(Promise.reject("Hubo un error en el servidor, inténtelo más tarde"), "Error", "Hubo un error en el servidor, inténtelo más tarde");
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
                    en el que se inscribió, y luego de que verifique en el apartado de Notificaciones
                    que su inscripción ha sido aceptada.</p>
                <br />
                <h3>Enlace plantilla consentimiento informado</h3>
                <a href="https://drive.google.com/file/d/1vY3vnB_I79746xxRKkvVGl2rzcKigdoo/view" target="_blank" rel="noreferrer noopener">
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
                            Enviar
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default InformedConsent;
