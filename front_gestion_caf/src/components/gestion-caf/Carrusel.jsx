import React from 'react';
import Slider from 'react-slick';
import '../styles/Carrusel.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import imagen1 from "../CAF-images/carrusel/1.png";
import imagen2 from "../CAF-images/carrusel/2.png";
import imagen3 from "../CAF-images/carrusel/3.png";
import imagen4 from "../CAF-images/carrusel/4.png";
import imagen5 from "../CAF-images/carrusel/5.png";
import imagen6 from "../CAF-images/carrusel/6.png";
import imagen7 from "../CAF-images/carrusel/7.png";
import imagen8 from "../CAF-images/carrusel/8.png";
import imagen9 from "../CAF-images/carrusel/9.png";
import imagen10 from "../CAF-images/carrusel/10.png";
import imagen11 from "../CAF-images/carrusel/11.png";

const Carousel = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 100,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    const images = [

        { id: 1, src: imagen1, alt: 'Descripción de la imagen 1' },
        { id: 2, src: imagen2, alt: 'Descripción de la imagen 2' },
        { id: 3, src: imagen3, alt: 'Descripción de la imagen 3' },
        { id: 4, src: imagen4, alt: 'Descripción de la imagen 4' },
        { id: 5, src: imagen5, alt: 'Descripción de la imagen 1' },
        { id: 6, src: imagen6, alt: 'Descripción de la imagen 2' },
        { id: 7, src: imagen7, alt: 'Descripción de la imagen 3' },
        { id: 8, src: imagen8, alt: 'Descripción de la imagen 4' },
        { id: 9, src: imagen9, alt: 'Descripción de la imagen 1' },
        { id: 10, src: imagen10, alt: 'Descripción de la imagen 2' },
        { id: 11, src: imagen11, alt: 'Descripción de la imagen 3' },
        
    ];

    return (
        <div className="carousel-container">
            <Slider {...settings}>
                {images.map(image => (
                    <div key={image.id}>
                        <img src={image.src} alt={image.alt} className="carousel-image" />
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default Carousel;
