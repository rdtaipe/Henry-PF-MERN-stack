import React from "react";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";

const Stars = (props) => {
  const { score, onScoreClick } = props;

  return (
    <div className="flex items-center justify-center">
      <div className="mr-2">Score:</div>
      {[...new Array(5)].map((star, index) => {
        return index < score ? (
          <AiFillStar
            key={index}
            className="w-6 h-8 fill-current text-yellow-500 cursor-pointer"
            onClick={() => onScoreClick(index + 1)}
          />
        ) : (
          <AiOutlineStar
            key={index}
            className="w-6 h-8 fill-current text-gray-400 cursor-pointer"
            onClick={() => onScoreClick(index + 1)}
          />
        );
      })}
    </div>
  );
};

export default Stars;
