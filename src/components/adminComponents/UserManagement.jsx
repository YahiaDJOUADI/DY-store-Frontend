"use client";
import React, { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { FaUser, FaArrowUp, FaArrowDown, FaTrash, FaUsers, FaUserShield } from "react-icons/fa";
import { CircularProgress, IconButton, Tooltip } from "@mui/material";
import Swal from "sweetalert2"; // For confirmation dialogs

const UserManagement = ({ userList, fetchUsers }) => {
  const [filterType, setFilterType] = useState("all");
  const [loading, setLoading] = useState(false);

  // Update user role (admin/user)
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

  // Delete user with confirmation
  const handleDeleteConfirmation = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#235789", // Medium Blue
      cancelButtonColor: "#ffcb05", // Bright Yellow
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const token = localStorage.getItem("token");
        try {
          await axios.delete(`http://localhost:3001/users/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          toast.success("User deleted successfully");
          fetchUsers();
        } catch (error) {
          console.error("Error deleting user:", error);
          toast.error("Failed to delete user");
        }
      }
    });
  };

  // Filter users based on role
  const filteredUsers = userList.filter((user) => {
    return filterType === "all" || user.type === filterType;
  });

  return (
    <div className="bg-[#f2f2f2] p-6 rounded-lg shadow-lg mb-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-[#1d2731] flex items-center">
          <FaUser className="mr-2 text-[#235789]" /> {/* Medium Blue */}
          User Management
        </h2>
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="px-4 py-2 border rounded-md text-[#1d2731] focus:outline-none focus:ring-2 focus:ring-[#235789]"
        >
          <option value="all">All Users</option>
          <option value="admin">Admins</option>
          <option value="user">Regular Users</option>
        </select>
      </div>

      {/* Insights Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
          <div className="bg-[#235789] p-3 rounded-full mr-4">
            <FaUsers className="text-white text-2xl" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-[#1d2731]">Total Users</h2>
            <p className="text-2xl font-bold text-[#235789]">{userList.length}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
          <div className="bg-[#235789] p-3 rounded-full mr-4">
            <FaUserShield className="text-white text-2xl" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-[#1d2731]">Admins</h2>
            <p className="text-2xl font-bold text-[#235789]">
              {userList.filter((user) => user.type === "admin").length}
            </p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
          <div className="bg-[#235789] p-3 rounded-full mr-4">
            <FaUser className="text-white text-2xl" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-[#1d2731]">Regular Users</h2>
            <p className="text-2xl font-bold text-[#235789]">
              {userList.filter((user) => user.type === "user").length}
            </p>
          </div>
        </div>
      </div>

      {/* User Table */}
      {loading ? (
        <div className="flex justify-center items-center h-32">
          <CircularProgress style={{ color: "#235789" }} />
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="min-w-full">
            <thead className="bg-[#235789] text-[#f2f2f2]">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold uppercase">User</th>
                <th className="px-6 py-3 text-left text-sm font-semibold uppercase">Email</th>
                <th className="px-6 py-3 text-left text-sm font-semibold uppercase">Type</th>
                <th className="px-6 py-3 text-left text-sm font-semibold uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredUsers.map((user) => (
                <tr key={user._id} className="hover:bg-[#f2f2f2] transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-[#1d2731] flex items-center">
                    <FaUser className="mr-2 text-[#235789]" />
                    {user.userName}
                  </td>
                  <td className="px-6 py-4 text-sm text-[#1d2731]">{user.email}</td>
                  <td className="px-6 py-4 text-sm text-[#1d2731]">{user.type}</td>
                  <td className="px-6 py-4 flex space-x-4">
                    <Tooltip title={user.type === "admin" ? "Already Admin" : "Make Admin"}>
                      <button
                        onClick={() => updateUserType(user._id, "admin")}
                        disabled={user.type === "admin"}
                        className={`${
                          user.type === "admin"
                            ? "bg-[#f2f2f2] text-[#1d2731] cursor-not-allowed"
                            : "bg-[#235789] text-[#f2f2f2] hover:bg-[#0b3c5d]"
                        } px-4 py-2 rounded-md text-sm font-medium transition duration-200 flex items-center`}
                      >
                        <FaArrowUp className="mr-2" /> Make Admin
                      </button>
                    </Tooltip>
                    <Tooltip title={user.type === "user" ? "Already User" : "Make User"}>
                      <button
                        onClick={() => updateUserType(user._id, "user")}
                        disabled={user.type === "user"}
                        className={`${
                          user.type === "user"
                            ? "bg-[#f2f2f2] text-[#1d2731] cursor-not-allowed"
                            : "bg-[#ffcb05] text-[#1d2731] hover:bg-[#e6b800]"
                        } px-4 py-2 rounded-md text-sm font-medium transition duration-200 flex items-center`}
                      >
                        <FaArrowDown className="mr-2" /> Make User
                      </button>
                    </Tooltip>
                    <Tooltip title="Delete User">
                      <IconButton
                        onClick={() => handleDeleteConfirmation(user._id)}
                        className="text-[#ffcb05] hover:text-[#e6b800]"
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