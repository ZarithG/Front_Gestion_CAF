import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useRegFormContext } from "../../../providers/RegFormProvider";

const InformedConsent = () => {
    const [, dispatch] = useRegFormContext();
    const navigate = useNavigate();
    const [submitted, setSubmitted] = useState(false); // Estado para controlar el envío

    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm({ mode: "onChange" }); 

    const onSubmit = (values) => {
        setSubmitted(true); // Marcar que el formulario ha sido enviado

        // Solo redirigir si es válido
        if (isValid) {
            dispatch({ type: 'SET_INFORMED_CONSENT', data: values });
            navigate('/registration/medicalDocument');
        }
    };

    return (
        <div className="Register">
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
