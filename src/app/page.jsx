"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { FaGamepad, FaHeadset, FaArrowRight, FaUsers, FaPlay, FaShoppingCart, FaBook, FaTicketAlt } from "react-icons/fa";
import ReactPlayer from "react-player";
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

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
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

  // Toggle quiz modal
  const toggleQuiz = () => {
    setIsQuizOpen(!isQuizOpen);
  };

  return (
    <>
      {/* Hero Section */}
      <div className="relative w-full h-screen flex items-center justify-center bg-[#1d2731]">
        {/* Video Background */}
        <ReactPlayer
          url="https://www.youtube.com/watch?v=oyZY_BiTmd8"
          playing={true}
          loop={true}
          muted={true}
          width="100%"
          height="100%"
          className="absolute top-0 left-0 object-cover w-full h-full opacity-50"
          style={{ position: 'absolute', top: 0, left: 0 }}
        />

        {/* Content Overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-[#f2f2f2] p-6">
          <motion.h1
            className="text-5xl sm:text-7xl font-bold mb-6"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            BLACK OPS 6
          </motion.h1>

          <motion.p
            className="text-lg sm:text-2xl font-medium mb-8 max-w-2xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            Experience the next chapter of the legendary Call of Duty series. Immerse yourself in a world like no other.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            <Link href="/shop">
              <button className="bg-[#ffcb05] text-[#1d2731] px-8 py-3 sm:px-10 sm:py-4 text-lg font-semibold rounded-lg transform transition-all duration-300 hover:bg-[#235789] hover:text-[#f2f2f2] hover:scale-105">
                Pre-Order Now
              </button>
            </Link>

            <a
              href="https://www.youtube.com/watch?v=oyZY_BiTmd8"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="flex items-center px-8 py-3 sm:px-10 sm:py-4 bg-transparent border-2 border-[#ffcb05] text-[#ffcb05] font-bold rounded-lg hover:bg-[#ffcb05] hover:text-[#1d2731] hover:scale-105 transition-all duration-300">
                <FaArrowRight className="mr-2" /> Watch Trailer
              </button>
            </a>
          </motion.div>
        </div>
      </div>

      {/* Products Section */}
      <section className="py-16 bg-[#f2f2f2]">
        <Container>
          <motion.h2
            className="text-4xl sm:text-5xl font-bold text-center mb-7 text-[#1d2731]"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Featured Products
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.slice(0, 3).map((product, index) => (
              <motion.div
                key={product._id}
                className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow border border-[#0b3c5d]"
                whileHover={{ scale: 1.03 }}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
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
                    <Link href={`/shop/${product._id}`}>
                      <button className="flex items-center gap-2 bg-[#0b3c5d] hover:bg-[#ffcb05] text-[#f2f2f2] hover:text-[#1d2731] py-2 px-4 rounded-lg transition-all">
                        <span>View</span>
                        <FaArrowRight className="text-sm" />
                      </button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Community Section */}
      <section className="py-14 bg-[#1d2731]">
        <Container>
          <motion.h2
            className="text-4xl sm:text-5xl font-bold text-center mb-12 text-[#f2f2f2]"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Join the Community
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              {
                icon: <FaUsers className="text-4xl mb-4 text-[#ffcb05]" />,
                title: "Forums",
                description: "Connect with gamers worldwide and share your experiences.",
                link: "/forums",
              },
              {
                icon: <FaBook className="text-4xl mb-4 text-[#ffcb05]" />,
                title: "Guides",
                description: "Learn tips, tricks, and strategies from expert gamers.",
                link: "/guides",
              },
              {
                icon: <FaHeadset className="text-4xl mb-4 text-[#ffcb05]" />,
                title: "Support",
                description: "Get 24/7 assistance from our dedicated team.",
                link: "/support",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="bg-[#235789] p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 text-center"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <div className="flex justify-center items-center">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold mb-2 text-[#f2f2f2]">{item.title}</h3>
                <p className="text-sm text-gray-300 mb-4">{item.description}</p>
                <Link href={item.link}>
                  <button className="bg-[#ffcb05] text-[#1d2731] py-2 px-6 rounded-lg hover:bg-[#f2f2f2] transition-all duration-300">
                    Learn More
                  </button>
                </Link>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Ratings Section */}
      <section className="py-14 bg-[#ffcb05]">
        <Container>
          <motion.h2
            className="text-4xl sm:text-5xl font-bold text-center mb-12 text-[#1d2731]"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            What Gamers Are Saying
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Adel Ramdani",
                rating: 5,
                review: "Black Ops 6 is a masterpiece! The graphics and gameplay are mind-blowing.",
                avatar: "/cute-diver-playing-vr-game-with-controller-cartoon-vector-icon-illustration-science-technology-flat_138676-13994.avif",
              },
              {
                name: "Fares Zait",
                rating: 4,
                review: "The multiplayer experience is incredible. Highly recommended!",
                avatar: "/cute-diver-playing-vr-game-with-controller-cartoon-vector-icon-illustration-science-technology-flat_138676-13994.avif",
              },
              {
                name: "Younes Ait",
                rating: 5,
                review: "The best Call of Duty game yet. Can't wait for the next update!",
                avatar: "/cute-diver-playing-vr-game-with-controller-cartoon-vector-icon-illustration-science-technology-flat_138676-13994.avif",
              },
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                className="bg-[#1d2731] p-6 rounded-lg shadow-lg text-center transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                {/* Avatar */}
                <motion.div
                  className="w-20 h-20 rounded-full mx-auto mb-4 overflow-hidden border-4 border-[#ffcb05]"
                  whileHover={{ scale: 1.1 }}
                >
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
                {/* Name */}
                <h3 className="text-xl font-bold text-[#f2f2f2]">{testimonial.name}</h3>
                {/* Star Rating */}
                <div className="flex justify-center items-center gap-1 my-3">
                  {[...Array(5)].map((_, i) => (
                    <motion.span
                      key={i}
                      className={`text-2xl ${
                        i < testimonial.rating ? "text-[#ffcb05]" : "text-gray-500"
                      }`}
                      whileHover={{ scale: 1.2 }}
                    >
                      ★
                    </motion.span>
                  ))}
                </div>
                {/* Review */}
                <p className="text-sm text-gray-300">{testimonial.review}</p>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Mini-Game Button */}
      <button
        onClick={toggleQuiz}
        className="fixed bottom-20 right-6 bg-[#ffcb05] text-[#1d2731] p-3 rounded-full shadow-lg hover:bg-[#235789] hover:text-[#f2f2f2] transition duration-300 flex items-center justify-center z-50"
        style={{ width: "48px", height: "48px" }}
      >
        <FaGamepad className="text-2xl" />
      </button>

      {/* Mini-Game Modal */}
      {isQuizOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-[#f2f2f2] p-6 rounded-lg shadow-lg w-11/12 max-w-md">
            <QuizGame onClose={() => setIsQuizOpen(false)} />
          </div>
        </div>
      )}
    </>
  );
}