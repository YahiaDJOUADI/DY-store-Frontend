"use client";

import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FaGamepad,
  FaShoppingCart,
  FaSignOutAlt,
  FaEnvelope,
  FaInfoCircle,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { logout, setUser } from "@/features/userSlice";
import { setCart } from "@/features/cartSlice";
import LoginModal from "./LoginModal";
import Swal from "sweetalert2";

const Navbar = () => {
  const dispatch = useDispatch();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [token, setToken] = useState(null);
  const [hasWelcomed, setHasWelcomed] = useState(false);
  const [loading, setLoading] = useState(true); // Add loading state

  const cartItemCount = useSelector((state) => state.cart.totalCount);
  const dropdownRef = useRef(null);
  const mobileMenuRef = useRef(null);


  const pathname = usePathname();

  // Check if a link is active
  const isActive = (href) => pathname === href;

  // Fetch token and hasWelcomed from localStorage on component mount
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedHasWelcomed = localStorage.getItem("hasWelcomed") === "true";
    setToken(storedToken);
    setHasWelcomed(storedHasWelcomed);
    setLoading(false); // Set loading to false after checking token
  }, []);

  // Handle successful login
  const handleLoginSuccess = (newToken) => {
    setToken(newToken); 
    setIsLoggedIn(true); 

    // Show SweetAlert with Gaming Mode message
    Swal.fire({
      title: "Game On! 🎮",
      text: "Your gaming adventure starts now! Level up and conquer!",
      icon: "success",
      confirmButtonColor: "#127AC1",
      timer: 2000,
      timerProgressBar: true,
      showConfirmButton: true,
    });

    // Set hasWelcomed to true and store it in localStorage
    setHasWelcomed(true);
    localStorage.setItem("hasWelcomed", "true");
  };

  // Fetch user data when token changes
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/myAccount", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.data && response.data.user) {
          const userData = response.data.user;
          setEmail(userData.email);
          setUsername(userData.username);
          setUser(userData);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (token) {
      fetchUserData();
    }
  }, [token, hasWelcomed]);

  // Fetch cart data when token changes
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.get("http://localhost:3001/cart", {
          headers: { Authorization: `Bearer ${token}` },
        });
        dispatch(setCart(response.data));
      } catch (error) {
        console.error("Error fetching cart data:", error);
      }
    };

    if (token) {
      fetchCart();
    }
  }, [token, dispatch]);

  // Update isLoggedIn state when token changes
  useEffect(() => {
    setIsLoggedIn(!!token);
  }, [token]);

  // Handle clicks outside dropdown and mobile menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target)
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Handle logout
  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out of your account.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#127AC1",
      cancelButtonColor: "#ED3926",
      confirmButtonText: "Yes, log out!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        logout(); // Dispatch the logout action if needed
        if (typeof window !== "undefined") {
          localStorage.removeItem("token");
          localStorage.removeItem("hasWelcomed");
        }
        setIsLoggedIn(false);
        setHasWelcomed(false);

        Swal.fire({
          title: "Logged Out!",
          text: "You have been successfully logged out.",
          icon: "success",
          confirmButtonColor: "#127AC1",
        }).then(() => {});
      }
    });
  };

  const openLoginModal = () => setIsLoginModalOpen(true);
  const closeLoginModal = () => setIsLoginModalOpen(false);
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  // Show loading state while checking authentication
  if (loading) {
    return <div className="text-center py-4">Loading...</div>;
  }

  return (
    <nav className="bg-white text-black px-6 py-3 flex items-center justify-between shadow-md sticky top-0 z-50">
      {/* Logo */}
      <div className="flex items-center flex-shrink-0">
        <img
          src="/logo.png"
          alt="DY Games Logo"
          className="h-12 w-auto object-contain"
        />
      </div>

      {/* Hamburger Menu Icon (Mobile Only) */}
      <div className="lg:hidden">
        <button
          onClick={toggleMobileMenu}
          className="text-[#127AC1] hover:text-[#ED3926] focus:outline-none"
          aria-label="Toggle Menu"
        >
          {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {/* Desktop Menu */}
      <div className="hidden lg:flex items-center gap-6 text-lg font-semibold ml-auto">
        <Link
          href="/"
          className={`flex items-center ${
            isActive("/") ? "text-[#ED3926]" : "text-[#127AC1]"
          } hover:text-[#ED3926] hover:scale-105 transition-all duration-200`}
        >
          <FaGamepad className="mr-2" /> Home
        </Link>
        <Link
          href="/shop"
          className={`flex items-center ${
            isActive("/shop") ? "text-[#ED3926]" : "text-[#127AC1]"
          } hover:text-[#ED3926] hover:scale-105 transition-all duration-200`}
        >
          <FaShoppingCart className="mr-2" /> Shop
        </Link>
        <Link
          href="/about"
          className={`flex items-center ${
            isActive("/about") ? "text-[#ED3926]" : "text-[#127AC1]"
          } hover:text-[#ED3926] hover:scale-105 transition-all duration-200`}
        >
          <FaInfoCircle className="mr-2" /> About
        </Link>
        <Link
          href="/contact"
          className={`flex items-center ${
            isActive("/contact") ? "text-[#ED3926]" : "text-[#127AC1]"
          } hover:text-[#ED3926] hover:scale-105 transition-all duration-200`}
        >
          <FaEnvelope className="mr-2" /> Contact
        </Link>

        {!isLoggedIn ? (
          <>
            <button
              onClick={openLoginModal}
              className="px-6 py-2 bg-[#127AC1] text-white font-bold rounded-md hover:bg-[#ED3926] hover:scale-110 hover:rotate-3 hover:shadow-lg transition-all duration-300 transform"
              aria-label="Log In"
            >
              Log In
            </button>
            <Link
              href="/signup"
              className="px-6 py-2 bg-[#127AC1] text-white font-bold rounded-md hover:bg-[#ED3926] hover:scale-110 hover:rotate-3 hover:shadow-lg transition-all duration-300 transform"
            >
              Sign Up
            </Link>
          </>
        ) : (
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center space-x-2 text-[#127AC1] hover:text-[#ED3926] transition-all duration-200"
              title={email || "User"}
              aria-label="User menu"
            >
              <div className="w-8 h-8 bg-[#ED3926] rounded-full flex items-center justify-center transform transition-transform duration-300 hover:scale-110 overflow-hidden">
                <img
                  src={
                    email?.toLowerCase() === "yahia@gmail.com"
                      ? "/cute-angry-diver-gaming-cartoon-vector-icon-illustration-science-technology-icon-isolated-flat_138676-12437.avif"
                      : "/cute-diver-playing-vr-game-with-controller-cartoon-vector-icon-illustration-science-technology-flat_138676-13994.avif"
                  }
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-lg w-48 text-black z-10">
                <Link
                  href="/profile"
                  className="block px-4 py-2 text-sm hover:bg-[#ED3926] hover:text-white"
                >
                  Profile
                </Link>
                {email?.toLowerCase() === "yahia@gmail.com" && (
                  <Link
                    href="/adminDashbord"
                    className="block px-4 py-2 text-sm hover:bg-[#ED3926] hover:text-white"
                  >
                    Admin Dashbord
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="block w-full px-4 py-2 text-sm text-left hover:bg-[#ED3926] hover:text-white"
                >
                  <FaSignOutAlt className="mr-2 inline" /> Log Out
                </button>
              </div>
            )}
          </div>
        )}

        <Link
          href="/cart"
          className="flex items-center text-[#127AC1] hover:text-[#ED3926] transition duration-200 relative"
        >
          <FaShoppingCart className="h-6 w-6" />
          {cartItemCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-[#ED3926] text-white text-xs rounded-full px-2 py-1">
              {cartItemCount}
            </span>
          )}
        </Link>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div
          ref={mobileMenuRef}
          className="lg:hidden absolute top-16 right-0 bg-white shadow-lg rounded-lg w-48 text-black z-10 p-4"
        >
          <Link
            href="/"
            className={`block px-4 py-2 text-sm ${
              isActive("/") ? "text-[#ED3926]" : "text-[#127AC1]"
            } hover:text-[#ED3926]`}
            onClick={toggleMobileMenu}
          >
            Home
          </Link>
          <Link
            href="/shop"
            className={`block px-4 py-2 text-sm ${
              isActive("/shop") ? "text-[#ED3926]" : "text-[#127AC1]"
            } hover:text-[#ED3926]`}
            onClick={toggleMobileMenu}
          >
            Shop
          </Link>
          <Link
            href="/about"
            className={`block px-4 py-2 text-sm ${
              isActive("/about") ? "text-[#ED3926]" : "text-[#127AC1]"
            } hover:text-[#ED3926]`}
            onClick={toggleMobileMenu}
          >
            About
          </Link>
          <Link
            href="/contact"
            className={`block px-4 py-2 text-sm ${
              isActive("/contact") ? "text-[#ED3926]" : "text-[#127AC1]"
            } hover:text-[#ED3926]`}
            onClick={toggleMobileMenu}
          >
            Contact
          </Link>
          {!isLoggedIn ? (
            <>
              <button
                onClick={() => {
                  openLoginModal();
                  toggleMobileMenu();
                }}
                className="block w-full px-4 py-2 text-sm text-left hover:bg-[#ED3926] hover:text-white"
              >
                Log In
              </button>
              <Link
                href="/signup"
                className="block px-4 py-2 text-sm hover:bg-[#ED3926] hover:text-white"
                onClick={toggleMobileMenu}
              >
                Sign Up
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/profile"
                className="block px-4 py-2 text-sm hover:bg-[#ED3926] hover:text-white"
                onClick={toggleMobileMenu}
              >
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="block w-full px-4 py-2 text-sm text-left hover:bg-[#ED3926] hover:text-white"
              >
                Log Out
              </button>
            </>
          )}
        </div>
      )}

      {/* Login Modal */}
      {isLoginModalOpen && (
        <LoginModal
          isOpen={isLoginModalOpen}
          onClose={closeLoginModal}
          onLoginSuccess={handleLoginSuccess}
        />
      )}
    </nav>
  );
};

export default Navbar;