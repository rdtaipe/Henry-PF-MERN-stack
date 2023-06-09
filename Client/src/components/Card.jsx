import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Notification } from "./Notification/Notification";

const Card = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { _id, image, name, price, stock, stars } = props.data; //product DATA
  const { url, auth, setter } = useSelector(({ state }) => state.server);
  const { isAutorized, data, cart } = useSelector(({ state }) => state.user);
  const userData = data();

  // const discount = Math.round(Math.random() * 20);
  // const priceDiscount = Math.round(price - (price * discount) / 20);
  /* const stars = Math.round(Math.random() * 5); */

  const handleNameClick = (e, item) => {
    if (isAutorized()) {
      //si esta autorizado
      const newObj = {
        id: _id,
        date: new Date(),
      };

      auth.put(`${url}/cart/${userData._id}`, newObj).then((res) => {
        var resData = res.data.products;
        dispatch(setter({ keys: "state.user.cart", value: resData }));
      });
      Notification("success", `${name} added to the cart`, "bottom-start", 5000);
    } else {
      //si no esta autorizado
      navigate("/authorize");
    }
  };

  function generateStars(num) {
    let array = [];
    for (let i = 0; i < num; i++) {
      array.push(
        <path d="M12 17.27l-5.18 2.73 1-5.81-4.24-3.73 5.88-.51L12 6.34l2.45 5.51 5.88.51-4.24 3.73 1 5.81z" />
      );
    }
    return array;
  }

  return (
    
    <div className="rounded-lg justify-center items-center w-[200px] min-h-200 bg-stone-300 hover:shadow-xl hover:scale-105 transition duration-500 ease-in-out mb-1">
      <div className="relative h-full">
        <div className="relative h-40">
        <Link to={`/products/${_id}`}>
          <img
            className="relative object-cover w-full h-40 rounded-t-lg"
            src={image[0]}
            alt={name}
          />
          {/* {discount && ( 
            <div className="absolute top-0 right-0 m-2">
              <p className="text-xs font-semibold text-white bg-red-500 rounded-full px-2 py-1">
                {discount}% off
              </p>
            </div>
          )} */}
          <div className="absolute left-3 bottom-2">
            {/* stars */}
            <div className="flex items-center">
              {/*               {[...Array(stars)].map((star, i) => (
                <svg
                  key={i}
                  className="w-4 h-4 fill-current text-yellow-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 17.27l-5.18 2.73 1-5.81-4.24-3.73 5.88-.51L12 6.34l2.45 5.51 5.88.51-4.24 3.73 1 5.81z" />
                </svg>
              ))} */}
              {generateStars(stars).map((el, i) => {
                return (
                  <svg
                    key={i}
                    className="w-4 h-4 fill-current text-yellow-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    {el}
                  </svg>
                );
              })}
              <p className="ml-1 text-xs text-gray-500 dark:text-gray-400">
                ({stars.toFixed(1)})
              </p>
            </div>
          </div>
       </Link>
        </div>
    
        <div className="w-full h-35 px-3">
          <div className="mt-2 pb-3">
          <Link to={`/products/${_id}`}>
            <p
              className="text-ml font-bold text-gray-900 cursor-pointer"
            
              title={name}
            >
              {name.length > 34 ? name.slice(0, 34) + "..." : name}
            </p>
            </Link>
            {/* price */}
            <Link to={`/products/${_id}`}>
            <div className="flex justify-between items-center">
              <p className="text-ms font-semibold text-gray-700">
                {/* {discount ? (
                  <>
                    <span className="line-through text-gray-500">${price}</span>
                    <span className="text-green-500">${priceDiscount}</span>
                  </>
                ) : ( */}
                  <span className="text-green-600 dark:text-green-600">
                    ${price}
                  </span>
               
              </p>
            </div>
            </Link>
              <button
                style={{ borderRadius: "5px" }}
                className="text-md px-2 ml-auto text-white bg-gray-900 hover:bg-blue-900 transition"
                onClick={(e) => handleNameClick(e, props.data)}
              >
                Add to cart
              </button>

            </div>
          </div>
        </div>
      </div>

  
  );
};

export default Card;
