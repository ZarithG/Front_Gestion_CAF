import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useRegContext } from "../../../providers/RegProvider";

const InformationData = () => {
    const [authToken, setAuthToken] = useState("");
    const [userName, setUserName] = useState('');
    const [state, dispatch] = useRegContext();
    const navigate = useNavigate();
    const [submitted, setSubmitted] = useState(false);
    const {information} = state
    const [formData, setFormData] = useState({
        name: '',
        lastName: '',
        document: '',
        phone: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    useEffect(() => {
        handleRedirect();
        const storedUserName = localStorage.getItem("userName");

        if (storedUserName) {
            setUserName(storedUserName);
            setFormData(prevData => ({
                ...prevData,
                email: storedUserName
            }));
        }
    }, []);

    const handleRedirect = () => {
        const params = new URLSearchParams(window.location.search);
        const token = params.get("token");
        const authUserJson = params.get("authUser");

        if (token) {
            const authUser = JSON.parse(decodeURIComponent(authUserJson));
            localStorage.setItem("authToken", token);
            setAuthToken(token);

            const userName = authUser.userName;
            const roleName = authUser.roles[0]?.roleName;

            localStorage.setItem("userName", userName);
            localStorage.setItem("roleName", roleName);
        }
    };

    const { register, handleSubmit, formState: { errors, isValid } } = useForm({ mode: "onChange" });

    const onSubmit = (values) => {
        setSubmitted(true);

        if (isValid) {
            // Guardar los datos generales en 'informationData'
            dispatch({ type: "SET_INFORMATION", data: values });
            // Guardar los datos del usuario (correo, nombre) en 'userData'
            const userData = {
                email: values.email,
                password: values.password,
            };
            dispatch({ type: "SET_USERDATA", data: userData });

            // Redirigir a la siguiente página
            navigate("/register/information");
        }
    };

    return (
        <div className="InformationData">
            <h1 className="InformationDataPageTitle">Completar datos básicos</h1>

            {/* Información personal */}
            <div className="containerPersonalInformation">
                <h2>Información personal</h2>
                <p>Agregue sus datos personales para complementar el ingreso al sistema.</p>
                <div className="containerForm">
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

                        <select {...register("documentType", { required: true })}>
                            <option value="">Seleccione su estamento</option>
                            <option value="CC">Cedula de Ciudadania</option>
                            <option value="TI">Tarjeta de identidad</option>
                            <option value="CE">Cedula de Extranjeria</option>
                            <option value="PA">Pasaporte</option>
                        </select>

                        <div className="form-group">
                            <label className="lbInItem">Número de documento de identidad</label>
                            <input type="text" {...register("documentNumber", { required: true })} />
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
                            <input
                                type="email"
                                {...register('email')}
                                className="lbDataUsername"
                                value={formData.email}
                                readOnly
                            />                            
                            
                        </div>

                        <div className="form-group">
                            <label className="lbInItem">Dirección</label>
                            <input type="text" {...register("address", { required: true })} />
                            {submitted && errors.address && <span className="error">Este campo es obligatorio.</span>}
                        </div>        

                        <select {...register("department", { required: true })}>
                            <option value="">Seleccione el departamento</option>
                            <option value="Boyaca">Boyaxa</option>
                            <option value="Cundinamarca">Cundinamarca</option>
                            <option value="Antioquia">Antioquia</option>
                        </select>

                        <select {...register("city", { required: true })}>
                            <option value="">Seleccione su ciudad</option>
                            <option value="Tunja">Tunja</option>
                            <option value="Toca">Toca</option>
                            <option value="Boyaca">Boyaca</option>
                            <option value="Sogamoso">Sogamoso</option>
                        </select>

                    </form>
                </div>
            </div>

            {/* Usuario y contraseña */}
            <div className="containerUser">
                <h2>Usuario y contraseña</h2>
                <p>Tu usuario será el nombre y apellido registrado en el correo electrónico, elige una contraseña segura.</p>
                <div className="containerForm">
                    <form className="user-info-form" onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-group">
                            <label>Usuario</label>
                            <input
                                type="text"
                                value={formData.email}
                                readOnly
                            />
                        </div>
                        <div className="form-group">
                            <label>Contraseña</label>
                            <input
                                type="password"
                                {...register('password', { required: "Este campo es obligatorio." })}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            />
                            {errors.password && <p>{errors.password.message}</p>}
                        </div>
                        <div className="form-group">
                            <label>Confirmación de la contraseña</label>
                            <input
                                type="password"
                                {...register('confirmPassword', {
                                    required: "Este campo es obligatorio.",
                                    validate: value => value === formData.password || "Las contraseñas no coinciden",
                                })}
                                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                            />
                            {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
                        </div>
                        <button type="submit">Guardar</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default InformationData;
