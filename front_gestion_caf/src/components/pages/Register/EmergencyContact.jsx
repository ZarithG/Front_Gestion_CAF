import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useRegContext } from "../../../providers/RegProvider";
import { MessagesError, MessagesSuccess } from '../../gestion-caf/Messages';
import { SERVICES_BACK } from "../../../constants/constants";
import "../../styles/Register.css";
import InformationData from "./InformationData";
import { Toaster, toast } from "sonner";

const EmergencyContact = () => {
    const [error, setError] = useState('');
    const [state, dispatch] = useRegContext();
    const navigate = useNavigate();
    const [storageToken, setToken] = useState('');
    const [submitted, setSubmitted] = useState(false); // Estado para controlar el envío
    const [departments, setDepartments] = useState([]);
    const [cities, setCities] = useState([]);


    const {
        formState: { isValid, },
    } = useForm({ mode: "onChange" });

    useEffect(() => {
        const storedToken = localStorage.getItem("authToken");
        if (storedToken) {
            setToken(storedToken);
        }

        const fetchDeparments = async () => {
            try {

                const token = localStorage.getItem("authToken");
                const response = await fetch(
                    SERVICES_BACK.GET_DEPARTMETS,
                    {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            credentials: 'include',
                        }
                    }
                );
                const data = await response.json();
                setDepartments(data);
            } catch (error) {
                setError(error.message);
            }
        };

        fetchDeparments();

    }, []);
    const { register, handleSubmit, formState: { errors } } = useForm({ mode: "onBlur" });
    const {
        information,
        estate,
        userData,
        emergencyContact,
    } = state;

    const MessageError = (message) => {
        MessagesError(message);
    };

    const onSubmit = async (values) => {
        setError('');
        setSubmitted(true); // Marcar que el formulario ha si do enviado
        if (isValid) {
            dispatch({ type: "SET_EMERGENCY_CONTACT", data: values });
            navigate("/register/emergenceContact");
        }
        if (emergencyContact ) {
            try {
                const token = storageToken;
                const response = await fetch(SERVICES_BACK.SAVEUSER, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email: localStorage.getItem("userName"),
                        documentType: information.documentType,
                        documentNumber: information.documentNumber,
                        universityCode: information.code,
                        birthDate: information.birthDate,
                        phoneNumber: information.phone,
                        residenceAddress: information.address,
                        userType: information.estamento,
                        cityId: information.city,
                        emergencyContact: {
                            name: emergencyContact.nameEmergencyContact,
                            lastname: emergencyContact.lastNameEmergencyContact,
                            phone: emergencyContact.phone,
                            email: emergencyContact.emailEmergencyContact,
                            relationship: emergencyContact.relationshipEmergencyContact,
                            residenceAddress: emergencyContact.adressEmergencyContact,
                            city: {
                                id: emergencyContact.cityEmergencyContact
                            }
                        },
                        universityInformation: {
                            actualSemester: estate.actualSemester,
                            program: {
                                id: estate.programName,
                                faculty: {
                                    id: estate.faculty
                                }
                            }
                        },
                        medicalInformation: {
                            eps: estate.eps,
                            bloodGroup: estate.bloodType,
                            allergies: estate.allergies
                        }
                    })
                });
                if (!response.ok) {
                    if (response.status === 400) {
                        MessagesError('Hubo un problema al guardar, envie nuevamente los datos');
                    } else {
                        MessagesError('Hubo un error en el servidor');
                    }
                    return;
                }
            } catch (error) {
                MessagesError('Hubo un error en el servidor');
                console.log("ERROR:" + error)
            }

            try {
                const token = storageToken;

                const response = await fetch(SERVICES_BACK.PASSWORDAUTH, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        userName: localStorage.getItem("userName"),
                        password: userData.password
                    })
                });

                if (!response.ok) {
                    if (response.status === 400) {
                        MessagesError('Hubo un problema guardando la contraseña');
                    } else {
                        MessagesError('Hubo un error en el servidor');
                    }
                    return;
                }

                const data = await response.json();

                if (data) {
                    console.log(data)
                    MessagesSuccess('Datos guardados exitosamente');
                    navigate('/');
                } else {
                    MessagesError('No se pudieron guardar los datos');
                }
            } catch (error) {
                MessagesError('Hubo un error en el servidor');
            }
        }
    };

    return (
        <div className="InformationDataRegister">
            <Toaster
                position="top-center"
                dir="auto"
                duration={2000}
                visibleToasts={4}
                richColors
            />
            <div className="containerPersonalInformation">
                <h2 className="h2Register">Contacto de emergencia</h2>
                <p className="pRegister">Agregue sus datos de contacto de emergencia los cuales son indispensables para informar en caso de una eventualidad.</p>

                <div className="containerFormReg">
                    <form className="info-form" onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-group-Reg">
                            <label className="lbRegItem">Nombre</label>
                            <input
                                className="inpRegItem"
                                type="text"
                                {...register('nameEmergencyContact', { 
                                        required: "Este campo es obligatorio.",
                                        pattern: {
                                            value: /^[a-zA-ZÁÉÍÓÚáéíóúÑñ\s]+$/, // Patrón para validar solo texto
                                            message: "Solo se permiten letras y espacios."
                                        },
                                        minLength: {
                                            value: 2,
                                            message: "El texto debe tener al menos 2 caracteres."
                                        },
                                        maxLength: {
                                            value: 50,
                                            message: "El texto no debe exceder los 50 caracteres."
                                        }
                                    })}
                            />
                            {errors.nameEmergencyContact && (
                                <span className="error">{errors.nameEmergencyContact.message}</span>
                            )}
                        </div>

                        <div className="form-group-Reg">
                            <label className="lbRegItem">Apellidos</label>
                            <input
                                className="inpRegItem"
                                type="text"
                                {...register('lastNameEmergencyContact', { required: "Este campo es obligatorio." })}
                            />
                            {errors.lastNameEmergencyContact && (
                                <span className="error">{errors.lastNameEmergencyContact.message}</span>
                            )}
                        </div>

                        <div className="form-group-Reg">
                            <label className="lbRegItem">Número de teléfono</label>
                            <input
                                className="inpRegItem"
                                type="text"
                                {...register('phoneEmergencyContact', { 
                                    required: "Este campo es obligatorio.",
                                pattern: {
                                    value: /^[0-9]+$/, // Solo números
                                    message: "Solo se permiten números."
                                },
                                minLength: {
                                    value: 5,
                                    message: "El número de teléfono debe tener al menos 5 dígitos."
                                },
                                maxLength: {
                                    value: 15,
                                    message: "El número de teléfono no debe exceder los 15 dígitos."
                                }
                                 })}
                            />
                            {errors.phoneEmergencyContact && (
                                <span className="error">{errors.phoneEmergencyContact.message}</span>
                            )}
                        </div>

                        <div className="form-group-Reg">
                            <label className="lbRegItem">Correo Electrónico</label>
                            <input
                                className="inpRegItem"
                                type="email"
                                {...register('emailEmergencyContact', { 
                                    required: "Este campo es obligatorio.",
                                    pattern: {
                                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, // Patrón para validar correos electrónicos
                                        message: "Ingrese un correo electrónico válido."
                                    },
                                    minLength: {
                                        value: 5,
                                        message: "El correo debe tener al menos 5 caracteres."
                                    },
                                    maxLength: {
                                        value: 50,
                                        message: "El correo no debe exceder los 50 caracteres."
                                    } })}
                            />
                            {errors.emailEmergencyContact && (
                                <span className="error">{errors.emailEmergencyContact.message}</span>
                            )}
                        </div>

                        <div className="form-group-Reg">
                            <label className="lbRegItem">Dirección</label>
                            <input
                                className="inpRegItem"
                                type="text"
                                {...register('adressEmergencyContact', { required: "Este campo es obligatorio." })}
                            />
                            {errors.adressEmergencyContact && (
                                <span className="error">{errors.adressEmergencyContact.message}</span>
                            )}
                        </div>

                        <div className="form-group-Reg">
                            <label className="lbRegItem">Parentesco</label>
                            <select
                                className="sltRegisItem"
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
                        <div className="form-group-Reg">
                            <label className="lbRegItem">Departamento</label>
                            <select className="sltRegisItem"
                                {...register("departmentEmergencyContact", { required: true })}
                                onChange={(e) => {
                                    const selectedDepartmentId = parseInt(e.target.value, 10); // Obtén el id del departamento seleccionado
                                    const selectedDepartment = departments.find(dept => dept.id === selectedDepartmentId); // Encuentra el departamento correspondiente
                                    if (selectedDepartment) {
                                        setCities(selectedDepartment.cities); // Guarda las ciudades del departamento seleccionado
                                    }
                                }}
                            >
                                {departments.length > 0 ? (
                                    departments.map((item) => (
                                        <option key={item.id} value={item.id}>{item.name}</option> // Usa el id como valor
                                    ))
                                ) : (
                                    <option value="">Cargando Departamentos...</option>
                                )}
                            </select>
                        </div>
                        <div className="form-group-Reg">
                            <label className="lbRegItem">Municipio</label>
                            <select className="sltRegisItem"
                                {...register("cityEmergencyContact", { required: true })}>
                                <option value="">Seleccione su ciudad</option>
                                {cities.length > 0 ? (
                                    cities.map((item, index) => (
                                        <option key={index} value={item.id}>{item.name}</option>
                                    ))
                                ) : (
                                    <option value="">Cargando Municipio...</option>
                                )}
                            </select>
                        </div>
                        <div className="buttonContainer">
                            <button className="buttonRegister" type="submit">Guardar</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
export default EmergencyContact;
