import { useState } from "react";

const MyData = ({user, updateUser}) => {
    const [userData, setUserData] = useState(user);
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      const newUserData = { ...userData, [name]: value };
      setUserData(newUserData);
      updateUser(newUserData);
    };
  
    return (
      <div style={{borderRadius: "10px"}} className="ml-10 bg-stone-100 flex flex-col gap-8 pt-8 pb-8 px-10 shadow-xl">
    
        <h2 className="text-2xl font-bold mb-2">Account Settings</h2>
    
        <div className="flex flex-row flex-wrap gap-24">

          <div className="flex flex-col gap-2" style={{width: "300px"}}>
            <label htmlFor="fullName">Country:</label>
            <input 
               className={`
                pl-2 py-1 bg-stone-100 border-b-2 
                ${userData.fullName ? 'border-gray-300 hover:border-stone-400' : 
                'border-red-500'} focus:border-black focus:outline-none transition`}
              type="text" 
              name="fullName" 
              value={userData.country} 
              onChange={handleChange} 
            />
          </div>
    
          <div className="flex flex-col gap-2" style={{width: "300px"}}>
            <label htmlFor="email">Adress:</label>
            <label htmlFor="emailUswer" className="pl-2 py-1 bg-stone-100  transition">{userData.adress}</label>
          </div>
          
        </div>

    
      </div>
    );
    
  };
  

export default MyData