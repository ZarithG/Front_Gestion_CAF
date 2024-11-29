import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useRegContext } from "../../../providers/RegProvider";
import "../../styles/Register.css";
import { SERVICES_BACK } from "../../../constants/constants";


const Information = () => {
    const [state, dispatch] = useRegContext();
    const navigate = useNavigate();
    const [programs, setPrograms] = useState([]);
    const [faculty, setFaculty] = useState([]);

    const [error, setError] = useState("");

    const [submitted, setSubmitted] = useState(false); // Estado para controlar el envío

    const {
        information,
        estate
    } = state;
    const {
        register,
        handleSubmit,
        formState: { errors, isValid, },
    } = useForm({ mode: "onChange" }); // Habilitar validación en cambios

    const onSubmit = (values) => {
        setSubmitted(true); // Marcar que el formulario ha si do enviado
        console.log(information, estate)
        if (isValid) {
            dispatch({ type: "SET_ESTATE", data: values });
            navigate("/register/emergenceContact");
        }
    };

    useEffect(() => {
        console.log(faculty);
        const fetchPrograms = async () => {
            try {

                const token = localStorage.getItem("authToken");
                const response = await fetch(
                    SERVICES_BACK.GET_PROGRAMS,
                    {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            credentials: 'include',
                        }
                    }
                );
                const data = await response.json();
                setPrograms(data);
            } catch (error) {
                setError(error.message);
            }
        };

        fetchPrograms();

    }, []);

    return (
        <div className="InformationDataRegister">
            <div className="containerPersonalInformation">
                <div className="containerFormReg">
                    <form className="info-form" onSubmit={handleSubmit(onSubmit)}>
                        <div className="containerInfUni">
                            <h2 className="h2Register">Información Educativa</h2>
                            <p className="pRegister"> Agregue sus datos universitarios para completar el ingreso al sistema.</p>

                            <div className="form-group-Reg">
                                <label className="lbRegItem">Estamento</label>
                                <select className="sltRegisItem" {...register("estamento", { required: true })}>
                                    <option value="">Seleccione su estamento</option>
                                    <option value="STUDENT">Estudiante</option>
                                    <option value="PROFESSOR">Profesor</option>
                                    <option value="ADMINISTRATIVE">Administrativo</option>
                                    <option value="EXTERN">Externo</option>
                                </select>
                                {errors.estamento && <span className="error">Debes seleccionar un estamento.</span>}
                            </div>

                            <div className="form-group-Reg">
                                <label className="lbRegItem">Semestre actual</label>
                                <input className="inpRegItem" type="text" {...register("actualSemester", { required: true })} />
                                {submitted && errors.eps && <span className="error">Este campo es obligatorio.</span>}
                            </div>

                            <div className="form-group-Reg">
                                <label className="lbRegItem">Nombre del programa</label>
                                <select
                                    className="sltRegisItem"
                                    {...register("programName", { required: "Seleccione un programa." })}
                                    onChange={(e) => {
                                        const selectedProgram = programs.find((p) => p.id === parseInt(e.target.value, 10));
                                        setFaculty(selectedProgram ? selectedProgram.facultyDTO : "");
                                    }}
                                >
                                    <option value="">Seleccione un Programa</option>
                                    {programs.map((program) => (
                                        <option key={program.id} value={program.id}>
                                            {program.programName}
                                        </option>
                                    ))}
                                </select>

                            </div>

                            <div className="form-group-Reg">
                                <label className="lbRegItem">Facultad</label>
                                <select className="sltRegisItem" {...register("faculty", { required: true })}>
                                    <option value="">Seleccione su Facultad</option>
                                    {/* Verifica si faculty está disponible y muestra el nombre de la facultad */}
                                    {faculty && faculty.facultyName ? (
                                        <option value={faculty.id}>{faculty.facultyName}</option>
                                    ) : (
                                        <option value="">Cargando Facultad...</option>
                                    )}
                                </select>
                                
                            </div>

                        </div>
                        <div className="containerFormReg">
                            <h2 className="h2Register">Información de Salud</h2>
                            <p className="pRegister"> Agregue sus datos de salud para completar el ingreso al sistema.</p>

                            <div className="form-group-Reg">
                                <label className="lbRegItem">EPS</label>
                                <input className="inpRegItem" type="text" {...register("eps", { required: true })} />
                                {submitted && errors.eps && <span className="error">Este campo es obligatorio.</span>}
                            </div>

                            <div className="form-group-Reg">
                                <label className="lbRegItem">Grupo sanguíneo RH</label>
                                <select className="sltRegisItem" {...register("bloodType", { required: true })}>
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

                            <div className="form-group-Reg">
                                <label className="lbRegItem">Alergias</label>
                                <input type="text" {...register("allergies")} />
                            </div>

                            <div className="buttonContainer">
                                <button className="buttonRegister" type="submit">Siguiente</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Information;
