import React, { useState, useEffect } from "react";
import logo from "../assets/logo.png";
import { NavLink, Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import { AiOutlineShoppingCart } from 'react-icons/ai'
import { RxAvatar } from 'react-icons/rx'
import { useSelector } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";

const NavBar = ({ className }) => {
  const { top, width } = useSelector(({ state }) => state.sidebar)
  const { isAutorized, unauthorize, status, data } = useSelector(({ state }) => state.user)
  const { isAuthenticated, logout } = useAuth0();
  const userAutorized = isAutorized()
  const userData = data()

  const userImg = userAutorized === true ? (
    <img src={userData.picture} alt="User avatar" className="w-8 h-8 rounded-full" />
  ) : (
    <RxAvatar size={30}/>
  );


  return (
    <nav className={`fixed top-0 left-0 z-50 flex justify-between items-center bg-black w-[100%] h-[${top}px] text-white`}>
      <div className="relative flex justify-center w-[300px] p-5">
        <NavLink to='/'>
          <img src={logo} alt="logo" className="w-36" />
        </NavLink>
      </div>
      <div style={{width:`calc(100% - ${width}px)`}} className="flex items-center justify-between pr-[2%]">

        <div className="flex items-center">
          <NavLink to='/home' className="text-white hover:text-stone-400 hover:transform transition-all duration-500">
            Home
          </NavLink>
          <NavLink to='/about' className="text-white mx-[60px] hover:text-stone-400 hover:transform transition-all duration-500">
            About Us
          </NavLink>
          <NavLink to='/form' className="text-white hover:text-stone-400 hover:transform transition-all duration-500">
            Form
          </NavLink>
        </div>
     

      <div className="flex items-center">

        <div className="flex items-center">
          <div className="text-white">
            <SearchBar />
          </div>

          <div className="flex items-center ml-[50px]">

            <NavLink to='/cart' className="hover: transition-all duration-500">
              <div className="text-black bg-white w-[45px] h-[80px] flex justify-center items-center hover:bg-stone-400 transition-all duration-200 px-[8px] mr-[5px]">
                <button>
                  <AiOutlineShoppingCart size={25} />
                </button>
              </div>
            </NavLink>

            <NavLink to='/user' className="hover: transition-all duration-500">
              <div className="text-black bg-white w-[45px] h-[80px] flex justify-center items-center hover:bg-stone-400 transition-all duration-200 ml-[5px] mr-[30px]">
                <button>
                  {userImg}
                </button>
              </div>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
    </nav >
  );
};

export default NavBar;
