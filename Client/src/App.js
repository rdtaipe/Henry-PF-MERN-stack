
import Form from "./pages/Formulario/Form";
import Home from "./pages/Home";
import InicialPage from "./pages/InicialPage";
import { Route, Routes } from "react-router-dom";
function App() {
  return (
    <div >
        <Routes>
          <Route path="/" element={<InicialPage/>} />
         <Route path="/home" element={<Home/>} />
         <Route path="/form" element={<Form/>} />
        </Routes>
    </div>
    //
  );
}

export default App;
