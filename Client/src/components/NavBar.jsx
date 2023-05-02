import React, { useState, useEffect } from "react";
import { Tooltip, IconButton, Menu, MenuItem, Typography, Avatar } from "@mui/material";

import logo from "../assets/logo.png";
import { NavLink, Link, useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";
import {
  AiOutlineShoppingCart,
  AiOutlineClose,
  AiOutlineMenu,
} from "react-icons/ai";
import { RxAvatar } from "react-icons/rx";
import { useSelector, useDispatch } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import { Divider } from "@mui/material";
//conponets
import Badge from "./Badge";
import Modal from "./Modal";
import Tabs from './Tabs'

import { useLocation } from "react-router-dom";

const NavBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { top, width } = useSelector(({ state }) => state.sidebar);
  const { refresh } = useSelector((state) => state);
  const { isAutorized, unauthorize, status, data, cart } = useSelector(
    ({ state }) => state.user
  );

  const { url, auth, setter } = useSelector(({ state }) => state.server);
  const { isAuthenticated, logout } = useAuth0();

  const userAutorized = isAutorized();
  const userData = data();

  const [cartProducts, setCartProducts] = useState({
    length: 0,
    products: [],
    total: 0,
  });
  const [modal, setModal] = useState(false);

  const [open, setOpen] = useState(false);

  const onClickMenu = () => {
    setOpen(!open);
  };

  useEffect(() => {
    if (userAutorized) {
      getProductCart();
    } 
  }, [userAutorized, isAuthenticated, refresh, modal]);

  const getProductCart = () => {
    auth.get(`${url}/cart/${userData._id}`).then((res) => {
      setCartProducts({
        length: res.data.products.length,
        products: res.data.products,
        total: res.data.products.reduce((acc, curr) => acc + curr.price, 0),
      });
    });
  };


  const handleProfile = () => {
    if (isAuthenticated) {
      navigate("/user");
    } else {
      navigate("/authorize");
    }
  };

  const handleModal = () => {
    unauthorize();
    logout({ returnTo: window.location.origin + "/home" });
    setModal(false);
  };

  let location = useLocation()

  return (
    <>
      <nav
        className={`fixed top-0 left-0 z-[100!important] flex justify-between items-center backdrop-filter backdrop-blur-lg backdrop-brightness-[50%] backdrop-saturate-200 w-[100%] h-[80px] text-white`}
      >
        {modal && (
          <Modal
            title={"Log out"}
            message={"Are you sure you want to leave?"}
            onFalse={() => {
              setModal(false);
            }}
            onTrue={handleModal}
          />
        )}
        <div className="relative flex justify-center w-[200px] p-5">
          <NavLink to="/">
            <img src={logo} alt="logo" className="w-32" />
          </NavLink>

        </div>

        <div
          style={{ width: `calc(100% - ${width}px)` }}
          className={`flex-col items-center md:flex md:flex-row md:relative md:top-0 md:pb-0 md:gap-0  ${open
            ? "absolute top-[80px] bg-black !w-full pb-5 gap-5 flex"
            : "hidden !w-full"
            } ${location.pathname === "/home" ? "md:justify-around" : "md:justify-between"}`}
        >
          <div className="flex items-center justify-center w-[160px] md:w-fit">
            <NavLink
              to="/home"
              className="text-white mx-4 text-lg hover:text-stone-400 hover:transform transition-all duration-500 whitespace-nowrap"
            >
              Home
            </NavLink>
            <NavLink
              to="/about"
              className="text-white mx-4 text-lg hover:text-stone-400 hover:transform transition-all duration-500 whitespace-nowrap"
            >
              About Us
            </NavLink>
            <NavLink to='/questions'
              className="text-white mx-4 text-lg hover:text-stone-400 hover:transform transition-all duration-500 whitespace-nowrap">
              Questions
            </NavLink>
          </div>

          <div className={`text-white ${location.pathname === "/home" ? "" : "hidden"}`}>
            <SearchBar />
          </div>

          <div className="flex items-center">
            <NavLink to="/cart" className="hover: transition-all duration-500">
              <div className="text-black bg-white w-[45px]  h-[40px] flex justify-center items-center hover:bg-stone-400 transition-all duration-200 px-[8px] mr-[10px]  rounded-[4px]">
                <Badge
                  origin={{ vertical: "top", horizontal: "right" }}
                  color="secondary"
                  counter={cartProducts.length}
                >
                  <AiOutlineShoppingCart size={25} />
                </Badge>
              </div>
            </NavLink>

            <div className=" bg-white w-[40px] h-[40px] flex justify-center items-center ml-0 mr-0 lg:ml-[5px] lg:mr-[30px] hover:bg-stone-400 transition-all duration-200 rounded-[4px] overflow-hidden">
                <IconButton onClick={handleProfile} >
                  <Avatar alt={userData.name} src={userData.picture} sx={{width:30,height:30}} />
                </IconButton>
            

            </div>
          </div>
        </div>

        <div className="block md:hidden">
          <button
            className="flex items-center px-3 py-2 pr-7"
            onClick={onClickMenu}
          >
            <span className="block h-6 w-6">
              {open ? (
                <AiOutlineClose className="h-full w-full text-white" />
              ) : (
                <AiOutlineMenu className="h-full w-full text-white" />
              )}
            </span>
          </button>
        </div>
      </nav>

      <div
        className={`relative bg-black`}
        style={{ width: `100% `, height: `${top}px` }}
      ></div>
    </>
  );
};

export default NavBar;
