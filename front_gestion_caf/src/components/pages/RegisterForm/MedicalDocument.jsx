import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useRegFormContext } from "../../../providers/RegFormProvider";

const MedicalDocument = () => {
    const [submitted, setSubmitted] = useState(false);
    const [formData, setFormData] = useState(null);
    const [state, dispatch] = useRegFormContext();
    const navigate = useNavigate();

    const {
        termsConditions,
        regulation,
        medicalHistory,
        informedConsent,
        information,
        estate,  // Agregar estado del formulario de estamento
        emergencyContact, // Agregar estado del formulario de contacto de emergencia
    } = state;

    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm({ mode: "onChange" });

    const onSubmit = (values) => {
        if (isValid) {
            dispatch({ type: 'SET_MEDICAL_DOCUMENT', data: values });
            setFormData(values);
            setSubmitted(true);
        }
    };

    const handleNavigate = () => {
        navigate('/nextPage'); // Cambia '/nextPage' por la ruta que desees
    };

    return (
        <div className="Register">
            <div className="containerPersonalInformation">
                <h2>Carga de documento médico</h2>
                <p>
                    Por favor ingrese desde su cuenta institucional, descargue el reglamento y léalo cuidadosamente. Si está dispuesto a cumplir con lo estipulado, descargue el consentimiento informado y entréguelo totalmente diligenciado y firmado en el CAF donde se desea inscribir. Una vez revisado, le pondrán una estampilla al carnet, la cual es indispensable para el ingreso diario.
                </p>

                <div className="containerForm">
                    <form className="personal-info-form" onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-group">
                            <input type="file" {...register("consentFile", { required: "Este campo es obligatorio." })} />
                            {submitted && errors.consentFile && <span className="error">{errors.consentFile.message}</span>}
                        </div>
                        <button type="submit" disabled={!isValid}>
                            Siguiente
                        </button>
                    </form>
                </div>

                {submitted && formData && (
                    <div className="summary">
                        <h3>Resultados del Formulario</h3>

<h4>Términos y Condiciones</h4>
<p>Aceptó términos y condiciones: {termsConditions.termsAccepted === "true" ? 'Sí' : 'No'}</p>

<h4>Reglamento</h4>
<p>Aceptó reglamento: {regulation.termsAccepted === "true" ? 'Sí' : 'No'}</p>

<h4>Información Personal y de Salud</h4>
<ul>
    <li>Nombre: {information.name}</li>
    <li>Apellidos: {information.lastName}</li>
    <li>Número de documento: {information.document}</li>
    <li>Número de teléfono: {information.phone}</li>
    <li>Fecha de nacimiento: {information.birthDate}</li>
    <li>Correo Electrónico: {information.email}</li>
    <li>Dirección: {information.address}</li>
    <li>EPS: {information.eps}</li>
    <li>Grupo sanguíneo: {information.bloodType}</li>
    <li>Alergias: {information.allergies || 'Ninguna'}</li>
</ul>

<h4>Consentimiento Informado</h4>
<p>Archivo de consentimiento: {informedConsent.consentFile ? 'Archivo subido' : 'No se ha subido ningún archivo'}</p>

<h4>Estamento</h4>
<p>Estamento seleccionado: {estate.estamento}</p>

<h4>Contacto de Emergencia</h4>
<ul>
    <li>Nombre: {emergencyContact.nameEmergencyContact}</li>
    <li>Apellidos: {emergencyContact.lastNameEmergencyContact}</li>
    <li>Número de teléfono: {emergencyContact.phoneEmergencyContact}</li>
    <li>Correo Electrónico: {emergencyContact.emailEmergencyContact}</li>
    <li>Dirección: {emergencyContact.adressEmergencyContact}</li>
    <li>Parentesco: {emergencyContact.estamento}</li>
</ul>

<h4>Historial Médico</h4>
<ul>
    <li>Condición médica: {medicalHistory.medicalCondition === "true" ? 'Sí' : 'No'}</li>
    <li>Problemas cardíacos: {medicalHistory.heartProblem === "true" ? 'Sí' : 'No'}</li>
    <li>Problemas respiratorios: {medicalHistory.lungProblem === "true" ? 'Sí' : 'No'}</li>
    <li>Dolor en el pecho: {medicalHistory.chestPain === "true" ? 'Sí' : 'No'}</li>
    <li>Ahogo inusual: {medicalHistory.unusualBreath === "true" ? 'Sí' : 'No'}</li>
    <li>Enfermedad neurológica: {medicalHistory.neurologicalDisease === "true" ? 'Sí' : 'No'}</li>
    <li>Problemas articulares: {medicalHistory.muscleJointIssues === "true" ? 'Sí' : 'No'}</li>
    <li>Medicamentos para el corazón: {medicalHistory.medicationHeart === "true" ? 'Sí' : 'No'}</li>
    <li>Otros problemas: {medicalHistory.otherIssues === "true" ? 'Sí' : 'No'}</li>
    <li>Información adicional: {medicalHistory.additionalInfo || 'Ninguna'}</li>
</ul>
                        <button onClick={handleNavigate}>Confirmar y continuar</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MedicalDocument;
