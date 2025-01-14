"use client"
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { FaUserCog } from "react-icons/fa";
import UserManagement from "../../components/adminComponents/UserManagement";
import MessageManagement from "../../components/adminComponents/MessageManagement";
import ProductManagement from "../../components/adminComponents/ProductManagement";

const AdminDashboard = () => {
  const [userList, setUserList] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

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
      .then((response) => {
        const user = response.data.user;
        setCurrentUser(user);

        if (user.email !== "yahia@gmail.com") {
          router.push("/not-authorized");
        } else {
          fetchUsers();
        }
      })
      .catch((error) => {
        console.error("Error fetching user data", error);
        router.push("/login");
      })
      .finally(() => setLoading(false));
  }, [router]);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 flex items-center">
          <FaUserCog className="mr-2 text-[#127AC1]" /> Admin Dashboard
        </h1>

        <UserManagement userList={userList} fetchUsers={fetchUsers} />
        <MessageManagement />
        <ProductManagement />
      </div>
    </div>
  );
};

export default AdminDashboard;