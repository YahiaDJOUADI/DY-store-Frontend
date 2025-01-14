"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import {
  FaUser,
  FaEnvelope,
  FaComment,
  FaPaperPlane,
  FaGamepad,
  FaHeadset,
  FaDice,
  FaChess,
  FaPuzzlePiece,
  FaMobile,
  FaLaptop,
  FaKeyboard,
  FaMouse,
  FaMicrophone,
  FaDesktop,
  FaServer,
  FaCode,
  FaRobot,
  FaGlobe,
  FaCloud,
  FaDatabase,
  FaVideo,
  FaMusic,
  FaFilm,
} from "react-icons/fa";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import axios from "axios"; // Import axios for making HTTP requests

const Contact = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const router = useRouter();

  const onSubmit = async (data) => {
    try {
      console.log("Sending request with data:", data); // Log the request data

      // Send the form data to the backend
      const response = await axios.post("http://localhost:3001/messages", data);

      console.log("Message sent successfully:", response.data);
      toast.success("Message sent successfully!");
      reset();
      router.push("/");
    } catch (error) {
      console.error("Error sending message:", error);
      if (error.response) {
        console.error("Server response:", error.response.data); // Log server response
      }
      toast.error("Failed to send message. Please try again.");
    }
  };

  // List of icons to display in the background
  const icons = [
    FaGamepad,
    FaHeadset,
    FaDice,
    FaChess,
    FaPuzzlePiece,
    FaMobile,
    FaLaptop,
    FaKeyboard,
    FaMouse,
    FaMicrophone,
    FaDesktop,
    FaServer,
    FaCode,
    FaRobot,
    FaGlobe,
    FaCloud,
    FaDatabase,
    FaVideo,
    FaMusic,
    FaFilm,
  ];

  // Repeat the icons to make the background denser
  const repeatedIcons = Array(50)
    .fill(icons)
    .flat();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex items-center justify-center bg-white py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
    >
      {/* Animated Icons in the Background */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        {repeatedIcons.map((Icon, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: -100, x: Math.random() * 1000 - 500 }}
            animate={{ opacity: 1, y: "100vh", x: Math.random() * 1000 - 500 }}
            transition={{
              duration: Math.random() * 5 + 5, // Random duration between 5 and 10 seconds
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 5, // Random delay to stagger animations
            }}
            className="absolute text-4xl"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              color: index % 2 === 0 ? "#127AC1" : "#ED3926", // Alternate between blue and orange
              opacity: 0.2, // Make icons semi-transparent
            }}
          >
            <Icon />
          </motion.div>
        ))}
      </div>

      {/* Contact Form */}
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg border border-gray-100 relative z-10">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-[#127AC1]">Contact Us</h2>
          <p className="mt-2 text-gray-600">
            We’d love to hear from you! Send us a message and we’ll get back to you shortly.
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div className="flex items-center border border-gray-300 rounded-t-md p-3">
              <FaUser className="text-[#127AC1] mr-2" />
              <input
                id="name"
                {...register("name", { required: "Name is required" })}
                type="text"
                className="flex-1 focus:outline-none text-gray-800"
                placeholder="Your Name"
              />
            </div>
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
            <div className="flex items-center border border-gray-300 p-3">
              <FaEnvelope className="text-[#127AC1] mr-2" />
              <input
                id="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
                type="email"
                className="flex-1 focus:outline-none text-gray-800"
                placeholder="Your Email"
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
            <div className="flex items-center border border-gray-300 rounded-b-md p-3">
              <FaComment className="text-[#127AC1] mr-2" />
              <textarea
                id="message"
                {...register("message", { required: "Message is required" })}
                className="flex-1 focus:outline-none text-gray-800"
                placeholder="Your Message"
                rows="4"
              />
            </div>
            {errors.message && (
              <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
            )}
          </div>

          <div>
            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#ED3926] hover:bg-[#D63222] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#ED3926] transition-all duration-200"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <FaPaperPlane className="h-5 w-5 text-white" />
              </span>
              Send Message
            </motion.button>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default Contact;