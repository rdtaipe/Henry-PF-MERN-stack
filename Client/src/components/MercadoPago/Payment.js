import React, { useEffect, useContext, useState } from "react";
import { Wallet, CardPayment, Payment as pay, StatusScreen } from "@mercadopago/sdk-react";
import { Context } from "./ContextProvider";
import axios from "axios";
import { useSelector } from "react-redux";
const Payment = () => {
  // const { preferenceId, orderData } = useContext(Context);
  const { step, setStep, orderData } = useContext(Context);
  const { url, post } = useSelector(({ state }) => state.server);

  const [cart, setCart] = useState([])
  const [total, setTotal] = useState(0)
  const [preferenceId, setPreferenceId] = useState('')



  useEffect(() => {
    var awaitCart = orderData.products || []
    setCart(awaitCart)
    setTotal(orderData.total)

    if (orderData && awaitCart.length > 0) {
      console.log({ userId: orderData.userId, cart: awaitCart, total: orderData.total })
      post(`${url}/payment`, { userId: orderData.userId, cart: awaitCart, total: orderData.total })
        .then((res) => {
          setPreferenceId(res.data.response.body.id);
          console.log(res);
        })
        .catch((error) => {
          console.log("Hubo un error")
          console.error(error);
        })

    }


  }, [orderData])




  const handlePay = (preferenceId) => {
    if (!preferenceId) return null;
    console.log(preferenceId)

    var url = `https://sandbox.mercadopago.com.ar/checkout/v1/redirect?pref_id=${preferenceId}`

    window.location.href = url


  }

  return (step === 2 &&
    <div className={`mt-[200px] min-h-screen `}>
      <div className="container_payment">
        <div className="block-heading">
          <h2>Checkout Payment</h2>
          <p>ChicCloset 2023 | All rights reserved. </p>
        </div>
        <div className="form-payment">
          <div className="products">
            <h2 className="flex justify-center items-center mb-10 font-bold">Summary</h2>
            <div className="item">
              {cart && cart.map((prod) => {
                return (
                  <div className="flex justify-between m-2 border-4 p-3">
                    <div className="flex justify-between">
                      <img className="w-20 h-20" src={prod.image} alt="" />
                      <div className="flex flex-col justify-center ml-3">
                        <p className="text-lg font-bold">{prod.name}</p>
                        <p className="text-gray-600">${prod.price}</p>
                        <p className="text-gray-600">Quantity: {prod.quantity}</p>
                        <p className="text-gray-600">Total: ${prod.total}</p>
                      </div>
                    </div>
                  </div>
                );

              })}



            </div>
            <div className="flex justify-between mt-20">
              <p className="font-bold">Total</p>
              <span className="text-lg font-bold" id="summary-total">$ {total} </span>
            </div>
          </div>
          <div className="payment-details">
            <div className="form-group flex justify-center items-center w-full">
              <button className="btn btn-primary btn-block btn-lg bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded-full w-1/2"
                onClick={(e) => { handlePay(preferenceId) }}>
                Go to payment
              </button>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
