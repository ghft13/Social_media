import React, { useEffect, useState } from "react";
import { IoMenu, IoCloseCircleSharp } from "react-icons/io5";
import { FaHome, FaUser, FaSearch, FaPlus } from "react-icons/fa";
import { useAuth } from "../Context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import PostCard from "../Components/PostCard"; // ✅ Make sure this exists

function Home() {
  const {
    menuRef,
    cancelRef,
    menuiconRef,
    showmenu,
    hideMenu,
    HandleLogout,
    uploads,
    setUploads,
    getAllPost,
    currentUser,
    homeRef,
  } = useAuth();
  const navigate = useNavigate();
  const userId = currentUser?.userId;

  useEffect(() => {
    getAllPost();
  }, []);


  return (
    <>
      <div
        className="home h-screen w-screen px-2 py-2 overflow-y-auto"
        ref={homeRef}
      >
        {/* Top bar */}
        <div className="flex justify-between items-center relative">
          <h1 className="text-2xl font-bold">ChillPlay</h1>
          <IoMenu ref={menuiconRef} className="text-2xl" onClick={showmenu} />
          <IoCloseCircleSharp
            ref={cancelRef}
            onClick={hideMenu}
            className="text-3xl absolute right-0 hidden cursor-pointer z-50"
          />
        </div>

        <div className="border-t border-[#e7edf3] bg-slate-50 px-4 pt-2 pb-3 flex justify-between text-sm font-medium">
          <div className="flex flex-col items-center text-black">
            <FaHome />
            <span>Home</span>
          </div>

          <div
            className="flex flex-col items-center text-gray-500"
            onClick={() => navigate("/profile")}
          >
            <FaUser />
            <span>User</span>
          </div>

          <div className="flex flex-col items-center text-gray-500">
            <FaSearch />
            <span>Explore</span>
          </div>
        </div>

        <div
          ref={menuRef}
          className="flex hidden justify-center items-center relative h-screen -top-20 left-[110%]"
        >
          <div className="bg-black h-[70%] w-[90%] text-white text-xl flex flex-col  justify-between items-start  py-5 rounded-3xl">
            <div className="flex flex-col gap-10 px-5">
              <h1>Explore</h1>
              <Link to="/Profile">Profile</Link>
              <Link to="/About">About</Link>
              <Link to="/createpost">Create Post</Link>
            </div>

            <div className="flex w-full px-5 justify-between">
              <Link onClick={HandleLogout}>Logout</Link>
              <Link onClick={() => navigate("/login")}>LogIn</Link>
            </div>
          </div>
        </div>

        {/* Uploaded posts */}
        <div
          className="w-full mt-10 flex flex-col gap-10 justify-center items-center pb-24 "
          id="scroll-posts"
        >
          {uploads.length > 0 ? (
            uploads.map((item) => (
              <PostCard key={item._id} post={item} userId={userId} />
            ))
          ) : (
            <p className="text-center text-gray-500 mt-20">
              No posts uploaded yet.
            </p>
          )}
        </div>

        {/* Bottom nav */}
        <div className="border-t border-[#e7edf3] bg-slate-50 px-10 pt-2 pb-3 flex justify-between text-[#4e7397] text-sm font-medium fixed bottom-0 left-0 right-0">
          <div className="flex items-center justify-between gap-10 w-full">
            <FaHome className="text-xl" />
            <FaSearch className="text-xl" />
            <FaPlus
              className="text-xl"
              onClick={() => navigate("/CreatePost")}
            />
            <FaUser className="text-xl" onClick={(e) => navigate("/profile")} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
