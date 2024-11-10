import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useRegFormContext } from "../../../providers/RegFormProvider";
import { MessagesError } from "../../gestion-caf/Messages";
import "./styles/TermsConditions.css";

const TermsConditions = () => {
    const [, dispatch] = useRegFormContext();
    const navigate = useNavigate();


    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm({ mode: "onChange" });


    const onSubmit = (values) => {
        if (values.termsAccepted === "true") { 
            dispatch({ type: "SET_TERMS_CONDITIONS", data: values });
            navigate('/registration/regulation'); 
        } else {
            MessagesError("Debes aceptar los términos y condiciones para continuar.");
        }
    };

    return (
        <div className="tcBody">
            <div className="containerTermsConditions">
                <h2 className="tcTitle">Términos y condiciones</h2>
                <p className="tcRead">POR FAVOR LEER ANTES DE DILIGENCIAR EL SIGUIENTE FORMULARIO</p>
                <p className="tcInfo">
                    El formulario que usted está a punto de contestar se sujeta a
                    la política de tratamiento y protección de datos personales de
                    los titulares de la Universidad Pedagógica y Tecnológica de
                    Colombia, establecida mediante la Resolución No. 3842 de 2013.
                    Contiene preguntas personales y/o académicas. La Universidad
                    hará uso y tratamiento de tal información, con el fin de
                    procesar adecuadamente su solicitud de inscripción o registro
                    al evento u oferta académica de Extensión Universitaria. La
                    información será utilizada para la organización y comunicación
                    del evento o curso y fines institucionales. Al momento de
                    guardar los datos del formulario, usted autoriza de manera
                    expresa el uso y tratamiento de la información suministrada,
                    conforme a la política de tratamiento y protección de datos
                    personales de los titulares de la Universidad Pedagógica y
                    Tecnológica de Colombia, que puede ser consultada en:{" "}
                    <a href="http://www.uptc.edu.co/gel/habeas_data/">
                        http://www.uptc.edu.co/gel/habeas_data/
                    </a>
                </p>
                <div className="containerForm">
                    <form className="tcForm" onSubmit={handleSubmit(onSubmit)}>
                        <label className="tcAccept">
                            Acepto términos y condiciones del manejo de la información*
                            <br />
                            <input 
                                className="tcInput"
                                {...register("termsAccepted", { required: true })}
                                type="radio"
                                value="true" 
                            />
                            <label className="tcLabel">Sí</label>
                            <br />
                            <input 
                                className="tcInput"
                                {...register("termsAccepted", { required: true })}
                                type="radio"
                                value="false" 
                            />
                            <label className="tcLabel">No</label>
                            <br />
                            {errors.termsAccepted && <span className="error">Debes seleccionar una opción.</span>}
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

export default TermsConditions;
