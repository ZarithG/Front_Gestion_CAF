import React, {useState, useEffect} from "react";
import '../styles/Footer.css';
import Logo from "../CAF-images/log_uptc_neg.png";

const Footer = () => {

    return (
        <div className="FooterContainer">
            <div className="FooterContainers">
                <div className="FooterLogo">
                    <img src={Logo} alt="Logo UPTC" />
                </div>
                <div className="FooterText">
                    <div className="FooterLineOne">Línea de Actividad Física</div>
                    <div className="FooterLineTwo">Centros de Acondicionamiento físico<br/></div>
                    <div className="FooterLineThree">Institución de Educación Superior sujeta a inspección 
                        y vigilancia por el Ministerio de Educación Nacional</div>
                </div>
            </div>
            <div className="FooterTittleUniversity">
                © Universidad Pedagógica y Tecnológica de Colombia 2024.
            </div>
        </div>
    );
};

export default Footer;