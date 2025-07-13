import React from "react";
import { useNavigate } from "react-router-dom";
function HomeFallback() {
  const navigate = useNavigate();
  return (
    <>
    <div className="flex justify-center items-center h-screen">
      <div className="text-center mt-10 text-lg font-semibold">
        <h3>Please create an account first to use this app.</h3>
        <button
          onClick={() => navigate("/Signup")}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Create Account
        </button>
      </div>
      </div>
    </>
  );
}

export default HomeFallback;
