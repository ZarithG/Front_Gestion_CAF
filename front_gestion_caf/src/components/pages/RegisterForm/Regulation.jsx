import React from "react";
import "./styles/Regulation.css";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useRegFormContext } from "../../../providers/RegFormProvider";
import { MessagesError } from "../../gestion-caf/Messages";

const Regulation = () => {
    const [, dispatch] = useRegFormContext();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { isValid },
    } = useForm({ mode: "onChange" }); // Habilitar validación en cambios

    const onSubmit = (values) => {
        if (values.termsAccepted === "true") { 
            dispatch({ type: "SET_REGULATION", data: values });
            navigate('/registration/medicalHistory');
        } else {
            MessagesError("Debes aceptar los términos y condiciones para continuar.");
        }
    };

    return (
        <div className="rBody">
            <div className="containerRegulation">
                <h2 className="rTitle">Reglamento</h2>
                <p className="rInfo">
                    <text>
                    Por favor descargue el reglamento y léalo cuidadosamente, si esta dispuesto a cumplir 
                    con lo estipulado en este, descargue el consentimiento informado y fírmelo, pueden imprimirlo y 
                    escanearlo en formato pdf o firmarlo de manera digital, este archivo se debe subir en este formulario
                    </text>
                    <text>
                    . REGLAMENTO: {" "}
                    </text>
                    <a href="http://www.uptc.edu.co/gel/habeas_data/">
                        DESCARGAR Y LEER REGLAMENTO DEL CAF
                    </a>
                    
                </p>
                <div className="containerFormRegulation">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <label className="rAccept">
                            Acepto términos y condiciones del manejo de la
                            información*
                            <br />
                            <input className="rInput"
                                {...register("termsAccepted", { required: true })}
                                type="radio"
                                value={true}
                            />
                            <label className="rLabel">Si</label>
                            <br />
                            <input className="rInput"
                                {...register("termsAccepted", { required: true })}
                                type="radio"
                                value={false}
                                checked
                            />
                            <label className="rLabel">No</label>
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
