import React , {useState, useEffect} from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useRegFormContext } from "../../../providers/RegFormProvider";
import { SERVICES_BACK } from "../../../constants/constants";

const MedicalHistory = () => {
    const [, dispatch] = useRegFormContext();
    const [storedToken, setToken] = useState("");
    const [error, setError] = useState("");
    const [questions, setQuestions] = useState("");
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        watch,
        formState: { isValid },
    } = useForm({ mode: "onChange" }); // Enable validation on change

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const token = localStorage.getItem("authToken");
                const response = await fetch(
                    SERVICES_BACK.GETALLQUESTIONS,
                    {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            credentials: 'include',
                        }
                    }
                );
                
                const data = await response.json();
                console.log(data)
                setQuestions(data);
            } catch (error) {
                setError(error.message); 
            }
        };

        fetchQuestions();
    }, []);

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
                        {questions.length > 0 ? (
                            questions.map((item, index) => (
                                <div key={index} className="form-row">
                                    <div className="form-question">
                                        <label htmlFor={`question-${index}`}>{item.question}</label>
                                    </div>
                                    <div className="form-option">
                                        <input
                                            {...register(item.name, { required: true })}
                                            type="radio"
                                            id={`question-${index}-no`}
                                            value="false"
                                        />
                                        <label htmlFor={`question-${index}-no`}>No</label>
                                    </div>
                                    <div className="form-option">
                                        <input
                                            {...register(item.name, { required: true })}
                                            type="radio"
                                            id={`question-${index}-yes`}
                                            value="true"
                                        />
                                        <label htmlFor={`question-${index}-yes`}>Sí</label>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div>No se encontraron preguntas.</div>
                        )}


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
