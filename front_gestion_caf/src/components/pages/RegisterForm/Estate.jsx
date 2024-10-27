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
            navigate('/registration/information' );
        }
    };

    return (
        <div className="Register">
            <div className="containerTermsConditions">
                <h2>Estamento al que pertenece</h2>
                <p> Seleccione el estamento al que pertenece
                </p>
                <div className="containerForm">
                    <form onSubmit={handleSubmit(onSubmit)}>
                    <select {...register("estamento", { required: true })}>
                                <option value="">Seleccione su estamento</option>
                                <option value="estudiante">Estudiante</option>
                                <option value="profesor">Profesor</option>
                                <option value="administrativo">Administrativo</option>
                                <option value="externo">Externo</option>
                            </select>
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
