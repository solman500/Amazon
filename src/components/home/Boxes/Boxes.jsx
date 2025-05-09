import React from 'react'
import CarouselCategory from './CarousalCategory';
import HomePageCard from './HomePageCard';
import {box1, box2, box3, box4, ad, AmazonEg1, music, creature, electronics, beauty, adds} from "../../../assets/index.js"
import Slides from '../../slides/slides.jsx';
import FadeIn from '../../../utils/fade.jsx';
import './Boxes.css';

export default function Boxes(props) {
    return (
        <div className="boxes-container">
            <div className="boxes-wrapper">
                <div className="boxes-grid">
                    <HomePageCard
                        title={"Saving Bundles | Up to 30% off"}
                        img={box1}
                        link={"See more"}
                    />
                    <HomePageCard
                        title={"Up to 50% off Home & Outdoors Tools"}
                        img={box2}
                        link={"See more"}
                    />
                    <HomePageCard
                        title={"Get ready for Halloween | Up to 35% off"}
                        img={box3}
                        link={"See more"}
                    />
                    <HomePageCard
                        title={"Kitchen essentials | Up to 15% off"}
                        img={box4}
                        link={"See more"}
                    />
                    <HomePageCard
                        title={"Beauty picks"}
                        img={beauty}
                        link={"See more"}
                    />
                    <HomePageCard
                        title={"Electronics"}
                        img={electronics}
                        link={"See more"}
                    />
                    <HomePageCard
                        title={"Today's Deal"}
                        img={creature}
                        link={"See more"}
                    />
                    <HomePageCard
                        title={"Musical Instruments | Wide selection"}
                        img={music}
                        link={"See more"}
                    />
                </div>
                <CarouselCategory />
                <Slides />
                <FadeIn>
                    <img
                        className="advertisement-image"
                        src={ad}
                        alt="Advertisement"
                    />
                </FadeIn>
            </div>
        </div>
    )
}
