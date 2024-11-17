import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useRegFormContext } from "../../../providers/RegFormProvider";
import { SERVICES_BACK } from "../../../constants/constants";
import { MessagesError, MessagesSuccess } from "../../gestion-caf/Messages";
import { toast, Toaster } from "sonner"; 

const TutorConsent = () => {

    const [consentFile, setConsentFile] = useState();
    const navigate = useNavigate();

    const [submitted, setSubmitted] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm({ mode: "onChange" });
    
    const onSubmit = async () => {
        //ENVIAR ARCHIVO MENOR DE EDAD
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
                <h2>Carga de consentimiento tutor</h2>
                <p>Por favor adjunte un archivo con la autorización de su padre, madre o tutor legal,
                    indicando que puede realizar actividad física, y que en caso de algun inconveniente
                    el o ella seran los reponsables de comunicase con el CAF.</p>
                <br />
                <div className="containerForm">
                    <form className="personal-info-form" onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-group">
                        <label>Archivo de consentimiento padre, madre o tutor legala</label>
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
                            Siguiente
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default TutorConsent;
