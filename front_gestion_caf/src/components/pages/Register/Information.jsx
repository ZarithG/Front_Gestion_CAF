import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useRegContext } from "../../../providers/RegProvider";

const Information = () => {
    const [state, dispatch] = useRegContext();
    const navigate = useNavigate();
    const [submitted, setSubmitted] = useState(false); // Estado para controlar el envío

    const {
        information,
        estate
    } = state;
    const {
        register,
        handleSubmit,
        formState: { errors, isValid,},
    } = useForm({ mode: "onChange" }); // Habilitar validación en cambios

    const onSubmit = (values) => {
        setSubmitted(true); // Marcar que el formulario ha si do enviado
        if (isValid) {
            dispatch({ type: "SET_ESTATE", data: values });
            navigate("/register/emergenceContact");
        }
    };

    return (
        <div className="Register">
            <h2>Información Personal y de Salud</h2>
            <p>
                Agregue sus datos personales y de salud para completar el ingreso al sistema.
            </p>
            
            <form className="info-form" onSubmit={handleSubmit(onSubmit)}>
                

                <div>
                <label className="lbInItem">Estamento</label>
                <select {...register("estamento", { required: true })}>
                    <option value="">Seleccione su estamento</option>
                    <option value="estudiante">Estudiante</option>
                    <option value="profesor">Profesor</option>
                    <option value="administrativo">Administrativo</option>
                    <option value="externo">Externo</option>
                </select>
                {errors.estamento && <span className="error">Debes seleccionar un estamento.</span>}
                </div>   

                <div className="form-group">
                    <label className="lbInItem">Semestre actual</label>
                    <input type="text" {...register("actualSemester", { required: true })} />
                    {submitted && errors.eps && <span className="error">Este campo es obligatorio.</span>}
                </div>

                <div className="form-group">
                    <label className="lbInItem">Nombre del programa</label>
                    <input type="text" {...register("programName", { required: true })} />
                    {submitted && errors.eps && <span className="error">Este campo es obligatorio.</span>}
                </div>

                <div className="form-group">
                    <label className="lbInItem">Facultad</label>
                    <input type="text" {...register("facultyName", { required: true })} />
                    {submitted && errors.eps && <span className="error">Este campo es obligatorio.</span>}
                </div>

                <div className="form-group">
                    <label className="lbInItem">EPS</label>
                    <input type="text" {...register("eps", { required: true })} />
                    {submitted && errors.eps && <span className="error">Este campo es obligatorio.</span>}
                </div>

                <div className="form-group">
                    <label className="lbInItem">Grupo sanguíneo RH</label>
                    <select {...register("bloodType", { required: true })}>
                        <option value="">Seleccione su grupo sanguíneo</option>
                        <option value="O-">O-</option>
                        <option value="O+">O+</option>
                        <option value="A-">A-</option>
                        <option value="A+">A+</option>
                        <option value="B-">B-</option>
                        <option value="B+">B+</option>
                        <option value="AB-">AB-</option>
                        <option value="AB+">AB+</option>
                    </select>
                    {submitted && errors.bloodType && <span className="error">Debes seleccionar un grupo sanguíneo.</span>}
                </div>

                <div className="form-group">
                    <label className="lbInItem">Alergias</label>
                    <input type="text" {...register("allergies")} />
                </div>

                <button type="submit">
                    Siguiente
                </button>
            </form>
        </div>
    );
};

export default Information;
