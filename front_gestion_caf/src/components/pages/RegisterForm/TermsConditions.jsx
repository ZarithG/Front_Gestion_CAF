import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useRegFormContext } from "../../../providers/RegFormProvider";

const TermsConditions = () => {
    const [, dispatch] = useRegFormContext();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { isValid },
    } = useForm({ mode: "onChange" });

    const onSubmit = (values) => {
        if (values.termsAccepted) { // Asegurarte de que los términos han sido aceptados
            dispatch({ type: "SET_TERMS_CONDITIONS", data: values });
            navigate('/registration/regulation'); // Ruta a la que quieres navegar
        } else {
            // Opcional: Manejar el caso donde no se aceptan los términos
            alert("Debes aceptar los términos y condiciones para continuar.");
        }
    };

    return (
        <div className="Register">
            <div className="containerTermsConditions">
                <h2>Términos y condiciones</h2>
                <p>POR FAVOR LEER ANTES DE DILIGENCIAR EL SIGUIENTE FORMULARIO</p>
                <p>
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
                    .
                </p>
                <div className="containerForm">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <label>
                            Acepto términos y condiciones del manejo de la información*
                            <br />
                            <input
                                {...register("termsAccepted", { required: true })}
                                type="radio"
                                value="true" // Usar string "true"
                            />
                            <label>Si</label>
                            <br />
                            <input
                                {...register("termsAccepted", { required: true })}
                                type="radio"
                                value="false" // Usar string "false"
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

export default TermsConditions;
