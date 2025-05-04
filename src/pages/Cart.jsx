import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { deleteItem, resetCart, increaseQuantity, decreaseQuantity } from "../store/slices/amazonSlice";
import { motion } from "framer-motion";
import { emptyCart } from "../assets";
import { Link } from "react-router-dom";
import Slides from "../components/slides/slides";
import { useNavigate } from "react-router-dom";
import { prime1, prime2, primesvg } from "../assets/index";

const Cart = () => {
  const products = useSelector((state) => state.amazonReducer.products);
  const dispatch = useDispatch();
  const [totalAmt, setTotalAmt] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    let price = 0;
    products.map((item) => {
      price += item.price * item.quantity;
      return price;
    });
    setTotalAmt(price.toFixed(2));
  }, [products]);

  return (
    <div className="w-full bg-gray-100 p-3">
      {products.length > 0 ? (
        <>
          <div className="h-auto grid grid-cols-1 lg:grid-cols-5 gap-4 lg:gap-8 mx-auto">
            <div className="w-full bg-white px-2 lg:px-4 col-span-1 lg:col-span-3 xl:col-span-4">
              {/* Cart title */}
              <div className="font-titleFont hidden lg:flex items-center justify-between py-3">
                <h1 className="text-xl lg:text-3xl">Shopping Cart</h1>
                <h6 className="text-lg lg:text-xl self-end">Price</h6>
              </div>
              <p className="text-xs lg:text-sm text-gray-500 border-b-[1px] border-b-gray-400">
                Deselected items
              </p>

              {/* Products */}
              <div>
                {products.map((item) => (
                  <div
                    key={item.id}
                    className="w-full border-b-[1px] border-b-gray-300 p-2 lg:p-4 flex items-center gap-2 lg:gap-6"
                  >
                    <div className="w-full flex flex-col md:flex-row items-center gap-4 lg:gap-6">
                      {/* Left Section */}
                      <div className="w-full md:w-1/3 lg:w-1/4">
                        <a
                          onClick={() => navigate(`/details/${item.id}`)}
                          className="cursor-pointer"
                        >
                          <img
                            className="w-full h-32 lg:h-44 object-contain"
                            src={item.image}
                            alt="productImg"
                          />
                        </a>
                      </div>
                      
                      {/* Middle Section */}
                      <div className="w-full flex flex-col gap-1 lg:gap-2 deleteitemc">
                        <h2 className="font-semibold text-base lg:text-lg">{item.title}</h2>
                        <p className="text-xs lg:text-sm line-clamp-2">{item.description}</p>
                        <p className="text-sm lg:text-base">
                          Unit Price:{" "}
                          <span className="font-semibold">
                            EGP {item.price}.00
                          </span>
                        </p>
                        <div className="bg-[#F0F2F2] flex justify-center items-center gap-2 w-32 lg:w-36 py-1 text-center drop-shadow-lg rounded-md">
                          <p className="text-xs lg:text-base">Qty:</p>
                          <p
                            onClick={() => dispatch(decreaseQuantity(item.id))}
                            className="cursor-pointer bg-gray-200 px-1 lg:px-2 rounded-sm hover:bg-gray-400 font-semibold text-sm lg:text-base duration-300"
                          >
                            -
                          </p>
                          <p className="font-semibold text-sm lg:text-base">
                            {item.quantity}
                          </p>
                          <p
                            onClick={() => dispatch(increaseQuantity(item.id))}
                            className="cursor-pointer bg-gray-200 px-1 lg:px-2 rounded-sm hover:bg-gray-400 font-semibold text-sm lg:text-base duration-300"
                          >
                            +
                          </p>
                        </div>
                        <button
                          onClick={() => dispatch(deleteItem(item.id))}
                          className="bg-red-500 w-full lg:w-36 py-1 rounded-lg text-white mt-2 hover:bg-red-700 active:bg-red-900 duration-300 text-sm lg:text-base"
                        >
                          Delete Item
                        </button>
                      </div>

                      {/* Right Section */}
                      <div className="w-full md:w-24 deleteitemc">
                        <p className="text-base lg:text-lg font-semibold text-right lg:text-left">
                          EGP {item.price * item.quantity}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Clear Cart Button */}
              <div className="w-full py-4 deleteitemc">
                <button className="w-full lg:w-auto px-4 lg:px-10 py-2 bg-red-500 hover:bg-red-600 active:bg-red-500 text-white rounded-lg font-semibold text-sm lg:text-lg">
                  Clear Cart
                </button>
              </div>
            </div>

            {/* Checkout Section */}
            <div className="col-span-1 lg:col-span-2 xl:col-span-1 mx-auto bg-white h-auto lg:h-52 w-full lg:w-auto flex flex-col items-center p-4">
              <div className="w-full">
                <p className="flex gap-2 items-start text-xs lg:text-sm">
                  <CheckCircleIcon className="text-green-500 min-w-fit" />
                  <span>
                    Your order qualifies for FREE Shipping. Choose this option at
                    checkout. See details....
                  </span>
                </p>
                <div className="my-4">
                  <p className="font-semibold px-2 lg:px-6 py-1 flex items-center justify-between">
                    Subtotal:{" "}
                    <span className="text-base lg:text-lg font-bold">
                      EGP {totalAmt}
                    </span>
                  </p>
                </div>
                <Link to="/checkout" className="w-full">
                  <button
                    disabled={products.length === 0}
                    className="w-full font-medium text-sm lg:text-base bg-gradient-to-tr from-yellow-400 to-yellow-200 border hover:from-yellow-300 hover:to-yellow-400 border-yellow-500 hover:border-yellow-700 active:bg-gradient-to-bl active:from-yellow-400 active:to-yellow-500 duration-200 py-1.5 rounded-md"
                  >
                    Proceed to Buy
                  </button>
                </Link>
                <div className="mt-4 lg:mt-8 text-center">
                  <p className="text-xs lg:text-sm font-light mb-4">
                    Customers who shopped for our website amazon's ® Standard Fit
                    Short S... also shopped for :
                  </p>
                  <div className="flex justify-center">
                    <img className="w-20 lg:w-24" src={primesvg} alt="prime" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Slides />
        </>
      ) : (
        <motion.div
          initial={{ y: 70, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="flex flex-col lg:flex-row justify-center items-center gap-4 py-10"
        >
          <div className="w-64 lg:w-80">
            <img
              className="w-full rounded-lg p-4"
              src={emptyCart}
              alt="emptyCart"
            />
          </div>
          <div className="w-full lg:w-96 p-4 bg-white flex flex-col items-center rounded-md shadow-lg">
            <h1 className="font-bold text-lg lg:text-xl text-center">
              Your Cart feels lonely.
            </h1>
            <p className="text-xs lg:text-sm text-center mt-2">
              Your Shopping cart lives to serve. Give it purpose - fill it with
              books, electronics, videos, etc. and make it happy.
            </p>
            <Link to="/" className="w-full lg:w-auto mt-4">
              <button className="w-full bg-yellow-400 rounded-md cursor-pointer hover:bg-yellow-500 active:bg-yellow-700 px-4 lg:px-8 py-2 font-semibold text-sm lg:text-lg">
                Continue Shopping
              </button>
            </Link>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Cart;