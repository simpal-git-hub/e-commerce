import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Homepage from './components/Login';
import CrudOperations from './components/CrudOperations';
import ProductPage from './components/ProductPage';
import CartPage from './components/CartPage';
import CheckoutPage from './components/CheckoutPage';


function App() {
  return (
    <Routes>
      <Route path="/login" element={<Homepage type="login" />} />
        <Route path="/signup" element={<Homepage type="signup" />} />
        <Route path="/crudOperations" element={<CrudOperations />} />
        <Route path="/product" element={<ProductPage/>}/>
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="*" element={<Homepage type="login" />} />
    </Routes>
  );
}

export default App


