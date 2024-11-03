import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useRegFormContext } from "../../../providers/RegFormProvider";
import { MessagesError } from "../../gestion-caf/Messages";

const EmergencyContact = () => {
    const [, dispatch] = useRegFormContext();
    const navigate = useNavigate();
    const [submitted, setSubmitted] = useState(false); // Estado para controlar el envío

    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm({ mode: "onChange" }); // Habilitar validación en cambios

    const MessageError = (message) =>{
        MessagesError(message);
    }

    const onSubmit = (values) => {
        setSubmitted(true); // Marcar que el formulario ha sido enviado

        if (isValid) {
            dispatch({ type: 'SET_EMERGENCY_CONTACT', data: values });
            navigate('/registration/medicalHistory');
        }
    };

    return (
        <div className="Register">
            <div className="containerPersonalInformation">
                <h2>Contacto de emergencia</h2>
                <p>Agregue sus datos de contacto de emergencia los cuales son indispensables para informar en caso de una eventualidad.</p>

                <div className="containerForm">
                    <form className="personal-info-form" onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-group">
                            <label>Nombre</label>
                            <input type="text" {...register('nameEmergencyContact', { required: "Este campo es obligatorio." })} />
                            {submitted && errors.nameEmergencyContact && <span className="error">{errors.nameEmergencyContact.message}</span>}
                        </div>

                        <div className="form-group">
                            <label>Apellidos</label>
                            <input type="text" {...register('lastNameEmergencyContact', { required: "Este campo es obligatorio." })} />
                            {submitted && errors.lastNameEmergencyContact && <span className="error">{errors.lastNameEmergencyContact.message}</span>}
                        </div>

                        <div className="form-group">
                            <label>Número de teléfono</label>
                            <input type="text" {...register('phoneEmergencyContact', { required: "Este campo es obligatorio." })} />
                            {submitted && errors.phoneEmergencyContact && <span className="error">{errors.phoneEmergencyContact.message}</span>}
                        </div>

                        <div className="form-group">
                            <label>Correo Electrónico</label>
                            <input type="email" {...register('emailEmergencyContact', { required: "Este campo es obligatorio." })} />
                            {submitted && errors.emailEmergencyContact && <span className="error">{errors.emailEmergencyContact.message}</span>}
                        </div>

                        <div className="form-group">
                            <label>Dirección</label>
                            <input type="text" {...register('adressEmergencyContact', { required: "Este campo es obligatorio." })} />
                            {submitted && errors.adressEmergencyContact && <span className="error">{errors.adressEmergencyContact.message}</span>}
                        </div>

                        <div className="form-group">
                            <label>Parentesco</label>
                            <select {...register("estamento", { required: "Debes seleccionar un parentesco." })}>
                                <option value="">Seleccione su parentesco</option>
                                <option value="Madre">Madre</option>
                                <option value="Padre">Padre</option>
                                <option value="Hermano">Hermano</option>
                                <option value="Amigo">Amigo</option>
                                <option value="Otro">Otro</option>
                            </select>
                            {submitted && errors.estamento && <span className="error">{errors.estamento.message}</span>}
                        </div>

                        <button type="submit">
                            Siguiente
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EmergencyContact;
