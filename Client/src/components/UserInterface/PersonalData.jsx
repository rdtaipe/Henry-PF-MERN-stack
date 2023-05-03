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
      <div style={{borderRadius: "10px"}} className="xl:ml-10 bg-stone-200 flex flex-col mt-1 gap-8 pt-8 pb-8 px-10 shadow-xl transition lg:min-w-[800px]">
    
        <h2 className="text-2xl font-bold mb-2">Personal data</h2>
    
        <div className="flex lg:flex-row flex-col flex-wrap gap-8 lg:gap-24">

          <div className="flex flex-col gap-2 w-[90%] sm:w-[300px]">
            <label htmlFor="name" className="font-bold">Full name:</label>
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
    
          <div className="flex flex-col gap-2 w-[90%] sm:w-[300px]">
            <label htmlFor="email" className="font-bold">E-mail:</label>
            <label htmlFor="emailUswer" className="pl-2 py-1 bg-stone-200  transition">{user.email}</label>
          </div>
          
        </div>
    
        <div className="flex lg:flex-row flex-col flex-wrap gap-8 lg:gap-24">
    
          <div className="flex flex-col gap-2 w-[90%] sm:w-[300px]">
            <label htmlFor="phone" className="font-bold">Phone Number:</label>
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
          
          <div className="flex flex-col gap-2 w-[90%] sm:w-[300px]">
            <label htmlFor="genre" className="font-bold">Gender:</label>
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