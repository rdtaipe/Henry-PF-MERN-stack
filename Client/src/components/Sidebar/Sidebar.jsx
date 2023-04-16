import { useState,useEffect } from "react";
import SidebarButton from "./SideBarButton";
import axios from "axios"
import { useSelector,useDispatch } from "react-redux";

const values=["category","brand","color","genre","price"]

function Sidebar({className, setFilter}) {
  const dispatch = useDispatch()
  const {top, width}= useSelector(({state}) => state.sidebar)
  const {get, url}= useSelector(({state}) => state.server)
  const [module, setModule]=useState([])
  
  const getModule=()=>{
    get(url+`/dev/module/product`).then(res =>{
     setModule(res.data.filter((e)=>values.includes(e.key)))
    })
  }

  const [selections, setSelections] = useState({
    "Category": [],
    "Brand": [],
    "Color": [],
    "Genre": [],
    "Price": [],
  });

  useEffect(() => {
    getModule()
    for (const [key, value] of Object.entries(selections)) {
      if (value.length === 0) {
        delete selections[key];
      }
    }

    setFilter(selections)
  
  }, [(module.length>0?null:module),selections])

  const handleSelection = (title, selectedItems) => {

    setSelections((prevSelections) => {
      return {
        ...prevSelections,
        [title]: selectedItems
      }
    })
  
  };

  console.log(selections)

  return (
    <div style={{top:top,width:width}} className={`fixed left-0 h-full flex flex-col bg-stone-400 text-white z-10 ${className}`}>

        <div classname="flex flex-col">
          {/* se hace un map al modulo validator con su enum */}
          {module.map((e,i)=>{
            return <SidebarButton title={e.key} items={e.attributes.enum} onSelect={(selectedItems) => handleSelection(e.key,selectedItems)} />
          })}
        </div>

        <button
          className="py-2 px-4 bg-blue-500 text-white mt-12 hover:bg-blue-600"
          onClick={handleClearFilters}
        >
        Clear Filters
        </button>

    </div>

    
  );
}

export default Sidebar;
