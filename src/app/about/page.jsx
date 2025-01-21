"use client";
import { motion } from "framer-motion";
import { FaGamepad, FaUsers, FaLightbulb, FaHeart, FaChevronDown, FaLinkedin, FaGithub } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";

export default function About() {
  return (
    <div className="bg-[#f2f2f2]">
      {/* Hero Section */}
      <motion.section
        className="relative w-full h-[70vh] flex flex-col items-center justify-center text-white overflow-hidden"
        style={{
          background: "linear-gradient(-45deg, #0b3c5d, #235789, #0b3c5d, #235789)",
          backgroundSize: "400% 400%",
          animation: "gradient 15s ease infinite",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="relative z-10 text-center">
          <motion.h1
            className="text-5xl font-extrabold tracking-wide uppercase text-[#ffcb05] drop-shadow-lg glow"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            Welcome to DY Games
          </motion.h1>
          <motion.p
            className="mt-4 text-lg text-[#f2f2f2]"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            Where Gaming Dreams Come to Life
          </motion.p>
          <motion.div
            className="mt-8"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 1 }}
          >
            <Link href="#why-choose-us">
              <button className="px-6 py-3 bg-[#235789] text-[#f2f2f2] font-bold rounded-lg hover:bg-[#ffcb05] hover:text-[#1d2731] hover:scale-110 transition-all duration-300 transform shadow-lg pulse">
                Why Choose Us?
              </button>
            </Link>
          </motion.div>
        </div>
        <motion.div
          className="absolute bottom-8 animate-bounce"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.5 }}
        >
          <FaChevronDown className="text-4xl text-[#ffcb05]" />
        </motion.div>
      </motion.section>

      {/* New Second Section: Why Choose Us? */}
      <motion.section
        id="why-choose-us"
        className="relative py-20 px-6 bg-[#f2f2f2] overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="max-w-6xl mx-auto text-center">
          <motion.h2
            className="text-4xl font-bold text-[#235789] mb-12"
            initial={{ opacity: 0, y: -50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Why Choose Us?
          </motion.h2>

        

          {/* Interactive Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {[
              {
                icon: <FaGamepad className="text-6xl text-[#ffcb05] mx-auto" />,
                title: "Cutting-Edge Technology",
                description: "We use the latest technology to deliver smooth, immersive gaming experiences.",
                hoverText: "From VR to AI, we’re always innovating.",
              },
              {
                icon: <FaUsers className="text-6xl text-[#ffcb05] mx-auto" />,
                title: "Vibrant Community",
                description: "Join a global community of gamers who share your passion.",
                hoverText: "Connect, compete, and collaborate with players worldwide.",
              },
              {
                icon: <FaLightbulb className="text-6xl text-[#ffcb05] mx-auto" />,
                title: "Creative Game Design",
                description: "Our games are crafted with unique stories and stunning visuals.",
                hoverText: "Every game is a new adventure waiting to be explored.",
              },
              {
                icon: <FaHeart className="text-6xl text-[#ffcb05] mx-auto" />,
                title: "Passionate Team",
                description: "We’re gamers too, and we pour our hearts into every project.",
                hoverText: "Your fun is our mission.",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="p-8 rounded-lg shadow-lg bg-[#235789] text-white text-center hover:bg-[#1d2731] transition-all duration-300 transform hover:scale-105 cursor-pointer group relative overflow-hidden"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
              >
                <div className="mb-6">{item.icon}</div>
                <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                <p className="text-lg">{item.description}</p>
                <div className="absolute inset-0 bg-[#ffcb05] text-[#1d2731] p-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <p className="text-lg font-bold">{item.hoverText}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Team Section */}
      <motion.section
        className="py-16 px-6 bg-[#235789] text-[#f2f2f2]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="max-w-6xl mx-auto text-center">
          <motion.h2
            className="text-4xl font-bold"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Meet the Creator
          </motion.h2>
          <motion.p
            className="mt-4 text-lg"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Behind DY Games is a passionate developer and visionary, Yahia Djouadi. Get to know the mind behind the magic.
          </motion.p>
          <motion.div
            className="mt-12 flex flex-col md:flex-row items-center justify-center gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            {/* Profile Picture */}
            <motion.div
              className="relative w-64 h-64 rounded-full overflow-hidden border-4 border-[#ffcb05]"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              whileHover={{ scale: 1.1, rotate: 5 }}
            >
              <Image
                src="/cute-angry-diver-gaming-cartoon-vector-icon-illustration-science-technology-icon-isolated-flat_138676-12437.avif" // Replace with your image
                alt="Yahia Djouadi"
                width={256}
                height={256}
                className="object-cover"
              />
            </motion.div>

            {/* Profile Details */}
            <motion.div
              className="text-left"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <h3 className="text-3xl font-bold text-[#ffcb05]">Yahia Djouadi</h3>
              <p className="mt-2 text-lg">Project Owner & Full-Stack Developer</p>
              <p className="mt-4 max-w-md">
                Yahia is the driving force behind DY Games, combining technical expertise with a passion for gaming to create unforgettable experiences. With a vision to revolutionize the gaming industry, Yahia is dedicated to building a community where gamers can thrive.
              </p>
              <div className="mt-6 flex gap-4">
                <motion.a
                  href="https://linkedin.com/in/yahia-djouadi"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FaLinkedin className="text-3xl text-[#ffcb05] hover:text-[#0a66c2] transition-colors" />
                </motion.a>
                <motion.a
                  href="https://github.com/yahia-djouadi" 
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FaGithub className="text-3xl text-[#ffcb05] hover:text-[#333] transition-colors" />
                </motion.a>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Call to Action Section */}
      <motion.section
        className="py-16 text-center bg-[#ffcb05] text-[#1d2731]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h2 className="text-4xl font-bold">Ready to Join the Adventure?</h2>
        <p className="mt-4 text-lg">
          Discover the ultimate gaming experience with DY Games. Let’s level up together!
        </p>
        <Link href="/shop">
          <button className="mt-8 px-8 py-4 bg-[#235789] text-[#f2f2f2] font-bold rounded-lg shadow-lg hover:scale-105 transition-all duration-300 transform glow">
            Get Started
          </button>
        </Link>
      </motion.section>
    </div>
  );
}