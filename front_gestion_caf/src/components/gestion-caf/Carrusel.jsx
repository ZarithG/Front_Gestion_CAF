import React from 'react';
import Slider from 'react-slick';
import '../styles/Carrusel.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import imagen5 from "../CAF-images/carrusel/5.png";
import imagen7 from "../CAF-images/carrusel/7.png";

const Carousel = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 100,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    const images = [
        { id: 1, src: imagen7, alt: 'Descripción de la imagen 3' },
        { id: 5, src: imagen5, alt: 'Descripción de la imagen 1' },
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
