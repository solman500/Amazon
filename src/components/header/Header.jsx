import React, { useEffect, useRef, useState, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import ArrowDropDownOutlinedIcon from "@mui/icons-material/ArrowDropDownOutlined";
import { Button } from "@mui/material";
import { usePopupState } from "material-ui-popup-state/hooks";

import SearchIcon from "@mui/icons-material/Search";

import { allItems } from "../../constants";
import { logo, egyptFlag, CartIcon } from "../../assets/index";
import HeaderBottom from "./HeaderBottom";
import { Link, useNavigate } from "react-router-dom";
import { getProductsData } from "../../firebase/getProducts";
import { authContext } from "../../Contexts/isAuth";
import { logout, login } from "../../firebase/auth";
import MenuPopupState from "../../utils/Dropdown";
import { Localization } from "../../constants/localization";
import { languageContext } from "../../Contexts/language";
import "./Search.css";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/firebasse"; // or firebase.js

const Header = () => {
  const navigate = useNavigate();
  const { language, setLanguage } = useContext(languageContext);
  const [prds, setPrds] = useState([]);
  const [input, setInput] = useState("");
  const navgate = useNavigate();
  const dispatch = useDispatch();

  const products = useSelector((state) => state.amazonReducer.products);
  const [loading, setLoading] = useState(true);
  const { isLogin, setLogin, displayName } = useContext(authContext);
  const [localDisplayName, setLocalDisplayName] = useState(localStorage.getItem("displayName") || "");
  // const navigate = useNavigate();
  const ref = useRef();
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    document.body.addEventListener("click", (e) => {
      if (e.target.contains(ref.current)) {
        showAll && setShowAll(false);
      }
    });
  }, [ref, showAll]);

  useEffect(() => {
    getProductsData(setPrds, setLoading);
  });

  useEffect(() => {
    // Update displayName if it changes in localStorage (e.g., after login)
    const handleStorageChange = () => {
      setLocalDisplayName(localStorage.getItem("displayName") || "");
    };
    window.addEventListener("storage", handleStorageChange);
    // Optionally, update on mount
    setLocalDisplayName(localStorage.getItem("displayName") || "");
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const onTyping = (val) => {
    setInput(val);
    // console.log(input);
  };

  const handelSearch = (searchTxt) => {
    setInput(searchTxt);
    // console.log(input);
    if (searchTxt === "" || searchTxt === undefined || searchTxt === null)
      return;
    navgate(`/results?query=${encodeURIComponent(searchTxt)}`);
    // console.log(input);
    searchTxt = "";
    setInput("");
  };
  // const handleLogout = async () => {
  //   await logout();
  //   localStorage.removeItem('token');
  //   setLogin(false);
  //   navigate('/signin');
  // };

  const changeLanguage = () => {
    setLanguage(language === "en" ? "ar" : "en");
    console.log(language);
  };

  async function handleLogin(email, password) {
    try {
      const userCredential = await login(email, password);
      const user = userCredential.user;

      // Fetch displayName from Firestore
      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        localStorage.setItem("displayName", userData.displayName || "");
      } else {
        localStorage.setItem("displayName", user.displayName || "");
      }

      // ...rest of your login logic
    } catch (error) {
      // handle error
    }
  }

  return (
    <div className="">
      <div className="sticky top-0 z-50 bg-black">
        <div className="w-full bg-amazon_blue justify-between text-white px-3 py-2 flex md:justify-between items-center gap-2 md:gap-4 lgl:gap-2 xl:gap-4">
          {/* ===================== Header Image Start here ======================== */}
          <Link to="/">
            <div className="headerHover">
              <img className="w-24 mt-2" src={logo} alt="logoImage" />
            </div>
          </Link>
          {/* ===================== Header Image End here ========================== */}
          {/* ===================== Header Deliver Start here ====================== */}
          <div className="hidden md:inline-flex headerHover">
            <LocationOnOutlinedIcon />
            <p className="flex flex-col text-xs text-lightText">
              {language === "en"
                ? Localization.header.deliverTo.en
                : Localization.header.deliverTo.ar}
              <span className="text-sm font-semibold -mt-1 text-whiteText">
                {language === "en"
                  ? Localization.header.egypt.en
                  : Localization.header.egypt.ar}
              </span>
            </p>
          </div>
          {/* ===================== Header Deliver End here ======================== */}
          {/* ===================== Header Search Start here ======================== */}
          <div className="hidden lg:inline-flex h-10 rounded-md flex-grow relative">
            <span
              onClick={() => setShowAll(!showAll)}
              className="w-14 h-full bg-gray-200 hover:bg-gray-300 border-2 cursor-pointer duration-300 text-sm text-amazon_blue font-titleFont flex items-center justify-center rounded-tl-md rounded-bl-md"
            >
              All{" "}
              <span>
                <ArrowDropDownOutlinedIcon />
              </span>
            </span>

            {showAll && (
              <div>
                <ul
                  ref={ref}
                  className="absolute w-56 h-80 top-10 left-0 overflow-y-scroll overflow-x-hidden bg-white border-[1px] border-amazon_blue text-black p-2 flex flex-col gap-1 z-50"
                >
                  {allItems.map((item) => (
                    <li
                      className="text-sm tracking-wide font-titleFont border-b-[1px] border-b-transparent hover:border-b-amazon_blue cursor-pointer duration-200"
                      key={item._id}
                      onClick={() =>
                        item.title &&
                        navigate(`/catgory/${item.title.toLocaleLowerCase()}`)
                      }
                      // Ensure item.category is defined before navigating
                    >
                      {item.title}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="w-full flex-grow column">
              <div className="flex w-full flex-grow items-center">
                <input
                  autoComplete="off"
                  className="h-10 w-full text-base text-amazon_blue flex-grow outline-none border-none px-2"
                  type="search"
                  name="search"
                  id="search"
                  placeholder="Search Amazon.eg"
                  value={input}
                  onChange={(e) => onTyping(e.target.value)}
                />
                <span className="w-12 h-10 flex items-center justify-center bg-amazon_yellow hover:bg-[#f3a847] duration-300 text-amazon_blue cursor-pointer rounded-tr-md rounded-br-md">
                  <SearchIcon onClick={() => handelSearch(input)} />
                </span>
              </div>
              <div className="dropDown w-full">
                {prds
                  .filter((val) => {
                    const searchTxt = input.toLowerCase();
                    const productTitle = val.title.toLowerCase();
                    return (
                      searchTxt &&
                      productTitle.startsWith(searchTxt) &&
                      productTitle !== searchTxt
                    );
                  })
                  .slice(0, 5)
                  .map((item, index) => (
                    <div
                      className="dropDown-row"
                      key={index}
                      onClick={() => handelSearch(item.title)}
                    >
                      {item.title}
                    </div>
                  ))}
              </div>
            </div>
          </div>
          {/* ===================== Header Search End here ========================== */}
          {/* ===================== Header Signin Start here ======================== */}
          <div
            className="flex flex-col items-start justify-center headerHover "
            onClick={changeLanguage}
          >
            <p className="flex text-sm font-semibold -mt-1 text-whiteText">
              <img
                src={egyptFlag}
                alt="Egypt Flag"
                width="20px"
                height="20px"
              />
              {language === "en"
                ? Localization.header.lang.en
                : Localization.header.lang.ar}{" "}
              <span>
                <ArrowDropDownOutlinedIcon />
              </span>
            </p>
          </div>
          {isLogin && localDisplayName && (
            <div className="flex flex-col items-start justify-center headerHover">
              {/* <p className="text-xs text-lightText font-light">Hello, {localDisplayName}</p> */}
              <p className="flex text-sm font-semibold -mt-1 text-whiteText">
                <MenuPopupState logout={logout} setLogin={setLogin} />
              </p>
            </div>
          )}
          {!isLogin && (
            <Link to="/signin">
              <div className="flex flex-col items-start justify-center headerHover ">
                <p className="  font-bold text-[10px] px-5">
                  {language === "en"
                    ? Localization.header.helloSing.en
                    : Localization.header.helloSing.ar}
                </p>
                <p className="hidden md:inline-flex text-sm font-semibold -mt-1 text-whiteText">
                  Accounts & Lists <span></span>
                </p>
              </div>
            </Link>
          )}

          {/* 

      





        {/* ===================== Header Signin End here ========================== */}
          {/* ===================== Header Orders Start here ======================== */}
          <Link to="/orders">
            <div className="hidden md:flex flex-col items-start justify-center headerHover">
              <p className=" text-lightText font-light">
                {language === "en"
                  ? Localization.header.Returns.en
                  : Localization.header.Returns.ar}
              </p>
              <p className="text-sm font-semibold -mt-1 text-whiteText">
                {language === "en"
                  ? Localization.header.Orders.en
                  : Localization.header.Orders.ar}
              </p>
            </div>
          </Link>
          {/* ===================== Header Orders End here ========================== */}
          {/* ===================== Header Cart Start here ========================== */}
          <Link to="/cart">
            <div className="relative flex items-center headerHover">
              <img
                src={CartIcon}
                alt="cartImg"
                className="w-auto object-cover h-8 relative"
              />
              <span
                className="absolute left-1/2 -translate-x-1/2 -top-2 min-w-[20px] h-[20px] flex items-center justify-center bg-white text-amazon_yellow text-xs font-bold rounded-full shadow border border-amazon_yellow z-10"
                style={{ fontSize: "14px" }}
              >
                {products.length > 0 ? products.length : 0}
              </span>
              {/* <p className="text-sm text-white font-bold">
              {language === "en"
                ? Localization.header.cart.en
                : Localization.header.cart.ar}
            </p> */}
            </div>
          </Link>

          {/* ===================== Header Cart End here ============================ */}
          {/* ===================== Header Logout Start here ======================== */}

          {/* <div className="flex flex-col justify-center items-center headerHover relative">
          <LogoutIcon />
          <p className="hidden mdl:inline-flex text-xs font-semibold text-whiteText">
            Log out
          </p>
        </div> */}
        </div>
        <div className="lg:hidden sm:flex h-10  flex-grow relative">
            <span
              onClick={() => setShowAll(!showAll)}
              className="w-14 h-full bg-gray-200 hover:bg-gray-300 border-2 cursor-pointer duration-300 text-sm text-amazon_blue font-titleFont flex items-center justify-center  "
            >
              All{" "}
              <span>
                <ArrowDropDownOutlinedIcon />
              </span>
            </span>

            {showAll && (
              <div>
                <ul
                  ref={ref}
                  className="absolute w-56 h-80 top-10 left-0 overflow-y-scroll overflow-x-hidden bg-white border-[1px] border-amazon_blue text-black p-2 flex flex-col gap-1 z-50"
                >
                  {allItems.map((item) => (
                    <li
                      className="text-sm tracking-wide font-titleFont border-b-[1px] border-b-transparent hover:border-b-amazon_blue cursor-pointer duration-200"
                      key={item._id}
                      onClick={() =>
                        item.title &&
                        navigate(`/catgory/${item.title.toLocaleLowerCase()}`)
                      }
                      // Ensure item.category is defined before navigating
                    >
                      {item.title}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="w-full flex-grow column">
              <div className="flex w-full flex-grow items-center">
                <input
                  autoComplete="off"
                  className="h-10 w-full text-base text-amazon_blue flex-grow outline-none border-none px-2"
                  type="search"
                  name="search"
                  id="search"
                  placeholder="Search Amazon.eg"
                  value={input}
                  onChange={(e) => onTyping(e.target.value)}
                />
                <span className="w-12 h-10 flex items-center justify-center bg-amazon_yellow hover:bg-[#f3a847] duration-300 text-amazon_blue cursor-pointer ">
                  <SearchIcon onClick={() => handelSearch(input)} />
                </span>
              </div>
              <div className="dropDown w-full">
                {prds
                  .filter((val) => {
                    const searchTxt = input.toLowerCase();
                    const productTitle = val.title.toLowerCase();
                    return (
                      searchTxt &&
                      productTitle.startsWith(searchTxt) &&
                      productTitle !== searchTxt
                    );
                  })
                  .slice(0, 5)
                  .map((item, index) => (
                    <div
                      className="dropDown-row"
                      key={index}
                      onClick={() => handelSearch(item.title)}
                    >
                      {item.title}
                    </div>
                  ))}
              </div>
            </div>
          </div>  
        <HeaderBottom />
      </div>
      
    </div>
  );
};

export default Header;
