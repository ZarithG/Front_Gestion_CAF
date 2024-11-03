import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useRegFormContext } from "../../../providers/RegFormProvider";

const MedicalHistory = () => {
    const [, dispatch] = useRegFormContext();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        watch,
        formState: { isValid },
    } = useForm({ mode: "onChange" }); // Enable validation on change

    const onSubmit = (values) => {
        if (isValid) {
            dispatch({ type: 'SET_MEDICAL_HISTORY', data: values });
            navigate('/registration/informedConsent');
        }
    };

    // Watch for any "Yes" responses
    const affirmativeAnswers = watch([
        "medicalCondition",
        "heartProblem",
        "lungProblem",
        "chestPain",
        "unusualBreath",
        "neurologicalDisease",
        "muscleJointIssues",
        "medicationHeart",
        "otherIssues"
    ]).includes("true");

    return (
        <div className="Register">
            <div className="containerPersonalInformation">
                <h2>Formulario de valoración e Historia médica</h2>
                <p>Las preguntas que encuentra a continuación hacen parte de un cuestionario
                    adaptado del PARQ (Physical Activity Readiness Questionnaire), usado en la
                    valoración de la aptitud para la realización de actividad física. Es indispensable que la información sea veraz para evitar futuros inconvenientes.</p>
                <div className="containerForm">
                    <form className="user-info-form" onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-table">
                            {/* Form questions */}
                            {[
                                {
                                    question: "¿Le ha dicho su médico alguna vez que padece una enfermedad y que sólo debe hacer actividad física bajo prescripción médica?",
                                    name: "medicalCondition"
                                },
                                {
                                    question: "¿Ha sufrido o sufre actualmente algún problema cardiaco?",
                                    name: "heartProblem"
                                },
                                {
                                    question: "¿Ha sufrido o sufre actualmente algún problema respiratorio o enfermedad pulmonar?",
                                    name: "lungProblem"
                                },
                                {
                                    question: "¿Ha tenido molestias, dolor o presión en el pecho al realizar ejercicio?",
                                    name: "chestPain"
                                },
                                {
                                    question: "¿Presenta ahogo inusual, se siente cansado con facilidad, con excesiva fatiga al realizar actividad física leve?",
                                    name: "unusualBreath"
                                },
                                {
                                    question: "¿Tiene alguna enfermedad neurológica?",
                                    name: "neurologicalDisease"
                                },
                                {
                                    question: "¿Ha tenido o tiene problemas articulares, musculares u óseos que puedan empeorar o generen restricción para realizar actividad física?",
                                    name: "muscleJointIssues"
                                },
                                {
                                    question: "¿Toma algún medicamento para la tensión arterial o problema cardiaco?",
                                    name: "medicationHeart"
                                },
                                {
                                    question: "¿Existe algún problema o enfermedad no mencionada aquí que debiera confiarnos, para evitar imprevistos a la hora de realizar la actividad física?",
                                    name: "otherIssues"
                                },
                            ].map((item, index) => (
                                <div key={index} className="form-row">
                                    <div className="form-question">
                                        <label>{item.question}</label>
                                    </div>
                                    <div className="form-option">
                                        <input {...register(item.name, { required: true })} type="radio" value="false" />
                                        <label>No</label>
                                    </div>
                                    <div className="form-option">
                                        <input {...register(item.name)} type="radio" value="true" />
                                        <label>Si</label>
                                    </div>
                                </div>
                            ))}

                            {/* Additional Information Field */}
                            {affirmativeAnswers && (
                                <div className="F">
                                    <label className="form-group">Si en la anterior sección contesto una o varias preguntas de forma afirmativa, por favor complemente su respuesta.</label>
                                    <input type="text" {...register("additionalInfo")} placeholder="Escriba detalles aquí..." />
                                </div>
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

export default MedicalHistory;
