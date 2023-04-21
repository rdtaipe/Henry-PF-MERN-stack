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
      <div style={{borderRadius: "10px", minWidth: "800px"}} className="ml-10 bg-stone-200 flex flex-col gap-8 pt-8 pb-8 px-10 shadow-xl">
    
        <h2 className="text-2xl font-bold mb-2">Personal data</h2>
    
        <div className="flex flex-row flex-wrap gap-24">

          <div className="flex flex-col gap-2" style={{width: "300px"}}>
            <label htmlFor="fullName">Full name:</label>
            <input 
               className={`
                pl-2 py-1 bg-stone-200 border-b-2 
                ${user.name ? 'border-gray-300 hover:border-stone-400' : 
                'border-red-500'} focus:border-black focus:outline-none transition`}
              type="text" 
              name="fullName" 
              value={userData.name} 
              onChange={handleChange} 
            />
          </div>
    
          <div className="flex flex-col gap-2" style={{width: "300px"}}>
            <label htmlFor="email">E-mail:</label>
            <label htmlFor="emailUswer" className="pl-2 py-1 bg-stone-200  transition">{userData.email}</label>
          </div>
          
        </div>
    
        <div className="flex flex-row flex-wrap gap-24">

          <div className="flex flex-col gap-2" style={{width: "300px"}}>
            <label htmlFor="birthDate">Birth Date:</label>
            <input 
              className={`
                pl-2 py-1 bg-stone-200 border-b-2 
                ${user.birthDate ? 'border-gray-300 hover:border-stone-400' : 
                'border-red-500'} focus:border-black focus:outline-none transition`}
              type="text" 
              name="birthDate" 
              value={userData.birthDate} 
              onChange={handleChange} 
            />
          </div>
    
          <div className="flex flex-col gap-2" style={{width: "300px"}}>
            <label htmlFor="tel">Phone Number:</label>
            <input 
              className={`
                pl-2 py-1 bg-stone-200 border-b-2 
                ${user.tel ? 'border-gray-300 hover:border-stone-400' : 
                'border-red-500'} focus:border-black focus:outline-none transition`} 
              type="text" 
              name="tel" 
              value={user.tel} 
              onChange={handleChange} 
            />
          </div>
          
        </div>

        <div className="flex flex-row flex-wrap gap-24">

          <div className="flex flex-col gap-2" style={{width: "300px"}}>
            <label htmlFor="genre">Gender:</label>
            <input 
              className={`
                pl-2 py-1 bg-stone-200 border-b-2 
                ${user.genre ? 'border-gray-300 hover:border-stone-400' : 
                'border-red-500'} focus:border-black focus:outline-none transition`}
              type="text" 
              name="genre" 
              value={user.genre} 
              onChange={handleChange} 
            />
          </div>

        </div>
    
      </div>
    );
    
  };
  

export default MyData