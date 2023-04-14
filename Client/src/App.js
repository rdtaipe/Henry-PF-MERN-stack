
import Form from "./pages/Form";
import Home from "./pages/Home";
import InicialPage from "./pages/InicialPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from 'react-redux'
import store from './redux/store'
function App() {

  return (
    <div >
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<InicialPage />} />
            <Route path="/home" element={<Home />} />
            <Route path="/form" element={<Form />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
