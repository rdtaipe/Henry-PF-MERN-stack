import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";

export const DetailPage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/products/${productId}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.log(err.message));
  }, []);

  // const slide = [
  //   {
  //     url: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/018c0d32-59ec-47bc-9244-cd484bb45d1f/air-force-1-le-zapatillas-nino-a-r2kdvj.png",
  //   },
  //   {
  //     url: "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/37d2e58a-eff1-4264-8007-876fc894637e/air-force-1-07-zapatillas-QxRXZV.png",
  //   },
  //   {
  //     url: "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/9de2efa3-5e50-4c07-aa4d-e6132e74e0de/air-force-1-07-zapatillas-QxRXZV.png",
  //   },
  // ];
  //Hago un map con las imagenes de BD para que se vean así.
  const slide = product.image
    ? product.image.map((x) => {
        return { url: x };
      })
    : "https://example.com/zapatos-deportivos-nike1.jpg";

  const [currentIndex, setCurrentIndex] = useState(0);

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

  return (
    <div className="h-screen pt-20 grid grid-cols-2 content-center align-middle justify-around">
      <div>
        <div
          style={{ backgroundImage: `url(${slide[currentIndex].url})` }}
          className="mx-auto w-9/12 h-[590px] rounded-2xl bg-center bg-cover duration-500 flex justify-between"
        >
          <div className="w-fit h-fit relative top-[50%] text-2xl rounded-full p-2 ml-2 bg-black/20 text-white cursor-pointer">
            <BsChevronCompactLeft onClick={prevSlide} size={30} />
          </div>

          <div className="w-fit h-fit relative top-[50%] text-2xl rounded-full p-2 mr-2 bg-black/20 text-white cursor-pointer">
            <BsChevronCompactRight onClick={nextSlide} size={30} />
          </div>
        </div>
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

          <div className="grid grid-cols-6 gap-y-3 pt-7">
            {product.size
              ? product.size.map((el) => {
                  return (
                    <button
                      key={el}
                      className="font-bold text-lg text-center bg-white px-3 py-1 border-2 border-black rounded mx-auto cursor-pointer focus:outline-none focus:ring focus:ring-purple-500 hover:ring hover:ring-purple-300"
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

//Deploy, auth, pasarela, cloudinary, notificaciones, local storage (Al refrescar la pagina, que siga la sesion. Al igual que al tener productos en el carrito, que no desaparezcan) (Redux persist).
//Deploy, auth terceros, cloudinary, pasarela de pagos, local storage, notificaciones x email
//Se puede presentar 3 requisitos, pero para la última se va a volver DEMASIADO pesado todo.
