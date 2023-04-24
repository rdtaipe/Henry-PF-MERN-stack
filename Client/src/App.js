import Form from "./pages/Formulario/Form";
import Home from "./pages/Home";
import InicialPage from "./pages/InicialPage";
import { Route, Routes } from "react-router-dom";
import { Detail } from "./pages/Detail";
import Footer from "./components/Footer";
import { About } from "./pages/About";
import Cart from "./pages/Cart";
import Authorize from "./pages/Authorize";
import User from "./pages/User";
import { useSelector, useDispatch } from "react-redux";

const server = {
  local: "http://localhost:5000",
  production: "https://xmk0mx-5000.csb.app",
};

function App() {
  const dispatch = useDispatch();
  const { setter } = useSelector(({ state }) => state.server);

  dispatch(setter({ keys: "state.server.url", value: server.production }));
  console.log(useSelector(({ state }) => state.server.url));

  return (
    <div>
      <Routes>
        <Route path="/" element={<InicialPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/token/:token" element={<Home />} />
        <Route path="/form" element={<Form />} />
        <Route path="/about" element={<About />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/products/:productId" element={<Detail />} />
        <Route path="/authorize" element={<Authorize/>} />
        <Route path="/user" element={<User />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
