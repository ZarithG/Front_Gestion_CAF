import React, {useEffect, useState} from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useRegFormContext } from "../../../providers/RegFormProvider";
import { SERVICES_BACK } from "../../../constants/constants";

const MedicalHistory = () => {
    const [storedToken, setToken] = useState("");
    const [error, setError] = useState("");
    const [questions, setQuestions] = useState("");
    const [, dispatch] = useRegFormContext();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        watch,
        formState: { isValid },
    } = useForm({ mode: "onChange" }); // Enable validation on change

    useEffect(() => {
        const storedToken = localStorage.getItem("authToken");
        if (storedToken) {
            setToken(storedToken);
        }
    }, []);

    const onSubmit = (values) => {
        if (isValid) {
            const hasAffirmativeAnswer = affirmativeAnswers;
            dispatch({ type: 'SET_MEDICAL_HISTORY', data: { ...values, hasAffirmativeAnswer } });
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

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const token = storedToken;
                const response = await fetch(
                    SERVICES_BACK.GETALLQUESTIONS,
                    {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    }
                );
                if (!response.ok) {
                    throw new Error("No se pudieron obtener las preguntas.");
                }
                const data = await response.json();
                setQuestions(data);
            } catch (error) {
                setError(error.message); 
            }
        };

        fetchQuestions();
    }, []);

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
                             
                            {questions.length > 0 ? (
                                questions.map((item, index) => (
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
                                ))
                            ) : (
                                <div>No se encontraron preguntas.</div>
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
