"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import Swal from "sweetalert2";
import { FaArrowLeft } from "react-icons/fa";

export default function ProductPage() {
  const { id } = useParams();
  const router = useRouter();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [allProducts, setAllProducts] = useState([]);
  const [relatedProducts, setRelatedProducts] = useState([]);

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

  // Fetch all products
  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const response = await axios.get("http://localhost:3001/products");
        setAllProducts(response.data);
      } catch (err) {
        console.error("Error fetching all products:", err);
      }
    };

    fetchAllProducts();
  }, []);

  // Filter related products
  useEffect(() => {
    if (product && allProducts.length > 0) {
      const related = allProducts.filter(
        (p) => p.category === product.category && p._id !== product._id
      );
      setRelatedProducts(related.slice(0, 4));
    }
  }, [product, allProducts]);

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
      const response = await axios.post(
        "http://localhost:3001/cart/add",
        {
          productId: product._id,
          quantity,
        },
        {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
          withCredentials: true,
        }
      );

      console.log("Cart after adding product:", response.data);
      showAlert(
        "Added to Cart!",
        `${product.name} has been added to your cart.`,
        "success",
        "#235789"
      );
    } catch (err) {
      console.error("Error adding to cart:", err);
      showAlert(
        "Error",
        err.message || "Failed to add the product to the cart.",
        "error",
        "#ED3926"
      );
    }
  };

  // Handle buying the product (redirect to cart page)
  const handleBuyNow = async () => {
    try {
      await handleAddToCart();
      router.push("/cart");
    } catch (err) {
      console.error("Error during buy now:", err);
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f2f2f2]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#235789]"></div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f2f2f2]">
        <p className="text-[#ED3926] text-lg">{error}</p>
      </div>
    );
  }

  // Product not found state
  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f2f2f2]">
        <p className="text-[#1d2731] text-lg">Product not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f2f2f2] text-[#1d2731]">
      {/* Back to Shop Button */}
      <div className="max-w-6xl mx-auto p-6">
        <button
          onClick={() => router.push("/shop")}
          className="flex items-center gap-2 px-6 py-2 bg-[#235789] text-[#f2f2f2] font-bold rounded-md hover:bg-[#0b3c5d] transition-all duration-300"
        >
          <FaArrowLeft /> Back to Shop
        </button>
      </div>

      {/* Product Hero Section */}
      <div className="max-w-6xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="flex items-center justify-center">
            <img
              src={`http://localhost:3001/public/${product.image}`}
              alt={`Image of ${product.name}`}
              className="w-full h-auto max-h-[600px] object-contain rounded-lg hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <h1 className="text-4xl font-bold text-[#1d2731]">
              {product.name}
            </h1>
            <p className="text-[#1d2731] text-lg">{product.description}</p>

            {/* Price */}
            <p className="text-3xl text-[#235789] font-bold">
              DZD{product.price}
            </p>

            {/* Quantity Selector */}
            <div className="flex items-center gap-4">
              <label className="text-[#1d2731] text-lg font-bold">
                Quantity:
              </label>
              <div className="flex items-center border border-[#1d2731] rounded-md">
                <button
                  onClick={() => setQuantity((prev) => (prev > 1 ? prev - 1 : 1))}
                  className="px-4 py-2 bg-[#f2f2f2] hover:bg-[#e0e0e0] transition-all"
                >
                  -
                </button>
                <span className="px-4 py-2">{quantity}</span>
                <button
                  onClick={() => setQuantity((prev) => prev + 1)}
                  className="px-4 py-2 bg-[#f2f2f2] hover:bg-[#e0e0e0] transition-all"
                >
                  +
                </button>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col gap-4">
              <button
                onClick={handleAddToCart}
                className="px-8 py-3 bg-[#235789] text-[#f2f2f2] font-bold rounded-md hover:bg-[#0b3c5d] transition-all duration-300"
              >
                Add to Cart
              </button>
              <button
                onClick={handleBuyNow}
                className="px-8 py-3 bg-[#ffcb05] text-[#1d2731] font-bold rounded-md hover:bg-[#e6b800] transition-all duration-300"
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>

        {/* Why Choose This Product? Section */}
        <div className="mt-12 bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-[#1d2731] mb-6">
            Why Choose This Product?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-[#235789]">
                Premium Quality
              </h3>
              <p className="text-[#1d2731]">
                Our products are crafted with the highest quality materials to ensure durability and satisfaction.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-[#235789]">
                Customer Satisfaction
              </h3>
              <p className="text-[#1d2731]">
                We prioritize your satisfaction with a 30-day money-back guarantee.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-[#235789]">
                Reliable Support
              </h3>
              <p className="text-[#1d2731]">
                Our dedicated support team is available 24/7 to assist you with any questions or issues.
              </p>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-[#1d2731] mb-6">
            Related Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <div
                key={relatedProduct._id}
                className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <img
                  src={`http://localhost:3001/public/${relatedProduct.image}`}
                  alt={relatedProduct.name}
                  className="w-full h-48 object-cover rounded-lg"
                />
                <h3 className="text-lg font-bold text-[#1d2731] mt-2">
                  {relatedProduct.name}
                </h3>
                <p className="text-[#235789] font-bold">
                  DZD{relatedProduct.price}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}