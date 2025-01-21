"use client";
import React from "react";
import { FaUsers, FaEnvelope, FaBox, FaShoppingCart } from "react-icons/fa";

const Sidebar = ({ activeSection, setActiveSection }) => {
  return (
    <div className="w-64 bg-[#1d2731] text-[#f2f2f2] p-6">
      <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
      <ul className="space-y-4">
        <li
          className={`flex items-center space-x-2 cursor-pointer ${
            activeSection === "users" ? "text-[#ffcb05]" : "hover:text-[#ffcb05]"
          }`}
          onClick={() => setActiveSection("users")}
        >
          <FaUsers />
          <span>Users</span>
        </li>
        <li
          className={`flex items-center space-x-2 cursor-pointer ${
            activeSection === "messages" ? "text-[#ffcb05]" : "hover:text-[#ffcb05]"
          }`}
          onClick={() => setActiveSection("messages")}
        >
          <FaEnvelope />
          <span>Messages</span>
        </li>
        <li
          className={`flex items-center space-x-2 cursor-pointer ${
            activeSection === "products" ? "text-[#ffcb05]" : "hover:text-[#ffcb05]"
          }`}
          onClick={() => setActiveSection("products")}
        >
          <FaBox />
          <span>Products</span>
        </li>
        <li
          className={`flex items-center space-x-2 cursor-pointer ${
            activeSection === "orders" ? "text-[#ffcb05]" : "hover:text-[#ffcb05]"
          }`}
          onClick={() => setActiveSection("orders")}
        >
          <FaShoppingCart />
          <span>Orders</span>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;