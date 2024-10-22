import React from "react";
import '../styles/Header.css';
import { Link } from "react-router-dom"; 
import Logo from "../CAF-images/log_uptc_neg.png";
import { FaHome } from "react-icons/fa";
import { MdLogin } from "react-icons/md";
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
                        <label> Login </label>
                        <MdLogin className="icons" />
                        </Link>
                    </li>
                    {status === STATUS.NORMAL && (
                    <li className="menuItem">
                        <Link className="Link" to="/login">
                        <label> Login </label>
                        <MdLogin className="icons" />
                        </Link>
                    </li>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default Header;
