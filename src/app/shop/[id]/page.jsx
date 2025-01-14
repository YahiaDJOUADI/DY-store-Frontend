"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import Swal from "sweetalert2";

export default function ProductPage() {
  const { id } = useParams();
  const router = useRouter();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);

  // Fetch product details
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/products/${id}`);
        setProduct(response.data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch product details.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // Helper function to show SweetAlert messages
  const showAlert = (title, text, icon, confirmButtonColor) => {
    Swal.fire({
      title,
      text,
      icon,
      confirmButtonColor,
    });
  };

  // Handle adding product to cart
  const handleAddToCart = async () => {
    try {
      const token = localStorage.getItem("token");

      const config = token
        ? { headers: { Authorization: `Bearer ${token}` } }
        : {};

      const response = await axios.post(
        "http://localhost:3001/cart/add",
        {
          productId: product._id,
          quantity,
        },
        config
      );

      console.log("Cart after adding product:", response.data);
      showAlert("Added to Cart!", `${product.name} has been added to your cart.`, "success", "#127AC1");
    } catch (err) {
      console.error("Error adding to cart:", err);
      showAlert("Error", err.message || "Failed to add the product to the cart.", "error", "#ED3926");
    }
  };

  // Handle buying the product (redirect to cart page)
  const handleBuyNow = async () => {
    try {
      await handleAddToCart();
      setTimeout(() => {
        router.push("/cart");
      }, 500);
    } catch (err) {
      console.error("Error during buy now:", err);
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

  // Product not found state
  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <p className="text-gray-800 text-lg">Product not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-gray-800">
      <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
        {/* Back to Shop Button */}
        <button
          onClick={() => router.push("/shop")}
          className="mb-6 px-6 py-2 bg-[#127AC1] text-white font-bold rounded-md hover:bg-[#0e639c] transition-all duration-300"
        >
          ← Back to Shop
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Product Image */}
          <div className="flex items-center justify-center">
            <img
              src={`http://localhost:3001/public/${product.image}`}
              alt={`Image of ${product.name}`}
              className="w-full h-auto rounded-lg shadow-md"
            />
          </div>

          {/* Product Details */}
          <div className="p-6">
            <h1 className="text-3xl font-bold text-gray-800">{product.name}</h1>
            <p className="text-gray-600 mt-4">{product.description}</p>
            <p className="text-xl text-[#127AC1] font-bold mt-4">
              DZD{product.price}
            </p>

            {/* Quantity Selector */}
            <div className="mt-6">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Quantity
              </label>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => {
                  const value = parseInt(e.target.value);
                  if (value >= 1) {
                    setQuantity(value);
                  }
                }}
                className="w-20 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#127AC1]"
              />
            </div>

            {/* Buttons */}
            <div className="mt-8 flex gap-4">
              <button
                onClick={handleAddToCart}
                className="px-6 py-2 bg-[#127AC1] text-white font-bold rounded-md hover:bg-[#0e639c] transition-all duration-300"
              >
                Add to Cart
              </button>
              <button
                onClick={handleBuyNow}
                className="px-6 py-2 bg-[#ED3926] text-white font-bold rounded-md hover:bg-[#c5301f] transition-all duration-300"
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}