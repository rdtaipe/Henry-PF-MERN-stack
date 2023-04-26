import React from 'react';
import CartItem from './CartItem';
import { useState, useEffect } from 'react';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import { Notification } from '../Notification/Notification';
import { FaShoppingCart } from 'react-icons/fa';
import { BiCart } from 'react-icons/bi';
import { GiShoppingCart } from 'react-icons/gi';
import { IoCartOutline } from 'react-icons/io5';
import { useContext } from 'react';
import { Context } from '../MercadoPago/ContextProvider';
import { useAuth0 } from '@auth0/auth0-react';
import { useDispatch, useSelector } from 'react-redux';


const CartPage = () => {
  const dispatch = useDispatch()
  const { data, cart } = useSelector(({ state }) => state.user)
  const { url, auth, setter, get } = useSelector(({ state }) => state.server)
  const userData = data()

  const [cartProducts, setCartProducts] = useState([]);
  const [isVisible, setIsVisible] = useState(true);
  const {setOrderData } = useContext(Context);
  
  const [summary, setSummary] = useState({});
  
  useEffect(() => {
    getProductCart();    

  }, [(cart.length > 0 ? null : cart)]);

  



  const getProductCart = () => {
    auth.get(`${url}/cart/${userData._id}`).then(res => {
      var resData = res.data.products
      setCartProducts(resData)
      dispatch(setter({ keys: 'state.user.cart', value: resData }))
    })

  }
  const handleDelete = (id) => {
    auth.delete(`${url}/cart/${userData._id}`, { id, type: 0 }).then(res => {
      var resData = res.data.products
      setCartProducts(resData)
      dispatch(setter({ keys: 'state.user.cart', value: resData }))

    })
  }

  const handleIncrement = (id, obj) => {

    auth.put(`${url}/cart/${userData._id}`, obj).then(res => {
      var resData = res.data.products
      setCartProducts(resData)
      dispatch(setter({ keys: 'state.user.cart', value: resData }))
    })
  }
  const handleDecrement = (id) => {
    auth.delete(`${url}/cart/${userData._id}`, { id, type: 1 }).then(res => {
      var resData = res.data.products
      setCartProducts(resData)
      dispatch(setter({ keys: 'state.user.cart', value: resData }))
    })

  }


  const handleSummary = (item, t) => {
    setSummary(prevSummary => {
      const newSummary = {
        ...prevSummary,
        [item.name]: {
          productId: item._id,
          image: item.image[0],
          name: item.name,
          price: item.price,
          description: item.description,
          quantity: t,
          total: Math.round(item.price * t * 100) / 100
        }
      };
      return newSummary;
    });
//save items in realCart

  }

  const handlePayment = () => {
   
      setIsVisible(false)
      setOrderData({
        products: summary, 
        total: summary && Object.values(summary).reduce((acc, item) => acc + item.total, 0),
        userId: userData._id
})
}





  return (<div style={{ height: "900px" }} className={`container mx-auto flex items-center bg-stone-100 justify-center px-4 mt-12  ${!isVisible ? 'hidden' : ''}`}>
    {cartProducts.length === 0 ? (

      <div style={{ borderRadius: "18px" }} className="shadow-2xl text-center bg-stone-200 py-12 px-8 sm:px-16 md:px-24 lg:px-56 max-w-4xl mx-auto flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold leading-none sm:text-3xl dark:text-black">
          There's nothing on your cart, let's get chic!
        </h1>
        <div className="flex items-center justify-center my-10">
          <IoCartOutline size={250} />
        </div>
        <Link to="/home" className="bg-gray-800 text-white py-2 px-4 sm:px-12 rounded mt-6 hover:bg-blue-900 transition inline-block">
          Go to main page
        </Link>
      </div>


    ) : (
      <div className='grid grid-cols-1 sm:grid-cols-2 gap-6 bg-stone-100'>

        <div className="space-y-6">

          <h1 className="text-2xl font-bold leading-none sm:text-3xl dark:text-black">
            Cart ({cartProducts.length} products)
          </h1>

          {cartProducts.map((item) => {

            return <CartItem
              key={item.id}
              id={item.id}
              item={item}
              onIncrement={() => handleIncrement(item.id, item)}
              onDecrement={() => handleDecrement(item.id)}
              onSummary={(v) => handleSummary(v, item.total)}
              handleDelete={() => handleDelete(item.id)} // Pasa la función handleDelete como prop
            />
          })}

        </div>

        <div className="ml-16 flex flex-col">

          <h1 className="text-2xl font-bold leading-none sm:text-3xl dark:text-black">
            Order Summary
          </h1>

          <div style={{ borderRadius: "10px" }} className="border-none shadow-md bg-stone-200 px-5 py-5 mt-6 dark:text-black">
            {Object.entries(summary).map(([key, value]) => {
              return (
                <div className="flex justify-between">
                  <span>{key}</span>
                  <span>{value.quantity} x ${value.total}</span>
                </div>
              )
            })}

            <div className="flex justify-between border-t border-stone-500 pt-4 mt-6">
              <span className="font-bold">Total ({cartProducts.length} items)</span>
              <span>${
                summary && Object.values(summary).reduce((acc, item) => {
                  var t=acc + item.total
                  return Math.round(t * 100) / 100
                }, 0)

              }</span>
            </div>
          </div>

          <button onClick={handlePayment} className="bg-gray-800 text-white py-2 rounded mt-10 hover:bg-blue-900 transition">
            Go to payment
          </button>

        </div>


      </div>
    )}
  </div>

  );
};

export default CartPage;