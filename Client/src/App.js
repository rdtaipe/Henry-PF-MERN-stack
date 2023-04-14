
import Form from "./pages/Formulario/Form";
import Home from "./pages/Home";
import InicialPage from "./pages/InicialPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
function App() {
  return (
    <div >
 <BrowserRouter>
        <Routes>
          <Route path="/" element={<InicialPage/>} />
         <Route path="/home" element={<Home/>} />
         <Route path="/form" element={<Form/>} />
         
        
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
