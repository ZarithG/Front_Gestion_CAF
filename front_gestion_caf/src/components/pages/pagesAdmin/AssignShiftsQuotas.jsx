import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TurnoModal from "../../Admin/TurnoModal";
import "./styles/PagesAdmin.css";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { SERVICES_BACK } from "../../../constants/constants";
import { MessagesError, MessagesInfo, MessagesSuccess, showToastPromise } from "../../gestion-caf/Messages";
import { toast, Toaster } from "sonner";
import ModifyShiftModal from "../../Admin/ModifyShiftModal";



const initialTurnos = {
    LUNES: [],
    MARTES: [],
    MIERCOLES: [],
    JUEVES: [],
    VIERNES: []
};

const AssignShiftsQuotas = () => {
    const [caf, setCaf] = useState([]);
    const [cafId ,setCafId] = useState(0);
    const [cafName ,setCafName] = useState("");
    const [turnos, setTurnos] = useState(initialTurnos);
    const [activeDay, setActiveDay] = useState(null);
    const [isModalOpen, setModalOpen] = useState(false);
    const [isModalEditOpen, setModalEditOpen] = useState(false);
    const [selectedDay, setSelectedDay] = useState(null);
    const [selectedCaf, setSelectedCaf] = useState(null); // Estado para almacenar el CAF seleccionado
    const [shiftIdEdit, setShiftIdEdit] = useState("");
    const [startTimeEdit, setStartTimeEdit] = useState("");
    const [endTimeEdit, setEndTimeEdit] = useState("");
    const [placeAvailableEdit, setPlaceAvailableEdit] = useState(0);
    const [token, setToken] = useState("");

    useEffect(() => {
        getCafId();
        if (cafId > 0) {
            console.log("CAF ID recibido:", cafId);
            
            const promiseFn = async () => {
                const token = localStorage.getItem("authToken");
                const response = await fetch(SERVICES_BACK.GET_CAF_INFO + cafId, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        credentials: 'include',
                    },
                });
                const data = await response.json();
                
                if(response.ok){
                    setCafName(data.name);
                }else if(response.status === 204){
                    MessagesInfo("No se ha cargado la información del CAF");
                }else{
                    MessagesError("Error en el servidor")
                }
                
            };
            handleViewShift();
            toast.promise(
                promiseFn(),
                {
                    loading: 'Cargando información del CAF...',
                    success: <b>Datos del CAF cargados correctamente.</b>,
                    error: <b>Error al cargar los datos.</b>,
                }
            );
            

            
            
        } else {
            console.error("No se recibió cafId");
        }
    }, [cafId]);

    //Método para obtener el id del CAF de un coodinador
    const getCafId = async () => {
        
        try {
            const token = localStorage.getItem("authToken");
            const response = await fetch(SERVICES_BACK.GET_IDCAF_BY_USER_EMAIL + localStorage.getItem('userName'), {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    credentials: 'include',
                },
            });

            if(response.ok){
                const data = await response.json();
                console.log(data)
                setCafId(data);
            }else if(response.status === 204){
                MessagesError("Recargar la página para carga datos");    
            }

        } catch (error) {
            console.error("Error al obtener id del fitnessCenter:", error);
            MessagesError("Error al obtener id del CAF.");
        }
    
    };

    const toggleDay = (day) => {
        setActiveDay(activeDay === day ? null : day);
        console.log(activeDay)
        setSelectedDay(day);
    };

    const addTurno = () => {
        setModalOpen(true);
    };

    const editShift = (dayAssignmentId, shiftId, startTime, endTime, places) => {
        setSelectedDay(dayAssignmentId);
        setShiftIdEdit(shiftId);
        setEndTimeEdit(endTime);
        setStartTimeEdit(startTime);
        setPlaceAvailableEdit(places);
        console.log("HOLA"+startTimeEdit);
        setModalEditOpen(true);
    };


    // Definición de la función removeTurno
    const removeTurno = async (day, index) => {
        try {
            console.log("DELETE ID:" + turnos[day][index].id);
            const token = localStorage.getItem("authToken");
            const response = await fetch(SERVICES_BACK.PUT_DELETE_SHIFT, {
                method: 'PUT', // Asegúrate de que el método coincide con el de Postman
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: turnos[day][index].dayAssignment,
                    fitnessCenter: selectedCaf.id,
                    day: day,
                    shifts: [{
                        id: turnos[day][index].id,
                        dayAssignment: turnos[day][index].dayAssignment,
                        startTime: turnos[day][index].inicio,
                        endTime: turnos[day][index].fin,
                        placeAvailable: turnos[day][index].cupos,
                        status:true
                    }]
                })
            });
            

            if (!response.ok) {
                console.log('Error:', response.status);  // Verifica el código de estado
                const errorData = await response.json();
                console.log('Error Data:', errorData);  // Imprime la respuesta completa de error
                if (response.status === 400) {
                    MessagesError('Bad request');
                    return;
                } else if(response.status === 404) {
                    MessagesError('Hubo un error al eliminar el turno.');
                    return;
                } else{
                    MessagesError('Hubo un error en el servidor.');
                    return;
                }
                
            } else if(response.ok){
                const data = await response.json();
                console.log(data);  
                if (data) {
                    MessagesSuccess('Turno eliminado exitosamente');
                }
                else {
                    MessagesError('No se pudieron guardar los datos');
                }
            }     
        } catch (error) {
            MessagesError('Hubo un error en el servidor');
        }
    };


    const handleSaveTurno = (newTurno) => {
        const updatedTurno = {
            id: `T${turnos[selectedDay].length + 1}`,
            ...newTurno,
        };
        setTurnos({
            ...turnos,
            [selectedDay]: [...turnos[selectedDay], updatedTurno],
        });
    };

    const classifyShiftsByDay = (data) => {
        const classified = {
            LUNES: [],
            MARTES: [],
            MIERCOLES: [],
            JUEVES: [],
            VIERNES: []
        };

        data.forEach((item) => {
            if (item.shifts && item.shifts.length > 0) {
                item.shifts.forEach((shift) => {
                    if (classified[item.day]) {
                        classified[item.day].push({
                            id: shift.id,
                            inicio: shift.startTime || "00:00", // Hora de inicio del turno
                            fin: shift.endTime || "00:00", // Hora de fin del turno
                            dayAssignment: shift.dayAssignment,
                            cupos: shift.placeAvailable , // Cambiar según la propiedad real para "cupos"
                        });
                    }
                });
            }
        });
        return classified;
    };

    const handleInstance = async () => {
        try {
            const token = localStorage.getItem("authToken");
            const response = await fetch(SERVICES_BACK.POST_INSTANCE_SHIFT+selectedCaf.id, {
                method: 'POST', 
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                
            });
            
            if (!response.ok) {
                console.log('Error:', response.status);  // Verifica el código de estado
                const errorData = await response.json();
                console.log('Error Data:', errorData);  // Imprime la respuesta completa de error
                if (response.status === 400) {
                    MessagesError('Bad request');
                } else if(response.status === 204){
                    MessagesError('No es posible cargar los turnos');
                } 
                else {
                    MessagesError('Hubo un error en el servidor');
                }
                return;
            }

            const data = await response.json();
            console.log(data);  // Agrega esto para ver la respuesta completa


            if (data) {
                MessagesSuccess('Se creo instancia');
            }
            else {
                MessagesError('No se pudieron guardar los datos');
            }
        } catch (error) {
            MessagesError('Hubo un error en el servidor');
        }
    }


    const handleViewShift = async () => {
        const fetchShift = async () => {
            const token = localStorage.getItem("authToken");
            const response = await fetch(SERVICES_BACK.GET_SHIFT_LIST + cafId, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    credentials: 'include',
                },
            });

            const data = await response.json();
            console.log("DATA"+data)
            if (Array.isArray(data)) {
                const classifiedShifts = classifyShiftsByDay(data);
                setTurnos(classifiedShifts);
                console.log(turnos);
            } else {
                throw new Error("El formato de datos de CAF es incorrecto.");
            }
        };
        toast.promise(
            fetchShift(),{
                loading: 'Cargando turnos...',
                success: <b>Cargando información de los turnos del CAF</b>,
                error: <b>Error al cargar los datos.</b>,
            }
         );
        
    };
    


    return (
        <div className="containerBody">
            <Toaster
                position="top-center"
                dir="auto"
                duration={2000}
                visibleToasts={4}
                richColors
            />
            <h1>Asignar turnos y cupos</h1>
            <div>
                
                <div className="inline-container">
                    
                    <h1>{cafName}</h1>
                    
                    <button onClick={handleViewShift}>Mostrar Turnos</button>
                    <p>Selecciona el día de la semana y añade los turnos disponibles y los cupos</p>
                </div>

                
                <div className="containerDays">
                    {Object.keys(turnos).map((day) => (
                        <div key={day} className="day-section">
                            <button onClick={() => toggleDay(day)} className="day-toggle">
                                {day}
                            </button>
                            {activeDay === day && (
                                <div className="turnos-list">
                                    <table className="tableAsSh">
                                        <thead className="thAsSh">
                                            <tr className="trAsSh">
                                                <th>Id</th>
                                                <th>Hora inicio</th>
                                                <th>Hora fin</th>
                                                <th>Cupos</th>
                                                <th className="thbutton">Acciones</th>
                                            </tr>
                                        </thead>
                                        <tbody className="tdAsSh">
                                            {turnos[day].map((turno, index) => (
                                                <tr className="trAsSh" key={turno.id}>
                                                    <td>{turno.id}</td>
                                                    <td>{turno.inicio}</td>
                                                    <td>{turno.fin}</td>
                                                    <td>{turno.cupos}</td>
                                                    <td className="tdbutton">
                                                        <div className="containerButtons">
                                                            <button className="buttonAssign" onClick={() => editShift(turnos[day][index].dayAssignment,turnos[day][index].id, turnos[day][index].inicio, turnos[day][index].fin, turnos[day][index].cupos)}><FaEdit /></button>
                                                            <button className="buttonAssign" onClick={() => removeTurno(day, index)}><MdDelete /></button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                    <div className="containerButtonNewShift">
                                        <button onClick={() => addTurno(day)}>Añadir turno</button>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                    
                    <button onClick={handleInstance}>Finalizar semestre</button>
                </div>
            </div>

            <TurnoModal
                isOpen={isModalOpen}
                onClose={() => setModalOpen(false)}
                onSave={handleSaveTurno}
                day={selectedDay}
                cafId={selectedCaf?.id} // Pasa el ID del CAF seleccionado
            />
            <ModifyShiftModal 
                isOpen={isModalEditOpen}
                onClose={() => setModalEditOpen(false)}
                day= {selectedDay}
                cafId = {selectedCaf} 
                shiftIdEdit={shiftIdEdit}
                startTimeEdit = {startTimeEdit}
                endTimeEdit = {endTimeEdit}
                placeAvailableEdit = {placeAvailableEdit}/>
        </div>
    );
};

export default AssignShiftsQuotas;
