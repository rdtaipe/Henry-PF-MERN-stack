import React, { useState, useEffect } from "react";
import logo from "../assets/logo.png";
import { NavLink, Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import { AiOutlineShoppingCart } from 'react-icons/ai'
import { RxAvatar } from 'react-icons/rx'
import { useSelector, useDispatch } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";

//conponets
import Badge from './Badge'

const NavBar = () => {
  const dispatch = useDispatch()
  const { top, width } = useSelector(({ state }) => state.sidebar)
  const {refresh} = useSelector((state) => state)
  const { isAutorized, unauthorize, status, data,cart } = useSelector(({ state }) => state.user)
  
  const { url, auth, setter } = useSelector(({ state }) => state.server)
  const { isAuthenticated, logout } = useAuth0();

  const userAutorized = isAutorized()
  const userData = data()

  const [profileState, setProfileState] = useState({
    button: <Link to={"/authorize"}>Log In</Link>,
    icon: <RxAvatar size={25} className="mr-[10px]" />,
  });
  const [cartProducts, setCartProducts] = useState({ length: 0, products: [], total: 0 });

  useEffect(() => {
    if (userAutorized && isAuthenticated) {
      getProductCart()

      setProfileState({
        button: <button onClick={hadleLogout}>Log Out</button>,
        icon: (
          <img
            src={userData.picture}
            alt="avatar"
            className="w-[25px] h-[25px] rounded-full mr-[10px]"
          />
        ),
      });
    } else {
      setProfileState({
        button: <Link to={"/authorize"}>Loguin</Link>,
        icon: <RxAvatar size={25} className="mr-[10px]" />,
      });
    }
  }, [userAutorized, isAuthenticated, refresh]);

  const getProductCart = () => {
    auth.get(`${url}/cart/${userData.id}`).then(res => {
      setCartProducts({
        length: res.data.products.length,
        products: res.data.products,
        total: res.data.products.reduce((acc, curr) => acc + curr.price, 0)

      })

    })

  }

  const hadleLogout = () => {
    unauthorize();
    logout({ returnTo: window.location.origin });
  };




  return (
    <nav className={`fixed top-0 left-0 z-50 flex justify-between items-center bg-black w-[100%] h-[${top}px] text-white`}>
      <div className="relative flex justify-center w-[300px] p-5">
        <NavLink to='/'>
          <img src={logo} alt="logo" className="w-36" />
        </NavLink>
      </div>

      <div style={{ width: `calc(100% - ${width}px)` }} className="flex items-center justify-between pr-[2%]">

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


        <div className="text-white">
          <SearchBar />
        </div>

        <div className="flex items-center">


          <NavLink to='/cart' className="hover: transition-all duration-500">
            <div className="text-black bg-white w-[auto]  h-[40px] flex justify-center items-center hover:bg-stone-400 transition-all duration-200 px-[8px] mr-[10px]  rounded-[4px]">
              <button>
                <Badge origin={{ vertical: 'top', horizontal: 'right' }} color="secondary" counter={cartProducts.length}>
                  <AiOutlineShoppingCart size={25} />
                </Badge>
              </button>
            </div>
          </NavLink>
          <div className="text-black bg-white w-[auto] h-[40px] flex justify-center items-center hover:bg-stone-400 transition-all duration-200 ml-[5px] mr-[30px] rounded-[4px] px-[10px]">
          <NavLink to='/user' className="hover: transition-all duration-500">{profileState.icon}</NavLink>
            {profileState.button}

          </div>


        </div>

      </div>

    </nav >
  );
};

export default NavBar;

// import React, { useState } from "react";
// import { AiOutlineMenu } from "react-icons/ai";

// function Navbar() {
//   const [isOpen, setIsOpen] = useState(false);

//   const handleMenuClick = () => {
//     setIsOpen(!isOpen);
//   };

//   return (
//     <nav className="flex items-center justify-between flex-wrap bg-gray-800 p-6">
//       <div className="flex items-center flex-shrink-0 text-white mr-6">
//         <span className="font-semibold text-xl tracking-tight">Logo</span>
//       </div>

//       <div className="block lg:hidden">
//         <button
//           className="flex items-center px-3 py-2 border rounded text-gray-200 hover:text-white hover:border-white focus:outline-none"
//           onClick={handleMenuClick}
//         >
//           <span className="block h-3 w-3">
//             <AiOutlineMenu className="h-full w-full text-gray-500" />
//           </span>
//         </button>
//       </div>

//       <div
//         className={`w-full block flex-grow lg:flex lg:items-center lg:w-auto ${
//           isOpen ? "" : "hidden"
//         }`}
//       >
//         <div className="text-sm lg:flex-grow">
//           <a
//             href="#responsive-header"
//             className="block mt-4 lg:inline-block lg:mt-0 text-gray-200 hover:text-white mr-4"
//           >
//             Example link
//           </a>
//         </div>
//       </div>
//     </nav>
//   );
// }

// export default Navbar;
