import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useRegFormContext } from "../../../providers/RegFormProvider";

const Regulation = () => {
    const [, dispatch] = useRegFormContext();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { isValid },
    } = useForm({ mode: "onChange" }); // Habilitar validación en cambios

    const onSubmit = (values) => {
        if (isValid) {
            dispatch({ type: "SET_REGULATION", data: values });
            navigate('/registration/estate');
        }
    };

    return (
        <div className="Register">
            <div className="containerTermsConditions">
                <h2>Reglamento</h2>
                <p>
                    <text>
                    Por favor descargue el reglamento y léalo cuidadosamente, si esta dispuesto a cumplir 
                    con lo estipulado en este, descargue el consentimiento informado y fírmelo, pueden imprimirlo y 
                    escanearlo en formato pdf o firmarlo de manera digital, este archivo se debe subir en este formulario.
                    </text>
                    <text>
                    REGLAMENTO: {" "}
                    </text>
                    <a href="http://www.uptc.edu.co/gel/habeas_data/">
                        DESCARGAR Y LEER REGLAMENTO DEL CAF
                    </a>
                    
                </p>
                <div className="containerForm">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <label>
                            Acepto términos y condiciones del manejo de la
                            información*
                            <br />
                            <input
                                {...register("termsAccepted", { required: true })}
                                type="radio"
                                value={true}
                            />
                            <label>Si</label>
                            <br />
                            <input
                                {...register("termsAccepted", { required: true })}
                                type="radio"
                                value={false}
                            />
                            <label>No</label>
                            <br />
                        </label>
                        <button type="submit" disabled={!isValid}>
                            Siguiente
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Regulation;
