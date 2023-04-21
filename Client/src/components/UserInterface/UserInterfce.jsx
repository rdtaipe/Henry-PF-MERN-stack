import React from "react";
import UserButton from "./UserButton";
import { useState } from "react";
import PersonalData from "./PersonalData";
import AdressSettings from "./AdressSettings";
import { FaUser, FaCog, FaShoppingCart } from "react-icons/fa";
import { RiLogoutBoxRLine } from 'react-icons/ri';
import ShopHistory from "./ShopHistory";
import _ from "lodash";
import axios from "axios";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import { NavLink, Link } from "react-router-dom";
import { RxAvatar } from 'react-icons/rx'

const UserInterface = () => {
    
    const { isAutorized, unauthorize, status, data } = useSelector(({ state }) => state.user)
    const { isAuthenticated, logout } = useAuth0();
    const userAutorized = isAutorized()
    const userData = data()
    
    const [activeSection, setActiveSection] = useState("Personal data");
    
    const [user, setUser] = useState({});
    const [originalUser, setOriginalUser] = useState({});
    
    const [saveStatus, setSaveStatus] = useState(true)

    console.log(user)
    console.log(originalUser)
    console.log(user === originalUser)

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
            setOriginalUser(response.data)
            setUser(response.data)
          })
          .catch((error) => {
            console.log(error);
          });
      }, []);


    return (
<>
        {userAutorized ? (

            <div style={{height: "800px"}} className="flex flex-col items-center bg-stone-100">

            <div style={{borderRadius: "10px", width: "1220px"}} className="mt-40 bg-stone-200 gap-8 py-5 px-10 shadow-xl">
                <div style={{display: "flex", alignItems: "center"}}>
                    <img src={userData.picture} alt="user" style={{width: "70px", height: "70px", borderRadius: "50%", marginRight: "50px"}} />
                    <h2 className="text-3xl font-bold pt-2">Hola {userData.given_name}!</h2>
                    <button className={saveStatus ? "bg-red-500" : "bg-green-500"} style={{marginTop: "20px"}} disabled={saveStatus}>Save Changes</button>
                </div>
            </div>

                
                <div className="py-10 pb-32 flex items-start justify-content-center">

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
