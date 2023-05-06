import React from "react";
import UserButton from "./UserButton";
import { useState } from "react";
import PersonalData from "./PersonalData";
import AddressSettings from "./AddressSettings";
import { FaUser, FaCog, FaShoppingCart } from "react-icons/fa";
import { RiLogoutBoxRLine } from 'react-icons/ri';
import ShopHistory from "./ShopHistory";
import { Notification } from "../Notification/Notification";
import _ from "lodash";
import axios from "axios";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import { NavLink, Link } from "react-router-dom";
import { RxAvatar } from 'react-icons/rx'
import Modal from "../Modal";

const UserInterface = () => {
    
    const { isAutorized, unauthorize, status, data } = useSelector(({ state }) => state.user)
    const { url, auth} = useSelector(({ state }) => state.server);


    const { isAuthenticated, logout } = useAuth0();
    const userAutorized = isAutorized()
    const userData = data()
    
    const [activeSection, setActiveSection] = useState("Personal data");
    
    const [user, setUser] = useState({});
    const [originalUser, setOriginalUser] = useState({});
    
    const [saveStatus, setSaveStatus] = useState(true)
    
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    const [shopHistory, setShopHistory] = useState([])

    useEffect(() => {
        if (!_.isEqual(user, originalUser)) {
          setSaveStatus(true);
        } else {
          setSaveStatus(false);
        }
    }, [user]);

    const handleUserDataChange = (newUserData) => {
        setUser(prevUser => ({ ...prevUser, ...newUserData }));
        setOriginalUser(prevUser => {
            const updatedOriginalUser = { ...prevUser };
            Object.keys(newUserData).forEach(key => {
                if (!updatedOriginalUser.hasOwnProperty(key)) {
                updatedOriginalUser[key] = "";
                }
            });
            return updatedOriginalUser;
        });
    };

    const handleSaveUserData = () => {
        axios.put(`${url}/users/${user._id}`, user)
          .then(response => {
            Notification('success', "Profile updated successfully!", 'bottom-start', 5000);
            setOriginalUser(user);
            setSaveStatus(false);
          })
          .catch(error => {
            Notification('error', "Something went wrong", 'bottom-start', 5000);
          });
      }
    
    const handleActiveSection = (value) => {
        setActiveSection(value);
    }

    // Cuando se arma el componente se trae el historial de compra del usuario

     useEffect(() => {
         auth.get(`${url}/purchase/${userData._id}`)
         .then((res) => {
             const productsByDate = res.data.products.reduce((acc, prod) => {
                 const date = new Date(prod.date).toLocaleDateString();
                 acc[date] = acc[date] ? [...acc[date], prod] : [prod];
                 return acc;
               }, {});
            
      
              const groupedProducts = Object.entries(productsByDate).map(([date, products]) => {
                return {
                  date: date,
                  userId:data.userId,
                  total:products.reduce((acc, item) => acc + item.total * item.price, 0),
                  totalItems:products.length,
                  items: products,
                }
              });

              setShopHistory(groupedProducts)
              
         })
         .catch(error => {
            return null
         }) 
     }, [])

    useEffect(() => {
        auth.get(`${url}/users/find/${userData._id}`)
        .then((response) => {
            setOriginalUser(response.data)
            setUser(response.data)
        })
        .catch((error) => {
            return null
        });
    }, []);
    
    function handleButtonClick() {
        setIsModalOpen(true);
    }
    
    function handleModalClose() {
        setIsModalOpen(false);
    }
    
    const handleLogout = () => {
      unauthorize({message:"Unauthorize"})
      logout({ returnTo: window.location.origin })
    }

return (
<>
        {userAutorized ? (

            <div className="flex flex-col justify-center items-center bg-stone-100 h-full min-h-[820px]">

                <div style={{borderRadius: "10px", display: "flex", justifyContent: "space-between"}} className="mt-16 md:mt-24 lg:mt-32 bg-stone-200 gap-8 py-5 px-5 sm:px-10 shadow-xl w-[90%] xl:w-[1220px]">

                    <div style={{display: "flex", alignItems: "center"}}>
                        <img src={originalUser.picture} alt={(user.name)} style={{borderRadius: "50%"}} className="sm:w-[70px] sm:h-[70px] w-[60px] sm:mr-[50px] mr-[20px]" />
                        <h2 className="sm:text-3xl text-2xl font-bold pt-2">Hello {originalUser.name}!</h2>
                    </div>

                    <button
                        className={saveStatus ? "bg-blue-900 text-white font-medium hover:bg-blue-600 px-3 sm:px-5 py-2 mb-2 transition cursor-pointer" : "bg-stone-500 font-medium text-white cursor-default px-3 sm:px-5 py-2 mb-2 transition"}
                        style={{ marginTop: "20px", borderRadius: "5px"}}
                        disabled={!saveStatus}
                        onClick={handleSaveUserData}
                    >
                        Save Changes
                    </button>

                </div>

                <div className="py-10 pb-32 flex items-center xl:items-start justify-center flex-col xl:flex-row w-full xl:w-auto">

                    <div style={{  borderRadius: "5px" }} className=" flex flex-col justify-center items-center mt-1 gap-4 w-[90%] xl:w-[365px]">
                    
                        <UserButton text={"Personal data"} icon={<FaUser />} value={"Personal data"} onClick={() => handleActiveSection("Personal data")} status={activeSection}/>
                        <UserButton text={"Address settings"} icon={<FaCog />} value={"Address settings"} onClick={() => handleActiveSection("Address settings")} status={activeSection}/>
                        <UserButton text={"Shop history"} icon={<FaShoppingCart />}  value={"Shop history"} onClick={() => handleActiveSection("Shop history")} status={activeSection}/>
                        <UserButton text={"Close session"} icon={<RiLogoutBoxRLine />} value={"Close session"} onClick={handleButtonClick}/>

                    </div>

                    <div className="w-[90%] xl:w-auto mt-[16px] xl:mt-0 xl:ml-[20px]">
                        {(() => {
                            switch(activeSection) {
                                case "Personal data":
                                    return <PersonalData user={user} updateUser={handleUserDataChange} />; 
                                case "Address settings":
                                    return <AddressSettings user={user} updateUser={handleUserDataChange} />;
                                case "Shop history":
                                    return <ShopHistory shopHistory={shopHistory}/>
                                default:
                                    return <PersonalData user={user} updateUser={handleUserDataChange} />;
                                }
                        })()}

                            
                    </div>

                    <div style={{zIndex: 9999}}>
                        {isModalOpen && <Modal title={"Log out"} onFalse={handleModalClose} onTrue={handleLogout} message={"Are you sure you want to leave?"}/>}
                    </div>


                </div>
            </div>
    ) : (
            <div className="flex flex-col justify-center items-center h-screen bg-gray-100">
                <div className="bg-white py-16 px-16 rounded-lg shadow-lg">
                    <div className="text-center mb-8">
                        <div className="flex justify-center">
                            <RxAvatar size={150} className="items-center mb-12" />
                        </div>
                        <h1 className="text-3xl font-bold mb-12">Join the chic family!</h1>
                    </div>
                        <div className="flex justify-center">
                            <Link to={"/authorize"}>
                                <button className="transition rounded-lg bg-gray-800 text-white px-20 py-2 text-lg font-bold hover:bg-blue-800">Log In</button>
                            </Link>
                        </div>
                </div>
            </div>
        )}
        </>
    )
}

export default UserInterface
