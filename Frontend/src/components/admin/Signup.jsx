import React, { useState } from "react";
import axios from "axios";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const { setToken } = useAppContext();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/admin/signup", { email, password });

      if (data.token) {
        setToken(data.token);
        localStorage.setItem("token", data.token);
        axios.defaults.headers.common["Authorization"] = `${data.token}`;
        toast.success("Signup successful & logged in ✅");

        navigate("/admin");; // redirect to dashboard
      } else {
        toast.error(data.message || "Signup failed ❌");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-br from-[#f8f5ff] to-[#eae2f8]">
      <div className="w-full max-w-sm p-8 border border-[#7b2cbf]/20 shadow-2xl rounded-2xl bg-white">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            <span className="text-[#7b2cbf]">Admin</span> Signup
          </h1>
          <p className="text-sm text-gray-500 mt-2">
            Create a new admin account
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-600">Email</label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              placeholder="Enter your email"
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7b2cbf] focus:outline-none text-gray-700"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">Password</label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              placeholder="Enter your password"
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7b2cbf] focus:outline-none text-gray-700"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 font-semibold text-white bg-[#7b2cbf] cursor-pointer rounded-lg shadow-md hover:bg-[#6a21a7] transition-all duration-200"
          >
            Signup
          </button>
        </form>

        {/* Login Link */}
        <p className="text-center text-sm text-gray-500 mt-4">
          Already have an account?{" "}
          <span
            className="text-[#7b2cbf] cursor-pointer hover:underline"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default Signup;
