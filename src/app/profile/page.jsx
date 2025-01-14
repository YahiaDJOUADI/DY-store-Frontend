"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { motion } from "framer-motion";
import { toast } from "sonner";
import {
  FaUserCircle,
  FaEnvelope,
  FaPhoneAlt,
  FaEdit,
  FaSave,
  FaTimes,
  FaSpinner,
  FaGamepad,
  FaTrophy,
  FaShieldAlt,
  FaDice,
} from "react-icons/fa";
import { setUser } from "@/features/userSlice";

export default function MyAccount() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    phone: "",
  });

  // Default profile pictures for users and admins
  const defaultProfilePicture = user?.type === "admin"
    ? "/cute-angry-diver-gaming-cartoon-vector-icon-illustration-science-technology-icon-isolated-flat_138676-12437.avif"
    : "/cute-diver-playing-vr-game-with-controller-cartoon-vector-icon-illustration-science-technology-flat_138676-13994.avif";

  // Fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No token found");

        const response = await axios.get("http://localhost:3001/myAccount", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const userData = response.data.user;
        dispatch(setUser(userData));

        setFormData({
          userName: userData?.userName || "",
          email: userData?.email || "",
          phone: userData?.phone || "",
        });

        setLoading(false);
      } catch (err) {
        console.error("Error fetching user data:", err);
        setError(err.response?.data?.error || "An error occurred");
        setLoading(false);
      }
    };

    fetchUserData();
  }, [dispatch]);

  // Sync formData with Redux state whenever user changes
  useEffect(() => {
    if (user) {
      setFormData({
        userName: user.userName || "",
        email: user.email || "",
        phone: user.phone || "",
      });
    }
  }, [user]);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!user || !user._id) {
      console.error("User data or ID is not available.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `http://localhost:3001/users/${user._id}`,
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const updatedUser = response.data.user;
      dispatch(setUser(updatedUser));
      setEditMode(false);
      toast.success("Profile updated successfully!");

      setTimeout(() => {
        window.location.reload();
      }, 100);
    } catch (err) {
      console.error("Error updating user data:", err);
      setError(err.response?.data?.error || "An error occurred");
      toast.error("Failed to update profile. Please try again.");
    }
  };

  // Handle field edit
  const handleFieldEdit = (field) => {
    setEditMode(field);
  };

  // Handle cancel edit
  const handleCancelEdit = () => {
    setEditMode(false);
    setFormData({
      userName: user?.userName || "",
      email: user?.email || "",
      phone: user?.phone || "",
    });
  };

  // Loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <FaSpinner className="animate-spin text-4xl text-[#127AC1]" />
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-8">
      {/* Centered Profile Picture with Gaming Icons */}
      <motion.div
        className="w-full max-w-4xl relative flex flex-col items-center justify-center p-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Gaming Icons */}
        <motion.div
          className="absolute top-0 left-0 text-[#127AC1] text-4xl"
          initial={{ x: -50, y: -50 }}
          animate={{ x: 0, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <FaGamepad />
        </motion.div>
        <motion.div
          className="absolute top-0 right-0 text-[#ED3926] text-4xl"
          initial={{ x: 50, y: -50 }}
          animate={{ x: 0, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <FaTrophy />
        </motion.div>
        <motion.div
          className="absolute bottom-0 left-0 text-[#127AC1] text-4xl"
          initial={{ x: -50, y: 50 }}
          animate={{ x: 0, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <FaShieldAlt />
        </motion.div>
        <motion.div
          className="absolute bottom-0 right-0 text-[#ED3926] text-4xl"
          initial={{ x: 50, y: 50 }}
          animate={{ x: 0, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <FaDice />
        </motion.div>

        {/* Profile Picture */}
        <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-[#127AC1] shadow-lg">
          <img
            src={defaultProfilePicture}
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>

        {/* User Info */}
        <div className="mt-4 text-center">
          <h2 className="text-2xl font-bold text-gray-900">{user?.userName}</h2>
          <p className="text-sm text-gray-600">{user?.email}</p>
        </div>
      </motion.div>

      {/* Personal Information Card */}
      <motion.div
        className="w-full max-w-4xl bg-white rounded-xl shadow-lg mt-6 p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h3 className="text-xl font-semibold text-gray-900 mb-6">Personal Information</h3>

        {/* Username */}
        <div className="flex flex-col space-y-4">
          <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-4">
              <FaUserCircle className="text-[#127AC1] text-2xl" />
              <span className="text-lg text-gray-700">Username</span>
            </div>
            <div className="flex items-center space-x-4">
              {editMode === "userName" ? (
                <input
                  type="text"
                  name="userName"
                  value={formData.userName}
                  onChange={handleInputChange}
                  className="text-lg text-gray-700 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#127AC1]"
                />
              ) : (
                <span className="text-lg text-gray-700">{user?.userName}</span>
              )}
              <FaEdit
                className="cursor-pointer text-[#127AC1] text-xl hover:text-[#0e6aa8] transition-all"
                onClick={() => handleFieldEdit("userName")}
              />
            </div>
          </div>

          {/* Email */}
          <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-4">
              <FaEnvelope className="text-[#127AC1] text-2xl" />
              <span className="text-lg text-gray-700">Email</span>
            </div>
            <div className="flex items-center space-x-4">
              {editMode === "email" ? (
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="text-lg text-gray-700 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#127AC1]"
                />
              ) : (
                <span className="text-lg text-gray-700">{user?.email}</span>
              )}
              <FaEdit
                className="cursor-pointer text-[#127AC1] text-xl hover:text-[#0e6aa8] transition-all"
                onClick={() => handleFieldEdit("email")}
              />
            </div>
          </div>

          {/* Phone */}
          <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-4">
              <FaPhoneAlt className="text-[#127AC1] text-2xl" />
              <span className="text-lg text-gray-700">Phone</span>
            </div>
            <div className="flex items-center space-x-4">
              {editMode === "phone" ? (
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="text-lg text-gray-700 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#127AC1]"
                />
              ) : (
                <span className="text-lg text-gray-700">{user?.phone}</span>
              )}
              <FaEdit
                className="cursor-pointer text-[#127AC1] text-xl hover:text-[#0e6aa8] transition-all"
                onClick={() => handleFieldEdit("phone")}
              />
            </div>
          </div>
        </div>

        {/* Save/Cancel Buttons */}
        {editMode && (
          <div className="flex space-x-4 mt-6">
            <motion.button
              onClick={handleFormSubmit}
              className="w-full py-3 bg-[#127AC1] text-white rounded-lg font-semibold text-lg flex items-center justify-center space-x-2 hover:bg-[#0e6aa8] transition-all"
            >
              <FaSave />
              <span>Save Changes</span>
            </motion.button>
            <motion.button
              onClick={handleCancelEdit}
              className="w-full py-3 bg-gray-500 text-white rounded-lg font-semibold text-lg flex items-center justify-center space-x-2 hover:bg-gray-600 transition-all"
            >
              <FaTimes />
              <span>Cancel</span>
            </motion.button>
          </div>
        )}
      </motion.div>
    </div>
  );
}