import { useState,useEffect } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { useDispatch,useSelector } from 'react-redux';
import { search } from '../redux/actions';

const SearchBar = () => {

  const dispatch = useDispatch();
  const {setter} = useSelector(state => state.actions);
  const [name, setName] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setter({keys:"searchName",value:name}))
  }
  const handleInputChange = (e) => {
    e.preventDefault();
    setName(e.target.value);
    dispatch(search(e.target.value));
  }
  
  return (
    <div className="flex">
      <input
        className="w-[350px] rounded-3xl p-0.5 pl-7 text-black outline-none mr-[120px]"
        placeholder="Search for any product"
        type='search'
        value={name}
        onChange={(e) => handleInputChange(e)}
      />
      {/* <button
        className="flex justify-center items-center bg-slate-600 w-[35px] h-[35px] rounded-full"
        type="submit"
        onClick={(e) => handleSubmit(e)}
      >
        <AiOutlineSearch size={25} />
      </button> */}
    </div>
  );
};

export default SearchBar;
