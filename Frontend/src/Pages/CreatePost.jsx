import React, { useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function CreatePost() {

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);

  const navigate = useNavigate();
 const Backend_URL = import.meta.env.VITE_BACKEND_URL;

  const handleFileSelect = (e) => {
    setFile(e.target.files[0]);
  };

  const handlePost = async (e) => {
    e.preventDefault();

    if (!file || !title || !desc) {
      alert("Please fill in all required fields and select a file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", title);
    formData.append("desc", desc);

    try {
      const res = await axios.post(
        `${Backend_URL}/api/posts/upload`,
        formData,
        {   withCredentials: true,},
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      console.log(res.data);
      navigate("/home"); // redirect after successful upload
    } catch (err) {
      console.error("Upload failed:", err);
      alert("Upload failed. Please try again.");
    }
  };

  return (
    <div className="flex min-h-screen flex-col justify-between bg-neutral-50 overflow-x-hidden">
      <div className="flex items-center bg-neutral-50 p-4 pb-2 justify-between">
        <div className="text-[#141414] flex size-12 items-center">
          <IoCloseSharp size={24} onClick={() => navigate("/Home")} />
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
              accept="image/*,video/*"
              onChange={handleFileSelect}
              className="hidden"
            />
          </label>

          {file && (
            <p className="text-sm text-[#141414] mt-2">
              Selected: <strong>{file.name}</strong>
            </p>
          )}
        </div>
      </div>

      <div className="px-4 py-3">
        <button
          onClick={handlePost}
          className="w-full h-12 rounded-xl bg-black text-neutral-50 font-bold text-base"
        >
          Post
        </button>
      </div>

      <div className="h-5 bg-neutral-50"></div>
    </div>
  );
}

export default CreatePost;
