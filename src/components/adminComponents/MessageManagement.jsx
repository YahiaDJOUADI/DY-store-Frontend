"use client"
import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "sonner";
import { FaEnvelope, FaCheck, FaTrash } from "react-icons/fa";
import { Box, IconButton, Tooltip } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

const MessageManagement = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

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
    }
  };

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

  const messageColumns = [
    { field: "name", headerName: "Name", width: 200 },
    { field: "email", headerName: "Email", width: 250 },
    { field: "message", headerName: "Message", width: 400 },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => (
        <div>
          {!params.row.read && (
            <Tooltip title="Mark as Read">
              <IconButton onClick={() => handleMarkAsRead(params.row._id)}>
                <FaCheck style={{ color: "#127AC1" }} />
              </IconButton>
            </Tooltip>
          )}
          <Tooltip title="Delete Message">
            <IconButton onClick={() => handleDeleteMessage(params.row._id)}>
              <FaTrash style={{ color: "#ED3926" }} />
            </IconButton>
          </Tooltip>
        </div>
      ),
    },
  ];

  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
        <FaEnvelope className="mr-2" style={{ color: "#127AC1" }} /> Message Management
      </h2>
      <Box sx={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={messages}
          columns={messageColumns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          getRowId={(row) => row._id}
          getRowClassName={(params) => (params.row.read ? "read-message" : "")}
        />
      </Box>
    </div>
  );
};

export default MessageManagement;