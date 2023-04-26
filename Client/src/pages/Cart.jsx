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
  const [orderData, setOrderData] = useState([])
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
