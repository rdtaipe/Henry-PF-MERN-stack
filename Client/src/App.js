import Form from "./pages/Formulario/Form";
import Home from "./pages/Home";
import InicialPage from "./pages/InicialPage";
import { Route, Routes } from "react-router-dom";
import { Detail } from "./pages/Detail";
import Footer from "./components/Footer";
import {About} from './pages/About';
import Cart from "./pages/Cart";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<InicialPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/form" element={<Form />} />
        <Route path="/about" element={<About />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/products/:productId" element={<Detail />} />
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
