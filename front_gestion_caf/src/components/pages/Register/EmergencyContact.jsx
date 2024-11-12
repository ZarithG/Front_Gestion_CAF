import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useRegContext } from "../../../providers/RegProvider";
import { MessagesError, MessagesSuccess } from '../../gestion-caf/Messages';
import { SERVICES_BACK } from "../../../constants/constants";

const EmergencyContact = () => {
    const [error, setError] = useState('');
    const [state, dispatch] = useRegContext();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ mode: "onChange" });

    const {
        information,
        informationData,
        userData,
        emergencyContact,
    } = state;

    const MessageError = (message) => {
        MessagesError(message);
    };

    const onSubmit = async (data) => {
        setError('');  
        try {
            const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJqdWFuLmFyY2hpbGEwNEB1cHRjLmVkdS5jbyIsIkF1dGhvcml0aWVzIjpbeyJpZCI6MSwicm9sZU5hbWUiOiJST0xFX1VTRVIifV0sImlhdCI6MTczMTM2OTU0MiwiZXhwIjoxNzMxMzczMTQyfQ.zqUW3gpHf1gTAUkvq2ISplA9YRtCmGZORsTEaw3I3KRDq1p7F-T48Zoq6UjA_C2it6mkQznuPXM8-p1W7OUuyA";
        
            const response = await fetch(SERVICES_BACK.SAVEUSER, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: "PRUEBA",
                    email: "juan.archila04@uptc.edu.co",
                    documentType: "CC",
                    documentNumber: "1002366272",
                    universityCode: "202111983",
                    birthDate: "2024-11-06",
                    phoneNumber: "3124377121",
                    residenceAddress: "AV PRUEBA",
                    userType: "STUDENT",
                    department: "Boyaca",
                    city: "Tunja",
                    emergencyContact: {
                        name: "MANUEL",
                        lastname: "LOPEZ",
                        phone: "321312412",
                        email: "manuel@hm.com",
                        relationship: "MADRE",
                        residenceAddress: "test",
                        department: "Boyaca",
                        city: "Tunja"
                    },
                    universityInformation: {
                        actualSemester: "10",
                        program: {
                            programName: "Ingeniería Electrónica",
                            faculty: {
                                facultyName: "Ingeniería"
                            }
                        }
                    },
                    medicalInformation: {
                        eps: "MEDI PRUEBA",
                        bloodGroup: "O-",
                        allergies: "Ninguna"
                    }
                })
            });
            console.log(information, informationData, userData);
            if (!response.ok) {
                if (response.status === 400) {
                    MessagesError('Credenciales incorrectas');
                } else {
                    MessagesError('Hubo un error en el servidor');
                }
                return;
            }else{
                console.log("Respuesta bien");
            }

            const dataResponse = await response.json();

            if (dataResponse) {
                MessagesSuccess('Inicio de sesión exitoso');
                navigate('/');  
            } else {
                MessagesError('Credenciales incorrectas');
            }
        } catch (error) {
            MessagesError('Hubo un error en el servidor');
            console.log("ERROR:" + error)
        }

        try {
            const response = await fetch(SERVICES_BACK.PASSWORDAUTH, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userName: "juan.archila04@uptc.edu.co",
                    password: "1234567"
                })
            });

            if (!response.ok) {
                if (response.status === 400) {
                    MessagesError('Credenciales incorrectas');
                } else {
                    MessagesError('Hubo un error en el servidor');
                }
                return;
            }else{
                console.log("Respuesta bien");
            }

            const data = await response.json();

            if (data) {
                MessagesSuccess('Inicio de sesión exitoso');
                // navigate('/');  
            } else {
                MessagesError('Credenciales incorrectas');
            }
        } catch (error) {
            MessagesError('Hubo un error en el servidor');
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
                            <input
                                type="text"
                                {...register('nameEmergencyContact', { required: "Este campo es obligatorio." })}
                            />
                            {errors.nameEmergencyContact && (
                                <span className="error">{errors.nameEmergencyContact.message}</span>
                            )}
                        </div>

                        <div className="form-group">
                            <label>Apellidos</label>
                            <input
                                type="text"
                                {...register('lastNameEmergencyContact', { required: "Este campo es obligatorio." })}
                            />
                            {errors.lastNameEmergencyContact && (
                                <span className="error">{errors.lastNameEmergencyContact.message}</span>
                            )}
                        </div>

                        <div className="form-group">
                            <label>Número de teléfono</label>
                            <input
                                type="text"
                                {...register('phoneEmergencyContact', { required: "Este campo es obligatorio." })}
                            />
                            {errors.phoneEmergencyContact && (
                                <span className="error">{errors.phoneEmergencyContact.message}</span>
                            )}
                        </div>

                        <div className="form-group">
                            <label>Correo Electrónico</label>
                            <input
                                type="email"
                                {...register('emailEmergencyContact', { required: "Este campo es obligatorio." })}
                            />
                            {errors.emailEmergencyContact && (
                                <span className="error">{errors.emailEmergencyContact.message}</span>
                            )}
                        </div>

                        <div className="form-group">
                            <label>Dirección</label>
                            <input
                                type="text"
                                {...register('adressEmergencyContact', { required: "Este campo es obligatorio." })}
                            />
                            {errors.adressEmergencyContact && (
                                <span className="error">{errors.adressEmergencyContact.message}</span>
                            )}
                        </div>

                        <div className="form-group">
                            <label>Parentesco</label>
                            <select
                                {...register("relationshipEmergencyContact", { required: "Debes seleccionar un parentesco." })}
                            >
                                <option value="">Seleccione su parentesco</option>
                                <option value="Madre">Madre</option>
                                <option value="Padre">Padre</option>
                                <option value="Hermano">Hermano</option>
                                <option value="Amigo">Amigo</option>
                                <option value="Otro">Otro</option>
                            </select>
                            {errors.relationshipEmergencyContact && (
                                <span className="error">{errors.relationshipEmergencyContact.message}</span>
                            )}
                        </div>

                        <button type="submit">Siguiente</button>
                    </form>
                </div>
            </div>
        </div>
    );
};
export default EmergencyContact;
