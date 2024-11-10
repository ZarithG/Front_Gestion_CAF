import React, { useState } from "react"; // Import useState
import { FaUserTie } from "react-icons/fa6";
import { GrYoga } from "react-icons/gr";
import { LuDumbbell } from "react-icons/lu";
import { MdMenu } from "react-icons/md";
import { IoMdCalendar } from "react-icons/io";
import { FaUsers } from "react-icons/fa";
import '../styles/NavMenuAdmin.css';
import { Link } from "react-router-dom";
import { USER_TYPE } from "../../constants/constants";

const NavMenuAdmin = () => {
    const [roleName, setRoleName] = useState(''); // Initialize roleName state

    return (
        roleName === USER_TYPE.ADMIN && (
            <div className="menuNavContainer">
                <ul className="menuNavList">
                    <MdMenu className="menuNavMenuIcon" />
                    <li className="menuNavItem">
                        <Link className="LinkNav" to="/">
                            <FaUserTie className="menuNavIcon" />
                            <span>Director Bienestar</span>
                        </Link>
                    </li>
                    <li className="menuNavItem">
                        <Link className="LinkNav" to="/scheduleShift">
                            <GrYoga className="menuNavIcon" />
                            <span>Coordinadores</span>
                        </Link>
                    </li>
                    <li className="menuNavItem">
                        <Link className="LinkNav" to="/scheduleShift">
                            <LuDumbbell className="menuNavIcon" />
                            <span>Gestionar CAF</span>
                        </Link>
                    </li>
                    <li className="menuNavItem">
                        <Link className="LinkNav" to="/scheduleShift">
                            <IoMdCalendar className="menuNavIcon" />
                            <span>Gestionar Turnos</span>
                        </Link>
                    </li>
                    <li className="menuNavItem" onClick={() => { }}>
                        <FaUsers className="menuNavIcon" />
                        <span>Usuarios CAF</span>
                    </li>
                </ul>
            </div>
        )
    );
};

export default NavMenuAdmin;
