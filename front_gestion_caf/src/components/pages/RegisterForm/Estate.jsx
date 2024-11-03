import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useRegFormContext } from "../../../providers/RegFormProvider";
import "./styles/Estate.css";

const Estate = () => {
    const [, dispatch] = useRegFormContext();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm({ mode: "onChange" }); // Habilitar validación en cambios

    const onSubmit = (values) => {
        // Verificar que se haya seleccionado una opción válida
        if (values.estamento) {
            dispatch({ type: 'SET_ESTATE', data: values });
            navigate('/registration/information');
        }
    };

    return (
        <div className="Register">
            <div className="containerTermsConditions">
                <h2>Estamento al que pertenece</h2>
                <p>Seleccione el estamento al que pertenece</p>
                <div className="containerForm">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <select {...register("estamento", { required: true })}>
                            <option value="">Seleccione su estamento</option>
                            <option value="estudiante">Estudiante</option>
                            <option value="profesor">Profesor</option>
                            <option value="administrativo">Administrativo</option>
                            <option value="externo">Externo</option>
                        </select>
                        
                        {/* Mostrar mensaje de error si no se selecciona un estamento */}
                        {errors.estamento && <span className="error">Debes seleccionar un estamento.</span>}
                        
                        <button type="submit" disabled={!isValid}>
                            Siguiente
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Estate;
