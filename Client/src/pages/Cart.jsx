import React, { useState } from "react";
import axios from "axios";
import { initMercadoPago } from "@mercadopago/sdk-react";
import CartPage from "../components/Cart/CartPage";
import NavBar from "../components/NavBar";
import InternalProvider from "../components/MercadoPago/ContextProvider";
import Payment from "../components/MercadoPago/Payment";
import { useSelector } from "react-redux";

initMercadoPago("APP_USR-544e1d3a-475b-4f83-b0c7-7c9e74534ecf"); //PUBLIC KEY

const Cart = () => {
  const [preferenceId, setPreferenceId] = useState(null);
  const [orderData, setOrderData] = useState([
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
  ])
  const {url} = useSelector(({state}) => state.server);


  const handleClick = async () => {
    await axios.post(`${url}/payment`, orderData, {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        setPreferenceId(response.data.response.body.id);
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
      })
  };

  return (
    <InternalProvider context={{ preferenceId, orderData, setOrderData }}>
      <div className="bg-stone-100">
        <NavBar />
        <CartPage onClick={handleClick} />
        <Payment/>
      </div>
    </InternalProvider>
  );
};

export default Cart
