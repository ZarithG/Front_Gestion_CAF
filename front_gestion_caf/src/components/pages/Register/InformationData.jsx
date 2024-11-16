import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useRegContext } from "../../../providers/RegProvider";
import "../../styles/Register.css";

const InformationData = () => {
    const [authToken, setAuthToken] = useState("");
    const [userName, setUserName] = useState('');
    const [state, dispatch] = useRegContext();
    const navigate = useNavigate();
    const [submitted, setSubmitted] = useState(false);
    const { information } = state

    const [formData, setFormData] = useState({
        document: '',
        phone: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    useEffect(() => {
        const storedUserName = localStorage.getItem("userName");

        if (storedUserName) {
            setUserName(storedUserName);
            setFormData(prevData => ({
                ...prevData,
                email: storedUserName
            }));
        }else{
            handleRedirect();
        }
    }, []);

    const handleRedirect = () => {
        const params = new URLSearchParams(window.location.search);
        const authUserJson = params.get("authUser");
        const authUser = JSON.parse(decodeURIComponent(authUserJson));
        const token = authUser.token.token;

        if (token) {
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
        <div className="InformationDataRegister">
            {/* Información personal */}
            <div className="containerPersonalInformation">
                <h2 className="h2Register">Información personal</h2>
                <p className="pRegister">Agregue sus datos personales para terminar de completar su registro en el sistema.</p>
                <div className="containerFormReg">
                    <form className="info-form" onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-group-Reg">
                            <label className="lbRegItem">Tipo de documento</label>
                            <select className="sltRegItem" {...register("documentType", { required: true })}>
                                <option value="">Seleccione su estamento</option>
                                <option value="CC">Cedula de Ciudadania</option>
                                <option value="TI">Tarjeta de identidad</option>
                                <option value="CE">Cedula de Extranjeria</option>
                                <option value="PA">Pasaporte</option>
                            </select>
                        </div>

                        <div className="form-group-Reg">
                            <label className="lbRegItem">Número de documento de identidad</label>
                            <input className="inpRegItem" type="text" {...register("documentNumber", { required: true })} />
                            {submitted && errors.document && <p className="error">Este campo es obligatorio.</p>}
                        </div>

                        <div className="form-group-Reg">
                            <label className="lbRegItem">Número de teléfono</label>
                            <input className="inpRegItem" type="text" {...register("phone", { required: true })} />
                            {submitted && errors.phone && <p className="error">Este campo es obligatorio.</p>}
                        </div>

                        <div className="form-group-Reg">
                            <label className="lbRegItem">Código</label>
                            <input className="inpRegItem" type="text" {...register("phone", { required: true })} />
                            {submitted && errors.phone && <p className="error">Este campo es obligatorio.</p>}
                        </div>

                        <div className="form-group-Reg">
                            <label className="lbRegItem">Fecha de nacimiento</label>
                            <input className="inpRegItem" type="date" {...register("birthDate", { required: true })} />
                            {submitted && errors.birthDate && <p className="error">Este campo es obligatorio.</p>}
                        </div>

                        <div className="form-group-Reg">
                            <label className="lbRegItem">Correo Electrónico</label>
                            <input
                                type="email"
                                {...register('email')}
                                className="inpEmailRegItem"
                                value={formData.email}
                                readOnly
                            />

                        </div>

                        <div className="form-group-Reg">
                            <label className="lbRegItem">Dirección</label>
                            <input className="inpRegItem" type="text" {...register("address", { required: true })} />
                            {submitted && errors.address && <p className="error">{errors.password.message}Este campo es obligatorio.</p>}

                        </div>

                        <div className="form-group-Reg">
                            <label className="lbRegItem">Departamento</label>
                            <select className="sltRegItem"  {...register("department", { required: true })}>
                                <option value="">Seleccione el departamento</option>
                                <option value="Boyaca">Boyacá</option>
                                <option value="Cundinamarca">Cundinamarca</option>
                                <option value="Antioquia">Antioquia</option>
                            </select>
                        </div>

                        <div className="form-group-Reg">
                            <label className="lbRegItem">Municipio</label>
                            <select className="sltRegItem"  {...register("city", { required: true })}>
                                <option value="">Seleccione su ciudad</option>
                                <option value="Tunja">Tunja</option>
                                <option value="Toca">Toca</option>
                                <option value="Boyaca">Boyaca</option>
                                <option value="Sogamoso">Sogamoso</option>
                            </select>
                        </div>
                    </form>
                </div>
            </div>

            {/* Usuario y contraseña */}
            <div className="containerUserReg">
                <h2 className="h2Register">Usuario y contraseña</h2>
                <p className="pRegister">Tu usuario será el nombre y apellido registrado en el correo electrónico, elige una contraseña segura.</p>
                <div className="containerFormReg">
                    <form className="user-info-form-reg" onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-group-Reg">
                            <label className="lbRegItem">Usuario</label>
                            <input
                                className="inpEmailRegItem"
                                type="text"
                                value={formData.email}
                                readOnly
                            />
                        </div>
                        <div className="form-group-Reg">
                            <label className="lbRegItem">Contraseña</label>
                            <input
                                className="inpRegItem"
                                type="password"
                                {...register('password', { required: "Este campo es obligatorio." })}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            />
                            {errors.password && <p className="error">{errors.password.message}</p>}
                        </div>
                        <div className="form-group-Reg">
                            <label className="lbRegItem" >Confirmación de la contraseña</label>
                            <input
                                className="inpRegItem"
                                type="password"
                                {...register('confirmPassword', {
                                    required: "Este campo es obligatorio.",
                                    validate: value => value === formData.password || "Las contraseñas no coinciden",
                                })}
                                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                            />
                            {errors.confirmPassword && <p className="error">{errors.confirmPassword.message}</p>}
                        </div>
                        <div className="buttonContainer">
                            <button className="buttonRegister" type="submit">Siguiente</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default InformationData;


