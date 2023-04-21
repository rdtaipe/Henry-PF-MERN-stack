import React from "react";
import { useContext, useState } from "react";
import classnames from 'classnames'
import { Wallet } from "@mercadopago/sdk-react";
import { Context } from "./ContextProvider";
import axios from "axios";

const Payment = () => {
  const { preferenceId, orderData } = useContext(Context);
  const [isReady, setIsReady] = useState(false);
  const paymentClass = classnames('payment-form dark', {
    'payment-form--hidden': !isReady,
  });

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
          axios.post('http://localhost:5000/payment', orderData).then((res) => window.location.href = res.data.response.body.sandbox_init_point)
        }} />
      )
  }

  return (
    <div className={`mt-[200px] min-h-screen ${paymentClass}`}>
      <div className="container_payment">
        <div className="block-heading">
          <h2>Checkout Payment</h2>
          <p>This is an example of a Mercado Pago integration</p>
        </div>
        <div className="form-payment">
          <div className="products">
            <h2 className="flex justify-center items-center mb-10">Summary</h2>
            <div className="item">
              {orderData.map(prod => {
                return (
                  <div className="flex justify-between m-2">
                    <p>{prod.name.toUpperCase()}</p>
                    <p>{prod.price} $ARS</p>
                  </div>
                )
              })}
            </div>
            <div className="total">
              Total
              <span className="price" id="summary-total">$100</span>
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
