import { Detail } from "./pages/Detail";
import Form from "./pages/Form";
import Home from "./pages/Home";
import InicialPage from "./pages/InicialPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<InicialPage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/form" element={<Form />} />
          <Route path="products/:productId" element={<Detail />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
