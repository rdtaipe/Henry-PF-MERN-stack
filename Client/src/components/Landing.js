import React from "react";
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <div>
      <section className="dark:bg-gray-800 dark:text-gray-100 min-h-screen flex flex-col justify-center items-center">
        <div className="container mx-auto text-center md:py-32 md:px-10 lg:px-32 xl:max-w-3xl">
          <h1 className="text-5xl font-bold leading-none sm:text-6xl">
            Bienvenido a
            <span className="dark:text-violet-400">  ChicCloset</span>
          </h1>
          <p className="px-8 mt-8 mb-12 text-2xl">
            El lugar donde puedes comprar lo que siempre habías buscado
          </p>
          <div className="flex flex-wrap justify-center">
            <Link to="/home">
              <button className="px-8 py-3 m-2 text-lg font-semibold rounded dark:bg-violet-400 dark:text-gray-900">
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
