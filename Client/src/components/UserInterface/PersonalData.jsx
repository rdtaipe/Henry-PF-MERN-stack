import { useState } from "react";

const MyData = ({user, updateUser}) => {
    const [userData, setUserData] = useState(user);
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      const newUserData = { ...userData, [name]: value };
      console.log(name)
      console.log(value);
      setUserData(newUserData);
      updateUser(newUserData);
    };
  
    return (
      <div style={{borderRadius: "10px", minWidth: "800px"}} className="ml-10 bg-stone-200 flex flex-col mt-1 gap-8 pt-8 pb-8 px-10 shadow-xl transition">
    
        <h2 className="text-2xl font-bold mb-2">Personal data</h2>
    
        <div className="flex flex-row flex-wrap gap-24">

          <div className="flex flex-col gap-2" style={{width: "300px"}}>
            <label htmlFor="name">Full name:</label>
            <input 
               className={`
                pl-2 py-1 bg-stone-200 border-b-2 
                ${user.name ? 'border-gray-300 hover:border-stone-400' : 
                'border-red-500'} focus:border-black focus:outline-none transition`}
              type="text" 
              name="name" 
              value={user.name} 
              onChange={handleChange} 
            />
          </div>
    
          <div className="flex flex-col gap-2" style={{width: "300px"}}>
            <label htmlFor="email">E-mail:</label>
            <label htmlFor="emailUswer" className="pl-2 py-1 bg-stone-200  transition">{user.email}</label>
          </div>
          
        </div>
    
        <div className="flex flex-row flex-wrap gap-24">
    
          <div className="flex flex-col gap-2" style={{width: "300px"}}>
            <label htmlFor="phone">Phone Number:</label>
            <input 
              className={`
                pl-2 py-1 bg-stone-200 border-b-2 
                ${user.phone ? 'border-gray-300 hover:border-stone-400' : 
                'border-red-500'} focus:border-black focus:outline-none transition`} 
              type="text" 
              name="phone" 
              value={user.phone} 
              onChange={handleChange} 
            />
          </div>
          
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