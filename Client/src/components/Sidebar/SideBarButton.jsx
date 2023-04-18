import { useState } from "react";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import Chip from '../Chip'

function SidebarButton({ title, items, onSelect }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);

  const handleButtonClick = () => {
    setIsOpen(!isOpen);
  };

  const handleCheckboxChange = (event,item) => {
  let newSelectedItems = [...selectedItems]; // Se crea una copia de los items seleccionados
  if(selectedItems.includes(item)){ // Si el item ya esta seleccionado
    newSelectedItems = newSelectedItems.filter((i) => i !== item); // Se elimina el item de la copia
  }else{ // Si el item no esta seleccionado
    newSelectedItems.push(item); // Se agrega el item a la copia
  }
  setSelectedItems(newSelectedItems); // Se actualiza el estado de los items seleccionados
    onSelect && onSelect(newSelectedItems); // Se notifica al componente padre de los items seleccionados
  };

  // console.log(selectedItems)
  return (
    <div className="relative">
      
      <button
        className="w-full py-4 px-6 bg-stone-800 text-white hover:bg-stone-600 focus:bg-black transition-all duration-300 flex justify-between items-center pl-20"
        onClick={handleButtonClick}
      >
        <span className="font-bold">{title}</span>
        {isOpen ? <BsChevronUp /> : <BsChevronDown />}
      </button>

      {isOpen && (
        <div className="flex  flex-wrap w-[100%] py-2 bg-stone-100 transition-all duration-300 ">

  
          {items.map((item) => (
            <div className="p-1" key={item}>
              <Chip
                key={item}
                label={ title==="price"?item.toLocaleString("en-US", {style: "currency", currency: "USD"}):item}
                onClick={e=>handleCheckboxChange(e,item)}
                selected={selectedItems.includes(item)}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SidebarButton;

