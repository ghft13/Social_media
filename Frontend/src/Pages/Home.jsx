

// src/Pages/Home.jsx
import React, { useEffect, useRef } from "react";
import { IoMenu, IoCloseCircleSharp } from "react-icons/io5";
import { FaHome, FaUser, FaSearch, FaPlus } from "react-icons/fa";
import { NavItems } from "../Utils/NavIcons";
import { useAuth } from "../Context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import PostCard from "../Components/PostCard";
import { gsap } from "gsap";

function Home() {
  const navRef = useRef(null);
  const linksRef = useRef([]);
  const buttonsRef = useRef([]);
  const { 
    menuRef,
    cancelRef,
    menuiconRef,
    showmenu,
    hideMenu,
    HandleLogout,
    uploads,
    getAllPost,
    currentUser,
    homeRef,
  } = useAuth();
  const navigate = useNavigate();
  const userId = currentUser?.userId;

  useEffect(() => {
    getAllPost();
  }, [getAllPost]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        navRef.current,
        { opacity: 0, scale: 0.9, y: 50 },
        { opacity: 1, scale: 1, y: 0, duration: 0.8, ease: "power3.out" }
      );
      gsap.fromTo(
        linksRef.current,
        { opacity: 0, x: -30, rotateY: -15 },
        { opacity: 1, x: 0, rotateY: 0, duration: 0.6, stagger: 0.1, delay: 0.3, ease: "power2.out" }
      );
      gsap.fromTo(
        buttonsRef.current,
        { opacity: 0, y: 20, scale: 0.8 },
        { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.1, delay: 0.6, ease: "back.out(1.7)" }
      );
    }, navRef);

    return () => ctx.revert();
  }, []);

  const handleLinkHover = (index, enter) => {
    gsap.to(linksRef.current[index], {
      x: enter ? 10 : 0,
      scale: enter ? 1.05 : 1,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleButtonHover = (index, enter) => {
    gsap.to(buttonsRef.current[index], {
      y: enter ? -2 : 0,
      scale: enter ? 1.1 : 1,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const addToLinksRef = (el) => {
    if (el && !linksRef.current.includes(el)) linksRef.current.push(el);
  };
  const addToButtonsRef = (el) => {
    if (el && !buttonsRef.current.includes(el)) buttonsRef.current.push(el);
  };

  return (
    <div className="home h-screen w-screen px-2 py-2 overflow-y-auto" ref={homeRef}>
      {/* Top bar */}
      <div className="flex justify-between items-center relative">
        <h1 className="text-2xl font-bold">ChillPlay</h1>
        <IoMenu ref={menuiconRef} className="text-2xl" onClick={showmenu} />
        <IoCloseCircleSharp ref={cancelRef} onClick={hideMenu} className="text-3xl absolute right-0 hidden cursor-pointer z-50" />
      </div>

      {/* Main nav icons */}
      <div className="border-t border-[#e7edf3] bg-slate-50 px-4 pt-2 pb-3 flex justify-between text-sm font-medium">
        <div className="flex flex-col items-center text-black" onClick={() => navigate('/') }>
          <FaHome />
          <span>Home</span>
        </div>
        <div className="flex flex-col items-center text-gray-500" onClick={() => navigate('/profile')}>
          <FaUser />
          <span>User</span>
        </div>
        <div className="flex flex-col items-center text-gray-500" onClick={() => navigate('/explore')}>
          <FaSearch />
          <span>Explore</span>
        </div>
      </div>

      {/* Sidebar menu */}
      <div ref={menuRef} className="flex hidden justify-center items-center relative h-screen -top-20 left-[110%] w-screen">
        <div className="flex items-center justify-center min-h-screen p-4 w-full">
          <div ref={navRef} className="bg-gradient-to-br from-gray-900 via-black to-gray-800 h-[85vh] w-[110%] max-w-md text-white text-xl flex flex-col justify-between items-start py-8 rounded-3xl shadow-2xl border border-gray-700 backdrop-blur-sm relative overflow-hidden">
            {/* Background decorations omitted for brevity */}

            {/* Navigation Links */}
            <div className="flex flex-col gap-6 px-6 w-full relative z-10">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
                Explore
              </h1>
              {NavItems.map(({ to, text, icon: Icon }, i) => (
                <Link
                  key={i}
                  to={to}
                  ref={addToLinksRef}
                  onMouseEnter={() => handleLinkHover(i, true)}
                  onMouseLeave={() => handleLinkHover(i, false)}
                  className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors duration-300 cursor-pointer group relative"
                >
                  <Icon className="text-lg" />
                  <span className="relative">
                    {text}
                    <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 group-hover:w-full transition-all duration-300"></div>
                  </span>
                </Link>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex w-full px-6 justify-between gap-4 relative z-10">
              <button
                ref={addToButtonsRef}
                onClick={HandleLogout}
                onMouseEnter={() => handleButtonHover(0, true)}
                onMouseLeave={() => handleButtonHover(0, false)}
                className="bg-gradient-to-r from-red-600 to-red-700 text-white px-6 py-3 rounded-full hover:from-red-700 hover:to-red-800 transition-all duration-300 shadow-lg hover:shadow-red-500/25 cursor-pointer font-semibold text-base flex items-center gap-2"
              >
                 Logout
              </button>

              <button
                ref={addToButtonsRef}
                onClick={() => navigate("/login")}
                onMouseEnter={() => handleButtonHover(1, true)}
                onMouseLeave={() => handleButtonHover(1, false)}
                className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-full hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg hover:shadow-blue-500/25 cursor-pointer font-semibold text-base flex items-center gap-2"
              >
                 Login
              </button>
            </div>

            {/* Animated border omitted for brevity */}
          </div>
        </div>
      </div>

      {/* Uploaded posts */}
      <div className="w-full mt-10 flex flex-col gap-10 justify-center items-center pb-24" id="scroll-posts">
        {uploads.length > 0 ? (
          uploads.map((item) => <PostCard key={item._id} post={item} userId={userId} />)
        ) : (
          <p className="text-center text-gray-500 mt-20">No posts uploaded yet.</p>
        )}
      </div>

      {/* Bottom nav */}
      <div className="border-t border-[#e7edf3] bg-slate-50 px-10 pt-2 pb-3 flex justify-between text-[#4e7397] text-sm font-medium fixed bottom-0 left-0 right-0 z-10">
        <div className="flex items-center justify-between gap-10 w-full">
          <FaHome className="text-xl" onClick={() => navigate("/")} />
          <FaSearch className="text-xl" onClick={() => navigate("/explore")} />
          <FaPlus className="text-xl" onClick={() => navigate("/CreatePost")} />
          <FaUser className="text-xl" onClick={() => navigate("/profile")} />
        </div>
      </div>
    </div>
  );
}

export default Home;
