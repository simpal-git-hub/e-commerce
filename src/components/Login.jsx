import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Homepage = ({ type }) => {
  // 5 fields as per your previous requirement
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: ""
  });
  
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Sabse pehle localStorage se current users ki list nikalenge
    const existingUsers = JSON.parse(localStorage.getItem("userList")) || [];
  
    if (type === "signup") {
      // 1. Check: Kya ye Email pehle se hai?
      const emailExists = existingUsers.some(u => u.email === formData.email);
      
      // 2. Check: Kya ye Phone Number pehle se hai?
      const phoneExists = existingUsers.some(u => u.phone === formData.phone);
  
      if (emailExists) {
        alert("Error: Yeh Email pehle se registered hai! Kirpya doosra email use karein.");
        return; // Signup process yahi ruk jayega
      }
  
      if (phoneExists) {
        alert("Error: Yeh Phone Number pehle se kisi account se juda hai!");
        return; // Signup process yahi ruk jayega
      }
  
      // Agar dono unique hain, tabhi naya user create hoga
      const newUser = {
        id: existingUsers.length > 0 ? Math.max(...existingUsers.map(u => u.id)) + 1 : 1,
        name: formData.name,
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
        address: formData.address,
        role: "User"
      };
  
      const updatedUsers = [...existingUsers, newUser];
      localStorage.setItem("userList", JSON.stringify(updatedUsers));
  
      alert("Signup Successful! Ab aap login kar sakte hain.");
      navigate("/login");
    } else {
      // Login Logic (Pehle jaisa hi rahega)
      const user = existingUsers.find(
        (u) => u.email === formData.email && u.password === formData.password
      );
  
      if (user) {
        alert(`Welcome ${user.name}!`);
        sessionStorage.setItem("isLoggedIn", "true");
        sessionStorage.setItem("currentUser", JSON.stringify(user));
        navigate("/product");
      } else {
        alert("Invalid Details! Pehle Signup karein.");
      }
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-8 bg-white rounded-xl shadow-md space-y-4">
      <h2 className="text-2xl font-bold text-center text-gray-800">
        {type === "login" ? "Login" : "Sign Up"}
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {type === "signup" && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700">Full Name</label>
              <input name="name" type="text" required onChange={handleChange} className="mt-1 w-full px-4 py-2 border rounded-md" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Phone</label>
              <input name="phone" type="text" required onChange={handleChange} className="mt-1 w-full px-4 py-2 border rounded-md" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Address</label>
              <textarea name="address" required onChange={handleChange} className="mt-1 w-full px-4 py-2 border rounded-md" rows="2" />
            </div>
          </>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input name="email" type="email" required onChange={handleChange} className="mt-1 w-full px-4 py-2 border rounded-md" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <input name="password" type="password" required onChange={handleChange} className="mt-1 w-full px-4 py-2 border rounded-md" />
        </div>

        <button type="submit" className="w-full bg-sky-500 text-white py-2 rounded-md hover:bg-sky-600 transition">
          {type === "login" ? "Login" : "Sign Up"}
        </button>
      </form>

      <p className="text-center text-sm text-gray-500">
        {type === "login" ? (
          <span>Don’t have an account? <Link to="/signup" className="text-sky-500 hover:underline">Sign Up</Link></span>
        ) : (
          <span>Already have an account? <Link to="/login" className="text-sky-500 hover:underline">Login</Link></span>
        )}
      </p>
    </div>
  );
};

export default Homepage;