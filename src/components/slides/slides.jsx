import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import { GETallProducts } from "../../store/slices/allProducts";
import { getCategoriesData } from "../../firebase/getCategory";
import { getBrandsData } from "../../firebase/getBrands";
import Card from "../../components/card/card";
import FadeIn from "../../utils/fade.jsx";
import { right, left } from "../../assets/index";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./slides.css";

export default function Slides() {
  const dispatch = useDispatch();
  const allProducts = useSelector((state) => state.allProducts.allProducts);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(GETallProducts());
    getCategoriesData(setCategories, () => {});
    getBrandsData(setBrands, () => {});
  }, [dispatch]);

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
          slidesToShow: 3,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  function NextArrow(props) {
    const { onClick } = props;
    return (
      <div className="custom-next" onClick={onClick}>
        <img className="rounded-full p-1 shadow-md hover:shadow-lg transition-shadow duration-300" src={right} alt="Next" />
      </div>
    );
  }

  function PrevArrow(props) {
    const { onClick } = props;
    return (
      <div className="custom-prev" onClick={onClick}>
        <img className="rounded-full p-1 shadow-md hover:shadow-lg transition-shadow duration-300" src={left} alt="Prev" />
      </div>
    );
  }

  return (
    <>
      {/* Today's Deals */}
      <FadeIn>
        <div className="today_deals_heading">
          <h1 className="font-mono ">Shop Today's Deals</h1>
        </div>
        <div className="bg-amazonclone-background m-3">
          <Slider {...settings}>
            {allProducts.map((prd, index) => (
              <div key={`product-${index}`}>
                <Card 
                  prd={prd} 
                  className="w-full h-40 object-cover rounded-md m-2 "
                />
              </div>
            ))}
          </Slider>
        </div>
      </FadeIn>

      {/* Categories */}
      <FadeIn>
        <div className="today_deals_heading">
          <h1>Shop by Category</h1>
          <p><a href="/categories">See all </a></p>
        </div>
        <div className="m-3">
          <Slider {...settings}>
            {categories.map((cat, i) => (
              <div
                key={`cat-${i}`}
                onClick={() => navigate(`/catgory/${cat.slug}`)}
                className="cursor-pointer"
              >
                <img
                  id="imgCat"
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-40 object-cover rounded-md m-2"
                />
              </div>
            ))}
          </Slider>
        </div>
      </FadeIn>

      {/* Brands */}
      <FadeIn>
        <div className="today_deals_heading">
          <h1>Shop by Brands</h1>
          <p><a href="/brands">See all Brands</a></p>
        </div>
        <div className="bg-white m-3">
          <Slider {...settings}>
            {brands.map((brand, i) => (
              <div
                key={`brand-${i}`}
                onClick={() => navigate(`/brandsdetails/${brand.name}`)}
                className="cursor-pointer"
              >
                <img id="imgCat" src={brand.image} alt={brand.name} />
              </div>
            ))}
          </Slider>
        </div>
      </FadeIn>
    </>
  );
}

