import React, { useState } from "react";
import CartPage from "../components/Cart/CartPage";
import InternalProvider from "../components/MercadoPago/ContextProvider";
import Payment from "../components/MercadoPago/Payment";
import { initMercadoPago, } from "@mercadopago/sdk-react";


import Stepper from "../components/Stepper";
initMercadoPago("APP_USR-544e1d3a-475b-4f83-b0c7-7c9e74534ecf"); //PUBLIC KEY

const Cart = () => {
  const[step,setStep]=useState(1)
  const [orderData, setOrderData] = useState([])


  
  return (
    <InternalProvider context={{step,setStep, orderData, setOrderData }}>
   
      
      <div className="bg-stone-100">
           <Stepper
      steps={[
        {id:1,title:"Cart",text:"Select your products"},
        {id:2,title:"Payment",text:"Confirm your products"},
        {id:3,title:"Confirmation",text:"Go to payment "},


      ]}
      step={step}
      onClick={(v)=>setStep(v)}
      
      />
        <CartPage/>
        <Payment/>
      </div>
    </InternalProvider>
  );
};

export default Cart
