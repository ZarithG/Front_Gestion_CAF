import React from "react";
import Logo from "../components/CAF-images/Logo_uptc.png";
import LoginForm from "./LoginForm"

const Login = ({ onStart }) => {
  return (
    <div className="LoginContainer">
      <div className="headerContainer">
        <img className="headerIconLogo" src={Logo} />
        <div className="headerTitle"></div>
      
      <div className="buttonLogin">
        <button onClick={onStart} className="startPageButtom">
          Entrar
        </button>
      </div>
      </div>
      
    </div>
  );
};

export default Login;
