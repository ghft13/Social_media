import { useState } from "react";
import { useAuth } from "../Context/AuthContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const {
    email,
    setemail,
    password,
    setpassword,
    username,
    setusername,
    handlesignup,
  } = useAuth();

  const handlelogin = () => {
    navigate("/Login");
  };


  const handlesubmit = async (e) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    if (username.length < 3) {
      toast.error("Username must be at least 3 characters.");
      return;
    }

    if (password.length < 8) {
      toast.error("Password must be at least 8 characters.");
      return;
    }
    await handlesignup();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4">
      <form
        onSubmit={handlesubmit}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-semibold mb-6 text-center">Sign Up</h2>

        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium mb-1">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setemail(e.target.value)}
            required
            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-blue-400"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="username" className="block text-sm font-medium mb-1">
            Username
          </label>
          <input
            type="text"
            name="username"
            value={username}
            onChange={(e) => setusername(e.target.value)}
            required
            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-blue-400"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="password" className="block text-sm font-medium mb-1">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setpassword(e.target.value)}
            required
            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-blue-400"
          />
        </div>

        <div className="flex flex-col gap-4">
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Sign Up
          </button>

          <button
            type="button"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
            onClick={handlelogin}
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
