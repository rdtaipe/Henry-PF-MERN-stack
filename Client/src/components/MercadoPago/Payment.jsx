import React from "react";
import { useContext, useState } from "react";
import classnames from 'classnames'
import { Wallet } from "@mercadopago/sdk-react";
import { Context } from "./ContextProvider";
import axios from "axios";
import { useSelector } from "react-redux";
const Payment = () => {
  // const { preferenceId, orderData } = useContext(Context);
  const { preferenceId, orderData } = useContext(Context);

  const [isReady, setIsReady] = useState(false);
  const paymentClass = classnames('payment-form dark', {
    'payment-form--hidden': !isReady,
  });
  const { cart } = useSelector(({ state }) => state.user)
  

 console.log(cart)

  const [totalPrice, setTotalPrice] = useState(
    cart.reduce((acc, curr) => acc + curr.price, 0) // Obtener la suma de los precios de los artículos seleccionados
  );

  const handleOnReady = () => {
    setIsReady(true);
  }

  const renderCheckoutButton = (preferenceId) => {
    if (!preferenceId) return null;

    return (
      <Wallet
        initialization={{ preferenceId: preferenceId }}
        onReady={handleOnReady}
        onSubmit={() => {
          axios.post('http://localhost:5000/payment', cart).then((res) => window.location.href = res.data.response.body.sandbox_init_point)
        }} />
    )
  }

  return (
    <div className={`mt-[200px] min-h-screen ${paymentClass}`}>
      <div className="container_payment">
        <div className="block-heading">
          <h2>Checkout Payment</h2>
          <p>ChicCloset 2023 | All rights reserved. </p>
        </div>
        <div className="form-payment">
          <div className="products">
            <h2 className="flex justify-center items-center mb-10 font-bold">Summary</h2>
            <div className="item">
              {cart.map(prod => {
                return (
                  <div className="flex justify-between m-2 border-4 p-3">
                    <p>{prod.name}</p>
                    <p>{prod.price} $ARS</p>
                  </div>
                )
              })}
            </div>
            <div className="flex justify-between mt-20">
              <p className="font-bold">Total</p>
              <span className="text-lg font-bold" id="summary-total">{totalPrice} $ARS</span>
            </div>
          </div>
          <div className="payment-details">
            <div className="form-group col-sm-12">
              {renderCheckoutButton(preferenceId)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
