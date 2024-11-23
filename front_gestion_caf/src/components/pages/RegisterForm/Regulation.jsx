import React from "react";
import "./styles/Regulation.css";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useRegFormContext } from "../../../providers/RegFormProvider";
import { MessagesError, MessagesSuccess } from "../../gestion-caf/Messages"
import { toast, Toaster } from "sonner";

const Regulation = () => {
    const [, dispatch] = useRegFormContext();
    const navigate
        = useNavigate();

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
            MessagesError("Debes aceptar el reglamento para continuar.");
        }
    };

    return (
        <div className="rBody">
            <Toaster
                position="top-center"
                dir="auto"
                duration={2000}
                visibleToasts={4}
                richColors
            />
            <div className="containerRegulation">
                <h2 className="rTitle">Reglamento</h2>
                <div className="regTexInf">
                    <p className="rInfo">
                        <p>
                            Por favor descargue el reglamento y léalo cuidadosamente, si esta dispuesto a cumplir
                            con lo estipulado en este, descargue el consentimiento informado y fírmelo, pueden imprimirlo y
                            escanearlo en formato pdf o firmarlo de manera digital, este archivo se debe subir en este formulario. REGLAMENTO: {
                                <a href="https://drive.google.com/file/d/1nS8Lkpj7RLQaWy7WKSYNcjTF_lxmaV7d/view"  target="_blank" rel="noreferrer noopener">
                                    DESCARGAR Y LEER REGLAMENTO DEL CAF
                                </a>}
                        </p>
                    </p>
                </div>
                <div className="containerFormRegulation">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="GenRegCont">
                            <div className="ItemRegCont">
                                <label className="rAccept">
                                    Acepto términos y condiciones del manejo de la
                                    información
                                </label>
                            </div>
                            <div >
                                <input className="rInput"
                                    {...register("termsAccepted", { required: true })}
                                    type="radio"
                                    value={true}
                                />
                                <label className="rLabel">Si</label>
                            </div>
                            <div>
                                <input className="rInput"
                                    {...register("termsAccepted", { required: true })}
                                    type="radio"
                                    value={false}
                                    checked
                                />
                                <label className="rLabel">No</label>
                            </div>
                            <button type="submit" disabled={!isValid}>
                                Siguiente
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Regulation;
