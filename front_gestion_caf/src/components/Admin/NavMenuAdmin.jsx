import React, { useState, useEffect } from "react";
import { FaUserTie, FaUsers } from "react-icons/fa6";
import { GrYoga } from "react-icons/gr";
import { LuDumbbell } from "react-icons/lu";
import { MdMenu } from "react-icons/md";
import { IoMdCalendar } from "react-icons/io";
import '../styles/NavMenuAdmin.css';
import { Link } from "react-router-dom";
import { USER_TYPE } from "../../constants/constants";

const NavMenuAdmin = () => {
    const [isExpanded, setIsExpanded] = useState(false); // Estado para controlar si el menú está expandido o comprimido
    const [roleName, setRoleName] = useState(""); // Estado para almacenar el rol del usuario    
    const handleMouseEnter = () => setIsExpanded(true); // Expande el menú cuando el puntero entra
    const handleMouseLeave = () => setIsExpanded(false); // Comprime el menú cuando el puntero sale

    useEffect(() => {
        const storedRoleName = localStorage.getItem("roleName"); // Obtener el rol del usuario desde localStorage
        if (storedRoleName) {
            setRoleName(storedRoleName); // Si existe el rol, se establece en el estado
        }
    }, []);

    return (
        roleName !== USER_TYPE.USER && roleName !== "" && (
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
                    <li className="menuNavItem">
                        <Link className="LinkNav" to="/admin/fitnessCenters">
                            <LuDumbbell className="menuNavIcon" />
                            {isExpanded && <span>Gestionar CAF</span>}
                        </Link>
                    </li>
                    <li className="menuNavItem">
                        <Link className="LinkNav" to="/admin/assignShiftsQuotas">
                            <IoMdCalendar className="menuNavIcon" />
                            {isExpanded && <span>Gestionar Turnos</span>}
                        </Link>
                    </li>
                    <li className="menuNavItem">
                        <Link className="LinkNav" to="/admin/fitnessCenterUser">
                            <FaUsers className="menuNavIcon" />
                            {isExpanded && <span>Usuarios CAF</span>}
                        </Link>
                    </li>
                </ul>
            </div>
        )
    );
};

export default NavMenuAdmin;