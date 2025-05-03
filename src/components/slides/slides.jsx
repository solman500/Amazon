import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Virtual } from "swiper/modules";
import { useNavigate } from "react-router-dom";
import { GETallProducts } from "../../store/slices/allProducts";
import { getCategoriesData } from "../../firebase/getCategory";
import { getBrandsData } from "../../firebase/getBrands";
import Card from "../../components/card/card";
import FadeIn from "../../utils/fade.jsx";
import { right, left } from "../../assets/index";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";


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

  const pagination = {
    clickable: true,
    renderBullet: (index, className) => `<span class="${className}"></span>`,
  };

  const handleSwiperNav = {
    nextEl: ".custom-next",
    prevEl: ".custom-prev",
  };

  const breakpointsProducts = {
    0: { slidesPerView: 1, slidesPerGroup: 1 },
    480: { slidesPerView: 2, slidesPerGroup: 2 },
    768: { slidesPerView: 3, slidesPerGroup: 3 },
    1024: { slidesPerView: 4, slidesPerGroup: 4 },
  };

  const breakpointsBrandsCats = {
    0: { slidesPerView: 2 },
    480: { slidesPerView: 3 },
    768: { slidesPerView: 4 },
    1024: { slidesPerView: 5 },
  };

  return (
    <>
      {/* Today's Deals */}
      <FadeIn>
        <div className="today_deals_heading">
          <h1>Shop Today's Deals</h1>
          <p><a href="#">See all deals</a></p>
        </div>
        <div className="bg-amazonclone-background m-3">
          <Swiper
            modules={[Virtual, Navigation, Pagination]}
            slidesPerView={2}
            spaceBetween={10}
            // pagination={pagination}
            navigation={handleSwiperNav}
            // breakpoints={breakpointsProducts}
            virtual
          >
            {allProducts.map((prd, index) => (
              <div className="space-x-2">
              <SwiperSlide key={`product-${index}`} virtualIndex={index}>
                <Card prd={prd} className="w-full h-40 object-cover rounded-md m-2"/>
              </SwiperSlide>
              </div>
            ))}
            <div className="custom-next"><img className="to" src={right} alt="Next" /></div>
            <div className="custom-prev"><img className="to" src={left} alt="Prev" /></div>
          </Swiper>
        </div>
      </FadeIn>

      {/* Categories */}
      <FadeIn>
        <div className="today_deals_heading">
          <h1>Shop by Category</h1>
          <p><a href="/categories">See all Categories</a></p>
        </div>
        <div className=" m-3">
          <Swiper
            slidesPerView={3}
            spaceBetween={20}
            centeredSlides={true}
            pagination={pagination}
            navigation={handleSwiperNav}
            modules={[Navigation]}
            breakpoints={breakpointsBrandsCats}
          >
            {categories.map((cat, i) => (
             <SwiperSlide
             key={`cat-${i}`}
             virtualIndex={i}
             onClick={() => navigate(`/catgory/${cat.slug}`)}
             className="cursor-pointer"
           >
             <img
               id="imgCat"
               src={cat.image}
               alt={cat.name}
               className="w-full h-40 object-cover rounded-md m-2"
             />
           </SwiperSlide>
            ))}
            <div className="custom-next"><img className="to" src={right} alt="Next" /></div>
            <div className="custom-prev"><img className="to" src={left} alt="Prev" /></div>
          </Swiper>
        </div>
      </FadeIn>

      {/* Brands */}
      <FadeIn>
        <div className="today_deals_heading">
          <h1>Shop by Brands</h1>
          <p><a href="/brands">See all Brands</a></p>
        </div>
        <div className="bg-white m-3">
          <Swiper
            slidesPerView={5}
            spaceBetween={20}
            centeredSlides={true}
            pagination={pagination}
            navigation={handleSwiperNav}
            modules={[Navigation]}
            breakpoints={breakpointsBrandsCats}
          >
            {brands.map((brand, i) => (
              <SwiperSlide
                key={`brand-${i}`}
                onClick={() => navigate(`/brandsdetails/${brand.name}`)}
                className="cursor-pointer"
              >
                <img id="imgCat" src={brand.image} alt={brand.name} />
              </SwiperSlide>
            ))}
            <div className="custom-next"><img className="to" src={right} alt="Next" /></div>
            <div className="custom-prev"><img className="to" src={left} alt="Prev" /></div>
          </Swiper>
        </div>
      </FadeIn>
    </>
  );
}
