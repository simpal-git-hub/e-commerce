import React, { useEffect, useState } from 'react';

const OrderHistory = () => {
  const [history, setHistory] = useState([]);
  const user = JSON.parse(sessionStorage.getItem("currentUser"));

  useEffect(() => {
    fetch(`http://localhost:5000/api/orders/${user.email}`)
      .then(res => res.json())
      .then(data => setHistory(data));
  }, [user.email]);

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6">Aapki Order History</h2>
      {history.map(order => (
        <div key={order._id} className="bg-white p-4 mb-4 shadow rounded-lg border-l-4 border-green-500">
          <p className="text-sm text-gray-500">Date: {new Date(order.createdAt).toLocaleDateString()}</p>
          <div className="mt-2">
            {order.items.map(item => (
              <span key={item.name} className="mr-2 bg-gray-100 p-1 text-xs">{item.name} (x{item.quantity})</span>
            ))}
          </div>
          <p className="mt-2 font-bold text-green-600">Total: ${order.totalAmount}</p>
          <p className="text-xs text-blue-500">Status: {order.status}</p>
        </div>
      ))}
    </div>
  );
};