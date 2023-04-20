import React from "react";
import logo from "../assets/logo.png";
import { NavLink } from "react-router-dom";
import SearchBar from "./SearchBar";
import { AiOutlineShoppingCart } from 'react-icons/ai'
import { RxAvatar } from 'react-icons/rx'
import { useSelector } from "react-redux";

const NavBar = ({className}) => {
  const {top,width}= useSelector(({state}) => state.sidebar)
  
  return (
    <nav className={`fixed top-0 left-0 z-50 flex justify-between items-center bg-black w-[100%] h-[${top}px] text-white`}>
      <div className="flex justify-center w-[300px] p-5">
        <NavLink to='/'>
          <img src={logo} alt="logo" className="w-36" />
        </NavLink>
      </div>

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
        <div className="text-white">
          <SearchBar />
        </div>
        
        <div className="flex items-center ml-[50px]">

            <NavLink to='/cart' className="hover: transition-all duration-500">
              <div className="text-black bg-white w-[45px] h-[80px] flex justify-center items-center hover:bg-stone-400 transition-all duration-200">
                <button>
                  <AiOutlineShoppingCart size={25}/>
                </button>
              </div>
            </NavLink>

            
            <NavLink to='/user' className="hover: transition-all duration-500">
              <div className="text-black bg-white w-[45px] h-[80px] flex justify-center items-center hover:bg-stone-400 transition-all duration-200 ml-[5px] mr-[30px]">
                <button>
                  <RxAvatar size={30}/>
                </button>
              </div>
            </NavLink>

        </div>
      </div>
    </nav >
  );
};

export default NavBar;
