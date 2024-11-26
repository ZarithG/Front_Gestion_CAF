import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useRegFormContext } from "../../../providers/RegFormProvider";
import { SERVICES_BACK } from "../../../constants/constants";
import { MessagesError, showToastPromise } from "../../gestion-caf/Messages";
import { Toaster, toast } from "sonner";
import "./styles/MedicalHistory.css";

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
        formState: { isValid, errors },
    } = useForm({ mode: "onChange" });

    useEffect(() => {
        const fetchCAF = async () => {
            const token = localStorage.getItem("authToken");

            return fetch(SERVICES_BACK.GET__ALL_CAF, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    credentials: 'include',
                }
            })
                .then(async (response) => {
                    if (!response.ok) {
                        throw new Error("Error al obtener los datos del CAF");
                    }
                    const data = await response.json();
                    // Verifica que data sea un array antes de actualizar el estado
                    if (Array.isArray(data)) {
                        setCaf(data);
                    } else {
                        throw new Error("El formato de datos de CAF es incorrecto.");
                    }
                })
                .catch((error) => {
                    setError(error.message);
                    throw error; // Lanza el error para que sea manejado por showToastPromise
                });
        };

        const fetchQuestions = async () => {
            const token = localStorage.getItem("authToken");
            if (!token) {
                throw new Error("Token de autenticación no encontrado.");
            }

            return fetch(SERVICES_BACK.GETALLQUESTIONS, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
                .then(async (response) => {
                    if (response.status !== 200) {
                        if (response.status === 500) {
                            navigate("/");
                        }
                        throw new Error("Error en la respuesta del servidor");
                    }

                    const data = await response.json();
                    setQuestions(data);
                })
                .catch((error) => {
                    console.error("Error al obtener las preguntas:", error);
                    setError(error.message);
                    throw error; // Lanza el error para que sea manejado por showToastPromise
                });
        };

        const fetchData = async () => {
            try {
                // Envuelve fetchCAF con showToastPromise
                await showToastPromise(fetchCAF(),
                    "Datos de CAF obtenidos con éxito",
                    "Error al obtener los datos del CAF"
                );

                // Envuelve fetchQuestions con showToastPromise
                await showToastPromise(fetchQuestions(),
                    "Preguntas cargadas con éxito",
                    "Error al cargar las preguntas"
                );
            } catch (error) {
                console.error("Error al cargar los datos iniciales:", error);
            }
        };

        fetchData();
    }, []);

    const onSubmit = (values) => {
        const transformedData = questions.map((question) => ({
            id: question.id,
            response: values[`question_${question.id}`] || null,
        }));

        // Agregar el CAF seleccionado
        const selectedCAF = ({ id: values.CAF });
        
        const token = localStorage.getItem("authToken");
        return fetch(SERVICES_BACK.GET_USER_ACTIVE_PENDING_INACTIVE_INSCRIPTION + localStorage.getItem("userName") + "?fitnessCenterId=" + values.CAF, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                credentials: 'include',
            }
        })
            .then(async (response) => {
                if (!response.ok) {
                    throw new Error("Error al obtener los datos del CAF");
                }
                const data = await response.json();
                // Verifica que data sea un array antes de actualizar el estado    
                if (Array.isArray(data)) {
                    const alreadyRegistered = data.some(item => parseInt(item.fitnessCenterDTO.id , 10) === parseInt(values.CAF , 10) && item.userId === 23);
                    console.log(data)
                    if (alreadyRegistered) {
                        MessagesError("Señor usuario, usted ya tiene una inscripción activa en el CAF seleccionado");
                        return;
                    }else{
                        dispatch({ type: "SET_CAF_INFORMATION", data: selectedCAF });
                        dispatch({ type: "SET_MEDICAL_HISTORY", data: transformedData })
                        navigate("/registration/informedConsent");
                    }

                } else {
                    throw new Error("El formato de datos de CAF es incorrecto.");
                }

            })
            .catch((error) => {
                setError(error.message);
                throw error; // Lanza el error para que sea manejado por showToastPromise
            });
    };

    // Verifica respuestas afirmativas
    const affirmativeAnswers = watch(
        questions.map((q) => `question_${q.id}`)
    ).includes("true");

    const CAFSelector = ({ caf, register }) => (
        <div className="form-group-Reg">
            <label className="lbRegItem">Centro de Acondicionamiento Físico al que se desea inscribir:</label>
            <select className="sltRegItem" {...register("CAF", { required: "Por favor seleccione un CAF" })}>
                <option value="">Seleccione un CAF</option>
                {caf.length > 0 ? (
                    caf.map((item, index) => (
                        <option key={index} value={item.id}>{item.name}</option>
                    ))
                ) : (
                    <option disabled>Cargando caf's...</option>
                )}
            </select>
            {errors.CAF && <div className="error-message">{errors.CAF.message}</div>}
        </div>
    );

    return (
        <div className="Register">
            <Toaster
                position="top-center"
                dir="auto"
                duration={2000}
                visibleToasts={4}
                richColors
            />
            {error && <div className="error-message">{error}</div>} {/* Display error message */}

            <div>
                <h2>Seleccione el CAF al que se va a inscribir</h2>
                <CAFSelector caf={caf} register={register} />
            </div>
            <br />
            <div className="containerPersonalInformation">
                <h2>Formulario de valoración e Historia médica</h2>
                <p className="textDescriptionMeHi">
                    Las preguntas que encuentra a continuación hacen parte de un cuestionario
                    adaptado del PARQ (Physical Activity Readiness Questionnaire), usado en la
                    valoración de la aptitud para la realización de actividad física. Es
                    indispensable que la información sea veraz para evitar futuros inconvenientes.
                </p>
                <div className="containerFormQuestions">
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
                                                {...register(`question_${item.id}`, { required: "Por favor, seleccione una opción" })}
                                                type="radio"
                                                id={`question_${item.id}_no`}
                                                value="false"
                                            />
                                            <label htmlFor={`question_${item.id}_no`}>No</label>
                                        </div>
                                        <div className="form-option">
                                            <input
                                                {...register(`question_${item.id}`, { required: "Por favor, seleccione una opción" })}
                                                type="radio"
                                                id={`question_${item.id}_yes`}
                                                value="true"
                                            />
                                            <label htmlFor={`question_${item.id}_yes`}>Sí</label>
                                        </div>
                                        {errors[`question_${item.id}`] && (
                                            <div className="error-message">{errors[`question_${item.id}`]?.message}</div>
                                        )}
                                    </div>
                                ))
                            ) : (
                                <div>No se encontraron preguntas.</div>
                            )}

                            {affirmativeAnswers && (
                                <div className="form-row">
                                    <div className="moreInformation">
                                        <label htmlFor="additionalInfo">
                                            Si en la anterior sección contestó una o varias preguntas de
                                            forma afirmativa, por favor complemente su respuesta.
                                        </label>
                                        <textarea
                                            id="additionalInfo"
                                            {...register("additionalInfo")}
                                            placeholder="Escriba detalles aquí..."
                                        />
                                    </div>
                                </div>
                            )}
                        </div>

                        <button type="submit" >
                            Siguiente
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default MedicalHistory;
