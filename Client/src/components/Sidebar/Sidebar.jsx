import { useState } from "react";
import SidebarButton from "./SideBarButton";
import axios from "axios"

function Sidebar() {
  const [selections, setSelections] = useState({
    "Categoría": [],
    "Marca": [],
    "Color": [],
    "Género": [],
    "Precios": [],
  });

  const handleSelection = (title, selectedItems) => {
    setSelections((prevSelections) => {
      return {
        ...prevSelections,
        [title]: selectedItems
      }
    });
  };

  return (
    <div className="flex flex-col min-h-screen w-72 bg-stone-400">

        <div classname="flex flex-col">
            <SidebarButton title="Categoría" items={["Ropa", "Zapatos", "Accesorios"]} onSelect={(selectedItems) => handleSelection("Categoría", selectedItems)} />
            <SidebarButton title="Marca" items={["Nike", "Adidas", "Puma", "Reebok"]} onSelect={(selectedItems) => handleSelection("Marca", selectedItems)} />
            <SidebarButton title="Color" items={["Rojo", "Azul", "Verde", "Negro", "Blanco"]} onSelect={(selectedItems) => handleSelection("Color", selectedItems)} />
            <SidebarButton title="Género" items={["Hombre", "Mujer", "Niño", "Niña"]} onSelect={(selectedItems) => handleSelection("Género", selectedItems)} />
            <SidebarButton title="Precios" items={["20$ - 40$", "40$ - 60$", "60$ - 80$", "80$ - 100$", "> 100"]} onSelect={(selectedItems) => handleSelection("Precios", selectedItems)} />
        </div>

        <button
        className="py-2 px-4 bg-blue-500 text-white mt-12 hover:bg-blue-600"
        onClick={async () => {
            const response = await axios.get("https://example.com/api", {
            params: selections,
            });
            console.log(response.data);
        }}
        >
        Apply filters
        </button>

    </div>

    
  );
}

export default Sidebar;