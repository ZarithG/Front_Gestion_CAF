import React, { useEffect, useState } from "react";
import '../styles/Header.css';
import { Link } from "react-router-dom"; 
import Logo from "../CAF-images/log_uptc_neg.png";
import { FaHome } from "react-icons/fa";
import { MdLogin, MdNotifications } from "react-icons/md";
import { TbCalendarTime } from "react-icons/tb";
import { GiNotebook } from "react-icons/gi";
import { STATUS, USER_TYPE } from "../../constants/constants";

const Header = ({
    status,
}) => {
    const [roleName, setRoleName] = useState('');

    useEffect(() => {
        const storedRoleName = localStorage.getItem("roleName");
        if (storedRoleName) {
            setRoleName(storedRoleName);
        }
    }, []);
    
    return (
        <div className="headerContainer">
            <img className="headerLogo" src={Logo} alt="Logo UPTC" />
            <div className="menuContainer">
                <ul className="menuList">
                    <li className="menuItem">
                        <Link className="Link" to="/">
                            <label> Inicio </label>
                            <FaHome className="icons" />
                        </Link>
                    </li>
                    {!roleName && (
                        <li className="menuItem">
                            <Link className="Link" to="/login">
                                <label> Iniciar sesión </label>
                                <MdLogin className="icons" />
                            </Link>
                        </li>
                    )}
                    {/* Mostrar opciones específicas para usuarios con rol USER */}
                    {roleName === USER_TYPE.USER && (
                        <>
                            <li className="menuItem">
                                <Link className="Link" to="/registration/terms">
                                    <label> Inscribirse </label>
                                    <GiNotebook className="icons" />
                                </Link>
                            </li>
                            <li className="menuItem">
                                <Link className="Link" to="/scheduleShift">
                                    <label> Agendar turno </label>
                                    <TbCalendarTime className="icons" />
                                </Link>
                            </li>
                        </>
                    )}
                    {/* Mostrar opciones comunes a todos los roles registrados */}
                    {roleName && (
                        <>
                            <li className="menuItem">
                                <Link className="Link" to="/notifications">
                                    <label> Notificaciones </label>
                                    <MdNotifications className="icons" />
                                </Link>
                            </li>
                            <li className="menuItem">
                                <Link className="Link" to="/logout" onClick={() => {
                                    localStorage.removeItem("authToken");
                                    localStorage.removeItem("userName");
                                    localStorage.removeItem("roleName");
                                    setRoleName(''); // Reinicia el estado de roleName
                                }}>
                                    <label> Cerrar sesión </label>
                                    <MdLogin className="icons" />
                                </Link>
                            </li>
                        </>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default Header;
