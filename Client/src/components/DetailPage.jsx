import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export const DetailPage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/products/${productId}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.log(err.message));
  }, []);

  return (
    <div className="h-screen grid grid-cols-2 content-center justify-around bg-slate-200">
      <div className="flex justify-center">
        <img src="https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/018c0d32-59ec-47bc-9244-cd484bb45d1f/air-force-1-le-zapatillas-nino-a-r2kdvj.png" />
        {/* {product.image
          ? product.image.map((el) => {
              return <img alt={product.name} src={el} key={el} />;
            })
          : null} */}
      </div>
      <div className="flex flex-col justify-center gap-10 w-9/12">
        <div>
          <p className="capitalize font-bold text-5xl text-center font-serif">
            {product.name}
          </p>
        </div>
        <div className="flex flex-col">
          <p className="text-center pb-5">{product.description}</p>

          <p className="font-bold text-4xl pb-3">${product.price}</p>

          {/* <p>{product.stock}</p> */}

          <p>
            <span className="font-bold">Colores Disponibles:</span>{" "}
            {product.color}
          </p>

          {/* <p>{product.genre}</p> */}

          <div className="grid grid-cols-6 gap-y-3 pt-7 place-content-center">
            {product.size
              ? product.size.map((el) => {
                  return (
                    <button
                      key={el}
                      className="font-bold bg-white px-3 py-2 border-2 border-black rounded mx-auto cursor-pointer focus:outline-none focus:ring focus:ring-purple-500 hover:ring hover:ring-purple-300"
                    >
                      {el}
                    </button>
                  );
                })
              : null}
          </div>

          {/* <p>{product.brand ? product.brand.name : null}</p> */}

          <button className="mt-10 font-semibold bg-purple-500 h-10 text-center border-2 border-black rounded hover:transform hover:scale-105 transition-all duration-500 text-white">
            Agregar Al Carrito
          </button>
        </div>
      </div>
    </div>
  );
};
