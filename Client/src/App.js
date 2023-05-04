import React, { useEffect, useState } from "react";
import Home from "./pages/Home";
import InicialPage from "./pages/InicialPage";
import { Route, Routes, useHref, useNavigate } from "react-router-dom";
import { Detail } from "./pages/Detail";
import Footer from "./components/Footer";
import { About } from "./pages/About";
import Cart from "./pages/Cart";
import Authorize from "./pages/Authorize";
import User from "./pages/User";
import Payment from "./pages/Payment/Payment";
import { useSelector, useDispatch } from "react-redux";
import ScrollAnimate from "./components/ScrollAnimate";
import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react'
////////////////////////////////////////////
import NavBar from "./components/NavBar";
import Questions from "./pages/Questions";
import Button from '@mui/material/Button'
import Error from "./pages/ErrorComponent/Error";
const server = {
  local: "http://localhost:5000",
  production: "https://wgxjjo-5000.csb.app",
};

function App() {
  const [userStatus, setUserStatus] = useState()
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { setter, auth, url } = useSelector(({ state }) => state.server);
  const { data } = useSelector(({ state }) => state.user);
  const { isAuthenticated, logout,getAccessTokenSilently} = useAuth0();
  const href = useHref();
  dispatch(setter({ keys: "state.server.url", value: server.local }));
  const [page, setPage] = useState("/");
  useEffect(() => {
    setPage(href);
  }, [href]);

  useEffect(() => {
    const userData = data()
    if(userData._id){
      auth.get(`${url}/users/find/${userData._id}`).then(res => setUserStatus(res.data.status))
    }
    if(userStatus === "inactive"){
      navigate('/error')
      // alert("user ban")
      // logout()
    }

  }, [userStatus]);

  return (
    <div>
      {page !== "/" && page != '/error' && <NavBar />}
      <Routes>
        <Route path="/" element={<InicialPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/token/:token" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/payment/:res" element={<Payment />} />
        <Route path="/products/:productId" element={<Detail />} />
        <Route path="/authorize" element={<Authorize />} />
        <Route path="/user" element={<User />} />
        <Route path="/questions" element={<Questions />} />
        <Route path="/error" element={<Error/>}/>
      </Routes>

      {page !== "/" && <ScrollAnimate footer={<Footer />} />}
    </div>
  );
}

export default App;
