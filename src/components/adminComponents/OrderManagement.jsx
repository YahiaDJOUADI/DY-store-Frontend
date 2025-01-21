"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "sonner";
import {
  FaCheckCircle,
  FaTrash,
  FaClipboardList,
  FaTruck,
  FaBoxOpen,
  FaMoneyBillWave,
} from "react-icons/fa";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  CircularProgress,
  IconButton,
  Tooltip,
  Chip,
  Menu,
  MenuItem,
} from "@mui/material";
import Swal from "sweetalert2";

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null); // For status dropdown menu
  const [selectedOrderId, setSelectedOrderId] = useState(null); // Track selected order for status update

  // Fetch orders from the backend
  const fetchOrders = async () => {
    const token = localStorage.getItem("token");
    setLoading(true);

    try {
      const response = await axios.get("http://localhost:3001/orders", {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("API Response:", response.data); // Log the response
      setOrders(response.data.orders || response.data); // Adjust based on the response structure
    } catch (error) {
      console.error("Failed to fetch orders:", error);
      toast.error("Failed to fetch orders. Please try again later.");
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  // Handle status update for an order
  const handleStatusUpdate = async (orderId, newStatus) => {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.patch(
        `http://localhost:3001/orders/${orderId}/status`,
        { status: newStatus }, // Send the new status in the request body
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log("Status Update Response:", response.data); // Log the response
      toast.success(`Order status updated to ${newStatus}!`);

      // Update the local state to reflect the new status
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, status: newStatus } : order
        )
      );
    } catch (error) {
      console.error("Error updating order status:", error);
      toast.error("Failed to update order status. Please try again later.");
    } finally {
      handleStatusMenuClose(); // Close the dropdown menu
    }
  };

  // Handle payment status update for an order
  const handlePaymentStatusUpdate = async (orderId, isPaid) => {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.patch(
        `http://localhost:3001/orders/${orderId}/payment-status`,
        { isPaid }, // Send the new payment status in the request body
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log("Payment Status Update Response:", response.data); // Log the response
      toast.success(`Payment status updated to ${isPaid ? "Paid" : "Unpaid"}!`);

      // Update the local state to reflect the new payment status
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, isPaid } : order
        )
      );
    } catch (error) {
      console.error("Error updating payment status:", error);
      toast.error("Failed to update payment status. Please try again later.");
    }
  };

  // Delete an order
  const handleDeleteOrder = async (orderId) => {
    const token = localStorage.getItem("token");

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#235789",
      cancelButtonColor: "#ffcb05",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`http://localhost:3001/orders/${orderId}`, {
            headers: { Authorization: `Bearer ${token}` },
          });

          toast.success("Order deleted successfully!");
          fetchOrders(); // Refresh the orders list
        } catch (error) {
          console.error("Error deleting order:", error);
          toast.error("Failed to delete order. Please try again later.");
        }
      }
    });
  };

  // Open status dropdown menu
  const handleStatusMenuOpen = (event, orderId) => {
    setAnchorEl(event.currentTarget);
    setSelectedOrderId(orderId);
  };

  // Close status dropdown menu
  const handleStatusMenuClose = () => {
    setAnchorEl(null);
    setSelectedOrderId(null);
  };

  // Fetch orders when the component mounts
  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="bg-[#f2f2f2] p-6 rounded-lg shadow-md">
      <Typography variant="h4" className="text-[#1d2731] font-bold mb-6 flex items-center">
        <FaClipboardList className="mr-2 text-[#235789]" />
        Order Management
      </Typography>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <CircularProgress style={{ color: "#235789" }} />
        </div>
      ) : (
        <TableContainer component={Paper} elevation={3}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell className="font-bold text-[#235789]">Customer Name</TableCell>
                <TableCell className="font-bold text-[#235789]">Phone</TableCell>
                <TableCell className="font-bold text-[#235789]">Wilaya</TableCell>
                <TableCell className="font-bold text-[#235789]">Total Price</TableCell>
                <TableCell className="font-bold text-[#235789]">Status</TableCell>
                <TableCell className="font-bold text-[#235789]">Payment Status</TableCell>
                <TableCell className="font-bold text-[#235789]">Order Date</TableCell>
                <TableCell className="font-bold text-[#235789]">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.length > 0 ? (
                orders.map((order) => (
                  <TableRow key={order._id}>
                    <TableCell>{order.name}</TableCell>
                    <TableCell>{order.phone}</TableCell>
                    <TableCell>{order.wilaya}</TableCell>
                    <TableCell>DZD {order.totalPrice}</TableCell>
                    <TableCell>
                      <Chip
                        label={order.status}
                        className={`${
                          order.status === "delivered"
                            ? "bg-[#4CAF50] text-[#f2f2f2]"
                            : order.status === "pending"
                            ? "bg-[#ffcb05] text-[#1d2731]"
                            : order.status === "shipped"
                            ? "bg-[#235789] text-[#f2f2f2]"
                            : order.status === "cancelled"
                            ? "bg-[#F44336] text-[#f2f2f2]"
                            : "bg-[#0b3c5d] text-[#f2f2f2]"
                        }`}
                      />
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={order.isPaid ? "Paid" : "Unpaid"}
                        className={`${
                          order.isPaid ? "bg-[#4CAF50] text-[#f2f2f2]" : "bg-[#F44336] text-[#f2f2f2]"
                        }`}
                      />
                    </TableCell>
                    <TableCell>{new Date(order.orderDate).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Tooltip title="Update Status">
                          <IconButton
                            style={{ color: "#235789" }}
                            onClick={(e) => handleStatusMenuOpen(e, order._id)}
                          >
                            <FaTruck />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Mark as Paid">
                          <IconButton
                            style={{ color: order.isPaid ? "#4CAF50" : "#F44336" }}
                            onClick={() => handlePaymentStatusUpdate(order._id, !order.isPaid)}
                          >
                            <FaMoneyBillWave />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete Order">
                          <IconButton
                            style={{ color: "#ffcb05" }}
                            onClick={() => handleDeleteOrder(order._id)}
                          >
                            <FaTrash />
                          </IconButton>
                        </Tooltip>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={8} align="center">
                    <Typography variant="body1" className="text-[#1d2731]">
                      No orders found.
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Status Dropdown Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleStatusMenuClose}
      >
        <MenuItem onClick={() => handleStatusUpdate(selectedOrderId, "pending")}>
          <FaClipboardList className="mr-2" /> Pending
        </MenuItem>
        <MenuItem onClick={() => handleStatusUpdate(selectedOrderId, "confirmed")}>
          <FaCheckCircle className="mr-2" /> Confirmed
        </MenuItem>
        <MenuItem onClick={() => handleStatusUpdate(selectedOrderId, "shipped")}>
          <FaTruck className="mr-2" /> Shipped
        </MenuItem>
        <MenuItem onClick={() => handleStatusUpdate(selectedOrderId, "delivered")}>
          <FaBoxOpen className="mr-2" /> Delivered
        </MenuItem>
        <MenuItem onClick={() => handleStatusUpdate(selectedOrderId, "cancelled")}>
          <FaTrash className="mr-2" /> Cancelled
        </MenuItem>
      </Menu>
    </div>
  );
};

export default OrderManagement;