import { useState, useEffect } from "react";
import SidebarButton from "./SideBarButton";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";

const values = ["category", "brand", "color", "genre", "price"];

function Sidebar({ className, setFilter }) {
  const dispatch = useDispatch();
  const { top, width } = useSelector(({ state }) => state.sidebar);
  const { get, url } = useSelector(({ state }) => state.server);
  const [module, setModule] = useState([]);

  const getModule = () => {
    get(url + `/dev/module/product`).then((res) => {
      setModule(res.data.filter((e) => values.includes(e.key)));
    });
  };

  const [selections, setSelections] = useState({
    Category: [],
    Brand: [],
    Color: [],
    Genre: [],
    Price: [],
  });

  useEffect(() => {
    getModule();
    for (const [key, value] of Object.entries(selections)) {
      if (value.length === 0) {
        delete selections[key];
      }
    }

    setFilter(selections);
  }, [module.length > 0 ? null : module, selections]);

  const handleSelection = (title, selectedItems) => {
    setSelections((prevSelections) => {
      return {
        ...prevSelections,
        [title]: selectedItems,
      };
    });
  };

  // console.log(selections)

  const firstLetterCapitalized = (str) => {
    return str.charAt(0).toUpperCase() + str.substring(1);
  };

  return (
    <div
      // style={{ width: "auto" }}
      className={`static md:absolute left-0 h-auto overflow-y-auto flex flex-col text-white z-10 ${className}`}
    >
      <div className="flex flex-col justify-center">
        {/* se hace un map al modulo validator con su enum */}
        {module.map((e, i) => {
          return (
            <SidebarButton
              key={i}
              title={firstLetterCapitalized(e.key)}
              items={e.attributes.input}
              onSelect={(selectedItems) =>
                handleSelection(e.key, selectedItems)
              }
            />
          );
        })}
      </div>
    </div>
  );
}

export default Sidebar;

//absolute left-0 h-[auto] overflow-y-auto flex flex-col  text-white z-10 ${className}
