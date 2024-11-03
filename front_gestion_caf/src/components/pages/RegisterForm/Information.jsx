import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useRegFormContext } from "../../../providers/RegFormProvider";
import "./styles/Information.css";

const Information = () => {
    const [, dispatch] = useRegFormContext();
    const navigate = useNavigate();
    const [submitted, setSubmitted] = useState(false); // Estado para controlar el envío

    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm({ mode: "onChange" }); // Habilitar validación en cambios

    const onSubmit = (values) => {
        setSubmitted(true); // Marcar que el formulario ha sido enviado

        if (isValid) {
            dispatch({ type: "SET_INFORMATION", data: values });
            navigate("/registration/emergenceContact");
        }
    };

    return (
        <div className="Register">
            <h2>Información Personal y de Salud</h2>
            <p>
                Agregue sus datos personales y de salud para completar el ingreso al sistema.
            </p>

            <form className="info-form" onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                    <label className="lbInItem">Nombre</label>
                    <input type="text" {...register("name", { required: true })} />
                    {submitted && errors.name && <span className="error">Este campo es obligatorio.</span>}
                </div>

                <div className="form-group">
                    <label className="lbInItem">Apellidos</label>
                    <input type="text" {...register("lastName", { required: true })} />
                    {submitted && errors.lastName && <span className="error">Este campo es obligatorio.</span>}
                </div>

                <div className="form-group">
                    <label className="lbInItem">Número de documento de identidad</label>
                    <input type="text" {...register("document", { required: true })} />
                    {submitted && errors.document && <span className="error">Este campo es obligatorio.</span>}
                </div>

                <div className="form-group">
                    <label className="lbInItem">Número de teléfono</label>
                    <input type="text" {...register("phone", { required: true })} />
                    {submitted && errors.phone && <span className="error">Este campo es obligatorio.</span>}
                </div>

                <div className="form-group">
                    <label className="lbInItem">Fecha de nacimiento</label>
                    <input type="date" {...register("birthDate", { required: true })} />
                    {submitted && errors.birthDate && <span className="error">Este campo es obligatorio.</span>}
                </div>

                <div className="form-group">
                    <label className="lbInItem">Correo Electrónico</label>
                    <input type="email" {...register("email", { required: true })} />
                    {submitted && errors.email && <span className="error">Este campo es obligatorio.</span>}
                </div>

                <div className="form-group">
                    <label className="lbInItem">Dirección</label>
                    <input type="text" {...register("address", { required: true })} />
                    {submitted && errors.address && <span className="error">Este campo es obligatorio.</span>}
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
