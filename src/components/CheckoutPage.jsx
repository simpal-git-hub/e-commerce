import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const [orderPlaced, setOrderPlaced] = useState(false);
  
  // 1. Safe way to get cart items
  const cartItems = JSON.parse(localStorage.getItem("userCart")) || [];

  // 2. Safe calculation with Number conversion
  const totalPrice = cartItems.reduce((acc, item) => {
    const price = Number(item.price) || 0; // String ko number mein convert kiya
    const qty = Number(item.quantity) || 1;
    return acc + (price * qty);
  }, 0).toFixed(2);

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    
    // Yahan API call simulation
    setOrderPlaced(true);
    
    setTimeout(() => {
      localStorage.removeItem("userCart");
      navigate("/product");
    }, 3000);
  };

  if (orderPlaced) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white p-6">
        <div className="text-6xl mb-4">🎉</div>
        <h1 className="text-3xl font-bold text-green-600">Order Placed Successfully!</h1>
        <p className="text-gray-500 mt-2">Aapka khana jald hi pahunch jayega. Redirecting...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-12">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Left: Shipping Details Form */}
        <div className="bg-white p-8 rounded-2xl shadow-md">
          <h2 className="text-2xl font-bold mb-6 border-b pb-2">Shipping Details</h2>
          <form onSubmit={handlePlaceOrder} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Full Name</label>
              <input type="text" required className="mt-1 w-full p-3 border rounded-lg focus:ring-2 focus:ring-sky-400 outline-none" placeholder="Enter your name" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Delivery Address</label>
              <textarea required className="mt-1 w-full p-3 border rounded-lg focus:ring-2 focus:ring-sky-400 outline-none" rows="3" placeholder="Flat No, Street, City..."></textarea>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Payment Method</label>
              <select className="mt-1 w-full p-3 border rounded-lg outline-none">
                <option>Cash on Delivery (COD)</option>
                <option>UPI / Net Banking</option>
              </select>
            </div>
            <button type="submit" className="w-full bg-green-600 text-white font-bold py-4 rounded-xl mt-6 hover:bg-green-700 transition shadow-lg">
              Confirm Order (${totalPrice})
            </button>
          </form>
        </div>

        {/* Right: Order Summary */}
        <div className="bg-white p-8 rounded-2xl shadow-md h-fit">
          <h2 className="text-2xl font-bold mb-6 border-b pb-2">Order Summary</h2>
          {cartItems.length > 0 ? (
            <div className="space-y-4 max-h-60 overflow-y-auto pr-2">
              {cartItems.map((item) => (
                <div key={item.id} className="flex justify-between items-center text-sm border-b border-dashed pb-2">
                  <span className="font-medium text-gray-700">{item.name} <span className="text-sky-500 font-bold ml-1">x{item.quantity}</span></span>
                  <span className="font-semibold">${(Number(item.price) * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">Cart is empty</p>
          )}
          
          <div className="border-t-2 border-gray-100 mt-6 pt-4 flex justify-between items-center">
            <span className="text-lg font-bold">Grand Total:</span>
            <span className="text-2xl font-bold text-green-600">${totalPrice}</span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default CheckoutPage;