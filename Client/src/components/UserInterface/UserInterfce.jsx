import React from "react";
import UserButton from "./UserButton";
import { useState } from "react";
import PersonalData from "./PersonalData";
import AdressSettings from "./AdressSettings";
import { FaUser, FaCog, FaShoppingCart } from "react-icons/fa";
import { RiLogoutBoxRLine } from 'react-icons/ri';
import ShopHistory from "./ShopHistory";

import axios from "axios";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import { NavLink, Link } from "react-router-dom";
import { RxAvatar } from 'react-icons/rx'

const UserInterface = () => {

    const userHardcoded = {
        fullName: "Arthur Morgan",
        email: "ArthurMorgan@Vanderlinde.com",
        password: "?",
        birthDate: "12/12/1863",
        genre: "male",
        country: "United States",
        address: "Street Licor - 200, Saint Denise",
        tel: "123456789",
        image: "https://static.wikia.nocookie.net/listofdeaths/images/2/2f/Arthur_Morgan.jpg"
    }

    
    const { isAutorized, unauthorize, status, data } = useSelector(({ state }) => state.user)
    const { isAuthenticated, logout } = useAuth0();
    const userAutorized = isAutorized()
    const userData = data()
    
    const [originalUser, setOriginalUser] = useState(userHardcoded)
    const [user, setUser] = useState(userData);
    const [activeSection, setActiveSection] = useState("Personal data");
    
    console.log(user)

    const handleUserDataChange = (newUserData) => {
        setUser(prevUser => ({ ...prevUser, ...newUserData }));
    }
    
    const handleActiveSection = (value) => {
        setActiveSection(value);
    }

    const handleLogout = () => {
      unauthorize()
      logout({ returnTo: window.location.origin })
    }

    useEffect(() => {
        axios.get(`http://localhost:5000/users/find/${userData.id}`)
          .then((response) => {
            console.log(response.data)
            setUser(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
      }, []);


    return (
<>
        {userAutorized ? (

            <div style={{height: "700px"}} className="flex flex-col items-center bg-stone-100">
                <div className="mt-20 py-20 px-32 bg-stone-100 flex items-start justify-content-center">

                    <div style={{ width: "365px", borderRadius: "5px", flex: "0 0 auto" }} className=" flex flex-col justify-center items-center py-2 gap-4">
                    
                        <UserButton text={"Personal data"} icon={<FaUser />} value={"Personal data"} onClick={() => handleActiveSection("Personal data")} status={activeSection}/>
                        <UserButton text={"Adress settings"} icon={<FaCog />} value={"Adress settings"} onClick={() => handleActiveSection("Adress settings")} status={activeSection}/>
                        <UserButton text={"Shop history"} icon={<FaShoppingCart />}  value={"Shop history"} onClick={() => handleActiveSection("Shop history")} status={activeSection}/>
                        <UserButton text={"Close session"} icon={<RiLogoutBoxRLine />} value={"Close session"} onClick={handleLogout}/>

                    </div>

                    <div style={{ flex: "1 0 auto", marginLeft: "20px" }}>
                        {(() => {
                            switch(activeSection) {
                                case "Personal data":
                                    return <PersonalData user={user} updateUser={handleUserDataChange} />; 
                                case "Adress settings":
                                    return <AdressSettings user={user} updateUser={handleUserDataChange} />;
                                case "Shop history":
                                    return <ShopHistory />
                                default:
                                    return <PersonalData user={user} updateUser={handleUserDataChange} />;
                                }
                        })()}

                            
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
