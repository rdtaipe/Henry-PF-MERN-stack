import React from "react";
import { BsChevronRight } from "react-icons/bs";

const UserButton = ({ text, icon, value, onClick, status }) => {

    console.log(status)
    console.log(value)
  return (
    <div
      style={{ borderRadius: "5px", width: "350px" }}
      className={`transition duration-200 font-sm shadow-md hover:shadow-2xl text-xl pl-8 py-4 hover:font-medium hover:cursor-pointer ${
        status === value ? "bg-stone-500" : "bg-stone-100"
      }`}
      onClick={() => onClick(value)}
    >

      <div className="flex flex-col md:flex-row justify-between items-center md:mr-8">
      {icon && React.cloneElement(icon, { style: { marginBottom: "3px", color: status === value ? "white" : "black" } })}

        <span className={`ml-5 ${status === value ? "text-white" : ""}`}>{text}</span>
        <BsChevronRight className="ml-auto order-2" />
      </div>
    </div>
  );
};

export default UserButton;
