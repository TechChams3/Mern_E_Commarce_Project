import React from "react";
import { useState } from "react";
import {
  AiOutlineHome,
  AiOutlineShopping,
  AiOutlineLogin,
  AiOutlineUser,
  AiOutlineShoppingCart,
  AiOutlineUserAdd,
} from "react-icons/ai";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./navigation.css";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../../Redux/api/userApislice";
import { logout } from "../../Redux/features/auth/authSlice";
import FavoritesCount from "../Product/FavoritesCount";
const Navegation = () => {
  const { userInfo } = useSelector((state) => state.auth);

  const [dropdownOpen, setdropdownOpen] = useState(false);
  const [showsidebar, setshowsidebar] = useState(false);
  const toggleDropdown = () => {
    setdropdownOpen(!dropdownOpen);
  };
  const togglesidebar = () => {
    setshowsidebar(!showsidebar);
  };
  const closeSidebar = () => {
    setshowsidebar(false);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutApiCall] = useLogoutMutation();
  const logoutHandeler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  const { cartItems } = useSelector((state) => state.cart);
  return (
    <div
      style={{ zIndex: 999 }}
      className={`${
        showsidebar ? "hidden" : "flex"
      } xl:flex lg:flex md:hidden sm:hidden flex-col justify-between p-4 text-white bg-black w-[4%] hover:w-[15%] h-[100vh] fixed`}
      id="navigation-container"
    >
      <div className="flex flex-col justify-center space-y-4">
        <Link
          to="/"
          className="flex items-center transition-transform transform hover:translate-x-2"
        >
          <AiOutlineHome className="mr-2 mt-[3rem]" size={26} />
          <span className="hidden nav-item-name mt-[3rem]">Home</span>
        </Link>
        <Link
          to="/shop"
          className="flex items-center transition-transform transform hover:translate-x-2"
        >
          <AiOutlineShopping className="mr-2 mt-[3rem]" size={26} />
          <span className="hidden nav-item-name mt-[3rem]">Shop</span>
        </Link>
        <Link
          to="/cart"
          className="flex items-center transition-transform transform hover:translate-x-2"
        >
          <AiOutlineShoppingCart className="mr-2 mt-[3rem]" size={26} />
          <span className="hidden nav-item-name mt-[3rem]">Card</span>
          <div className="absolute top-9">
            {cartItems.length > 0 && (
              <span>
                <span className="px-1 py-0 text-sm text-white bg-pink-500 rounded-full">
                  {cartItems.reduce((a, c) => a + c.qty, 0)}
                </span>
              </span>
            )}
          </div>
        </Link>
        <Link
          to="/favorite"
          className="flex items-center transition-transform transform hover:translate-x-2"
        >
          <FaHeart className="mr-2 mt-[3rem]" size={26} />
          <span className="hidden nav-item-name mt-[3rem]">Favorites</span>{" "}
          <FavoritesCount />
        </Link>
      </div>

      <div className="relative">
        <button
          onClick={toggleDropdown}
          className="flex items-center text-gray-800 focus:outline-none"
        >
          {userInfo ? (
            <span className="text-white">{userInfo.username}</span>
          ) : (
            <></>
          )}
          {userInfo && (
            <svg
              className={`h-4 w-4 ml-1 ${
                dropdownOpen ? "transform rotate-180" : ""
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={dropdownOpen ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"}
              />
            </svg>
          )}
        </button>
        {dropdownOpen && userInfo && (
          <ul
            className={`absolute right-0 mt-2 mr-14 space-y-2 bg-white text-gray-600 ${
              !userInfo.isAdmin ? "-top-20" : "-top-80"
            }`}
          >
            {userInfo.isAdmin && (
              <>
                <li>
                  <Link
                    to="/admin/dashboard"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    DashBoard
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/productlist"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Products
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/categorylist"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Categorys
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/dasbord"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Orderlists
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/userlist"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Users
                  </Link>
                </li>
              </>
            )}
            <li>
              <Link to="/profile" className="block px-4 py-2 hover:bg-gray-100">
                Profile
              </Link>
            </li>
            <li>
              <Link
                to="/admin/dasbord"
                onClick={logoutHandeler}
                className="block px-4 py-2 hover:bg-gray-100"
              >
                Logout
              </Link>
            </li>
          </ul>
        )}
        {!userInfo && (
          <ul>
            <li>
              <Link
                to="/login"
                className="flex items-center transition-transform transform hover:translate-x-2"
              >
                <AiOutlineLogin className="mr-2 mt-[3rem]" size={26} />
                <span className="hidden nav-item-name mt-[3rem]">Login</span>
              </Link>
            </li>
            <li>
              <Link
                to="/register"
                className="flex items-center transition-transform transform hover:translate-x-2"
              >
                <AiOutlineUserAdd className="mr-2 mt-[3rem]" size={26} />
                <span className="hidden nav-item-name mt-[3rem]">Register</span>
              </Link>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default Navegation;
