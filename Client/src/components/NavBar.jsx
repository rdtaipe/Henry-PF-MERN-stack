import React from "react";
import logo from "../assets/logo.png";
import { NavLink } from "react-router-dom";
import SearchBar from "./SearchBar";
import { AiOutlineShoppingCart } from 'react-icons/ai'
import { RxAvatar } from 'react-icons/rx'
import { useSelector } from "react-redux";
// import cart from "path/to/cart.png";
// import avatar from "path/to/avatar.png";

const NavBar = ({className}) => {
  const {top,width}= useSelector(({state}) => state.sidebar)
  // 
  return (
    <nav className={`fixed top-0 left-0 z-10 flex justify-between items-center bg-[#232323] w-[100%] h-[${top}px] text-white`}>
      <div className="flex justify-center w-[300px] rounded-r-3xl bg-slate-600 p-3">
        <NavLink to='/'>
        <img src={logo} alt="logo" className="w-52" />
        </NavLink>
      </div>

      <div className="flex items-center">
        <NavLink to='/home' className="text-white hover:text-yellow-400 hover:transform hover:scale-110 transition-all duration-500">
          Home
        </NavLink>
        <NavLink to='/about' className="text-white mx-[60px] hover:text-yellow-400 hover:transform hover:scale-110 transition-all duration-500">
          About Us
        </NavLink>
        <NavLink to='/form' className="text-white hover:text-yellow-400 hover:transform hover:scale-110 transition-all duration-500">
          Form
        </NavLink>
      </div>
      <div className="text-white">
        <SearchBar />
      </div>
      <div className="text-black bg-white rounded-full w-[50px] h-[50px] flex justify-center items-center">
        <button>
        <AiOutlineShoppingCart size={30}/>
        </button>
      </div>
      <div className="text-black bg-white w-[60px] h-[83px] flex justify-center items-center mr-[50px]">
        <button>
        <RxAvatar size={30}/>
        </button>
      </div>
    </nav >
  );
};

export default NavBar;