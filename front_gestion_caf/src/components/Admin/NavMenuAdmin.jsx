import React, { useState, useEffect } from "react";
import { FaUserTie, FaUsers } from "react-icons/fa6";
import { FaCalendarCheck } from "react-icons/fa";
import { GrYoga } from "react-icons/gr";
import { BiSolidReport } from "react-icons/bi";
import { LuDumbbell } from "react-icons/lu";
import { MdMenu } from "react-icons/md";
import { IoMdCalendar } from "react-icons/io";
import '../styles/NavMenuAdmin.css';
import { Link } from "react-router-dom";
import { USER_TYPE } from "../../constants/constants";

const NavMenuAdmin = ({
    navStatus, setNavStatus
}) => {
    const [isExpanded, setIsExpanded] = useState(false); // Estado para controlar si el menú está expandido o comprimido
    const [roleName, setRoleName] = useState(""); // Estado para almacenar el rol del usuario    

    const handleMouseEnter = () => setIsExpanded(true); // Expande el menú cuando el puntero entra
    const handleMouseLeave = () => setIsExpanded(false); // Comprime el menú cuando el puntero sale

    useEffect(() => {
        console.log("ESTADO DEL NAV MENU")
        // Escucha los cambios de 'roleName' en localStorage
        const storedRoleName = localStorage.getItem("roleName");
        if (storedRoleName) {
            setRoleName(storedRoleName);
        }

        // Si el usuario cambia su rol después de iniciar sesión o de navegar, actualizamos
        const handleStorageChange = () => {
            const updatedRoleName = localStorage.getItem("roleName");
            if (updatedRoleName) {
                setRoleName(updatedRoleName);
            }
        };

        // Agregamos un event listener para detectar los cambios en el localStorage
        window.addEventListener("storage", handleStorageChange);

        // Limpiamos el event listener cuando el componente se desmonte
        return () => {
            window.removeEventListener("storage", handleStorageChange);
        };
    }, [navStatus]);
    
    if (!roleName || roleName === USER_TYPE.USER) {
        return null;
    }

    return (
        roleName !== USER_TYPE.USER && roleName !== USER_TYPE.SPORTSMAN && roleName !== "" && (
            <div
                className={`menuNavContainer ${isExpanded ? "expanded" : "collapsed"}`}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <MdMenu className="menuNavMenuIcon" />
                <ul className="menuNavList">
                    {roleName === USER_TYPE.ADMIN && (
                        <li className="menuNavItem">
                            <Link className="LinkNav" to="/admin/fitnessCenterDirector">
                                <FaUserTie className="menuNavIcon" />
                                {isExpanded && <span>Director Bienestar</span>}
                            </Link>
                        </li>
                    )}
                    {(roleName === USER_TYPE.DIRECTOR || roleName === USER_TYPE.ADMIN) && (
                        <li className="menuNavItem">
                            <Link className="LinkNav" to="/admin/fitnessCenterCoordinators">
                                <GrYoga className="menuNavIcon" />
                                {isExpanded && <span>Coordinadores</span>}
                            </Link>
                        </li>
                    )}
                    {(roleName === USER_TYPE.DIRECTOR || roleName === USER_TYPE.ADMIN) && (
                        <li className="menuNavItem">
                            <Link className="LinkNav" to="/admin/reportAttendedShift">
                                <BiSolidReport className="menuNavIcon" />
                                {isExpanded && <span>Reportes</span>}
                            </Link>
                        </li>
                    )}
                    {(roleName === USER_TYPE.DIRECTOR || roleName === USER_TYPE.ADMIN) && (
                        <li className="menuNavItem">
                            <Link className="LinkNav" to="/admin/fitnessCenters">
                                <LuDumbbell className="menuNavIcon" />
                                {isExpanded && <span>Gestionar CAF</span>}
                            </Link>
                        </li>
                    )}
                    {(roleName === USER_TYPE.COORDINATOR) && (
                        <li className="menuNavItem">
                            <Link className="LinkNav" to="/admin/assignShiftsQuotas">
                                <IoMdCalendar className="menuNavIcon" />
                                {isExpanded && <span>Gestionar Turnos</span>}
                            </Link>
                        </li>
                    )}
                    {(roleName === USER_TYPE.COORDINATOR) && (
                        <li className="menuNavItem">
                            <Link className="LinkNav" to="/admin/registerAttendance">
                                <FaCalendarCheck className="menuNavIcon" />
                                {isExpanded && <span>Registrar asistencia</span>}
                            </Link>
                        </li>
                    )}
                    {(roleName === USER_TYPE.COORDINATOR || roleName === USER_TYPE.ADMIN || roleName === USER_TYPE.DIRECTOR) && (
                        <li className="menuNavItem">
                            <Link className="LinkNav" to="/admin/fitnessCenterUser">
                                <FaUsers className="menuNavIcon" />
                                {isExpanded && <span>Usuarios CAF</span>}
                            </Link>
                        </li>
                    )}
                </ul>
            </div>
        )
    );
};

export default NavMenuAdmin;
