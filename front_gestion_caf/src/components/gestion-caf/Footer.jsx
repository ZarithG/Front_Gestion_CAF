import { useState, useEffect } from 'react';
import '../styles/Footer.css';
import Logo from "../CAF-images/log_uptc_neg.png";

const Footer = () => {
    const [isHidden, setIsHidden] = useState(false); // Estado para controlar la visibilidad del footer
    let lastScrollTop = 0; // Variable para almacenar la última posición de desplazamiento

    useEffect(() => {
        const handleScroll = () => {
            const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

            if (currentScroll > lastScrollTop) {
                // Si el scroll es hacia abajo, ocultamos el footer
                setIsHidden(true);
            } else {
                // Si el scroll es hacia arriba, mostramos el footer
                setIsHidden(false);
            }

            lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; // Actualizamos la última posición
        };

        window.addEventListener('scroll', handleScroll); // Agregamos el event listener para el scroll

        // Limpiar el event listener cuando el componente se desmonte
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className={`FooterContainer ${isHidden ? 'hidden' : ''}`}>
            <div className="FooterContainers">
                <div className="FooterLogo">
                    <img src={Logo} alt="Logo UPTC" />
                </div>
                <div className="FooterText">
                    <div className="FooterLineOne">Línea de Actividad Física</div>
                    <div className="FooterLineTwo">Centros de Acondicionamiento físico<br /></div>
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
