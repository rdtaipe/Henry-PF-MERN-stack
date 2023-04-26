import React,{useEffect,useContext, useState } from "react";
import classnames from 'classnames'
import { Wallet } from "@mercadopago/sdk-react";
import { Context } from "./ContextProvider";
import axios from "axios";
import { useSelector } from "react-redux";
const Payment = () => {
  // const { preferenceId, orderData } = useContext(Context);
  const { step,setStep,orderData } = useContext(Context);

  const [isReady, setIsReady] = useState(false);
  const paymentClass = classnames('payment-form dark', {
    'payment-form--hidden': !isReady,
  });
  const { url,post } = useSelector(({ state }) => state.server);

 const [cart, setCart] = useState([])
 const [total, setTotal] = useState(0)
 const [userId, setUserId] = useState('')

 const [preferenceId, setPreferenceId] = useState('')

  const handleOnReady = () => {
    setIsReady(true);
  }


  useEffect(() => { 
    var awaitCart= orderData.products&&Object.values(orderData.products)||[]
    setCart(awaitCart)
    setTotal(orderData.total)
    setUserId(orderData.userId)

    if(orderData&&awaitCart.length>0){
      post(`${url}/payment`,{userId:orderData.userId, cart: awaitCart, total:orderData.total})
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




  const handlePay =(preferenceId) => {
    if (!preferenceId) return null;

    return (
      <Wallet
        initialization={{ preferenceId: preferenceId }}
        onReady={handleOnReady}
        onSubmit={() => {
          axios.post(`${url}/payment`, cart).then((res) => window.location.href = res.data.response.body.sandbox_init_point)

        }} />
    )
  }

  return (step===2&&
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
              {cart&&cart.map((prod) => {
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
            <div className="form-group col-sm-12">{
              handlePay(preferenceId)

            }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
