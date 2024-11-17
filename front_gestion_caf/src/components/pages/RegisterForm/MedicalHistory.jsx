import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useRegFormContext } from "../../../providers/RegFormProvider";
import { SERVICES_BACK } from "../../../constants/constants";

const MedicalHistory = () => {
    const [state, dispatch] = useRegFormContext();
    const [questions, setQuestions] = useState([]);
    const [error, setError] = useState(""); // For displaying error messages
    const [caf, setCaf] = useState([]); // Initialize as an empty array
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        watch,
        getValues,
        formState: { isValid },
    } = useForm({ mode: "onChange" });

    useEffect(() => {
        const fetchCAF = async () => {
            try {
                const token = localStorage.getItem("authToken");
                const response = await fetch(SERVICES_BACK.GET__ALL_CAF, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        credentials: 'include',
                    }
                });
                const data = await response.json();

                // Ensure data is an array before setting state
                if (Array.isArray(data)) {
                    setCaf(data);
                } else {
                    setError("El formato de datos de CAF es incorrecto.");
                }
            } catch (error) {
                setError(error.message);
            }
        };

        const fetchQuestions = async () => {
            try {
                const token = localStorage.getItem("authToken");
                if (!token) {
                    throw new Error("Token de autenticación no encontrado.");
                }

                const response = await fetch(SERVICES_BACK.GETALLQUESTIONS, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error(`Error en la respuesta del servidor: ${response.statusText}`);
                }

                const data = await response.json();
                setQuestions(data);
            } catch (error) {
                console.error("Error al obtener las preguntas:", error);
                setError(error.message);
            }
        };

        fetchCAF();
        fetchQuestions();
    }, []);

    const onSubmit = (values) => {
        const transformedData = questions.map((question) => ({
            id: question.id,
            response: values[`question_${question.id}`] || null,
        }));

        // Agregar datos adicionales (respuesta afirmativa) si existen
        const additionalInfo = getValues("additionalInfo");
        if (additionalInfo) {
            transformedData.push({ id: "additionalInfo", response: additionalInfo });
        }

        console.log(values.CAF)
        // Agregar el CAF seleccionado
        const selectedCAF = ({ id: values.CAF});

        // Dispatching data to context
        console.log(selectedCAF);
        dispatch({ type: "SET_CAF_INFORMATION", data: selectedCAF });
        dispatch({ type: "SET_MEDICAL_HISTORY", data: transformedData });

        navigate("/registration/informedConsent");
    };

    // Verifica respuestas afirmativas
    const affirmativeAnswers = watch(
        questions.map((q) => `question_${q.id}`)
    ).includes("true");

    const CAFSelector = ({ caf, register }) => (
        <div className="form-group-Reg">
            <label className="lbRegItem">Municipio</label>
            <select className="sltRegItem" {...register("CAF", { required: true })}>
                <option value="">Seleccione su ciudad</option>
                {caf.length > 0 ? (
                    caf.map((item, index) => (
                        <option key={index} value={item.id}>{item.name}</option>
                    ))
                ) : (
                    <option disabled>Cargando ciudades...</option>
                )}
            </select>
        </div>
    );

    return (
        <div className="Register">
            {error && <div className="error-message">{error}</div>} {/* Display error message */}
            
            <div>
                <h2>Seleccione el CAF al que se va a inscribir</h2>
                <CAFSelector caf={caf} register={register} />
            </div>
            <div className="containerPersonalInformation">
                <h2>Formulario de valoración e Historia médica</h2>
                <p>
                    Las preguntas que encuentra a continuación hacen parte de un cuestionario
                    adaptado del PARQ (Physical Activity Readiness Questionnaire), usado en la
                    valoración de la aptitud para la realización de actividad física. Es
                    indispensable que la información sea veraz para evitar futuros inconvenientes.
                </p>
                <div className="containerForm">
                    <form className="user-info-form" onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-table">
                            {questions.length > 0 ? (
                                questions.map((item) => (
                                    <div key={item.id} className="form-row">
                                        <div className="form-question">
                                            <label htmlFor={`question_${item.id}`}>
                                                {item.questionText}
                                            </label>
                                        </div>
                                        <div className="form-option">
                                            <input
                                                {...register(`question_${item.id}`, { required: true })}
                                                type="radio"
                                                id={`question_${item.id}_no`}
                                                value="false"
                                            />
                                            <label htmlFor={`question_${item.id}_no`}>No</label>
                                        </div>
                                        <div className="form-option">
                                            <input
                                                {...register(`question_${item.id}`, { required: true })}
                                                type="radio"
                                                id={`question_${item.id}_yes`}
                                                value="true"
                                            />
                                            <label htmlFor={`question_${item.id}_yes`}>Sí</label>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div>No se encontraron preguntas.</div>
                            )}

                            {affirmativeAnswers && (
                                <div className="form-row">
                                    <label htmlFor="additionalInfo">
                                        Si en la anterior sección contestó una o varias preguntas de
                                        forma afirmativa, por favor complemente su respuesta.
                                    </label>
                                    <input
                                        type="text"
                                        id="additionalInfo"
                                        {...register("additionalInfo")}
                                        placeholder="Escriba detalles aquí..."
                                    />
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
