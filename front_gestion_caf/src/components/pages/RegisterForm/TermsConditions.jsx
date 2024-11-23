import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useRegFormContext } from "../../../providers/RegFormProvider";
import { MessagesError } from "../../gestion-caf/Messages";
import "./styles/TermsConditions.css";
import { SERVICES_BACK } from "../../../constants/constants";
import { toast,Toaster } from "sonner";

const TermsConditions = () => {
    const [, dispatch] = useRegFormContext();
    const navigate = useNavigate();

    // useEffect(() => {
    //     isUserVerified();
    // }, []);

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
            MessagesError("Debes aceptar los términos y condiciones para continuar.")
        }
    };

    const isUserVerified = async () => {
        try {
            const token = localStorage.getItem("authToken");
            const response = await fetch(SERVICES_BACK.GET_IS_USER_VERIFIED + localStorage.getItem("userName"), {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`,
                    credentials: 'include',
                }
            });
            if (response.status == 400) {
                navigate("/register/informationData");
            } else {
                MessagesError("Hubo un error en el servidor");
            }
        } catch (error) {
            console.log(error)
            MessagesError("Hubo un error en el servidor");
        }

    };

    return (
        <div className="tcBody">
            <Toaster
                position="top-center"
                dir="auto"
                duration={2000}
                visibleToasts={4}
                richColors
            />
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
                    <a href="https://www.uptc.edu.co/sitio/portal/sitios/universidad/taip/ntaip/term_condiciones"  target="_blank" rel="noreferrer noopener">
                        TERMINOS Y CONDICIONES
                    </a>
                </p>
                <div className="containerFormRegulation">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="GenRegCont">
                            <div >
                                <label className="rAccept">
                                    Acepto términos y condiciones del manejo de la información
                                </label>
                            </div>
                            <div className="ItemRegCont">
                                <input className="rInput"
                                    {...register("termsAccepted", { required: true })}
                                    type="radio"
                                    value={true}
                                />
                                <label className="rLabel">Si</label>
                            </div>
                            <div className="ItemRegCont">
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

export default TermsConditions;
