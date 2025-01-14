"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "@/features/userSlice"; // Redux action for user login
import axios from "axios";
import { FaUserCircle, FaEnvelope, FaPhoneAlt, FaLock, FaCalendarAlt, FaMars } from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function SignUp() {
  const dispatch = useDispatch();
  const router = useRouter();

  // Form state
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    phone: "",
    password: "",
    birthdate: "",
    gender: "male",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Check if user is authenticated
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  // Redirect if user is already logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      router.push("/");
    }
  }, [router]);

  // Prevent rendering if user is authenticated
  if (isAuthenticated || localStorage.getItem("token")) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gradient-to-r from-[#127AC1] to-[#ED3926]">
        <motion.div
          className="w-full max-w-4xl p-10 bg-white rounded-xl shadow-2xl text-center"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-extrabold text-[#ED3926]">Access Denied</h2>
          <p className="text-lg text-gray-700 mt-2">You cannot access this page because you are already logged in.</p>
        </motion.div>
      </div>
    );
  }

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await axios.post("http://localhost:3001/users", formData);
      const { token, user } = response.data;

      // Save token to localStorage and update Redux state
      localStorage.setItem("token", token);
      dispatch(login(user));

      setSuccessMessage("User registered successfully!");
      setErrorMessage("");

      // Redirect to home page
      router.push("/");

      // Force page reload to reflect changes
      setTimeout(() => {
        window.location.reload();
      }, 100);
    } catch (error) {
      setErrorMessage(error.response?.data?.error || "Registration failed. Please try again.");
      setSuccessMessage("");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#127AC1] to-[#ED3926] flex justify-center items-center py-12">
      <motion.div
        className="w-full max-w-4xl p-10 bg-white rounded-xl shadow-2xl"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-[#ED3926] mt-4">Level Up Your Game</h2>
          <p className="text-lg text-gray-700 mt-2">Join us and start your gaming journey today!</p>
        </div>

        {/* Success and error messages */}
        {successMessage && (
          <motion.p
            className="text-green-500 text-center mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {successMessage}
          </motion.p>
        )}
        {errorMessage && (
          <motion.p
            className="text-red-500 text-center mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {errorMessage}
          </motion.p>
        )}

        {/* Sign-up form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Username input */}
            <div className="relative">
              <FaUserCircle className="absolute left-3 top-3 text-[#127AC1] text-2xl" aria-label="Username" />
              <input
                type="text"
                name="userName"
                value={formData.userName}
                onChange={handleChange}
                placeholder="Username"
                className="w-full pl-12 pr-4 py-3 bg-[#f5f5f5] border border-[#127AC1] rounded-lg text-lg text-black focus:outline-none focus:ring-2 focus:ring-[#ED3926] transition-all"
                required
              />
            </div>

            {/* Email input */}
            <div className="relative">
              <FaEnvelope className="absolute left-3 top-3 text-[#127AC1] text-2xl" aria-label="Email" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="w-full pl-12 pr-4 py-3 bg-[#f5f5f5] border border-[#127AC1] rounded-lg text-lg text-black focus:outline-none focus:ring-2 focus:ring-[#ED3926] transition-all"
                required
              />
            </div>

            {/* Phone number input */}
            <div className="relative">
              <FaPhoneAlt className="absolute left-3 top-3 text-[#127AC1] text-2xl" aria-label="Phone Number" />
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone Number"
                className="w-full pl-12 pr-4 py-3 bg-[#f5f5f5] border border-[#127AC1] rounded-lg text-lg text-black focus:outline-none focus:ring-2 focus:ring-[#ED3926] transition-all"
                required
              />
            </div>

            {/* Password input */}
            <div className="relative">
              <FaLock className="absolute left-3 top-3 text-[#127AC1] text-2xl" aria-label="Password" />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                className="w-full pl-12 pr-4 py-3 bg-[#f5f5f5] border border-[#127AC1] rounded-lg text-lg text-black focus:outline-none focus:ring-2 focus:ring-[#ED3926] transition-all"
                required
              />
            </div>

            {/* Birthdate input */}
            <div className="relative">
              <FaCalendarAlt className="absolute left-3 top-3 text-[#127AC1] text-2xl" aria-label="Birthdate" />
              <input
                type="date"
                name="birthdate"
                value={formData.birthdate}
                onChange={handleChange}
                className="w-full pl-12 pr-4 py-3 bg-[#f5f5f5] border border-[#127AC1] rounded-lg text-lg text-black focus:outline-none focus:ring-2 focus:ring-[#ED3926] transition-all"
                required
              />
            </div>

            {/* Gender selection */}
            <div className="relative">
              <FaMars className="absolute left-3 top-3 text-[#127AC1] text-2xl" aria-label="Gender" />
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full pl-12 pr-4 py-3 bg-[#f5f5f5] border border-[#127AC1] rounded-lg text-lg text-black focus:outline-none focus:ring-2 focus:ring-[#ED3926] transition-all"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          {/* Submit button */}
          <motion.button
            type="submit"
            className="w-full py-3 bg-[#127AC1] text-white rounded-lg font-bold text-xl mt-6 hover:bg-[#ED3926] transition-all disabled:opacity-50"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Signing Up..." : "Sign Up"}
          </motion.button>
        </form>

        {/* Link to login page */}
        <div className="text-center mt-6">
          <p className="text-lg text-gray-600">
            Already have an account?{" "}
            <Link href="/login" className="text-[#127AC1] hover:text-[#ED3926] transition-all">
              Log in
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}