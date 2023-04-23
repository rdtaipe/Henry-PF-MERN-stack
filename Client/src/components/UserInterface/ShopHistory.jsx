import { useState } from "react";
import { BsHammer } from 'react-icons/bs';
import { AiOutlineTool } from 'react-icons/ai';
import { FiTool } from 'react-icons/fi';
import { IoConstruct } from 'react-icons/io5';
import { BiBuildings } from 'react-icons/bi';
import { BsTools } from 'react-icons/bs';



const ShopHistory = ({ shopHistory }) => {
    return (
      <>
        {!shopHistory || shopHistory.length === 0 ? (
          <div style={{borderRadius: "10px", minWidth: "800px"}} className="ml-10 bg-stone-200 flex flex-col mt-1 gap-8 pt-8 pb-4 px-10 shadow-xl text-center transition">
            <h2 className="text-2xl font-bold mb-2 mx-auto">Feature in development</h2>
            <div className="flex flex-row flex-wrap items-center justify-center gap-24">
              <div className="flex flex-col">
                <IoConstruct size={150} className="my-4 mx-auto"/>
              </div>
            </div>
          </div>

        ) : (
            <div>Your shopping history is empty :( </div>
        )}
      </>
    );
  };
  
  
  

export default ShopHistory