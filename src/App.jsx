import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Product from "./components/Product";
import { ToastContainer } from "react-toastify";
import PlaceOrder from "./pages/PlaceOrder";

function App() {
  const location = useLocation();

  // Hide navbar on /place-order route
  const hideNavbar = location.pathname === "/place-order";

  return (
    <div>
      <ToastContainer
        toastClassName="custom-toast"
        progressClassName="custom-progress"
      />
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product" element={<Products />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path='/place-order' element={<PlaceOrder/>} /> 
      </Routes>
    </div>
  );
}

export default App;
