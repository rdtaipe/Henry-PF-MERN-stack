import React, { useState } from "react";
import CartPage from "../components/Cart/CartPage";
import NavBar from "../components/NavBar";
import InternalProvider from "../components/MercadoPago/ContextProvider";
import Payment from "../components/MercadoPago/Payment";
import { initMercadoPago, } from "@mercadopago/sdk-react";

initMercadoPago("APP_USR-544e1d3a-475b-4f83-b0c7-7c9e74534ecf"); //PUBLIC KEY

const Cart = () => {
  const [orderData, setOrderData] = useState([])

  return (
    <InternalProvider context={{ orderData, setOrderData }}>
      <div className="bg-stone-100">
        <NavBar />
        <CartPage/>
        <Payment/>
      </div>
    </InternalProvider>
  );
};

export default Cart
