import { useState } from "react";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import Chip from '../Chip'

const SidebarButton = ({ title, items, onSelect }) => {
  const [selectedItems, setSelectedItems] = useState([]);
  const handleCheckboxChange = (item) => {
    let newSelectedItems = [...selectedItems]; // Se crea una copia de los items seleccionados
    if (selectedItems.includes(item)) { // Si el item ya esta seleccionado
      newSelectedItems = newSelectedItems.filter((i) => i !== item); // Se elimina el item de la copia
    } else { // Si el item no esta seleccionado
      newSelectedItems.push(item); // Se agrega el item a la copia
    }
    setSelectedItems(newSelectedItems); // Se actualiza el estado de los items seleccionados
    onSelect && onSelect(newSelectedItems); // Se notifica al componente padre de los items seleccionados
  };

  // console.log(selectedItems)
  return (
    <div key={title} className="flex  flex-wrap w-[100%] ">
      {items.map((item) => (
        <div className="p-1" key={item}>
          <Chip
            label={title === "price" ? item.toLocaleString("en-US", { style: "currency", currency: "USD" }) : item}
            onClick={() => handleCheckboxChange(item)}
            selected={selectedItems.includes(item)}
          />
        </div>
      ))}
    </div>
  );
}

export default SidebarButton;

