import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Product from "./components/Product";
import { ToastContainer } from "react-toastify";
import PlaceOrder from "./pages/PlaceOrder";

function App() {
  return (
    <div>
      <ToastContainer
        toastClassName="custom-toast"
        progressClassName="custom-progress"
      />
      <Navbar />
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
