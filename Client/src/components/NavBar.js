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


  const [profileState, setProfileState] = useState({ button: <Link to={"/authorize"}>Loguin</Link>, icon: <RxAvatar size={25} className="mr-[10px]" /> })

  useEffect(() => {

    if (userAutorized) {
      setProfileState({ button: <button onClick={hadleLogout}>Loguot</button>, icon: <img src={userData.picture} alt="avatar" className="w-[25px] h-[25px] rounded-full mr-[10px]" /> })
    } else if (status === 'authorize') {
      setProfileState({ button: <Link to={"/authorize"}>Loguin</Link>, icon: <RxAvatar size={25} className="mr-[10px]" /> })
    }

  }, [userAutorized])
  const hadleLogout = () => {
    unauthorize()
    logout({ returnTo: window.location.origin })
  }

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
            <div className="text-black bg-white w-[auto] h-[40px] flex justify-center items-center hover:bg-stone-400 transition-all duration-200 rounded-[4px] px-[8px] mr-[5px]">
              <button>
                <AiOutlineShoppingCart size={25} />
              </button>
            </div>
          </NavLink>

          <div className="text-black bg-white w-[auto] h-[40px] flex justify-center items-center hover:bg-stone-400 transition-all duration-200 ml-[5px] mr-[30px] rounded-[4px] px-[10px]">
            {profileState.icon}
            {profileState.button}

          </div>

        </div>
      </div>
    </nav >
  );
};

export default NavBar;
