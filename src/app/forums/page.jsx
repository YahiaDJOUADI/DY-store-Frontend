"use client";
import React, { useState } from "react";
import { FaUsers, FaComment, FaChevronDown } from "react-icons/fa";
import { motion } from "framer-motion";

const Forums = () => {
  const [openCategory, setOpenCategory] = useState(null);

  const forums = [
    {
      id: 1,
      title: "General Discussion",
      threads: [
        { id: 1, user: "Gamer123", message: "What's your favorite game?", timestamp: "2 hours ago" },
        { id: 2, user: "ProGamer", message: "Any tips for beginners?", timestamp: "5 hours ago" },
      ],
    },
    {
      id: 2,
      title: "Game Reviews",
      threads: [
        { id: 1, user: "ReviewerX", message: "Just finished Cyberpunk 2077!", timestamp: "1 day ago" },
      ],
    },
    {
      id: 3,
      title: "Technical Support",
      threads: [
        { id: 1, user: "TechGuy", message: "Having issues with my controller.", timestamp: "3 days ago" },
      ],
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
          <FaUsers className="mr-2 text-[#235789]" /> Forums
        </motion.h1>

        <div className="space-y-4">
          {forums.map((forum) => (
            <div
              key={forum.id}
              className="bg-gradient-to-r from-[#235789] to-[#0b3c5d] p-6 rounded-lg shadow-md"
            >
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => setOpenCategory(openCategory === forum.id ? null : forum.id)}
              >
                <h2 className="text-xl font-bold text-[#f2f2f2]">{forum.title}</h2>
                <FaChevronDown
                  className={`text-[#ffcb05] transition-transform duration-300 ${
                    openCategory === forum.id ? "rotate-180" : ""
                  }`}
                />
              </div>
              {openCategory === forum.id && (
                <motion.div
                  className="mt-4 space-y-4"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  transition={{ duration: 0.3 }}
                >
                  {forum.threads.map((thread) => (
                    <div
                      key={thread.id}
                      className="bg-white p-4 rounded-lg shadow-sm flex items-center space-x-4"
                    >
                      <div className="w-10 h-10 bg-[#235789] rounded-full flex items-center justify-center text-white">
                        {thread.user.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm text-[#1d2731]">{thread.message}</p>
                        <p className="text-xs text-gray-500">{thread.timestamp}</p>
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Forums;