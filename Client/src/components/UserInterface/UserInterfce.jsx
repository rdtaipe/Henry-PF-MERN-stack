import React from "react";
import UserButton from "./UserButton";
import { useState } from "react";
import PersonalData from "./PersonalData";
import AccountSettings from "./AccountSettings";
import { FaUser, FaCog, FaShoppingCart } from "react-icons/fa";
import { RiLogoutBoxRLine } from 'react-icons/ri';

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

    const [originalUser, setOriginalUser] = useState(userHardcoded)
    const [user, setUser] = useState(userHardcoded);
    const [activeSection, setActiveSection] = useState("Personal data");

    const handleUserDataChange = (newUserData) => {
        setUser(prevUser => ({ ...prevUser, ...newUserData }));
    };

    const handleActiveSection = (value) => {
        console.log(value);
        setActiveSection(value);
    }


    return (
        <div className="mt-20 py-20 px-32 bg-stone-200 flex justify-center items-start">
            <div style={{ width: "365px", borderRadius: "5px", flex: "0 0 auto" }} className=" flex flex-col justify-center items-center py-2 gap-4">
            
                <UserButton text={"Personal data"} icon={<FaUser />} value={"Personal data"} onClick={() => handleActiveSection("Personal data")} status={activeSection}/>
                <UserButton text={"Account settings"} icon={<FaCog />} value={"Account settings"} onClick={() => handleActiveSection("Account settings")} status={activeSection}/>
                <UserButton text={"Shop history"} icon={<FaShoppingCart />}  value={"Shop history"} onClick={() => handleActiveSection("Shop history")} status={activeSection}/>
                <UserButton text={"Close session"} icon={<RiLogoutBoxRLine />} value={"Close session"} onClick={() => handleActiveSection("Close session")} status={activeSection}/>

            </div>

            <div style={{ flex: "1 0 auto", marginLeft: "20px" }}>
                {(() => {
                    switch(activeSection) {
                        case "Personal data":
                            return <PersonalData user={user} updateUser={handleUserDataChange} />; 
                        case "Account settings":
                            return <AccountSettings user={user} updateUser={handleUserDataChange} />;
                        default:
                            return <PersonalData user={user} updateUser={handleUserDataChange} />;
                        }
                })()}

                    
            </div>

        </div>
    )
}

export default UserInterface
