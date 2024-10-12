import React from "react";
import listIcon from "./CAF-images/list.svg";
import HomeIcon from '@material-ui/icons/Home';
import CalendarIcon from '@material-ui/icons/CalendarToday';

import { USER_TYPE, PAGES } from "../constants/constants";

const NavMenu = ({
  userType,
  handleCurrentPage,
  currentService,
}) => {
  return (
    <div className="menuContainer">
      <ul className="menuList">
        <li
          className="menuItem"
          onClick={() => {
            handleCurrentPage(PAGES.DIRECTOR);
          }}
        >
          <HomeIcon className="menuIcon"/>
          <span>Inicio</span>
        </li>
        <li
          className="menuItem"
          onClick={() =>{handleCurrentPage(PAGES.DIRECTOR)}
          }
        >
          <CalendarIcon className="menuIcon"/>
          <span>Crear turno</span>
        </li>
        {userType === USER_TYPE.USER && (
          <li
            className="menuItem"
            onClick={() => handleCurrentPage(PAGES.TURN)}
          >
            <img className="menuIcon" src={listIcon} alt="listIcon"/>
            <span>Ver turno</span>
          </li>
        )}
        
        {userType === USER_TYPE.USER && (
          <li
            className="menuItem"
            onClick={() => handleCurrentPage(PAGES.NOTIFICATIONS)}
          >
            <span>Notificaciones</span>
          </li>
        )}
      </ul>
      
    </div>
  );
};

export default NavMenu;
