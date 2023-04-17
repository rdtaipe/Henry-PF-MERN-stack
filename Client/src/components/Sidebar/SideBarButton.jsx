import { useState } from "react";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";

function SidebarButton({ title, items, onSelect }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);

  const handleButtonClick = () => {
    setIsOpen(!isOpen);
  };

  const handleCheckboxChange = (event, item) => {
    const newSelectedItems = event.target.checked
      ? [...selectedItems, item]
      : selectedItems.filter((i) => i !== item);
    setSelectedItems(newSelectedItems);
    onSelect && onSelect(newSelectedItems);
  };

  return (
    <div className="relative">
      <button
        className="w-full py-4 px-6 bg-stone-800 text-white hover:bg-stone-700 focus:bg-black flex justify-between items-center pl-20"
        onClick={handleButtonClick}
      >
        <span className="font-bold">{title}</span>
        {isOpen ? <BsChevronUp /> : <BsChevronDown />}
      </button>

      {isOpen && (

        <div className="z-10 w-full py-2 bg-stone-300 shadow-lg flex flex-col pl-20 transition-all duration-300">

        <div className="z-10 w-full py-2 bg-stone-800 shadow-lg flex flex-col pl-20 transition-all duration-300">


          {items.map((item) => (
            <label key={item} className="inline-flex items-center w-full px-2">
              <input
                type="checkbox"
                className="form-checkbox"
                value={item}
                onChange={(e) => handleCheckboxChange(e, item)}
                checked={selectedItems.includes(item)}
              />
              <span className="ml-2 text-gray-700">
                {typeof item === "number" ? item + "$" : item}
              </span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
}

export default SidebarButton;

