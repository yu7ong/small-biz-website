import './App.css'
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Products from './pages/Products'
import Cart from './pages/Cart'

function App() {

  return (
    <div>
    <Navbar/>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/product" element={<Products />} />
      <Route path="/cart" element={<Cart />} />
    </Routes>
    </div>
  )
}

export default App
