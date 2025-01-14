import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "@/features/userSlice";
import { motion } from "framer-motion";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";
import axios from "axios";

const LoginModal = ({ onClose, onLoginSuccess }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const validateInputs = () => {
    if (!email || !password) {
      setError("Please fill in all fields.");
      return false;
    }
    return true;
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateInputs()) return;

    setLoading(true);
    setError(null);

    try {
      // Perform login request
      const response = await axios.post("http://localhost:3001/login", {
        email,
        password,
      });

      const { token, user } = response.data;

      // Save the token to localStorage
      localStorage.setItem("token", token);

      // Dispatch login action to Redux
      dispatch(login({ user, token }));

      // Notify parent (Navbar) of successful login
      onLoginSuccess(token);

      // Redirect to home page
      router.push("/");

      // Close the modal after successful login
      onClose();
    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Login failed. Please check your credentials and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50"
      role="dialog"
      aria-modal="true"
      aria-labelledby="login-modal-title"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="relative bg-white p-10 rounded-xl shadow-xl max-w-sm w-full"
      >
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl"
          onClick={onClose}
          aria-label="Close modal"
        >
          &times;
        </button>

        <h2
          id="login-modal-title"
          className="text-3xl font-bold text-center text-[#127AC1] mb-8"
        >
          Welcome Back!
        </h2>

        <form onSubmit={handleLogin}>
          {error && (
            <div
              className="mb-4 p-3 text-center text-sm text-red-600 bg-red-100 border border-red-200 rounded-lg"
              role="alert"
            >
              {error}
            </div>
          )}

          <div className="mb-6">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-3 border rounded-lg shadow-sm focus:ring-[#127AC1] focus:border-[#127AC1] border-gray-300"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              aria-label="Email Address"
              disabled={loading}
            />
          </div>

          <div className="mb-6 relative">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                className="w-full px-4 py-3 border rounded-lg shadow-sm focus:ring-[#127AC1] focus:border-[#127AC1] border-gray-300 pr-12"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                aria-label="Password"
                disabled={loading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-4 flex items-center text-gray-500 hover:text-[#127AC1]"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeSlashIcon className="h-5 w-5" />
                ) : (
                  <EyeIcon className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full bg-[#127AC1] text-white py-3 rounded-lg shadow-lg hover:bg-[#ED3926] transition duration-300 font-semibold"
            disabled={loading}
            aria-label="Log In"
          >
            {loading ? "Logging in..." : "Log In"}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default LoginModal;