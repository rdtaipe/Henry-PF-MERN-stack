import React from 'react';
import CartItem from './CartItem';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Notification } from '../Notification/Notification';
import { IoCartOutline } from 'react-icons/io5';

const CartPage = () => {
  const itemsHardcode = [
    {
      "_id": "6439de0491db8fd7a8381bf2",
      "name": "pantalon",
      "description": "pantalon cargo ",
      "stock": 50,
      "color": "Brown",
      "size": "m",
      "image": [
        "https://d3ugyf2ht6aenh.cloudfront.net/stores/118/810/products/picsart_22-07-22_11-16-24-455-d4009b39c3f637758516585009164581-640-0.webp"
      ],
      "genre": "male",
      "brand": "Diesel",
      "price": 25,
      "active": true,
      "featured": true
    },
    {
      "_id": "6439f73d27198d499b1cd93c",
      "name": "remera argentina",
      "description": "original con detalles",
      "stock": 150,
      "color": "Grey",
      "size": "s",
      "image": [
      "https://sevensport.vteximg.com.br/arquivos/ids/617725-500-500/HG7233_1.jpg?v=638054353800600000"
      ],
      "genre": "female",
      "brand": "Tommy Hilfiger",
      "price": 35,
      "active": true,
      "featured": true
    },
    {
      "_id": "643d8d48e45f254d0697d027",
      "name": "Camisa de lino regular Fit",
      "description": "Camisa de corte estándar en lino vaporoso. Modelo con cuello inglés, tapeta lisa, un bolsillo superior abierto y canesú en la espalda. Mangas largas con perilla y botón, y botones ajustables en los puños. Bajo redondeado. El lino es un tejido transpirable, impecable planchado y sin planchar, y que se suaviza con el tiempo.",
      "stock": 200,
      "color": "beige",
      "size": "m",
      "category": "T-shirts",
      "image": [
      "https://hmperu.vtexassets.com/arquivos/ids/3446960-483-725/Camisa-de-lino-Regular-Fit---Beige---H-M-PE.jpg"
      ],
      "genre": "male",
      "brand": "Levi's",
      "price": 40,
      "active": true,
      "featured": true
      },
  ];

  // const items = useSelector((state) => state.items) se

  const [itemsLocal, setItemsLocal] = useState(itemsHardcode)

  const [totalItems, setTotalItems] = useState(itemsLocal.length);
  const [totalPrice, setTotalPrice] = useState(
    itemsLocal.reduce((acc, curr) => acc + curr.price, 0) // Obtener la suma de los precios de los artículos seleccionados
  );
  
  const [summary, setSummary] = useState(() => {
    return itemsLocal.reduce((prev, curr) => {
      return {
        ...prev,
        [curr._id]: {
          name: curr.name,
          _id: curr._id,
          quantity: 1,
          total: curr.price
        }
      };
    }, {});
  });
  
  console.log(summary)

  function handleSummary(value) {
    setSummary(prevSummary => ({
      ...prevSummary,
      [value.item]: {
        name: value.name,
        _id: value._id,
        quantity: value.quantity,
        total: value.total
      }
    }));
  }

  function handleDelete(id) {
    const deletedItem = itemsLocal.find(item => item._id === id);
    const newItems = itemsLocal.filter(item => item._id !== id);
    const deletedItemQuantity = summary[deletedItem._id].quantity;
    let newTotalPrice = totalPrice - (deletedItem.price * deletedItemQuantity);
    setTotalPrice(newTotalPrice);
    setItemsLocal(newItems);
    setTotalItems(totalItems - deletedItemQuantity);
    setSummary(prevSummary => {
      const {[deletedItem._id]: deleted, ...rest} = prevSummary;
      return rest;
    });
    Notification('warning', deletedItem.name + ' deleted from the cart', 'top-end', 5000);
  }

  const handleTotalItems = (value) => {
    setTotalItems(totalItems + value);
  };

  const handleTotalPrice = (value) => {
    setTotalPrice(totalPrice + value);
  };

  return (
    <div className="container mx-auto flex items-center justify-center px-4 mt-16 min-h-screen">
      {itemsLocal.length === 0 ? (

      <div style={{borderRadius: "18px"}} className="shadow-2xl text-center bg-stone-300 py-12 px-8 sm:px-16 md:px-24 lg:px-56 max-w-4xl mx-auto flex flex-col items-center justify-center">
        
        <h1 className="text-2xl font-bold leading-none sm:text-3xl dark:text-black">
            There's nothing on your cart, let's get chic!
        </h1>

        <div className="flex items-center justify-center my-10">
            <IoCartOutline size={250}/>
        </div>

        <Link to="/home" className="bg-gray-800 text-white py-2 px-4 sm:px-12 rounded mt-6 hover:bg-blue-900 transition inline-block">
            Go to main page
        </Link>

      </div>


  ) : (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-20 mb-24">

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
            handleDelete={() => handleDelete(item._id)} // Pasa la función handleDelete como prop
          />
        ))}

      </div>

      <div className="ml-16 flex flex-col">

        <h1 className="text-2xl font-bold leading-none sm:text-3xl dark:text-black">
          Order Summary
        </h1>

        <div style={{borderRadius: "15px"}} className="border-2 border-stone-200 bg-white px-5 py-5 mt-6 dark:text-black shadow-xl">
          {Object.entries(summary).map(([itemId, itemSummary]) => (
            <div key={itemId} className="flex justify-between mb-2">
              <span>{itemSummary.name} x {itemSummary.quantity}</span>
              <span>${itemSummary.total.toFixed(2)}</span>
            </div>
          ))}
          <div className="flex justify-between border-t pt-2 mt-6">
            <span className="font-bold">Total ({totalItems} items)</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
        </div>

        <button className="bg-gray-800 text-white py-2 rounded mt-10 hover:bg-blue-900 transition">
            Go to payment
        </button>

      </div>


    </div>
  )}
</div>

  );
};

export default CartPage;