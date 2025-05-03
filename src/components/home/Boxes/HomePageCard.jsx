import React from "react";
import "./HomePageCard.css";

const HomePageCard = ({ title, img, link }) => {
    return (
        <div className="homepage-card">
            <div className="card-title">{title}</div>
            <div className="card-image-container">
                <img
                    className="card-image"
                    src={img}
                    alt="Home card"
                    loading="lazy"
                />
            </div>
            <div className="card-link">{link}</div>
        </div>
    );
};

export default HomePageCard;
