import { useState, useEffect } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { search, filter } from "../redux/actions";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const filtersElect = useSelector((state) => state.filtersElect);
  const handleInputChange = (e) => {
    e.preventDefault();
    setQuery(e.target.value);
  };
  useEffect(() => {
    dispatch(filter(filtersElect));
    dispatch(search(query));
  }, [query]);
  const handleSubmit = (query, e) => {
    e.preventDefault();
    dispatch(search(query));
  };

  return (
    <div className="flex">
      <input
        className="w-[350px] rounded-3xl mr-1 p-1 pl-2 placeholder:italic text-black outline-none shadow-sm"
        placeholder="Search for any product..."
        type="search"
        onChange={(e) => handleInputChange(e)}

        value={query}
      />
      <button
        className="flex justify-center items-center bg-slate-600 w-[35px] h-[35px] rounded-full"
        type="submit"
        onClick={(e) => handleSubmit(e)}
      >
        <AiOutlineSearch size={25} />
      </button>
    </div>
  );
};

export default SearchBar;
