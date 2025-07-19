import React from "react";
import { useAuth } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Login() {
  const navigate = useNavigate();
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    if (!buttonLoading) {
      setClicked(true);
      setTimeout(() => setClicked(false), 150); // scale back after 150ms
    }
  };
  const {
    setloginEmail,
    setloginPassword,
    handlelogin,
    loginEmail,
    loginPassword,
    buttonLoading,
    setButtonLoading,
  } = useAuth();

  const handlesubmit = async (e) => {
    e.preventDefault();
    await handlelogin();
  };
  return (
    <div className="min-h-screen flex items-center justify-center  px-4 bg-black">
      <form
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
        onSubmit={handlesubmit}
      >
        <h2 className="text-2xl font-semibold mb-6 text-center">Login</h2>

        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium mb-1">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={loginEmail}
            onChange={(e) => setloginEmail(e.target.value)}
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
            value={loginPassword}
            onChange={(e) => setloginPassword(e.target.value)}
            required
            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-blue-400"
          />
        </div>

        <button
          type="submit"
          disabled={buttonLoading}
          onClick={handleClick}
          className={`
        w-full bg-blue-600 text-white py-2 rounded 
        transition duration-150 ease-in-out 
        hover:bg-blue-700 
        ${buttonLoading ? "opacity-50 cursor-not-allowed" : ""}
        ${clicked ? "scale-95" : ""}
      `}
        >
          {buttonLoading ? "Sending Magic Link..." : "Send A Magic Link"}
        </button>

        <button
          onClick={() => navigate("/")}
          type="button"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition mt-2"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default Login;
