"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FaGamepad, FaTrophy, FaRocket, FaQuoteLeft, FaQuoteRight } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";

export default function About() {
  // Typing Animation Logic
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);

  const texts = [
    "Level Up with DY Games",
    "Your Gateway to Gaming",
    "Explore the Ultimate Experience",
  ];

  useEffect(() => {
    const handleTyping = () => {
      const currentText = texts[loopNum % texts.length];
      const updatedText = isDeleting
        ? currentText.substring(0, text.length - 1)
        : currentText.substring(0, text.length + 1);

      setText(updatedText);

      if (!isDeleting && updatedText === currentText) {
        setTimeout(() => setIsDeleting(true), 1000);
      } else if (isDeleting && updatedText === "") {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
        setTypingSpeed(150);
      } else {
        setTypingSpeed(isDeleting ? 75 : 150);
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, typingSpeed]);

  // Smooth Scrolling Function
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div>
      {/* Hero Section with Animated Gradient Background */}
      <motion.section
        className="relative w-full h-[60vh] flex flex-col items-center justify-center text-white overflow-hidden"
        style={{
          background: "linear-gradient(-45deg, #127AC1, #ED3926, #127AC1, #ED3926)",
          backgroundSize: "400% 400%",
          animation: "gradient 15s ease infinite",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* Background Overlay */}
        <div className="absolute inset-0 bg-black/30"></div>

        {/* Content */}
        <div className="relative z-10 text-center">
          <h1 className="text-6xl font-extrabold tracking-wide uppercase text-[#ED3926] drop-shadow-lg glow">
            {text}
            <span className="blinking-cursor">|</span>
          </h1>
          <p className="mt-4 text-xl text-gray-200">
            Your Gateway to the Ultimate Gaming Experience
          </p>
          <button
            onClick={() => scrollToSection("journey")}
            className="mt-8 px-6 py-3 bg-[#127AC1] text-white font-bold rounded-lg hover:bg-[#ED3926] hover:scale-110 transition-all duration-300 transform shadow-lg pulse"
          >
            Explore More
          </button>
        </div>
      </motion.section>

      {/* Rest of the sections remain unchanged */}
      {/* Our Journey Section */}
      <motion.section
        id="journey"
        className="py-16 px-6 bg-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h2 className="text-4xl font-bold text-center text-[#127AC1]">Our Journey</h2>
        <div className="mt-12 flex flex-wrap justify-center gap-10">
          {[
            {
              icon: <FaTrophy className="text-5xl text-[#ED3926]" />,
              year: "2020",
              title: "Launched Our First Store",
              description: "Brought gaming closer to everyone with our online store.",
            },
            {
              icon: <FaGamepad className="text-5xl text-[#ED3926]" />,
              year: "2021",
              title: "Partnered with Top Brands",
              description: "Expanded our catalog with leading gaming brands.",
            },
            {
              icon: <FaRocket className="text-5xl text-[#ED3926]" />,
              year: "2023",
              title: "Reached New Heights",
              description: "Served thousands of satisfied customers worldwide.",
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              {item.icon}
              <h3 className="mt-4 text-lg font-bold text-[#127AC1]">{item.year}</h3>
              <p className="mt-2 text-gray-600">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Testimonials Section */}
      <motion.section
        className="py-16 bg-[#f4f4f4]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h2 className="text-4xl font-bold text-center text-[#127AC1]">What Our Gamers Say</h2>
        <div className="mt-12 flex flex-wrap justify-center gap-8">
          {[
            {
              quote: "DY Games has the best selection of gaming gear. Highly recommended!",
              author: "Adel Ramdani",
              avatar: "/cute-diver-playing-vr-game-with-controller-cartoon-vector-icon-illustration-science-technology-flat_138676-13994.avif",
            },
            {
              quote: "I love their fast delivery and excellent customer service.",
              author: "Fares Zait",
              avatar: "/cute-diver-playing-vr-game-with-controller-cartoon-vector-icon-illustration-science-technology-flat_138676-13994.avif",
            },
            {
              quote: "The ultimate destination for all things gaming. 10/10!",
              author: "Younes Ait",
              avatar: "/cute-diver-playing-vr-game-with-controller-cartoon-vector-icon-illustration-science-technology-flat_138676-13994.avif",
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md max-w-sm"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <FaQuoteLeft className="text-[#ED3926]" />
              <p className="mt-4 text-gray-600">{item.quote}</p>
              <FaQuoteRight className="ml-auto text-[#ED3926]" />
              <div className="mt-4 flex items-center">
                <Image
                  src={item.avatar}
                  alt={item.author}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <p className="ml-2 font-bold text-[#127AC1]">- {item.author}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Call to Action Section */}
      <motion.section
        className="py-16 text-center bg-[#ED3926] text-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h2 className="text-4xl font-bold">Ready to Level Up?</h2>
        <p className="mt-4 text-lg">
          Discover our shop and find the latest gaming gear tailored just for you.
        </p>
        <Link href="/shop">
          <button className="mt-8 px-8 py-4 bg-[#127AC1] text-white font-bold rounded-lg shadow-lg hover:scale-105 transition-all duration-300 transform glow">
            Visit Shop
          </button>
        </Link>
      </motion.section>
    </div>
  );
}