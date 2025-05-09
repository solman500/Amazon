import "./App.css";
import React from "react";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Products from "./components/home/Products";
import { useState, useContext } from "react";
import { LanguageProvider } from "../src/Contexts/language";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  Route,
  RouterProvider,
  ScrollRestoration,
} from "react-router-dom";

import { AuthProvider, authContext } from "./Contexts/isAuth";
import { useEffect } from "react";
import { SquareLoader } from "react-spinners";

import Home from "./pages/home/Home";
import Cart from "./pages/Cart";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import CheckOut from "./pages/Checkout";
import Orders from "./pages/Orders";
import Brands from "./pages/Brands";
import Category from "./pages/Category";
import NotFound from "./pages/notFound/NotFound";
import SubCategory from "./pages/Sub-Category";
import Details from "./pages/details/Details";
import Help from "./pages/Help";
import { Provider } from "react-redux";
import store from "./store/store";
import SearchResults from "./pages/SearchResults";
import AddressForm from "./components/financialForm/AddressForm";
import PaymentForm from "./components/financialForm/PaymentForm";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import BrandsDetails from "./pages/BrandsDetails";
import DashboardHeader from "./pages/userDashbourd/userDashbourd";
import YourAccount from "./pages/userDashbourd/YourAccount";
import About from "./pages/About";
import Viewsubcategory from "./pages/ViewSubCategory";
import MoversShakers from "./components/SideBar/MoversShakers";
import BestSellers from "./components/SideBar/BestSellers";
// import YourAccount from './pages/YourAccount'
import NewReleases from "./components/SideBar/NewReleases";
import TodaysDeals from "./pages/TodaysDeals";

// import {authContext} from '../Contexts/isAuth'
import spinnerImage from "./assets/Amazon-Logo.jpg"; // Import the spinner image
import ForgetPass from "./utils/forgetPassword";


const Layout = () => {
  return (
    <div>
      <Header />
      <ScrollRestoration />
      <Outlet />
      <Footer />
    </div>
  );
};

function App() {
  const [language, setLanguage] = useState("ar");
  const [loading, setLoading] = useState(false);

  const override = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "80vh",
    backgroundColor: "transparent",
  };

  const spinnerContainerStyle = {
    position: "relative",
    width: "100px", // Adjust width as needed
    height: "100px", // Adjust height as needed
    marginBottom: "15px",

  };

  const imageStyle = {
    position: "absolute",
    top: "54%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "200px", // Adjust width as needed
    height: "100px", // Adjust height as needed
    backgroundImage: `url(${spinnerImage})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "contain",
    zIndex: "-1", // Ensure the image is positioned behind the spinner
    
  };

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  const [isLogin, setLogin] = useState(
    localStorage.getItem("token") ? true : false
  );

  const [displayName] = useState();

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />}></Route>
          <Route path="/cart" element={<Cart />}></Route>
          <Route path="/catgory/:category" element={<Category />}></Route>
          <Route path="/subcategory/:name" element={<SubCategory />}></Route>
          <Route
            path="/viewsubcategory/:slug"
            element={<Viewsubcategory />}
          ></Route>
          <Route path="/todaysdeals" element={<TodaysDeals />}></Route>

          <Route path="/Movers & Shakers" element={<MoversShakers />}></Route>
          <Route path="/bestsellers" element={<BestSellers />}></Route>
          {/* <Route path="/youraccount" element={<YourAccount />}></Route> */}
          <Route path="/brands" element={<Brands />}></Route>
          <Route path="/newreleases" element={<NewReleases />}></Route>
          <Route
            path="/brandsdetails/:name"
            element={<BrandsDetails />}
          ></Route>

          <Route path="/details/:id/:sim?" element={<Details />}></Route>
          <Route path="/orders" element={<Orders />}></Route>
          <Route path="/help" element={<Help />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/results" element={<SearchResults />}></Route>
        </Route>
        <Route path="/reset" element={<ForgetPass />}></Route>
        <Route path="/signin" element={<Signin />}></Route>
        <Route path="/register" element={<Signup />}></Route>
        <Route path="/checkout" element={<CheckOut />}></Route>
        <Route path="/settingAddress" element={<AddressForm />}></Route>
        <Route path="/payment" element={<PaymentForm />} />
        <Route path="/dashuser" element={<DashboardHeader />}></Route>
        <Route path="/account" element={<YourAccount />}></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Route>
    )
  );
  return (
    <AuthProvider value={{ isLogin, setLogin, displayName }}>
      <div>
        {loading ? (
          <div style={override}>
            <div style={spinnerContainerStyle}>
              <SquareLoader
                color={"#ffcf00"}
                loading={loading}
                size={70}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            </div>
            <div style={imageStyle}></div>
          </div>
        ) : (
          <LanguageProvider value={{ language, setLanguage }}>
            <Provider store={store}>
              {/* bassBooster paypal account client id */}
              <PayPalScriptProvider
                options={{
                  "client-id":
                    "",
                }}
              >
                <RouterProvider router={router}></RouterProvider>
              </PayPalScriptProvider>
            </Provider>
          </LanguageProvider>
        )}
      </div>
    </AuthProvider>
  );
}

export default App;
