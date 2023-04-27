import React, { useState,useEffect } from 'react';
import { FaPlus, FaMinus } from 'react-icons/fa';
import Chip from '../Chip'
import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch, useSelector } from 'react-redux';


const CartItem = ({ id,onClick, item, handleDelete,onIncrement,onDecrement  }) => {


  return (item&& <div onClick={onClick} style={{borderRadius: "10px"}} className=" flex flex-col md:flex-row justify-between items-center pl-2 pr-4 py-4 mb-1 bmd:mb-0transition ">
        
        <div className="flex flex-col md:flex-row items-center md:mr-8">

            <div style={{minWidth: "150px", borderRadius: "5px"}} className='w-32 h-36 bg-white flex justify-center items-center'>
                <img
                    src={item.image[0]}
                    alt={item.name}
                    className="h-full object-contain max-h-full"
                />
            </div>


            <div style={{minWidth: "200px"}} className='py-4 px-8'>
                <h3 className="text-l font-bold ">{item.name}</h3>
                <p className="text-sm font-medium">Brand: {item.brand}</p>
                {/* <p className="text-sm mr-5" style={{maxWidth: "200px"}}>{truncatedDescription}</p> */}
                <p className="text-sm mr-5">Color: {item.color}</p>
                <p className="text-sm font-medium">Price: ${item.price}</p>
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


