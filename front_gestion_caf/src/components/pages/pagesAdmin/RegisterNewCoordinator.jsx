import React, { useState, useEffect} from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useRegContext } from "../../../providers/RegProvider";
import { MessagesError, MessagesInfo, MessagesSuccess } from '../../gestion-caf/Messages';
import { SERVICES_BACK } from "../../../constants/constants";
import { Toaster, toast } from "sonner";
import "../../styles/Register.css";
import "./styles/FormAdm.css";

const RegisterNewCoordinator = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        lastName: "",
        documentType: "",
        documentNumber: "",
        phoneNumber: "",
        birthDate: "",
        email: "",
        address: "",
        department: "",
        city: "",
        password: "",
        confirmPassword: "",
    });
    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const [departments, setDepartments] = useState([]);
    const [cities, setCities] = useState([]);
    const [error, setError] = useState('');
    const [storageToken, setToken] = useState('');
    const [selectedCityToSend, setSelectedCityToSend] = useState(0);
    const [loading, setLoading] = useState(false); // Estado de carga

    const {
        register,
        formState: {isValid},
    } = useForm({ mode: "onChange" });

    useEffect(() => {
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

        toast.promise(
            fetchDeparments(),
            {
                loading: 'Cargando departamentos...',
                success: <b>Departamentos cargados correctamente.</b>,
                error: <b>Error al cargar los departamentos.</b>,
            }
        );

    }, []);

    const validateForm = () => {
        const newErrors = {};

        if (!formData.name) newErrors.name = "Este campo es obligatorio.";
        if (!formData.lastName) newErrors.lastName = "Este campo es obligatorio.";
        if (!formData.documentType) newErrors.documentType = "Este campo es obligatorio.";
        if (!formData.documentNumber) newErrors.documentNumber = "Este campo es obligatorio.";
        if (!formData.phoneNumber) newErrors.phoneNumber = "Este campo es obligatorio.";
        if (!formData.birthDate) newErrors.birthDate = "Este campo es obligatorio.";
        if (!formData.email) newErrors.email = "Este campo es obligatorio.";
        if (!formData.address) newErrors.address = "Este campo es obligatorio.";
        if (!formData.department) newErrors.department = "Este campo es obligatorio.";
        if (!formData.city) newErrors.city = "Este campo es obligatorio.";
        if (!formData.password) newErrors.password = "Este campo es obligatorio.";
        if (!formData.confirmPassword) newErrors.confirmPassword = "Este campo es obligatorio.";
        if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Las contraseñas no coinciden.";

        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors({}); // Limpiar los errores antes de validar

        const newErrors = validateForm();
        if (Object.keys(newErrors).length === 0) {
            setSubmitted(true);
            navigate("/register/information");
        } else {
            setErrors(newErrors);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const validateEmail = (email) => {
        // Verificar con una expresión regular
        const regex = /^[a-zA-Z0-9._%+-]+@uptc\.edu\.co$/;
        return regex.test(email);
      };

    const handleSave = async () => {
        setLoading(true);
        try {
            if (!validateEmail(formData.email)){
                MessagesInfo("El correo ingresado no pertenece a la UPTC.");
            }else{
                const token = storageToken;
                const isUserRegistered = await fetch(SERVICES_BACK.IS_USER_REGISTERED + formData.email, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    }
                });
                if (isUserRegistered.status === 204) {
                    const response = await fetch(SERVICES_BACK.SAVEUSER, {
                        method: 'POST',
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            email: formData.email,
                            name: formData.name.toUpperCase() + " " + formData.lastName.toUpperCase(),
                            documentType: formData.documentType,
                            documentNumber: formData.documentNumber,
                            birthDate: formData.birthDate,
                            phoneNumber: formData.phoneNumber,
                            residenceAddress: formData.address,
                            cityId: selectedCityToSend,
                            userType: "ADMINISTRATIVE"
                        })
                    });
                    if (response.status !== 200) {
                        if (response.status === 400) {
                            MessagesError('Hubo un problema al guardar, envie nuevamente los datos');
                            setLoading(false);
                        } else {
                            MessagesError('Hubo un error en el servidor');
                            setLoading(false);
                        }
                        return;
                    }else{
                        const response = await fetch(SERVICES_BACK.CREATE_NEW_AUTH_USER, {
                            method: 'POST',
                            headers: {
                                'Authorization': `Bearer ${token}`,
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                userName: formData.email,
                                password: formData.password,
                                roles: [
                                    {
                                        roleName: "ROLE_USER"
                                    }
                                ]
                            })
                        });

                        if (response.status !== 200) {
                            if (response.status === 400) {
                                MessagesError('Hubo un problema guardando la contraseña');
                                setLoading(false);
                            } else {
                                MessagesError('Hubo un error en el servidor');
                                setLoading(false);
                            }
                        }else{
                            MessagesSuccess("Coordinador registrado satisfactoriamente.");
                            setTimeout(() => {
                                navigate('/'); // Redirigir a la página principal
                            }, 3000);
                        }
                    }
                }else{
                    if (isUserRegistered.status === 200) {
                        MessagesInfo("Ya existe un usuario con el correo electrónico ingresado.");
                    }else{
                        MessagesError("Hubo un error en el servidor.");
                        setLoading(false);
                    }
                }
            }
        } catch (error) {
            MessagesError('Hubo un error en el servidor');
            console.log("ERROR:" + error)
            setLoading(false);
        }
        setLoading(false);
    }

    return (
        <div className="containerBody">
            <Toaster
                position="top-center"
                dir="auto"
                duration={2000}
                visibleToasts={4}
                richColors
            />
            <h1 className="InformationDataPageTitleFormAdm">Completar datos básicos del coordinador</h1>

            {/* Información personal */}
            <div className="containerPersonalInformation">
                <div className="containerFormAdm">
                    <h2 className="h2FormAdm">Información personal</h2>
                    <p className="pFormAdm">Modifique la información del coordinador</p>

                    <form className="info-form" onSubmit={handleSubmit}>
                        <div className="form-group-FormAdm">
                            <label className="lbFormAdm">Nombre</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                            />
                            {submitted && errors.name && <span className="error">{errors.name}</span>}
                        </div>

                        <div className="form-group-FormAdm">
                            <label className="lbFormAdm">Apellidos</label>
                            <input
                                type="text"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                            />
                            {submitted && errors.lastName && <span className="error">{errors.lastName}</span>}
                        </div>
                        <div className="form-group-FormAdm">
                            <label className="lbFormAdm">Tipo de documento</label>
                            <select
                                className="sltFormAdmItem"
                                name="documentType"
                                value={formData.documentType}
                                onChange={handleChange}
                            >
                                <option value="">Seleccione su estamento</option>
                                <option value="CC">Cédula de Ciudadanía</option>
                                <option value="TI">Tarjeta de identidad</option>
                                <option value="CE">Cédula de Extranjería</option>
                                <option value="PA">Pasaporte</option>
                            </select>
                        </div>
                        <div className="form-group-FormAdm">
                            <label className="lbFormAdm">Número de documento de identidad</label>
                            <input
                                type="text"
                                name="documentNumber"
                                value={formData.documentNumber}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group-FormAdm">
                            <label className="lbFormAdm">Número de teléfono</label>
                            <input
                                type="text"
                                name="phoneNumber"
                                value={formData.phoneNumber}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group-FormAdm">
                            <label className="lbFormAdm">Fecha de nacimiento</label>
                            <input
                                type="date"
                                name="birthDate"
                                value={formData.birthDate}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group-FormAdm">
                            <label className="lbFormAdm">Correo Electrónico</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group-FormAdm">
                            <label className="lbFormAdm">Dirección</label>
                            <input
                                type="text"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}

                            />
                            {submitted && errors.address && <span className="error">{errors.address}</span>}
                        </div>
                        <div className="form-group-Reg">
                            <label className="lbRegItem">Departamento</label>
                            <select className="sltRegItem"
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
                            <select className="sltRegItem"
                                {...register("cityEmergencyContact", { required: true })}
                                    onChange={(e) => {
                                        const selectedCityId = parseInt(e.target.value, 10); // Obtén el id del departamento seleccionado
                                        const selectedCity = cities.find(city => city.id === selectedCityId); // Encuentra el departamento correspondiente
                                        if (selectedCity) {
                                            setSelectedCityToSend(selectedCityId); // Guarda las ciudades del departamento seleccionado
                                        }
                                    }}
                                >
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
                    </form>
                </div>
            </div>

            {/* Usuario y contraseña */}
            <div className="containerUserFormAdm">
                <div className="containerFormAdm">
                    <h2 className="h2FormAdm">Usuario y contraseña</h2>
                    <p className="pFormAdm">Tu usuario será el nombre y apellido registrado en el correo electrónico, elige una contraseña segura.</p>

                    <form className="info-form" onSubmit={handleSubmit}>
                        <div className="form-group-FormAdm">
                            <label className="lbFormAdm">Usuario</label>
                            <input
                                type="text"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="inpEmailFormAdmItem"
                                readOnly
                            />
                        </div>
                        <div className="form-group-FormAdm">
                            <label className="lbFormAdm">Contraseña</label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                            />
                            {submitted && errors.password && <span className="error">{errors.password}</span>}
                        </div>
                        <div className="form-group-FormAdm">
                            <label className="lbFormAdm">Confirmación de la contraseña</label>
                            <input
                                type="password"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                            />
                            {submitted && errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}
                        </div>
                        <div className="containerButtonAdm">
                        <button className="buttonFormAdm" onClick={handleSave}>
                            {loading ? 'Procesando...' : 'Registrar Coordinador'}
                        </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default RegisterNewCoordinator;
