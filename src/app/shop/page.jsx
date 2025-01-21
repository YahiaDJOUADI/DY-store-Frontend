"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaGamepad,
  FaHeadset,
  FaTicketAlt,
  FaArrowRight,
  FaChartLine,
  
  FaUser,
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
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const router = useRouter();

  // Fetch products from the server
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:3001/products");
        setProducts(response.data);
        setFilteredProducts(response.data);
        setTotalProducts(response.data.length); // Set total number of products
      } catch (error) {
        console.error("Error fetching products:", error);
        toast.error("Failed to fetch products. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Fetch user type (admin/user) and total users from the user data
  useEffect(() => {
    const fetchUserTypeAndTotalUsers = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        // If no token, user is a guest
        setUserType(null);
        return;
      }

      try {
        const decodedToken = JSON.parse(atob(token.split(".")[1]));
        const userId = decodedToken.id;

        // Fetch user type
        const userResponse = await axios.get(
          `http://localhost:3001/users/${userId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setUserType(userResponse.data.type);

        // Fetch total number of users
        const usersResponse = await axios.get("http://localhost:3001/users", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTotalUsers(usersResponse.data.length); // Set total number of users
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserTypeAndTotalUsers();
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
        return <FaGamepad className="text-[#ffcb05]" />;
      case "Gaming Gear":
        return <FaHeadset className="text-[#ffcb05]" />;
      case "Subscriptions":
        return <FaTicketAlt className="text-[#ffcb05]" />;
      default:
        return null;
    }
  };

  // Handle "View Details" button click for all users (including guests)
  const handleViewDetailsClick = (productId) => {
    router.push(`/shop/${productId}`); // Redirect to product details page
  };

  return (
    <div className="min-h-screen bg-[#f2f2f2] text-[#1d2731]">
      {/* New First Section for Admin and User */}
      {userType === "admin" ? (
        <div className="py-8 bg-[#0b3c5d] text-[#f2f2f2] border-b border-[#ffcb05]">
          <div className="container mx-auto px-6">
            <motion.div
              className="flex items-center justify-between"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div>
                <h1 className="text-2xl font-bold text-[#ffcb05]">
                  Welcome Back, Admin
                </h1>
                <p className="text-sm text-[#f2f2f2]">
                  Manage your store with ease.
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="bg-[#1d2731] p-3 rounded-lg flex items-center gap-2">
                  <FaChartLine className="text-xl text-[#ffcb05]" />
                  <span>{totalProducts} Products</span>
                </div>
                <div className="bg-[#1d2731] p-3 rounded-lg flex items-center gap-2">
                  <FaUser className="text-xl text-[#ffcb05]" />
                  <span>{totalUsers} Users</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      ) : userType === "user" ? (
        <div className="py-8 bg-[#f2f2f2] text-[#1d2731] border-b border-[#ffcb05]">
          <div className="container mx-auto px-6">
            <motion.div
              className="flex items-center justify-between"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div>
                <h1 className="text-2xl font-bold text-[#0b3c5d]">
                  Welcome Back, Gamer
                </h1>
                <p className="text-sm text-[#1d2731]">
                  Discover the best gear and games.
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="bg-[#0b3c5d] p-3 rounded-lg flex items-center gap-2 text-[#f2f2f2]">
                  <FaGamepad className="text-xl text-[#ffcb05]" />
                  <span>Video Games</span>
                </div>
                <div className="bg-[#0b3c5d] p-3 rounded-lg flex items-center gap-2 text-[#f2f2f2]">
                  <FaHeadset className="text-xl text-[#ffcb05]" />
                  <span>Gaming Gear</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      ) : null}

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
              className="w-full px-4 py-2.5 rounded-lg border border-[#0b3c5d] focus:outline-none focus:ring-2 focus:ring-[#ffcb05]"
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
                  border: "1px solid #0b3c5d",
                  borderRadius: "0.5rem",
                  boxShadow: "none",
                  "&:hover": { borderColor: "#0b3c5d" },
                  height: "44px", // Match the height of the search input
                }),
              }}
              onChange={handleCategoryChange}
            />
            <button className="bg-[#ffcb05] text-[#1d2731] px-6 py-2.5 rounded-lg hover:bg-[#0b3c5d] hover:text-[#f2f2f2] transition-all">
              Search
            </button>
          </div>
        </motion.div>

        {/* Loading Spinner */}
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#ffcb05]"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <motion.div
                key={product._id}
                className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow border border-[#0b3c5d]"
                whileHover={{ scale: 1.03 }}
              >
                <div className="relative">
                  <img
                    src={`http://localhost:3001/public/${product.image}`}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                  />
                  {/* Stock Availability Badge */}
                  <div className="absolute top-2 right-2">
                    {product.stock > 0 ? (
                      <span className="bg-[#0b3c5d] text-[#f2f2f2] px-3 py-1 rounded-full text-xs">
                        Available
                      </span>
                    ) : (
                      <span className="bg-red-600 text-[#f2f2f2] px-3 py-1 rounded-full text-xs">
                        Out of Stock
                      </span>
                    )}
                  </div>
                </div>
                <div className="p-4 flex flex-col gap-3">
                  {/* Category Icon and Name */}
                  <div className="flex items-center gap-2 text-[#0b3c5d]">
                    {getCategoryIcon(product.category)}
                    <span className="text-sm font-medium">
                      {product.category}
                    </span>
                  </div>
                  {/* Product Name */}
                  <h2 className="text-xl font-bold text-[#1d2731] truncate">
                    {product.name}
                  </h2>
                  {/* Product Description */}
                  <p className="text-sm text-[#1d2731] line-clamp-2">
                    {product.description}
                  </p>
                  {/* Price and Button */}
                  <div className="flex items-center justify-between mt-2">
                    <p className="text-lg font-bold text-[#ffcb05]">
                      DZD{product.price}
                    </p>
                    <button
                      onClick={() => handleViewDetailsClick(product._id)}
                      className="flex items-center gap-2 bg-[#0b3c5d] hover:bg-[#ffcb05] text-[#f2f2f2] hover:text-[#1d2731] py-2 px-4 rounded-lg transition-all"
                    >
                      <span>View</span>
                      <FaArrowRight className="text-sm" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}