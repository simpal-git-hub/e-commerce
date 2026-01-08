import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"; // 1. useNavigate import karein

const CartPage = () => {
  const navigate = useNavigate(); // 2. navigate function initialize karein

  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem("userCart");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("userCart", JSON.stringify(cartItems));
  }, [cartItems]);

  const updateQuantity = (id, delta) => {
    setCartItems(prev => prev.map(item =>
      item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
    ));
  };

  const removeItem = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  // Safe Total Price calculation
  const totalPrice = cartItems.reduce((acc, item) => {
    return acc + (Number(item.price) * item.quantity);
  }, 0).toFixed(2);

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-12">
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl p-8">
        <div className="flex justify-between items-center border-b pb-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Your Shopping Cart 🛒</h1>
          <Link to="/product" className="text-sky-500 hover:underline">← Continue Shopping</Link>
        </div>

        {cartItems.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500 text-xl mb-6">Aapka cart khali hai!</p>
            <Link to="/product" className="bg-sky-500 text-white px-8 py-3 rounded-lg">Browse Food</Link>
          </div>
        ) : (
          <div className="space-y-6">
            {cartItems.map((item) => (
              <div key={item.id} className="flex items-center justify-between border-b pb-4">
                <div className="flex items-center gap-4">
                  <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg" />
                  <div>
                    <h3 className="font-bold text-lg">{item.name}</h3>
                    <p className="text-gray-500 text-sm">Price: ${item.price}</p>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="flex items-center border rounded-lg">
                    <button onClick={() => updateQuantity(item.id, -1)} className="px-3 py-1 bg-gray-100 hover:bg-gray-200">-</button>
                    <span className="px-4 font-semibold">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, 1)} className="px-3 py-1 bg-gray-100 hover:bg-gray-200">+</button>
                  </div>
                  <p className="font-bold text-lg w-20 text-right">
                    ${(Number(item.price) * item.quantity).toFixed(2)}
                  </p>
                  <button onClick={() => removeItem(item.id)} className="text-red-500 hover:text-red-700 font-bold">✕</button>
                </div>
              </div>
            ))}

            <div className="pt-6 flex justify-between items-center">
              <span className="text-2xl font-bold">Total:</span>
              <span className="text-3xl font-bold text-green-600">${totalPrice}</span>
            </div>

            <button
              onClick={() => navigate("/checkout")} // Ab ye function kaam karega
              className="w-full mt-8 bg-sky-500 hover:bg-sky-600 text-white font-bold py-4 rounded-xl shadow-lg transition-all active:scale-95"
            >
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;