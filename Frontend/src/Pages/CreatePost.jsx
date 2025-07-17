import React, { useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../Context/AuthContext";
import { CATEGORIES } from "../Utils/Categories";
function CreatePost() {
  const {
    title,
    setTitle,
    desc,
    setDesc,
    file,
    setFile,
    uploadingPost,
    setUploadingPost,
    handleFileSelect,
    handlePost,
    category,
    setCategory
  } = useAuth();
  const navigate = useNavigate();



  return (
    <div className="flex min-h-screen flex-col justify-between bg-neutral-50 overflow-x-hidden">
      <div className="flex items-center bg-neutral-50 p-4 pb-2 justify-between">
        <div className="text-[#141414] flex size-12 items-center">
          <IoCloseSharp size={24} onClick={() => navigate("/")} />
        </div>
        <h2 className="text-[#141414] text-lg font-bold flex-1 text-center pr-12">
          New Post
        </h2>
      </div>

      <div className="flex max-w-[480px] flex-wrap gap-4 px-4 py-3">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full rounded-xl bg-[#ededed] h-14 p-4 text-base placeholder:text-neutral-500 text-[#141414] focus:outline-none"
        />
      </div>

      <div className="flex max-w-[480px] flex-wrap gap-4 px-4 py-3">
        <textarea
          placeholder="Description"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          className="w-full rounded-xl bg-[#ededed] min-h-36 p-4 text-base placeholder:text-neutral-500 text-[#141414] resize-none focus:outline-none"
        ></textarea>
      </div>

      {uploadingPost && (
        <div className="flex justify-center items-center py-4">
          <p className="bg-yellow-100 text-yellow-800 px-4 py-2 rounded-lg shadow-md text-sm font-medium tracking-wide animate-pulse">
            Uploading your post...
          </p>
        </div>
      )}

      <div className="flex flex-col p-4">
        <div className="flex flex-col items-center gap-6 rounded-xl border-2 border-dashed border-[#dbdbdb] px-6 py-14">
          <div className="text-center">
            <p className="text-[#141414] text-lg font-bold">
              Drag and drop or browse
            </p>
            <p className="text-[#141414] text-sm">Upload images or videos</p>
          </div>

          <label className="cursor-pointer bg-[#ededed] text-[#141414] font-bold px-4 py-2 rounded-xl">
            Browse
            <input
              type="file"
              multiple
              accept="image/*,video/*"
              onChange={handleFileSelect}
              className="hidden"
            />
          </label>

          {file?.length > 0 && (
            <div className="mt-2 w-full text-sm text-[#141414]">
              <p className="font-semibold mb-1">Selected Files:</p>
              <ul className="list-disc list-inside space-y-1">
                {file.map((f, idx) => (
                  <li key={idx}>
                    <strong>{f.name}</strong>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      <div className="flex max-w-[480px] px-4 py-3">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full rounded-xl bg-[#ededed] h-14 px-4 text-base text-[#141414] focus:outline-none"
        >
          <option value="" disabled>
            Select category
          </option>
          {CATEGORIES.map((c, i) => (
            <option key={i} value={c.value}>
              {c.label}
            </option>
          ))}
        </select>
      </div>

      <div className="px-4 py-3">
        <button
          onClick={handlePost}
          disabled={uploadingPost}
          className={`w-full h-12 rounded-xl font-bold text-base ${
            uploadingPost
              ? "bg-gray-400 text-white cursor-not-allowed"
              : "bg-black text-neutral-50"
          }`}
        >
          {uploadingPost ? "Please wait..." : "Post"}
        </button>
      </div>

      <div className="h-5 bg-neutral-50"></div>
    </div>
  );
}

export default CreatePost;
