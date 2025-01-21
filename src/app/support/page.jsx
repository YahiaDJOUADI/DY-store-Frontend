"use client";
import React, { useState } from "react";
import { FaHeadset, FaEnvelope, FaPhone } from "react-icons/fa";
import { motion } from "framer-motion";

const Support = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const supportOptions = [
    {
      id: 1,
      icon: <FaEnvelope className="text-4xl text-[#ffcb05]" />,
      title: "Email Support",
      description: "Reach out to us via email for assistance.",
      contact: "support@gaminghub.com",
    },
    {
      id: 2,
      icon: <FaPhone className="text-4xl text-[#ffcb05]" />,
      title: "Phone Support",
      description: "Call us for immediate assistance.",
      contact: "+1 (123) 456-7890",
    },
    {
      id: 3,
      icon: <FaHeadset className="text-4xl text-[#ffcb05]" />,
      title: "Live Chat",
      description: "Chat with our support team in real-time.",
      contact: "Start Chat",
    },
  ];

  return (
    <div className="min-h-screen bg-[#f2f2f2] p-8">
      <div className="max-w-7xl mx-auto">
        <motion.h1
          className="text-4xl font-bold text-[#1d2731] mb-8 flex items-center"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <FaHeadset className="mr-2 text-[#235789]" /> Support
        </motion.h1>

        {/* Support Options */}
        <div className="space-y-6">
          {supportOptions.map((option) => (
            <motion.div
              key={option.id}
              className="bg-gradient-to-r from-[#235789] to-[#0b3c5d] p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center space-x-4">
                <div>{option.icon}</div>
                <div>
                  <h2 className="text-xl font-bold text-[#f2f2f2]">{option.title}</h2>
                  <p className="text-sm text-gray-300">{option.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Sticky Contact Form */}
        <div className="fixed bottom-0 left-0 right-0 bg-white p-4 shadow-lg">
          <button
            onClick={() => setIsFormOpen(!isFormOpen)}
            className="bg-[#ffcb05] text-[#1d2731] py-2 px-6 rounded-lg hover:bg-[#e6b800] transition-all duration-300"
          >
            {isFormOpen ? "Close Form" : "Open Contact Form"}
          </button>
          {isFormOpen && (
            <div className="mt-4">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full p-2 mb-4 border rounded-lg"
              />
              <input
                type="email"
                placeholder="Your Email"
                className="w-full p-2 mb-4 border rounded-lg"
              />
              <textarea
                placeholder="Your Message"
                className="w-full p-2 mb-4 border rounded-lg"
                rows="3"
              />
              <button
                type="submit"
                className="bg-[#235789] text-white py-2 px-6 rounded-lg hover:bg-[#0b3c5d] transition-all duration-300"
              >
                Submit
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Support;