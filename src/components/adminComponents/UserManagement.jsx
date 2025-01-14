"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "sonner";
import { FaUser, FaArrowUp, FaArrowDown, FaTrash, FaUsers, FaUserShield } from "react-icons/fa";
import { CircularProgress, IconButton, Tooltip } from "@mui/material";

const UserManagement = ({ userList, fetchUsers }) => {
  const [filterType, setFilterType] = useState("all");
  const [loading, setLoading] = useState(false);

  const updateUserType = async (id, type) => {
    const token = localStorage.getItem("token");
    try {
      await axios.patch(
        `http://localhost:3001/users/${id}/promote`,
        { type },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success(`User role updated to ${type}`);
      fetchUsers();
    } catch (error) {
      console.error("Error updating user type:", error);
      toast.error("Failed to update user role");
    }
  };

  const handleDeleteConfirmation = (id) => {
    // Implement delete confirmation logic here
  };

  const filteredUsers = userList.filter((user) => {
    const matchesFilter = filterType === "all" || user.type === filterType;
    return matchesFilter;
  });

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
        <FaUser className="mr-2 text-[#127AC1]" /> User Management
      </h2>

      {/* Insights Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
          <div className="bg-[#127AC1] p-3 rounded-full mr-4">
            <FaUsers className="text-white text-2xl" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-700">Total Users</h2>
            <p className="text-2xl font-bold text-[#127AC1]">{userList.length}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
          <div className="bg-[#127AC1] p-3 rounded-full mr-4">
            <FaUserShield className="text-white text-2xl" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-700">Admins</h2>
            <p className="text-2xl font-bold text-[#127AC1]">
              {userList.filter((user) => user.type === "admin").length}
            </p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
          <div className="bg-[#127AC1] p-3 rounded-full mr-4">
            <FaUser className="text-white text-2xl" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-700">Regular Users</h2>
            <p className="text-2xl font-bold text-[#127AC1]">
              {userList.filter((user) => user.type === "user").length}
            </p>
          </div>
        </div>
      </div>

      {/* Filter Section */}
      <div className="flex space-x-4 mb-4">
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="px-4 py-2 border rounded-md text-black"
        >
          <option value="all">All Users</option>
          <option value="admin">Admins</option>
          <option value="user">Regular Users</option>
        </select>
      </div>

      {/* User Table */}
      {loading ? (
        <div className="flex justify-center items-center h-32">
          <CircularProgress />
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 uppercase">User</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 uppercase">Email</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 uppercase">Type</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-800 flex items-center">
                    <FaUser className="mr-2 text-[#127AC1]" /> {user.userName}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">{user.email}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{user.type}</td>
                  <td className="px-6 py-4 flex space-x-4">
                    <button
                      onClick={() => updateUserType(user._id, "admin")}
                      disabled={user.type === "admin"}
                      className={`${
                        user.type === "admin"
                          ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                          : "bg-[#127AC1] text-white hover:bg-blue-600"
                      } px-4 py-2 rounded-md text-sm font-medium transition duration-200 flex items-center`}
                    >
                      <FaArrowUp className="mr-2" /> Make Admin
                    </button>
                    <button
                      onClick={() => updateUserType(user._id, "user")}
                      disabled={user.type === "user"}
                      className={`${
                        user.type === "user"
                          ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                          : "bg-[#ED3926] text-white hover:bg-red-600"
                      } px-4 py-2 rounded-md text-sm font-medium transition duration-200 flex items-center`}
                    >
                      <FaArrowDown className="mr-2" /> Make User
                    </button>
                    <Tooltip title="Delete User">
                      <IconButton
                        onClick={() => handleDeleteConfirmation(user._id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <FaTrash />
                      </IconButton>
                    </Tooltip>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UserManagement;