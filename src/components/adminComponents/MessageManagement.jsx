"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "sonner";
import { FaEnvelope, FaCheck, FaTrash, FaSpinner } from "react-icons/fa";
import { useReactTable, getCoreRowModel, flexRender } from "@tanstack/react-table";
import { Tooltip } from "@mui/material"; // For tooltips

const MessageManagement = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch messages from the server
  const fetchMessages = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get("http://localhost:3001/messages", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessages(response.data.data);
    } catch (error) {
      console.error("Failed to fetch messages:", error);
      toast.error("Failed to fetch messages");
    } finally {
      setLoading(false);
    }
  };

  // Mark a message as read
  const handleMarkAsRead = async (id) => {
    const token = localStorage.getItem("token");
    try {
      await axios.patch(
        `http://localhost:3001/messages/${id}/read`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Message marked as read");
      fetchMessages();
    } catch (error) {
      console.error("Error marking message as read:", error);
      toast.error("Failed to mark message as read");
    }
  };

  // Delete a message
  const handleDeleteMessage = async (id) => {
    const token = localStorage.getItem("token");
    try {
      await axios.delete(`http://localhost:3001/messages/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Message deleted successfully");
      fetchMessages();
    } catch (error) {
      console.error("Error deleting message:", error);
      toast.error("Failed to delete message");
    }
  };

  // Define columns for the table
  const columns = [
    {
      accessorKey: "name",
      header: "Name",
      cell: (info) => <span className="font-medium">{info.getValue()}</span>,
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: (info) => <span className="text-[#235789]">{info.getValue()}</span>,
    },
    {
      accessorKey: "message",
      header: "Message",
      cell: (info) => <span className="text-gray-600">{info.getValue()}</span>,
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex space-x-2">
          {!row.original.read && (
            <Tooltip title="Mark as Read">
              <button
                onClick={() => handleMarkAsRead(row.original._id)}
                className="p-2 bg-[#235789] text-white rounded-lg hover:bg-[#0b3c5d] transition-colors"
              >
                <FaCheck />
              </button>
            </Tooltip>
          )}
          <Tooltip title="Delete Message">
            <button
              onClick={() => handleDeleteMessage(row.original._id)}
              className="p-2 bg-[#ffcb05] text-[#1d2731] rounded-lg hover:bg-[#e6b800] transition-colors"
            >
              <FaTrash />
            </button>
          </Tooltip>
        </div>
      ),
    },
  ];

  // Initialize React Table
  const table = useReactTable({
    data: messages,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  // Fetch messages on component mount
  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <div className="bg-[#f2f2f2] p-6 rounded-lg shadow-lg mb-8">
      <h2 className="text-2xl font-bold text-[#1d2731] mb-6 flex items-center">
        <FaEnvelope className="mr-2 text-[#235789]" /> {/* Medium Blue */}
        Message Management
      </h2>

      {/* Loading State */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <FaSpinner className="animate-spin text-[#235789] text-4xl" />
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#235789] text-[#f2f2f2]">
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <th
                        key={header.id}
                        className="px-6 py-3 text-left text-sm font-semibold uppercase"
                      >
                        {flexRender(header.column.columnDef.header, header.getContext())}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody className="divide-y divide-gray-200">
                {table.getRowModel().rows.map((row) => (
                  <tr
                    key={row.id}
                    className={`${
                      row.original.read ? "bg-gray-50 opacity-80" : "hover:bg-gray-100"
                    } transition-colors`}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="px-6 py-4 text-sm">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Empty State */}
          {messages.length === 0 && !loading && (
            <div className="p-6 text-center text-gray-600">
              <p>No messages found.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MessageManagement;