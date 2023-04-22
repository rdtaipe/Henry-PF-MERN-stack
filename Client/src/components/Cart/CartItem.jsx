import React, { useState,useEffect } from 'react';
import { FaPlus, FaMinus } from 'react-icons/fa';
import Chip from '../Chip'
import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch, useSelector } from 'react-redux';


const CartItem = ({ id,onClick, item,onSummary, handleDelete,onIncrement,onDecrement  }) => {
   
    const { url, auth, setter,get } = useSelector(({ state }) => state.server)

    const [data, setData] = useState(null)
    useEffect(() => {
        get(`${url}/products/${id}`).then(res => {
            setData(res.data)
            onSummary(res.data)
        })


    }, [(data?null:data),item])
 

  return (data&& <div onClick={onClick} style={{borderRadius: "10px"}} className="shadow-xl hover:shadow-2xl flex flex-col md:flex-row justify-between items-center pl-2 pr-4 py-4 mb-1 bmd:mb-0 bg-stone-200 transition ">
        
        <div className="flex flex-col md:flex-row items-center md:mr-8">

            <div style={{minWidth: "150px", borderRadius: "5px"}} className='w-32 h-36 bg-white flex justify-center items-center'>
                <img
                    src={data.image[0]}
                    alt={data.name}
                    className="h-full object-contain max-h-full"
                />
            </div>


            <div style={{minWidth: "200px"}} className='py-4 px-8'>
                <h3 className="text-l font-bold ">{data.name}</h3>
                <p className="text-sm font-medium">Brand: {data.brand}</p>
                {/* <p className="text-sm mr-5" style={{maxWidth: "200px"}}>{truncatedDescription}</p> */}
                <p className="text-sm mr-5">Color: {data.color}</p>
                <p className="text-sm font-medium">Price: ${data.price}</p>
            </div>

        </div>

        {/* <div className="flex flex-col md:flex-row items-center md:mr-8">
            <img src="https://via.placeholder.com/80" alt="Product" className="mr-4 mb-4 md:mb-0" />
            <div>
            <h2 className="font-bold text-lg">{brand} - {name}</h2>
            <p className="text-gray-600">{description}</p>
            </div>
        </div> */}

        <div className="flex flex-col items-center sm:items-start">

            <div style={{borderRadius: "999px"}} className="flex items-center mb-2 mt-2 bg-stone-100">
                
                <div className="p-1">
                    <Chip
                        label={"+"}
                        onClick={onIncrement}
                    />
                </div>

                <span style={{paddingBlock: "0.125rem", fontSize: "12px", fontWeight: "bold"}} className="px-4 py-1 w-12 text-center">
                    {item.total} 
                </span>

                
                <div className="p-1">
                    <Chip
                        label={"-"}
                        onClick={onDecrement}
                    />
                </div>

            </div>

            <button style={{borderRadius: "5px"}} className="px-10 py-1 mt-8 bg-stone-800 text-white hover:bg-blue-900 transition text-sm" 
           onClick={handleDelete}
            >Remove</button>

        </div>

    </div>

  );
};

export default CartItem;


