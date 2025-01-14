"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { FaGamepad, FaHeadset, FaTicketAlt } from "react-icons/fa";
import GamepadIcon from "@mui/icons-material/Gamepad";
import SubscriptionsIcon from "@mui/icons-material/Subscriptions";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { useState, useEffect } from "react";
import axios from "axios";
import QuizGame from "../components/QuizGame";

// Container Component
const Container = ({ children, className = "" }) => {
  return (
    <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>
      {children}
    </div>
  );
};

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isQuizOpen, setIsQuizOpen] = useState(false);

  // Fetch products from the server
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:3001/products");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
        setError("Failed to fetch products. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

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

  // Open modal with product details
  const openModal = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  // Toggle quiz modal
  const toggleQuiz = () => {
    setIsQuizOpen(!isQuizOpen);
  };

  return (
    <>
      {/* Hero Section */}
      <motion.div
        className="relative w-full h-screen bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images2.alphacoders.com/136/1365702.jpeg')",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="absolute inset-0 bg-black opacity-70"></div>

        {/* Content Section */}
        <Container className="absolute bottom-0 left-0 right-0 p-6 sm:p-12 text-left text-white space-y-6">
          {/* Main Title */}
          <motion.h1
            className="text-4xl sm:text-7xl font-bold text-shadow-lg"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <span className="text-[#ED3926]">BLACK OPS 6</span> is Here!
          </motion.h1>

          <motion.p
            className="text-lg sm:text-2xl font-medium max-w-3xl text-gray-200"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            Step into the next chapter of the legendary Call of Duty: Black Ops
            series. Experience the most immersive world ever created and unleash
            your inner tactical genius.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            <Link href="/shop">
              <button className="bg-[#127AC1] text-white px-8 py-3 sm:px-10 sm:py-4 text-lg font-semibold rounded-lg transform transition-all duration-300 hover:bg-[#ED3926] hover:rotate-6 hover:scale-105">
                Pre-Order Now
              </button>
            </Link>

            <a
              href="https://www.youtube.com/watch?v=oyZY_BiTmd8"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="flex items-center px-8 py-3 sm:px-10 sm:py-4 bg-[#ED3926] text-white font-bold rounded-lg hover:bg-[#127AC1] hover:scale-110 hover:rotate-3 hover:shadow-lg transition-all duration-300 transform">
                <PlayArrowIcon className="mr-2" /> Watch the Trailer
              </button>
            </a>
          </motion.div>
        </Container>
      </motion.div>

      {/* Mini-Game Button */}
      <button
        onClick={toggleQuiz}
        className="fixed bottom-20 right-6 bg-[#127AC1] text-white p-3 rounded-full shadow-lg hover:bg-[#ED3926] transition duration-300 flex items-center justify-center z-50"
        style={{ width: "48px", height: "48px" }}
      >
        <FaGamepad className="text-2xl text-white" />
      </button>

      {/* Mini-Game Modal */}
      {isQuizOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-11/12 max-w-md ">
            <QuizGame onClose={() => setIsQuizOpen(false)} />
          </div>
        </div>
      )}

      {/* Trending Gaming Products Section */}
      <motion.section
        className="py-14 relative text-gray-800"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <Container>
          {/* Header */}
          <motion.div
            className="relative text-center mb-12"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2 }}
          >
            <h2 className="text-4xl sm:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-[#ED3926] to-[#FF6B6B]">
              Trending Gaming Products
            </h2>
            <p className="text-lg text-gray-600 mt-4 max-w-3xl mx-auto">
              Dive into the latest and most sought-after gaming gear this
              season.
            </p>
          </motion.div>

          {/* Product Cards */}
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#127AC1]"></div>
            </div>
          ) : error ? (
            <div className="text-center text-red-500">{error}</div>
          ) : (
            <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 z-10">
              {products.slice(0, 3).map((product, index) => (
                <motion.div
                  key={product._id}
                  className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                >
                  {/* Image */}
                  <div className="overflow-hidden">
                    <img
                      src={`http://localhost:3001/public/${product.image}`}
                      alt={product.name}
                      className="w-full h-48 object-cover transform hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  {/* Details */}
                  <div className="p-6">
                    <h2 className="text-xl font-bold mb-2 truncate">
                      {product.name}
                    </h2>

                    {/* Category */}
                    <p className="text-sm text-gray-600 flex items-center gap-2 mb-4">
                      {getCategoryIcon(product.category)}
                      {product.category}
                    </p>

                    {/* Price and Button on the Same Line */}
                    <div className="flex justify-between items-center">
                      <p className="text-lg font-bold text-[#ED3926]">
                        DZD{product.price}
                      </p>
                      <Link href={`/shop/${product._id}`}>
                        <button className="bg-[#127AC1] hover:bg-[#0e6aa8] text-white py-2 px-4 rounded-lg transition-all duration-300">
                          View Details
                        </button>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </Container>
      </motion.section>

      {/* Featured Gaming Products Section */}
      <motion.section
        className="py-16 bg-[#f4f4f4] text-gray-800 flex flex-col items-center justify-center min-h-screen"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <Container>
          {/* Header */}
          <motion.div
            className="text-center mb-12 flex flex-col justify-center items-center"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2 }}
          >
            <h2 className="text-4xl sm:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#ED3926] to-[#FF6B6B]">
              Level Up Your Gaming Experience
            </h2>
            <p className="text-lg text-gray-600 mt-4 max-w-3xl">
              Get access to the latest consoles, subscriptions, and top-rated
              games. Everything you need in one place.
            </p>
          </motion.div>

          {/* Main Content */}
          <div className="flex flex-col sm:flex-row justify-center gap-8 sm:gap-20">
            {[
              {
                icon: <GamepadIcon fontSize="large" />,
                title: "Next-Gen Consoles",
                description:
                  "PlayStation 5, Xbox Series X, and more. Experience gaming like never before.",
                image:
                  "https://www.electronics.bm/cdn/shop/collections/PS5.png?v=1640101735", // Example image URL
              },
              {
                icon: <SubscriptionsIcon fontSize="large" />,
                title: "Gaming Subscriptions",
                description:
                  "Access hundreds of games with Game Pass, PlayStation Plus, and more.",
                image:
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvXDpqjc-HD-CVBZCVGGP7V1Wth_DG_ib7Uw&s", // Example image URL
              },
              {
                icon: <SportsEsportsIcon fontSize="large" />,
                title: "Latest Games",
                description:
                  "From action-packed adventures to multiplayer masterpieces, find your next favorite game.",
                image: "https://i.redd.it/ewjv29o9cfh81.jpg", // Example image URL
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="flex flex-col items-center text-center space-y-6 bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: index * 0.2 }}
              >
                <div
                  className="p-6 bg-gradient-to-r from-[#127AC1] to-[#0e6aa8] rounded-full text-white hover:from-[#ED3926] hover:to-[#d6321f] cursor-pointer"
                  onClick={() => openModal(item)}
                >
                  {item.icon}
                </div>
                <h3 className="text-xl font-semibold text-[#127AC1]">
                  {item.title}
                </h3>
                <p className="text-gray-600">{item.description}</p>
                <button
                  className="mt-4 bg-[#ED3926] hover:bg-[#d6321f] text-white py-2 px-6 rounded-lg transition-all"
                  onClick={() => openModal(item)}
                >
                  Learn More
                </button>
              </motion.div>
            ))}
          </div>
        </Container>
      </motion.section>

      {/* Modal */}
      {isModalOpen && selectedProduct && (
        <div
          className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50"
          onClick={closeModal}
        >
          <motion.div
            className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-gray-800"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Content */}
            <div className="space-y-4">
              <img
                src={selectedProduct.image}
                alt={selectedProduct.title}
                className="w-full h-48 object-cover rounded-lg"
              />
              <h2 className="text-2xl font-bold text-[#127AC1]">
                {selectedProduct.title}
              </h2>
              <p className="text-gray-600">{selectedProduct.description}</p>
              <button
                className="w-full bg-[#ED3926] hover:bg-[#d6321f] text-white py-2 px-4 rounded-lg transition-all"
                onClick={closeModal}
              >
                Close
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
}