import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom"; // Link yahan add kiya

const ProductPage = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  // 1. Pehle state declare karein
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("userCart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // 2. State ke baad cartCount calculate karein
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  // API Fetch Logic
  useEffect(() => {
    const fetchFoodData = async () => {
      try {
        const response = await fetch("https://dummyjson.com/recipes");
        const data = await response.json();

        const formattedFood = data.recipes.map((item) => ({
          id: item.id,
          name: item.name,
          price: (Math.random() * 20 + 5).toFixed(2),
          cuisine: item.cuisine,
          image: item.image,
        }));

        setProducts(formattedFood);
        setFilteredProducts(formattedFood);
        setLoading(false);
      } catch (error) {
        console.error("Error:", error);
        setLoading(false);
      }
    };
    fetchFoodData();
  }, []);

  // Filtering Logic
  useEffect(() => {
    if (selectedCategory === "All") {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(
        (p) => p.cuisine.toLowerCase() === selectedCategory.toLowerCase()
      );
      setFilteredProducts(filtered);
    }
  }, [selectedCategory, products]);

  // Cart save karne ke liye useEffect
  useEffect(() => {
    localStorage.setItem("userCart", JSON.stringify(cart));
  }, [cart]);

  const handleLogout = () => {
    sessionStorage.removeItem("isLoggedIn");
    navigate("/login");
  };

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    alert(`${product.name} added!`);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-10">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-bold text-gray-800">Yummy Food Menu</h1>
        
        <div className="flex gap-4 items-center">
          {/* Cart Icon */}
          <Link to="/cart" className="relative p-2 bg-white rounded-full shadow hover:bg-gray-50 transition">
            <span className="text-2xl">🛒</span>
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
          </Link>
          <button onClick={handleLogout} className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition">
            Logout
          </button>
        </div>
      </div>





      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <div className="w-full md:w-1/4 bg-white p-6 rounded-lg shadow-md h-fit">
          <h2 className="text-xl font-bold mb-4 border-b pb-2">Cuisines</h2>
          <ul className="space-y-2">
            {["All", "Italian", "Asian", "Mexican", "Indian", "Pakistani", "Japanese"].map((cat) => (
              <li
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`p-3 rounded cursor-pointer transition-all duration-200 ${
                  selectedCategory === cat ? "bg-sky-500 text-white shadow-md" : "bg-gray-100 hover:bg-gray-200"
                }`}
              >
                {cat}
              </li>
            ))}
          </ul>
        </div>

        {/* Product Grid */}
        <div className="w-full md:w-3/4">
          {loading ? (
            <div className="text-center text-xl font-semibold">Loading Delicious Food...</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <div key={product.id} className="bg-white p-4 rounded-xl shadow-lg hover:shadow-2xl transition flex flex-col items-center">
                    <img src={product.image} alt={product.name} className="h-48 w-full object-cover rounded-lg mb-4" />
                    <h3 className="text-lg font-semibold text-center h-12 overflow-hidden">{product.name}</h3>
                    <p className="text-green-600 font-bold text-xl">${product.price}</p>
                    <button onClick={() => addToCart(product)} className="mt-4 w-full bg-sky-500 text-white py-2 rounded-lg hover:bg-sky-600 active:scale-95 transition">
                      Add to Cart
                    </button>
                  </div>
                ))
              ) : (
                <div className="col-span-3 text-center py-10 text-gray-500 bg-white rounded-lg shadow">
                  Is category mein abhi koi dish nahi hai.
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;