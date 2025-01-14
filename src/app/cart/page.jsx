"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { setCart, clearCart } from "@/features/cartSlice";

export default function CartPage() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.items);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [checkoutInfo, setCheckoutInfo] = useState({
    name: "",
    phone: "",
    city: "",
    address: "",
  });

  const showAlert = (title, text, icon, confirmButtonColor) => {
    Swal.fire({ title, text, icon, confirmButtonColor });
  };

  // Fetch cart for both authenticated and guest users
  const fetchCart = async () => {
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("token");
      const guestCartId = localStorage.getItem("guestCartId");

      const config = token
        ? { headers: { Authorization: `Bearer ${token}` } }
        : guestCartId
        ? { headers: { "Guest-Cart-ID": guestCartId } }
        : {};

      const response = await axios.get("http://localhost:3001/cart", config);
      dispatch(setCart(response.data));
    } catch (err) {
      console.error("Error fetching cart:", err);
      setError("Failed to fetch cart data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  // Handle removing one item from the cart
  const handleRemoveOne = async (productId) => {
    try {
      const cartItem = cart.find((item) => item.product._id === productId);
      if (!cartItem) {
        throw new Error("Product not found in cart");
      }

      const newQuantity = cartItem.quantity - 1;
      const token = localStorage.getItem("token");
      const guestCartId = localStorage.getItem("guestCartId");

      const config = token
        ? { headers: { Authorization: `Bearer ${token}` } }
        : guestCartId
        ? { headers: { "Guest-Cart-ID": guestCartId } }
        : {};

      const response = await axios.post(
        "http://localhost:3001/cart/update",
        { productId, quantity: newQuantity },
        config
      );

      if (response.status === 200) {
        await fetchCart();
      }
    } catch (err) {
      console.error("Error removing one item:", err);
      showAlert("Error", err.response?.data?.message || "Failed to update the cart.", "error", "#ED3926");
    }
  };

  // Handle removing a product entirely from the cart
  const handleRemoveProduct = async (productId) => {
    try {
      const token = localStorage.getItem("token");
      const guestCartId = localStorage.getItem("guestCartId");

      const config = token
        ? { headers: { Authorization: `Bearer ${token}` } }
        : guestCartId
        ? { headers: { "Guest-Cart-ID": guestCartId } }
        : {};

      const response = await axios.post(
        "http://localhost:3001/cart/remove",
        { productId },
        config
      );

      if (response.status === 200) {
        await fetchCart();
        showAlert("Success", "Item removed from cart.", "success", "#127AC1");
      }
    } catch (err) {
      console.error("Error removing product:", err);
      showAlert("Error", err.response?.data?.message || "Failed to remove the product from the cart.", "error", "#ED3926");
    }
  };

  // Calculate total price
  const totalPrice = cart.reduce((total, item) => {
    const productPrice = item.product?.price || 0;
    const quantity = item.quantity || 0;
    return total + productPrice * quantity;
  }, 0);

  // Handle checkout
  const handleCheckout = async () => {
    if (!checkoutInfo.name || !checkoutInfo.phone || !checkoutInfo.city || !checkoutInfo.address) {
      showAlert("Error", "All fields are required.", "error", "#ED3926");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const guestCartId = localStorage.getItem("guestCartId");

      const config = token
        ? { headers: { Authorization: `Bearer ${token}` } }
        : guestCartId
        ? { headers: { "Guest-Cart-ID": guestCartId } }
        : {};

      const response = await axios.post(
        "http://localhost:3001/orders",
        {
          shippingAddress: checkoutInfo.address,
          products: cart.map((item) => ({
            productId: item.product._id,
            quantity: item.quantity,
          })),
          totalPrice,
          name: checkoutInfo.name,
          phone: checkoutInfo.phone,
        },
        config
      );

      if (response.status === 200) {
        await axios.delete("http://localhost:3001/cart", config);
        dispatch(clearCart());
        showAlert(
          "Order Placed!",
          `Thank you, ${checkoutInfo.name}! Your order will be delivered to ${checkoutInfo.address}, ${checkoutInfo.city}. We will contact you at ${checkoutInfo.phone}.`,
          "success",
          "#127AC1"
        );

        setIsCheckoutModalOpen(false);
      }
    } catch (err) {
      console.error("Error during checkout:", err);
      showAlert("Error", err.response?.data?.message || "Failed to process your order. Please try again.", "error", "#ED3926");
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#127AC1]"></div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <p className="text-red-500 text-lg">{error}</p>
      </div>
    );
  }

  // Empty cart state
  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-white text-gray-800 flex flex-col items-center justify-center p-6">
        <h1 className="text-4xl font-bold mb-4 text-gray-900">Your Cart</h1>
        <p className="text-lg text-gray-600 mb-6">
          Your cart is empty.{" "}
          <Link
            href="/shop"
            className="text-[#127AC1] font-semibold hover:underline transition duration-300"
          >
            Continue shopping
          </Link>
        </p>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-24 w-24 text-gray-300 mb-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-gray-800 p-6">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
      <div className="space-y-4">
        {cart.map((item) => {
          const product = item.product;
          if (!product) return null;

          return (
            <div
              key={item._id}
              className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
            >
              <div className="flex items-center gap-4">
                <img
                  src={`http://localhost:3001/public/${product.image}`}
                  alt={product.name}
                  className="w-16 h-16 rounded-lg"
                />
                <div>
                  <h2 className="text-lg font-semibold">{product.name}</h2>
                  <p className="text-gray-600">
                    ${product.price} x {item.quantity}
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleRemoveOne(product._id)}
                  className="px-3 py-1 bg-[#127AC1] text-white rounded-md hover:bg-[#0e639c] transition-all duration-300"
                >
                  Remove One
                </button>
                <button
                  onClick={() => handleRemoveProduct(product._id)}
                  className="px-3 py-1 bg-[#ED3926] text-white rounded-md hover:bg-[#c5301f] transition-all duration-300"
                >
                  Remove All
                </button>
              </div>
            </div>
          );
        })}
        <div className="text-xl font-bold mt-6">Total: ${totalPrice.toFixed(2)}</div>
        <button
          onClick={() => setIsCheckoutModalOpen(true)}
          className="px-6 py-2 bg-[#127AC1] text-white font-bold rounded-md hover:bg-[#0e639c] transition-all duration-300"
        >
          Proceed to Checkout
        </button>
      </div>

      {isCheckoutModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4">Checkout</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleCheckout();
              }}
            >
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Name</label>
                  <input
                    type="text"
                    value={checkoutInfo.name}
                    onChange={(e) => setCheckoutInfo({ ...checkoutInfo, name: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                  <input
                    type="tel"
                    value={checkoutInfo.phone}
                    onChange={(e) => setCheckoutInfo({ ...checkoutInfo, phone: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">City</label>
                  <input
                    type="text"
                    value={checkoutInfo.city}
                    onChange={(e) => setCheckoutInfo({ ...checkoutInfo, city: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Address</label>
                  <input
                    type="text"
                    value={checkoutInfo.address}
                    onChange={(e) => setCheckoutInfo({ ...checkoutInfo, address: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setIsCheckoutModalOpen(false)}
                    className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-all duration-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#127AC1] text-white rounded-md hover:bg-[#0e639c] transition-all duration-300"
                  >
                    Place Order
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}