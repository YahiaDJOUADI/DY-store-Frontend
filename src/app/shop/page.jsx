"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaGamepad,
  FaHeadset,
  FaTicketAlt,
  FaChartLine,
  FaBoxOpen,
  FaClipboardList,
} from "react-icons/fa";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Select from "react-select";

export default function ShopPage() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [userType, setUserType] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const router = useRouter();

  // Fetch products from the server
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:3001/products");
        setProducts(response.data);
        setFilteredProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
        toast.error("Failed to fetch products. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Fetch user type (admin/user) from the user data
  useEffect(() => {
    const fetchUserType = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        // If no token, user is a guest
        setUserType(null);
        return;
      }

      try {
        const decodedToken = JSON.parse(atob(token.split(".")[1]));
        const userId = decodedToken.id;

        const response = await axios.get(
          `http://localhost:3001/users/${userId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setUserType(response.data.type);
      } catch (error) {
        console.error("Error fetching user type:", error);
      }
    };

    fetchUserType();
  }, [router]);

  // Category options for the react-select dropdown
  const categoryOptions = [
    { value: "all", label: "All Categories" },
    { value: "Video Games", label: "Video Games" },
    { value: "Gaming Gear", label: "Gaming Gear" },
    { value: "Subscriptions", label: "Subscriptions" },
  ];

  // Filter products
  useEffect(() => {
    const filtered = products.filter((product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === "all" || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
    setFilteredProducts(filtered);
  }, [searchQuery, selectedCategory, products]);

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Handle category selection change
  const handleCategoryChange = (selectedOption) => {
    setSelectedCategory(selectedOption.value);
  };

  // Helper function to get category icon
  const getCategoryIcon = (category) => {
    switch (category) {
      case "Video Games":
        return <FaGamepad className="text-[#127AC1]" />;
      case "Gaming Gear":
        return <FaHeadset className="text-[#127AC1]" />;
      case "Subscriptions":
        return <FaTicketAlt className="text-[#127AC1]" />;
      default:
        return null;
    }
  };

  // Handle "View Details" button click for all users (including guests)
  const handleViewDetailsClick = (productId) => {
    router.push(`/shop/${productId}`); // Redirect to product details page
  };

  return (
    <div className="min-h-screen bg-white text-gray-800">
      {/* Admin First Section */}
      {userType === "admin" && (
        <div className="relative py-12 bg-[#F8FAFC] text-gray-900 border-b border-gray-200">
          <div className="container mx-auto px-6 text-center">
            <motion.h1
              className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#ED3926] to-[#FF6B6B]"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Welcome Back, Admin
            </motion.h1>
            <motion.p
              className="text-base text-gray-600 mb-8 max-w-xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Manage your store with ease. Track products, analyze sales, and
              keep everything organized.
            </motion.p>
            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100">
                <div className="flex items-center justify-center w-10 h-10 bg-[#127AC1] rounded-full mx-auto mb-2">
                  <FaChartLine className="text-xl text-white" />
                </div>
                <p className="text-lg font-bold">150+</p>
                <p className="text-sm text-gray-600">Total Products</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100">
                <div className="flex items-center justify-center w-10 h-10 bg-[#127AC1] rounded-full mx-auto mb-2">
                  <FaBoxOpen className="text-xl text-white" />
                </div>
                <p className="text-lg font-bold">1.2K</p>
                <p className="text-sm text-gray-600">Active Users</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100">
                <div className="flex items-center justify-center w-10 h-10 bg-[#127AC1] rounded-full mx-auto mb-2">
                  <FaClipboardList className="text-xl text-white" />
                </div>
                <p className="text-lg font-bold">$25K</p>
                <p className="text-sm text-gray-600">Monthly Revenue</p>
              </div>
            </motion.div>
          </div>
        </div>
      )}

      {/* User First Section (Smaller) */}
      {userType === "user" && (
        <div className="relative py-12 bg-white text-gray-900 border-b border-gray-200">
          <div className="container mx-auto px-6 text-center">
            <motion.h1
              className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#ED3926] to-[#FF6B6B]"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Level Up Your Gaming
            </motion.h1>
            <motion.p
              className="text-base text-gray-600 mb-8 max-w-xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Discover the best gear, games, and subscriptions for your setup.
            </motion.p>
            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100">
                <div className="flex items-center justify-center w-10 h-10 bg-[#127AC1] rounded-full mx-auto mb-2">
                  <FaHeadset className="text-xl text-white" />
                </div>
                <p className="text-lg font-bold mb-1">Gaming Gear</p>
                <p className="text-sm text-gray-600">
                  Keyboards, mice, headsets
                </p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100">
                <div className="flex items-center justify-center w-10 h-10 bg-[#127AC1] rounded-full mx-auto mb-2">
                  <FaGamepad className="text-xl text-white" />
                </div>
                <p className="text-lg font-bold mb-1">Video Games</p>
                <p className="text-sm text-gray-600">Latest releases</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100">
                <div className="flex items-center justify-center w-10 h-10 bg-[#127AC1] rounded-full mx-auto mb-2">
                  <FaTicketAlt className="text-xl text-white" />
                </div>
                <p className="text-lg font-bold mb-1">Subscriptions</p>
                <p className="text-sm text-gray-600">Premium services</p>
              </div>
            </motion.div>
          </div>
        </div>
      )}

      {/* Product Grid Section with Search Bar */}
      <div className="container mx-auto p-6">
        {/* Search Bar with react-select */}
        <motion.div
          className="max-w-2xl mx-auto mb-8"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center gap-4">
            <input
              type="text"
              placeholder="Search for products..."
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#ED3926]"
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <Select
              options={categoryOptions}
              placeholder="Category"
              className="w-48"
              styles={{
                control: (base) => ({
                  ...base,
                  border: "1px solid #D1D5DB",
                  borderRadius: "0.5rem",
                  boxShadow: "none",
                  "&:hover": { borderColor: "#D1D5DB" },
                }),
              }}
              onChange={handleCategoryChange}
            />
            <button className="bg-[#127AC1] text-white px-6 py-3 rounded-lg hover:bg-[#0e6aa8] transition-all">
              Search
            </button>
          </div>
        </motion.div>

        {/* Loading Spinner */}
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#127AC1]"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <motion.div
                key={product._id}
                className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
                whileHover={{ scale: 1.05 }}
              >
                <img
                  src={`http://localhost:3001/public/${product.image}`}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h2 className="text-xl font-bold mb-2 truncate">
                    {product.name}
                  </h2>
                  <p className="text-sm text-gray-600 flex items-center gap-2 mb-4">
                    {getCategoryIcon(product.category)}
                    {product.category}
                  </p>
                  <p className="text-lg font-bold text-[#ED3926]">
                    DZD{product.price}
                  </p>
                  <button
                    onClick={() => handleViewDetailsClick(product._id)}
                    className="mt-4 w-full bg-[#127AC1] hover:bg-[#0e6aa8] text-white py-2 px-4 rounded-lg transition-all"
                  >
                    View Details
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
