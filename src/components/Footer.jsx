import Link from "next/link";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaArrowUp } from "react-icons/fa";
import { useState } from "react";
import Swal from "sweetalert2";

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
  
    // SweetAlert2 Modal with Custom Colors
    Swal.fire({
      title: `🎮 Welcome, Gamer! 🎮`,
      text: `Thank you for subscribing with ${email}! Get ready for exclusive updates, offers, and gaming news.`,
      icon: "success",
      confirmButtonColor: "#127AC1",
      background: "#1a1a1a", 
      color: "#fff", 
      iconColor: "#ED3926", 
      confirmButtonText: "Let's Play!",
      customClass: {
        title: "text-[#ED3926] font-bold", 
        popup: "rounded-lg border-2 border-[#127AC1]",
        confirmButton: "hover:bg-[#ED3926] transition duration-300", 
      },
    });
  
    setEmail("");
  };

  return (
    <footer className="bg-[#1a1a1a] text-white py-12">
      <div className="max-w-screen-xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
        {/* Logo and Slogan */}
        <div className="flex flex-col items-center md:items-start">
          <img
            src="/logo.png"
            alt="DY Games Logo"
            className="h-12 w-auto object-contain"
          />
          <p className="mt-2 text-sm text-gray-400 text-center md:text-left">
            Play. Connect. Win.
          </p>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col items-center md:items-start">
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <div className="flex flex-col gap-2 text-sm text-gray-400">
            <Link href="/" className="hover:text-[#127AC1] transition duration-300">
              Home
            </Link>
            <Link href="/shop" className="hover:text-[#127AC1] transition duration-300">
              Shop
            </Link>
            <Link href="/about" className="hover:text-[#127AC1] transition duration-300">
              About
            </Link>
            <Link href="/contact" className="hover:text-[#127AC1] transition duration-300">
              Contact
            </Link>
          </div>
        </div>

        {/* Legal Links */}
        <div className="flex flex-col items-center md:items-start">
          <h3 className="text-lg font-semibold mb-4">Legal</h3>
          <div className="flex flex-col gap-2 text-sm text-gray-400">
            <Link href="/privacy-policy" className="hover:text-[#127AC1] transition duration-300">
              Privacy Policy
            </Link>
            <Link href="/terms-of-service" className="hover:text-[#127AC1] transition duration-300">
              Terms of Service
            </Link>
            <Link href="/cookie-policy" className="hover:text-[#127AC1] transition duration-300">
              Cookie Policy
            </Link>
          </div>
        </div>

        {/* Newsletter Subscription */}
        <div className="flex flex-col items-center md:items-start">
          <h3 className="text-lg font-semibold mb-4">Subscribe</h3>
          <form onSubmit={handleSubscribe} className="w-full">
            <div className="flex flex-col gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#127AC1]"
                required
              />
              <button
                type="submit"
                className="w-full px-4 py-2 bg-[#ED3926] text-white rounded-md hover:bg-[#127AC1] transition duration-300"
              >
                Subscribe
              </button>
            </div>
          </form>
        </div>

        {/* Social Media Links */}
        <div className="flex flex-col items-center md:items-start">
          <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
          <div className="flex gap-6 text-2xl">
            <Link
              href="https://www.facebook.com"
              target="_blank"
              aria-label="Facebook"
            >
              <FaFacebook className="text-[#ED3926] hover:text-[#127AC1] transition duration-300" />
            </Link>
            <Link
              href="https://www.twitter.com"
              target="_blank"
              aria-label="Twitter"
            >
              <FaTwitter className="text-[#ED3926] hover:text-[#127AC1] transition duration-300" />
            </Link>
            <Link
              href="https://www.instagram.com"
              target="_blank"
              aria-label="Instagram"
            >
              <FaInstagram className="text-[#ED3926] hover:text-[#127AC1] transition duration-300" />
            </Link>
            <Link
              href="https://www.linkedin.com"
              target="_blank"
              aria-label="LinkedIn"
            >
              <FaLinkedin className="text-[#ED3926] hover:text-[#127AC1] transition duration-300" />
            </Link>
          </div>
        </div>
      </div>

      {/* Copyright and Contact Email */}
      <div className="max-w-screen-xl mx-auto px-6 mt-8 border-t border-gray-700 pt-8 text-center">
        <p className="text-sm text-gray-400">
          &copy; 2024 DY Games. All Rights Reserved.
        </p>
        <p className="mt-2 text-sm text-gray-400">
          Contact us:{" "}
          <a
            href="mailto:yahiadjouadi7@gmail.com"
            className="text-[#127AC1] hover:underline"
          >
            yahiadjouadi7@gmail.com
          </a>
        </p>
      </div>

      {/* Back-to-Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-6 right-6 bg-[#ED3926] text-white p-3 rounded-full shadow-lg hover:bg-[#127AC1] transition duration-300 flex items-center justify-center z-50"
        style={{ width: "48px", height: "48px" }}
        aria-label="Back to top"
      >
        <FaArrowUp className="w-6 h-6" />
      </button>
    </footer>
  );
};

export default Footer;