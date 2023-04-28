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

    const historyHarcoded = [
        {
            total: "540.00",
            userId: "123123123123",
            date: "13/12/2019",
            totalItems: 4,
            items: [
                {
                    id: "6437010ab6dc8f57b10a98f8",
                    name: "Zapatos deportivos Nike",
                    amount: "2",
                    total: "180.00",
                    image: "https://falabella.scene7.com/is/image/FalabellaPE/882693798_1?wid=1004&hei=1500&crop=248,0,1004,1500&qlt=70",
                },
                {
                    id: "6437010ab6dc8f57b10a98f8",
                    name: "Vestido de noche elegante",
                    amount: "1",
                    total: "560.00",
                    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0KqMDrmmIHhEj6j1NtXGwmOSiLgvIV_bthA&usqp=CAU"
                },
                {
                    id: "6437010ab6dc8f57b10a98f8",
                    name: "Bearcliff Man Shirts",
                    amount: "1",
                    total: "50.00",
                    image: "https://falabella.scene7.com/is/image/FalabellaPE/882693798_1?wid=1004&hei=1500&crop=248,0,1004,1500&qlt=70"
                },
                {
                    id: "6437010ab6dc8f57b10a98f8",
                    name: "Zapatos deportivos Nike",
                    amount: "2",
                    total: "180.00",
                    image: "https://falabella.scene7.com/is/image/FalabellaPE/882693798_1?wid=1004&hei=1500&crop=248,0,1004,1500&qlt=70",
                },
                {
                    id: "6437010ab6dc8f57b10a98f8",
                    name: "Vestido de noche elegante",
                    amount: "1",
                    total: "560.00",
                    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0KqMDrmmIHhEj6j1NtXGwmOSiLgvIV_bthA&usqp=CAU"
                },
                {
                    id: "6437010ab6dc8f57b10a98f8",
                    name: "Bearcliff Man Shirts",
                    amount: "1",
                    total: "50.00",
                    image: "https://falabella.scene7.com/is/image/FalabellaPE/882693798_1?wid=1004&hei=1500&crop=248,0,1004,1500&qlt=70"
                },
            ]
        },
        {
            total: "1200.00",
            userId: "123123123123",
            date: "13/12/2019",
            totalItems: 5,
            items: [
                {
                    id: "6437010ab6dc8f57b10a98f8",
                    name: "Zapatos deportivos Nike",
                    amount: "1",
                    total: "180.00",
                    image: "https://falabella.scene7.com/is/image/FalabellaPE/882693798_1?wid=1004&hei=1500&crop=248,0,1004,1500&qlt=70"
                },
                {
                    id: "6437010ab6dc8f57b10a98f8",
                    name: "Vestido de noche elegante",
                    amount: "1",
                    total: "560.00",
                    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0KqMDrmmIHhEj6j1NtXGwmOSiLgvIV_bthA&usqp=CAU"
                },
                {
                    id: "6437010ab6dc8f57b10a98f8",
                    name: "Bearcliff Man Shirts",
                    amount: "3",
                    total: "50.00",
                    image: "https://falabella.scene7.com/is/image/FalabellaPE/882693798_1?wid=1004&hei=1500&crop=248,0,1004,1500&qlt=70"
                },
            ]
        },
        {
            total: "800.00",
            userId: "123123123123",
            date: "13/12/2019",
            totalItems: 3,
            items: [
                {
                    id: "6437010ab6dc8f57b10a98f8",
                    name: "Zapatos deportivos Nike",
                    amount: "2",
                    total: "180.00",
                    image: "https://falabella.scene7.com/is/image/FalabellaPE/882693798_1?wid=1004&hei=1500&crop=248,0,1004,1500&qlt=70"
                },
                {
                    id: "6437010ab6dc8f57b10a98f8",
                    name: "Vestido de noche elegante",
                    amount: "1",
                    total: "560.00",
                    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0KqMDrmmIHhEj6j1NtXGwmOSiLgvIV_bthA&usqp=CAU"
                },
                {
                    id: "6437010ab6dc8f57b10a98f8",
                    name: "Bearcliff Man Shirts",
                    amount: "1",
                    total: "50.00",
                    image: "https://falabella.scene7.com/is/image/FalabellaPE/882693798_1?wid=1004&hei=1500&crop=248,0,1004,1500&qlt=70"
                },
            ]
        },
        {
            total: "800.00",
            userId: "123123123123",
            date: "13/12/2019",
            totalItems: 3,
            items: [
                {
                    id: "6437010ab6dc8f57b10a98f8",
                    name: "Zapatos deportivos Nike",
                    amount: "2",
                    total: "180.00",
                    image: "https://falabella.scene7.com/is/image/FalabellaPE/882693798_1?wid=1004&hei=1500&crop=248,0,1004,1500&qlt=70"
                },
                {
                    id: "6437010ab6dc8f57b10a98f8",
                    name: "Vestido de noche elegante",
                    amount: "1",
                    total: "560.00",
                    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0KqMDrmmIHhEj6j1NtXGwmOSiLgvIV_bthA&usqp=CAU"
                },
                {
                    id: "6437010ab6dc8f57b10a98f8",
                    name: "Bearcliff Man Shirts",
                    amount: "1",
                    total: "50.00",
                    image: "https://falabella.scene7.com/is/image/FalabellaPE/882693798_1?wid=1004&hei=1500&crop=248,0,1004,1500&qlt=70"
                },
            ]
        },
        {
            total: "540.00",
            userId: "123123123123",
            date: "13/12/2019",
            totalItems: 4,
            items: [
                {
                    id: "6437010ab6dc8f57b10a98f8",
                    name: "Zapatos deportivos Nike",
                    amount: "2",
                    total: "180.00",
                    image: "https://falabella.scene7.com/is/image/FalabellaPE/882693798_1?wid=1004&hei=1500&crop=248,0,1004,1500&qlt=70",
                },
                {
                    id: "6437010ab6dc8f57b10a98f8",
                    name: "Vestido de noche elegante",
                    amount: "1",
                    total: "560.00",
                    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0KqMDrmmIHhEj6j1NtXGwmOSiLgvIV_bthA&usqp=CAU"
                },
                {
                    id: "6437010ab6dc8f57b10a98f8",
                    name: "Bearcliff Man Shirts",
                    amount: "1",
                    total: "50.00",
                    image: "https://falabella.scene7.com/is/image/FalabellaPE/882693798_1?wid=1004&hei=1500&crop=248,0,1004,1500&qlt=70"
                },
            ]
        },
        {
            total: "540.00",
            userId: "123123123123",
            date: "13/12/2019",
            totalItems: 4,
            items: [
                {
                    id: "6437010ab6dc8f57b10a98f8",
                    name: "Zapatos deportivos Nike",
                    amount: "2",
                    total: "180.00",
                    image: "https://falabella.scene7.com/is/image/FalabellaPE/882693798_1?wid=1004&hei=1500&crop=248,0,1004,1500&qlt=70",
                },
                {
                    id: "6437010ab6dc8f57b10a98f8",
                    name: "Vestido de noche elegante",
                    amount: "1",
                    total: "560.00",
                    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0KqMDrmmIHhEj6j1NtXGwmOSiLgvIV_bthA&usqp=CAU"
                },
                {
                    id: "6437010ab6dc8f57b10a98f8",
                    name: "Bearcliff Man Shirts",
                    amount: "1",
                    total: "50.00",
                    image: "https://falabella.scene7.com/is/image/FalabellaPE/882693798_1?wid=1004&hei=1500&crop=248,0,1004,1500&qlt=70"
                },
            ]
        },
        
    ]
    
    const { isAutorized, unauthorize, status, data } = useSelector(({ state }) => state.user)
    const { url } = useSelector(({ state }) => state.server);

    const { isAuthenticated, logout } = useAuth0();
    const userAutorized = isAutorized()
    const userData = data()
    
    const [activeSection, setActiveSection] = useState("Personal data");
    
    const [user, setUser] = useState({});
    const [originalUser, setOriginalUser] = useState({});
    
    const [saveStatus, setSaveStatus] = useState(true)
    
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    const [shopHistory, setShopHistory] = useState(historyHarcoded)

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
            Notification('success', "Profile updated successfully!", 'bottom-end', 5000);
            setOriginalUser(user);
            setSaveStatus(false);
            console.log(response)
          })
          .catch(error => {
            Notification('error', "Something went wrong", 'bottom-end', 5000);
          });
      }
    
    const handleActiveSection = (value) => {
        setActiveSection(value);
    }

    // Cuando se arma el componente se trae el historial de compra del usuario

    // useEffect(() => {
    //     axios.get(`${url}/purchase/${userData._id}`)
    //     .then((response) => {
    //         setShopHistory(response.data)
    //         console.log(response)
    //     })
    //     .catch(error => {
    //         Notification('error', "Shopping history couldn't be obtained", 'bottom-end', 5000)
    //     }) 
    // }, [])
    
    useEffect(() => {
        axios.get(`${url}/users/find/${userData._id}`)
        .then((response) => {
            setOriginalUser(response.data)
            setUser(response.data)
        })
        .catch((error) => {
            console.log(error);
        });
    }, []);
    
    function handleButtonClick() {
        setIsModalOpen(true);
    }
    
    function handleModalClose() {
        setIsModalOpen(false);
    }
    
    const handleLogout = () => {
      unauthorize()
      logout({ returnTo: window.location.origin })
    }

    return (
<>
        {userAutorized ? (

            <div style={{height: "700px"}} className="flex flex-col items-center bg-stone-100">

                <div style={{borderRadius: "10px", width: "1220px", display: "flex", justifyContent: "space-between"}} className="mt-20 bg-stone-200 gap-8 py-5 px-10 shadow-xl">

                    <div style={{display: "flex", alignItems: "center"}}>
                        <img src={userData.picture} alt="user" style={{width: "70px", height: "70px", borderRadius: "50%", marginRight: "50px"}} />
                        <h2 className="text-3xl font-bold pt-2">Hello {userData.given_name}!</h2>
                    </div>

                    <button
                        className={saveStatus ? "bg-blue-900 text-white font-medium hover:bg-blue-600 px-5 py-2 mb-2 transition cursor-pointer" : "bg-stone-500 font-medium text-white cursor-default px-5 py-2 mb-2 transition"}
                        style={{ marginTop: "20px", borderRadius: "5px"}}
                        disabled={!saveStatus}
                        onClick={handleSaveUserData}
                    >
                        Save Changes
                    </button>

                </div>

                <div className="py-10 pb-32 flex items-start justify-content-center">

                    <div style={{ width: "365px", borderRadius: "5px", flex: "0 0 auto" }} className=" flex flex-col justify-center items-center mt-1 gap-4">
                    
                        <UserButton text={"Personal data"} icon={<FaUser />} value={"Personal data"} onClick={() => handleActiveSection("Personal data")} status={activeSection}/>
                        <UserButton text={"Address settings"} icon={<FaCog />} value={"Address settings"} onClick={() => handleActiveSection("Address settings")} status={activeSection}/>
                        <UserButton text={"Shop history"} icon={<FaShoppingCart />}  value={"Shop history"} onClick={() => handleActiveSection("Shop history")} status={activeSection}/>
                        <UserButton text={"Close session"} icon={<RiLogoutBoxRLine />} value={"Close session"} onClick={handleButtonClick}/>

                    </div>

                    <div style={{ flex: "1 0 auto", marginLeft: "20px" }}>
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
