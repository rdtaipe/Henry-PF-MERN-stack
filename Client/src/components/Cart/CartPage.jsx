import React from 'react';
import CartItem from './CartItem';
import { useState, useEffect } from 'react';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import { Notification } from '../Notification/Notification';
import { FaShoppingCart } from 'react-icons/fa';
import { BiCart } from 'react-icons/bi';
import { GiShoppingCart } from 'react-icons/gi';
import { IoCartOutline } from 'react-icons/io5';
import { useContext } from 'react';
import { Context } from '../MercadoPago/ContextProvider';

const CartPage = ({ onClick }) => {
  const [isVisible, setIsVisible] = useState(true);
  const { preferenceId, orderData, setOrderData } = useContext(Context);

  useEffect(() => {
    if (preferenceId) setIsVisible(false);
  }, [preferenceId])

  // localStorage.removeItem("cart");


  // const items = useSelector((state) => state.items) se

  const itemsString = localStorage.getItem("cart");
  const items = JSON.parse(itemsString);

  const itemsArray = Object.values(items ?? {}); // extraer el array del objeto;

  // localStorage.removeItem("cartItems")

  const [itemsLocal, setItemsLocal] = useState(itemsArray)

  const [totalItems, setTotalItems] = useState(itemsLocal.length);
  const [totalPrice, setTotalPrice] = useState(
    itemsLocal.reduce((acc, curr) => acc + curr.price, 0) // Obtener la suma de los precios de los artículos seleccionados
  );

  const [summary, setSummary] = useState(() => {
    return itemsLocal.reduce((prev, curr) => {
      return {
        ...prev,
        [curr.name]: {
          quantity: 1,
          total: curr.price
        }
      };
    }, {});
  });


  function handleSummary(value) {
    setSummary(prevSummary => ({
      ...prevSummary,
      [value.item]: {
        quantity: value.quantity,
        total: value.total
      }
    }));
  }

  function handleDelete(id) {

    // Obtener el array de objetos de la Local Storage
    const cartItems = JSON.parse(localStorage.getItem('cart'));

    // Recorrer el array de objetos y encontrar el objeto con el ID específico
    const updatedCartItems = cartItems.filter((item) => item.id !== id);

    setItemsLocal(updatedCartItems);

    // Guardar el array actualizado en la Local Storage
    localStorage.setItem('cart', JSON.stringify(updatedCartItems));

  }

  const handleTotalItems = (value) => {
    setTotalItems(totalItems + value);
  };

  const handleTotalPrice = (value) => {
    setTotalPrice(totalPrice + value);
  };

  return (
    <div style={{ height: "900px" }} className={`container mx-auto flex items-center bg-stone-100 justify-center px-4 mt-12  ${!isVisible ? 'hidden' : ''}`}>
      {itemsLocal.length === 0 ? (

        <div style={{ borderRadius: "18px" }} className="shadow-2xl text-center bg-stone-200 py-12 px-8 sm:px-16 md:px-24 lg:px-56 max-w-4xl mx-auto flex flex-col items-center justify-center">
          <h1 className="text-2xl font-bold leading-none sm:text-3xl dark:text-black">
            There's nothing on your cart, let's get chic!
          </h1>
          <div className="flex items-center justify-center my-10">
            <IoCartOutline size={250} />
          </div>
          <Link to="/home" className="bg-gray-800 text-white py-2 px-4 sm:px-12 rounded mt-6 hover:bg-blue-900 transition inline-block">
            Go to main page
          </Link>
        </div>


      ) : (
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-6 bg-stone-100'>

          <div className="space-y-6">

            <h1 className="text-2xl font-bold leading-none sm:text-3xl dark:text-black">
              Cart ({itemsLocal.length} products)
            </h1>

            {itemsLocal.map((item) => (
              <CartItem
                key={item._id}
                item={item}
                handleTotalItems={handleTotalItems}
                handleTotalPrice={handleTotalPrice}
                handleSummary={handleSummary}
                handleDelete={() => handleDelete(item.id)} // Pasa la función handleDelete como prop
              />
            ))}

          </div>

          <div className="ml-16 flex flex-col">

            <h1 className="text-2xl font-bold leading-none sm:text-3xl dark:text-black">
              Order Summary
            </h1>

            <div style={{ borderRadius: "10px" }} className="border-none shadow-md bg-stone-200 px-5 py-5 mt-6 dark:text-black">
              {Object.entries(summary).map(([itemId, itemSummary]) => (
                <div key={itemId} className="flex justify-between mb-2">
                  <span>{itemId} x {itemSummary.quantity}</span>
                  <span>${itemSummary.total.toFixed(2)}</span>
                </div>
              ))}
              <div className="flex justify-between border-t border-stone-500 pt-4 mt-6">
                <span className="font-bold">Total ({itemsLocal.length} items)</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
            </div>

            <button onClick={onClick} className="bg-gray-800 text-white py-2 rounded mt-10 hover:bg-blue-900 transition">
              Go to payment
            </button>

          </div>


        </div>
      )}
    </div>

  );
};

export default CartPage;