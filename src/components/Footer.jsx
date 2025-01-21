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
      confirmButtonColor: "#0b3c5d", // Primary color
      background: "#1d2731", // Dark background
      color: "#f2f2f2", // Light text
      iconColor: "#ffcb05", // Accent color
      confirmButtonText: "Let's Play!",
      customClass: {
        title: "text-[#ffcb05] font-bold", // Accent color for title
        popup: "rounded-lg border-2 border-[#0b3c5d]", // Primary color for border
        confirmButton: "hover:bg-[#ffcb05] transition duration-300", // Accent color on hover
      },
    });

    setEmail("");
  };

  return (
    <footer className="bg-[#1d2731] text-[#f2f2f2] py-12">
      <div className="max-w-screen-xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
        {/* Logo and Slogan */}
        <div className="flex flex-col items-center md:items-start">
          <img
            src="/DYG Logo - BigCommerce Store Logo.png"
            alt="DY Games Logo"
            className="h-12 w-auto object-contain"
          />
          <p className="mt-2 text-sm text-[#f2f2f2] text-center md:text-left">
          Power Up Your Playtime!
          </p>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col items-center md:items-start">
          <h3 className="text-lg font-semibold mb-4 text-[#f2f2f2]">Quick Links</h3>
          <div className="flex flex-col gap-2 text-sm text-[#f2f2f2]">
            <Link href="/" className="hover:text-[#ffcb05] transition duration-300">
              Home
            </Link>
            <Link href="/shop" className="hover:text-[#ffcb05] transition duration-300">
              Shop
            </Link>
            <Link href="/about" className="hover:text-[#ffcb05] transition duration-300">
              About
            </Link>
            <Link href="/contact" className="hover:text-[#ffcb05] transition duration-300">
              Contact
            </Link>
          </div>
        </div>

        {/* Legal Links */}
        <div className="flex flex-col items-center md:items-start">
          <h3 className="text-lg font-semibold mb-4 text-[#f2f2f2]">Legal</h3>
          <div className="flex flex-col gap-2 text-sm text-[#f2f2f2]">
            <Link href="/privacy-policy" className="hover:text-[#ffcb05] transition duration-300">
              Privacy Policy
            </Link>
            <Link href="/terms-of-service" className="hover:text-[#ffcb05] transition duration-300">
              Terms of Service
            </Link>
            <Link href="/cookie-policy" className="hover:text-[#ffcb05] transition duration-300">
              Cookie Policy
            </Link>
          </div>
        </div>

        {/* Newsletter Subscription */}
        <div className="flex flex-col items-center md:items-start">
          <h3 className="text-lg font-semibold mb-4 text-[#f2f2f2]">Subscribe</h3>
          <form onSubmit={handleSubscribe} className="w-full">
            <div className="flex flex-col gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 rounded-md bg-[#0b3c5d] text-[#f2f2f2] placeholder-[#f2f2f2] focus:outline-none focus:ring-2 focus:ring-[#ffcb05]"
                required
              />
              <button
                type="submit"
                className="w-full px-4 py-2 bg-[#ffcb05] text-[#1d2731] rounded-md hover:bg-[#0b3c5d] hover:text-[#f2f2f2] transition duration-300"
              >
                Subscribe
              </button>
            </div>
          </form>
        </div>

        {/* Social Media Links */}
        <div className="flex flex-col items-center md:items-start">
          <h3 className="text-lg font-semibold mb-4 text-[#f2f2f2]">Follow Us</h3>
          <div className="flex gap-6 text-2xl">
            <Link
              href="https://www.facebook.com"
              target="_blank"
              aria-label="Facebook"
            >
              <FaFacebook className="text-[#ffcb05] hover:text-[#0b3c5d] transition duration-300" />
            </Link>
            <Link
              href="https://www.twitter.com"
              target="_blank"
              aria-label="Twitter"
            >
              <FaTwitter className="text-[#ffcb05] hover:text-[#0b3c5d] transition duration-300" />
            </Link>
            <Link
              href="https://www.instagram.com"
              target="_blank"
              aria-label="Instagram"
            >
              <FaInstagram className="text-[#ffcb05] hover:text-[#0b3c5d] transition duration-300" />
            </Link>
            <Link
              href="https://www.linkedin.com"
              target="_blank"
              aria-label="LinkedIn"
            >
              <FaLinkedin className="text-[#ffcb05] hover:text-[#0b3c5d] transition duration-300" />
            </Link>
          </div>
        </div>
      </div>

      {/* Copyright and Contact Email */}
      <div className="max-w-screen-xl mx-auto px-6 mt-8 border-t border-[#0b3c5d] pt-8 text-center">
        <p className="text-sm text-[#f2f2f2]">
          &copy; 2024 DY Games. All Rights Reserved.
        </p>
        <p className="mt-2 text-sm text-[#f2f2f2]">
          Contact us:{" "}
          <a
            href="mailto:yahiadjouadi7@gmail.com"
            className="text-[#ffcb05] hover:underline"
          >
            yahiadjouadi7@gmail.com
          </a>
        </p>
      </div>

      {/* Back-to-Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-6 right-6 bg-[#ffcb05] text-[#1d2731] p-3 rounded-full shadow-lg hover:bg-[#0b3c5d] hover:text-[#f2f2f2] transition duration-300 flex items-center justify-center z-50"
        style={{ width: "48px", height: "48px" }}
        aria-label="Back to top"
      >
        <FaArrowUp className="w-6 h-6" />
      </button>
    </footer>
  );
};

export default Footer;