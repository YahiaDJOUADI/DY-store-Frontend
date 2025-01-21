"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { FaUserCog, FaUsers, FaEnvelope, FaBox, FaShoppingCart } from "react-icons/fa";
import UserManagement from "../../components/adminComponents/UserManagement";
import MessageManagement from "../../components/adminComponents/MessageManagement";
import ProductManagement from "../../components/adminComponents/ProductManagement";
import OrderManagement from "../../components/adminComponents/OrderManagement";
import Sidebar from "../../components/adminComponents/Sidebar";
import StatCard from "../../components/adminComponents/StatCard";

const AdminDashboard = () => {
  const [userList, setUserList] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeSection, setActiveSection] = useState("users");
  const [messageCount, setMessageCount] = useState(0);
  const [productCount, setProductCount] = useState(0);
  const [orderCount, setOrderCount] = useState(0);
  const router = useRouter();

  // Fetch users
  const fetchUsers = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get("http://localhost:3001/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUserList(response.data);
    } catch (error) {
      console.error("Failed to fetch users:", error);
      toast.error("Failed to fetch users");
    }
  };

  // Fetch messages
  const fetchMessages = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get("http://localhost:3001/messages", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessageCount(response.data.length);
    } catch (error) {
      console.error("Failed to fetch messages:", error);
      toast.error("Failed to fetch messages");
    }
  };

  // Fetch products
  const fetchProducts = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get("http://localhost:3001/products", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProductCount(response.data.length);
    } catch (error) {
      console.error("Failed to fetch products:", error);
      toast.error("Failed to fetch products");
    }
  };

  // Fetch orders
  const fetchOrders = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get("http://localhost:3001/orders", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrderCount(response.data.length);
    } catch (error) {
      console.error("Failed to fetch orders:", error);
      toast.error("Failed to fetch orders");
    }
  };

  // Fetch initial data
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
      return;
    }

    setLoading(true);
    axios
      .get("http://localhost:3001/myAccount", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(async (response) => {
        const user = response.data.user;
        setCurrentUser(user);

        if (user.email !== "yahia@gmail.com") {
          router.push("/not-authorized");
        } else {
          await fetchUsers();
          await fetchMessages();
          await fetchProducts();
          await fetchOrders();
        }
      })
      .catch((error) => {
        console.error("Error fetching user data", error);
        router.push("/login");
      })
      .finally(() => setLoading(false));
  }, [router]);

  // Render active section
  const renderActiveSection = () => {
    switch (activeSection) {
      case "users":
        return <UserManagement userList={userList} fetchUsers={fetchUsers} />;
      case "messages":
        return <MessageManagement />;
      case "products":
        return <ProductManagement />;
      case "orders":
        return <OrderManagement />;
      default:
        return null;
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-[#f2f2f2] flex">
      {/* Sidebar */}
      <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-y-auto">
        {/* Header */}
        <h1 className="text-3xl font-bold text-[#1d2731] mb-8 flex items-center">
          <FaUserCog className="mr-2 text-[#235789]" /> Admin Dashboard
        </h1>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            icon={<FaUsers className="text-2xl text-[#235789]" />}
            title="Total Users"
            value={userList.length}
            bgColor="bg-[#235789]"
          />
          <StatCard
            icon={<FaEnvelope className="text-2xl text-[#235789]" />}
            title="Messages"
            value={messageCount}
            bgColor="bg-[#ffcb05]"
          />
          <StatCard
            icon={<FaBox className="text-2xl text-[#235789]" />}
            title="Products"
            value={productCount}
            bgColor="bg-[#0b3c5d]"
          />
          <StatCard
            icon={<FaShoppingCart className="text-2xl text-[#235789]" />}
            title="Orders"
            value={orderCount}
            bgColor="bg-[#1d2731]"
          />
        </div>

        {/* Active Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          {renderActiveSection()}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;