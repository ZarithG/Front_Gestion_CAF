import React, { useState } from "react";
import { FaUserTie, FaUsers } from "react-icons/fa6";
import { GrYoga } from "react-icons/gr";
import { LuDumbbell } from "react-icons/lu";
import { MdMenu } from "react-icons/md";
import { IoMdCalendar } from "react-icons/io";
import '../styles/NavMenuAdmin.css';
import { Link } from "react-router-dom";

const NavMenuAdmin = () => {
    const [isExpanded, setIsExpanded] = useState(false); // Estado para controlar si el menú está expandido o comprimido

    const handleMouseEnter = () => setIsExpanded(true); // Expande el menú cuando el puntero entra
    const handleMouseLeave = () => setIsExpanded(false); // Comprime el menú cuando el puntero sale

    return (
        <div 
            className={`menuNavContainer ${isExpanded ? "expanded" : "collapsed"}`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <MdMenu className="menuNavMenuIcon" />
            <ul className="menuNavList">
                <li className="menuNavItem">
                    <Link className="LinkNav" to="/admin/fitnessCenterDirector">
                        <FaUserTie className="menuNavIcon" />
                        {isExpanded && <span>Director Bienestar</span>}
                    </Link>
                </li>
                <li className="menuNavItem">
                    <Link className="LinkNav" to="/admin/fitnessCenterCoordinators">
                        <GrYoga className="menuNavIcon" />
                        {isExpanded && <span>Coordinadores</span>}
                    </Link>
                </li>
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
    );
};

export default NavMenuAdmin;
