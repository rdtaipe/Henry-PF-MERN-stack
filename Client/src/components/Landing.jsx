import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Landing = ({ images }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 7000);
    return () => clearInterval(interval);
  }, [images]);

  return (
    <div className="relative">
      {images.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentImageIndex ? "opacity-100" : "opacity-0"
          }`}
          style={{ backgroundImage: `url(${image})`, backgroundSize: "cover" }}
        >
          <div
            className="absolute inset-0 bg-stone-500 opacity-100"
            style={{ mixBlendMode: "multiply" }}
          ></div>
        </div>
      ))}
      <section className="min-h-screen flex flex-col justify-center items-center relative z-10">
        <div className="container mx-auto text-center md:py-32 md:px-10 lg:px-32 xl:max-w-3xl">
          <h1 className="text-5xl font-bold leading-none sm:text-6xl dark:text-white">
            Welcome to
            <span> ChicCloset</span>
          </h1>
          <p className="px-8 mt-8 mb-12 text-2xl dark:text-white">
            Dress to impress and never stress.
          </p>
          <div className="flex flex-wrap justify-center ">
            <Link to="/home">
            <button className="px-8 py-3 m-2 text-lg font-semibold rounded bg-black bg-opacity-80 text-white hover:bg-purple-100 hover:text-black transition duration-300">
              Get started
            </button>

            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
