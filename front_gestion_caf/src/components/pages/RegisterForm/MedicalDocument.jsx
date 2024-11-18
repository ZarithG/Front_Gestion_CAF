import React, {useEffect, useState} from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useRegFormContext } from "../../../providers/RegFormProvider";
import { SERVICES_BACK } from "../../../constants/constants";
import { MessagesError, MessagesSuccess, MessagesInformation } from "../../gestion-caf/Messages";
import { toast, Toaster } from "sonner"; 
import { useLocation } from "react-router-dom";

const MedicalDocument = () => {
    const location = useLocation();
    const inscriptionId = location.state?.inscriptionId;

    const [consentFile, setConsentFile] = useState();
    const navigate = useNavigate();
    const [submitted, setSubmitted] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm({ mode: "onChange" });

    useEffect(() => {
    }, [inscriptionId]);

    const onSubmit = async (values) => {
        setSubmitted(true);
        sendMedicalConsent(inscriptionId);
    };

    const sendMedicalConsent = async (inscriptionId) => {
        const formData = new FormData();

        if(consentFile !== undefined){
            formData.append("inscriptionFile", consentFile)
            formData.append("fileType", "MEDICAL")
            
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
                    MessagesSuccess("Consentimiento médico almacenado correctamente")
                }
            }catch (error) {
                MessagesError("Error al eviar el consentimiento");
            }

            const response = await fetch(SERVICES_BACK.GET_IS_USER_OLD_MAYOR + localStorage.getItem("userName"), {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                    credentials: "include"
                }
            });
            if(response.status === 204){
                navigate("/registration/tutorConsent", { state: { inscriptionId: inscriptionId } });
            }else{
                if(response.status === 200){
                    MessagesSuccess("Inscription registrada satisfactoriamente.");
                    navigate("/");
                }else{
                    MessagesError("Hubo un error en el servidor, intentelo más tarde");
                } 
            }
        }else{
            MessagesInformation("El archivo subido no cumple con el formato y tamaño necesario");
        }

    }


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
                <h2>Carga de consentimiento medico</h2>
                <p>Por favor adjunte un archivo con la autorización de médica indicando que puede realizar actividad física sin
                    tener algun inconveniente. Esto debido a que contesto afirmativamente alguna de las preguntas del formulario PAR-Q.
                </p>
                <br />
                <div className="containerForm">
                    <form className="personal-info-form" onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-group">
                        <label>Archivo de consentimiento médico</label>
                            <input
                                type="file"
                                accept=".pdf"
                                {...register("consentFile", { required: "Este campo es obligatorio." })}
                                onChange={(e) => {
                                    const file = e.target.files[0];
                                    if (file) {
                                        setConsentFile(file);
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

export default MedicalDocument;
