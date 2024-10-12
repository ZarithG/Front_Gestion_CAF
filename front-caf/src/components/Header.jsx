import React from 'react';
import Logo from "./CAF-images/Logo_uptc.png"; 
import User from "./CAF-images/usuario.png"

const Header = () => {
  return (
    <div className="headerContainer">
        <img className="headerIconLogo" src={Logo}/>
        <div className="headerTitle"></div>
        <img className="headerIconUser" src={User}/>
    </div>
  );
};

export default Header;