import React, {useEffect, useState} from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useRegFormContext } from "../../../providers/RegFormProvider";
import { SERVICES_BACK } from "../../../constants/constants";
import { MessagesError, MessagesSuccess } from "../../gestion-caf/Messages";
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
        formState: { errors, isValid },
    } = useForm({ mode: "onChange" });

    useEffect(() => {
        console.log(inscriptionId)
    }, [inscriptionId]);

    const onSubmit = () => {
        // if (isValid) {
        //     const hasAffirmativeAnswer = affirmativeAnswers;
        //     dispatch({ type: 'SET_MEDICAL_HISTORY', data: { ...values, hasAffirmativeAnswer } });
        //     navigate('/registration/informedConsent');
        // }
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
                <h2>Carga de consentimiento medico</h2>
                <p>Por favor adjunte un archivo con la autorización de médica indicando que puede realizar actividad física sin
                    tener algun inconveniente. Esto debido a que contesto afirmativamente alguna de las preguntas del formulario PAR-Q.
                </p>
                <br />
                <div className="containerForm">
                    <form className="personal-info-form" onSubmit={onSubmit()}>
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
                            Enviar documento médico
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default MedicalDocument;
