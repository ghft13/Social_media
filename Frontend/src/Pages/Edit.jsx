import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate} from "react-router-dom";
function Edit() {
  const [activeField, setActiveField] = useState(null); // 'username', 'email', 'password'
  const [username, setUsername] = useState("");
  const [previousEmail, setPreviousEmail] = useState("");
  const [email, setEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const navigate=useNavigate()

  const Backend_URL = import.meta.env.VITE_BACKEND_URL;
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {};
    if (activeField === "username") data.username = username;
    if (activeField === "email")
      (data.previousEmail = previousEmail), (data.email = email);
    if (activeField === "password")
      (data.oldPassword = oldPassword), (data.newPassword = newPassword);

    //console.log("Form submitted:", data);

    try {
      const res = await axios.post(
        `${Backend_URL}/api/user/update-profile`,
        data,
        { withCredentials: true }
      );
      toast.success(res.data.message || "Updated successfully");

      // Reset state and form
      setUsername("");
      setPreviousEmail("");
      setEmail("");
      setOldPassword("");
      setNewPassword("");
      setActiveField(null);
    } catch (err) {
      const errorMsg =
        err.response?.data?.error ||
        err.response?.data?.message ||
        "Something went wrong. Try again.";
      toast.error(errorMsg);
    }
  };

  return (
    <div className="max-w-md mx-auto px-6 bg-white shadow-md rounded-md mt-10">
      <div className="mb-10">
        <FaArrowLeftLong
          className="text-2xl cursor-pointer text-gray-700 hover:text-blue-500 transition-colors duration-200 hover:scale-110 transform"
          onClick={() => navigate("/Profile")}
        />
      </div>
      <h2 className="text-2xl font-bold mb-6 text-center">Edit Profile</h2>

      <div className="flex flex-col gap-4 mb-6">
        <button
          className="text-left bg-gray-100 hover:bg-gray-200 p-2 rounded"
          onClick={() => setActiveField("username")}
        >
          Change Username
        </button>
        <button
          className="text-left bg-gray-100 hover:bg-gray-200 p-2 rounded"
          onClick={() => setActiveField("email")}
        >
          Change Email
        </button>
        <button
          className="text-left bg-gray-100 hover:bg-gray-200 p-2 rounded"
          onClick={() => setActiveField("password")}
        >
          Change Password
        </button>
      </div>

      {activeField && (
        <form onSubmit={handleSubmit} className="space-y-4">
          {activeField === "username" && (
            <div>
              <label className="block text-sm font-medium mb-1">
                New Username
              </label>
              <input
                type="text"
                className="w-full border border-gray-300 px-3 py-2 rounded"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter new username"
              />
            </div>
          )}

          {activeField === "email" && (
            <>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Previous Email
                </label>
                <input
                  type="email"
                  className="w-full border border-gray-300 px-3 py-2 rounded"
                  value={previousEmail}
                  onChange={(e) => setPreviousEmail(e.target.value)}
                  placeholder="Enter previous email"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  New Email
                </label>
                <input
                  type="email"
                  className="w-full border border-gray-300 px-3 py-2 rounded"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter new email"
                />
              </div>
            </>
          )}

          {activeField === "password" && (
            <>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Old Password
                </label>
                <input
                  type="password"
                  className="w-full border border-gray-300 px-3 py-2 rounded"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  placeholder="Enter old password"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  New Password
                </label>
                <input
                  type="password"
                  className="w-full border border-gray-300 px-3 py-2 rounded"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new password"
                />
              </div>
            </>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Save Changes
          </button>
        </form>
      )}
    </div>
  );
}

export default Edit;
