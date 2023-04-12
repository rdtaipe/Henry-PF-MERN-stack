
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
         
        
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
