import { useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { search } from '../redux/actions';

const SearchBar = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  const handleInputChange = (e) => {
    e.preventDefault();
    setName(e.target.value);
    console.log(name);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(search(name));
  }

  return (
    <div className='flex'>
      <input
        className='w-[350px] rounded-3xl mr-1 p-1 pl-2 placeholder:italic text-black outline-none shadow-sm'
        placeholder="Search for any product..."
        type='search'
        onChange={(e) => handleInputChange(e)}
      />
      <button
        className='flex justify-center items-center bg-slate-600 w-[35px] h-[35px] rounded-full'
        type='submit'
        onClick={e => handleSubmit(e)}
      >
        <AiOutlineSearch size={25} />
      </button>
    </div>
  );
}

export default SearchBar;