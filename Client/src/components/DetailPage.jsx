import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import Stars from "./Stars";
import CommentBox from "./CommentBox";

export const DetailPage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/products/${productId}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.log(err.message));
  }, []);

  const slide = product.image
    ? product.image.map((x) => {
        return { url: x };
      })
    : "https://example.com/zapatos-deportivos-nike1.jpg";

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slide.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === slide.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };
  const updateScore = (newScore) => {
    setScore(newScore);
  };

  //grid grid-cols-2 content-center align-middle justify-around

  return (
    <div className="h-screen flex flex-col justify-center mb-10 mt-20">
      <div className="flex justify-evenly items-center">
        <div
          style={{ backgroundImage: `url(${slide[currentIndex].url})` }}
          className="w-[45%] h-[500px] rounded-2xl bg-center bg-cover duration-500 flex justify-between"
        >
          <div className="w-fit h-fit relative top-[50%] text-2xl rounded-full p-2 ml-2 bg-black/20 text-white cursor-pointer">
            <BsChevronCompactLeft onClick={prevSlide} size={30} />
          </div>

          <div className="w-fit h-fit relative top-[50%] text-2xl rounded-full p-2 mr-2 bg-black/20 text-white cursor-pointer">
            <BsChevronCompactRight onClick={nextSlide} size={30} />
          </div>
        </div>

        <div className="flex flex-col justify-center items-center gap-10 w-[45%]">
          <div>
            <p className="capitalize font-bold text-4xl lg:text-5xl text-center font-serif">
              {product.name}
            </p>
          </div>
          <div className="flex flex-col text-center">
            <p className="font-bold text-4xl pb-3">${product.price}</p>

            <p className="font-bold">
              Option Colors:{" "}
              <span className="font-normal capitalize">{product.color}</span>
            </p>

            <Stars score={score} onScoreClick={updateScore} />

            <div className="flex justify-center pt-7">
              {product.size && typeof product.size === "object" ? (
                product.size.map((el) => {
                  return (
                    <button
                      key={el}
                      className="font-bold text-lg text-center bg-white px-3 py-1 border-2 border-black rounded mx-auto cursor-pointer focus:outline-none focus:ring focus:ring-gray-900 hover:ring hover:ring-gray-600 uppercase"
                    >
                      {el}
                    </button>
                  );
                })
              ) : (
                <button className="font-bold text-lg text-center bg-white px-3 py-1 border-2 border-black rounded mx-auto cursor-pointer focus:outline-none focus:ring focus:ring-gray-900 hover:ring hover:ring-gray-600 uppercase">
                  {product.size && product.size}
                </button>
              )}
            </div>
            <div className="flex justify-center">
              <button className="w-[250px] md:w-[300px] lg:w-[450px] mt-10 font-semibold bg-gray-900 h-10 text-center border-2 border-black rounded hover:bg-blue-900 text-white">
                Agregar Al Carrito
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="py-10 mt-10 flex justify-around bg-slate-200/20">
        <div className="w-[40%]">
          <p className="pb-5 font-bold text-lg">
            Product Description:{" "}
            <span className="font-normal text-base">{product.description}</span>
          </p>
          <p className="font-bold text-lg">
            Product Stock:{" "}
            <span className="font-normal text-base">{product.stock}</span>
          </p>
        </div>

        <div className="w-[40%]">
          <p className="pb-5 font-bold text-lg">
            Product Brand:{" "}
            <span className="font-normal text-base">{product.brand}</span>
          </p>
          <p className="font-bold text-lg">
            Product Gender:{" "}
            <span className="font-normal text-base capitalize">
              {product.genre}
            </span>
          </p>
        </div>
      </div>

      <div className="w-full relative top-10">
        <CommentBox />
      </div>
    </div>
  );
};
