import React from "react";
import CartPage from "../components/Cart/CartPage";
import NavBar from "../components/NavBar";

const Cart = () => {
  return (
    <div className="bg-stone-200">
      <NavBar />
      <CartPage />
    </div>
  );
};

export default Cart
