import React from "react";
import Slider from "react-slick";
import { deal1, deal2, deal3, deal4, deal5, deal6, deal7 } from "../../../assets";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./CarousalCategory.css";

const CarouselCategory = () => {
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    arrows: false
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    arrows: false
                }
            }
        ]
    };

    function NextArrow(props) {
        const { className, style, onClick } = props;
        return (
            <div
                className={className}
                style={{ ...style, display: "block" }}
                onClick={onClick}
            />
        );
    }

    function PrevArrow(props) {
        const { className, style, onClick } = props;
        return (
            <div
                className={className}
                style={{ ...style, display: "block" }}
                onClick={onClick}
            />
        );
    }

    return (
        <div className="carousel-container">
            <div className="text-2xl font-semibold p-3">Best Sellers</div>
            <div className="slider-wrapper">
                <Slider {...settings}>
                    <div className="slide-item">
                        <img src={deal1} alt="Deal category" />
                    </div>
                    <div className="slide-item">
                        <img src={deal2} alt="Amazon category" />
                    </div>
                    <div className="slide-item">
                        <img src={deal4} alt="Fashion category" />
                    </div>
                    <div className="slide-item">
                        <img src={deal5} alt="Computers category" />
                    </div>
                    <div className="slide-item">
                        <img src={deal6} alt="Home category" />
                    </div>
                    <div className="slide-item">
                        <img src={deal3} alt="Mobiles category" />
                    </div>
                    <div className="slide-item">
                        <img src={deal7} alt="Mobiles category" />
                    </div>
                </Slider>
            </div>
        </div>
    );
};

export default CarouselCategory;