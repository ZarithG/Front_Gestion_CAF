import React from "react";
import '../styles/Header.css';
import { Link } from "react-router-dom"; 
import Logo from "../CAF-images/log_uptc_neg.png";
import { FaHome } from "react-icons/fa";
import { MdLogin, MdNotifications  } from "react-icons/md";
import { TbCalendarTime } from "react-icons/tb";
import { GiNotebook } from "react-icons/gi";
import {STATUS} from "../../constants/constants"

const Header = ({
    status,
}) => {
    
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
                    <li className="menuItem">
                        <Link className="Link" to="/login">
                        <label> Iniciar sesión </label>
                        <MdLogin className="icons" />
                        </Link>
                    </li>
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
                    <li className="menuItem">
                        <Link className="Link" to="/login">
                        <label> Notificaciones </label>
                        <MdNotifications  className="icons" />
                        </Link>
                    </li>
                    <li className="menuItem">
                        <Link className="Link" to="/login">
                        <label> Cerrar sesión </label>
                        <MdLogin className="icons" />
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Header;
