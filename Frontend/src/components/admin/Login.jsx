import React, { useState } from "react";
import axios from "axios";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";


const Login = () => {


  const {setToken} = useAppContext();


  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

 const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const { data } = await axios.post("/api/admin/login", { email, password });

    if (data.token) {   // ✅ check if token exists
      setToken(data.token);
      localStorage.setItem("token", data.token);
      axios.defaults.headers.common["Authorization"] = `${data.token}`;
      toast.success("Login successful ✅");
    } else {
      toast.error(data.message || "Login failed ❌");
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
            <span className="text-[#7b2cbf]">Admin</span> Login
          </h1>
          <p className="text-sm text-gray-500 mt-2">
            Enter your credentials to access the admin panel
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Email
            </label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              placeholder="Enter your email"
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7b2cbf] focus:outline-none text-gray-700"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Password
            </label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              placeholder="Enter your password"
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7b2cbf] focus:outline-none text-gray-700"
              required
            />
            <p className="text-xs text-right text-[#7b2cbf] mt-1 cursor-pointer hover:underline">
              Forgot password?
            </p>
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full py-3 font-semibold text-white bg-[#7b2cbf] cursor-pointer rounded-lg shadow-md hover:bg-[#6a21a7] transition-all duration-200"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
