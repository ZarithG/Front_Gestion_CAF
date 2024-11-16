import React, { useEffect, useState } from "react";
import '../styles/Header.css';
import { Link, useNavigate } from "react-router-dom"; 
import Logo from "../CAF-images/log_uptc_neg.png";
import { FaHome } from "react-icons/fa";
import { MdLogin, MdNotifications } from "react-icons/md";
import { TbCalendarTime } from "react-icons/tb";
import { GiNotebook } from "react-icons/gi";
import { MessagesError, MessagesSuccess } from "../gestion-caf/Messages";
import { STATUS, USER_TYPE, SERVICES_BACKR, SERVICES_BACK } from "../../constants/constants";

const Header = ({
    status,
}) => {
    const [roleName, setRoleName] = useState('');
    const navigate = useNavigate();

    const logout = async () => {
        try {
            const response = await fetch(SERVICES_BACK.LOGOUTAUTH, {
                method: 'POST',
                credentials: 'include',
            });
    
            if (response.ok) {
                console.log('Logout successful');
            } else {
                console.error('Error during logout:', response.status);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        const storedRoleName = localStorage.getItem("roleName");
        if (storedRoleName) {
            setRoleName(storedRoleName);
        }
    }, [status]);
    
    const isUserVerified = async () =>{
        try {
            const token = localStorage.getItem("authToken");
            const response = await fetch(SERVICES_BACK.GET_IS_USER_VERIFIED  + localStorage.getItem("userName"), {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`,
                credentials: 'include',
              }
            });
            if (response.status == 200) {
                if(!response.body.locked){
                    navigate("/register/informationData");
                }
            }else{
                MessagesError("Hubo un error en el servidor");
            }
        } catch (error) {
            console.log(error)
            MessagesError("Hubo un error en el servidor");
        }
        
    };

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
                            <li className="menuItem" onClick={async (e) => {
                                e.preventDefault();
                                
                                const isVerified = await isUserVerified();
                                if (!isVerified) {
                                    navigate('/register/informationData');
                                }else{
                                    navigate('/registration/terms');
                                }
                            }}>
                                <span className="Link">
                                    <label> Inscribirse </label>
                                    <GiNotebook className="icons" />
                                </span>
                            </li>
                            
                            <li className="menuItem" onClick={async (e) => {
                                e.preventDefault();
                                
                                const isVerified = await isUserVerified();
                                if (!isVerified) {
                                    navigate('/register/informationData');
                                }else{
                                    navigate('/scheduleShift');
                                }
                            }}>
                                <span className="Link">
                                    <label> Agendar turno </label>
                                    <TbCalendarTime className="icons" />
                                </span>
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
                                <Link className="Link" to="/" onClick={() => {
                                    localStorage.removeItem("authToken");
                                    localStorage.removeItem("userName");
                                    localStorage.removeItem("roleName");
                                    setRoleName(''); 
                                    logout();
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
