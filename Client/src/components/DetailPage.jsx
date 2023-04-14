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
      </div>
      <div className="flex flex-col justify-center gap-10 w-9/12">
        <div>
          <p className="capitalize font-bold text-5xl text-center font-serif">
            {product.name}
          </p>
        </div>
        <div className="flex flex-col">
          <p className="text-center pb-5">{product.description}</p>
          {/* <p className="text-center pb-5">
            El fulgor sigue vivo con las Nike Air Force 1 '07, un icono del
            baloncesto que aporta un nuevo toque a su ya característica piel
            impecable, sus colores llamativos y la cantidad perfecta de
            reflectante.
          </p> */}

          <p className="font-bold text-4xl pb-3">${product.price}</p>

          {/* <p>{product.stock}</p> */}

          <p>Colores Disponibles: {product.color}</p>

          {/* <p>{product.genre}</p> */}

          <div className="grid grid-cols-6 gap-y-3 pt-7 place-content-center">
            {product.size
              ? product.size.map((el) => {
                  return (
                    <button
                      key={el}
                      className="font-bold bg-white px-3 py-2 border-2 border-black rounded mx-auto cursor-pointer focus:outline-none focus:ring focus:ring-purple-500"
                    >
                      {el}
                    </button>
                  );
                })
              : null}
            {/* Cambiar visualización de size */}
            {/* <p className="font-bold bg-white px-3 py-2 border-2 border-black rounded mx-auto cursor-pointer">
              41
            </p>
            <p className="font-bold bg-white px-3 py-2 border-2 border-black rounded mx-auto cursor-pointer">
              42
            </p>
            <p className="font-bold bg-white px-3 py-2 border-2 border-black rounded mx-auto cursor-pointer">
              43
            </p> */}
          </div>

          {/* <p>{product.brand ? product.brand.name : null}</p> */}
        </div>

        <button className="bg-purple-500 h-10 text-center border-2 border-black rounded hover:font-bold">
          Comprar!
        </button>
      </div>
    </div>
  );
};

//#A78BFA
