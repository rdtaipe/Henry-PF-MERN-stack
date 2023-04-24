import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SearchIcon from "@mui/icons-material/Search";
import { IconButton } from "@mui/material";

const SearchBar = () => {
  const dispatch = useDispatch();
  const { setter } = useSelector((state) => state.actions);
  const [name, setName] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setter({ keys: "searchName", value: name }));
  };
  const handleInputChange = (e) => {
    e.preventDefault();
    setName(e.target.value);
    dispatch(setter({ keys: "searchName", value: e.target.value }));
  };

  return (
    <div className="flex w-[350px] h-[40px] rounded-[4px] bg-[white]">
      <IconButton
        type="button"
        className="bg-[#f0f2f5] rounded-[4px] w-[40px] h-[40px] flex justify-center items-center"
        onClick={(e) => handleSubmit(e)}
      >
        <SearchIcon className="text-black " />
      </IconButton>
      <input
        className=" pr-1 text-black outline-none w-[100%] h-[100%] rounded-[4px]"
        placeholder="Search for any product"
        type="search"
        value={name}
        onChange={(e) => handleInputChange(e)}
      />
    </div>
  );
};

export default SearchBar;
