import { useContext, createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useRef } from "react";
import gsap from "gsap";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [email, setemail] = useState("");
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [loginEmail, setloginEmail] = useState("");
  const [loginPassword, setloginPassword] = useState("");
  const [loading, setloading] = useState(true);
  const [isAuthenticated, setisAuthenticated] = useState(false);
  const [category, setCategory] = useState("");
  const [uploads, setUploads] = useState([]);
  const [user, setuser] = useState(() => {
    const storedUser = localStorage.getItem("User");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [currentUser, setcurrentUser] = useState("");
  const [buttonLoading, setButtonLoading] = useState(false);

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const [uploadingPost, setUploadingPost] = useState(false);

  const Backend_URL = import.meta.env.VITE_BACKEND_URL;

  const navigate = useNavigate();
  const menuRef = useRef(null);
  const cancelRef = useRef(null);
  const menuiconRef = useRef(null);
  const homeRef = useRef(null);

  const handlesignup = async () => {
    setButtonLoading(true);
    try {
      const res = await axios.post(
        `${Backend_URL}/api/auth/signup`,
        {
          email,
          username,
          password,
        },
        { withCredentials: true }
      );

      localStorage.setItem("User", JSON.stringify(res.data.user));
      setuser(res.data.user);

      if (res.status == 201) {
        toast.success(res.data.message);
        setemail("");
        setusername("");
        setpassword("");
        await checkAuth();
        navigate("/");
      }
    } catch (err) {
      setButtonLoading(false);
      const errorMessage =
        err.response?.data?.message ||
        "Something went wrong. Please try again.";
      toast.error(errorMessage);
    }
  };

  const handlelogin = async () => {
    try {
      const res = await axios.post(
        `${Backend_URL}/api/auth/login`,
        {
          loginEmail,
          loginPassword,
        },
        { withCredentials: true }
      );
      localStorage.setItem("User", JSON.stringify(res.data.user));
      setuser(res.data.user);

      if (res.status == 200) {
        toast.success(res.data.message);
        setloginEmail("");
        setloginPassword("");
        setisAuthenticated(true);
        await checkAuth();
        navigate("/");
      }
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Login failed. Please try again."
      );
      const errorMessage =
        err.response?.data?.message || "Something went wrong while logging in.";
    }
  };

  const checkAuth = async () => {
    try {
      const res = await axios.get(`${Backend_URL}/api/auth/verify`, {
        withCredentials: true,
      });

      setcurrentUser(res.data.user);

      if (res.data.success) {
        setisAuthenticated(true);
      } else {
        setisAuthenticated(false);
      }
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        "Something went wrong while checking authentication.";
      setisAuthenticated(false);
    } finally {
      setloading(false);
    }
  };

  function showmenu() {
    if (!menuRef.current || !cancelRef.current || !menuiconRef.current) return;

    // Hide scroll on home component
    if (homeRef.current) {
      homeRef.current.classList.add("overflow-hidden");
      homeRef.current.classList.remove("overflow-y-auto");
    }

    menuRef.current.classList.remove("hidden");
    cancelRef.current.classList.remove("hidden");
    menuiconRef.current.classList.add("hidden");

    gsap.to(menuRef.current, {
      duration: 0.5,
      left: "2%",
      ease: "power2.out",
    });
  }

  function hideMenu() {
    if (!menuRef.current || !cancelRef.current || !menuiconRef.current) return;
    //console.log("remove");
    gsap.to(menuRef.current, {
      duration: 0.5,
      left: "110%",
      ease: "power2.in",
      onComplete: () => {
        menuRef.current.classList.add("hidden");

        // Re-enable scroll on home component
        if (homeRef.current) {
          homeRef.current.classList.remove("overflow-hidden");
          homeRef.current.classList.add("overflow-y-auto");
        }
      },
    });

    cancelRef.current.classList.add("hidden");
    menuiconRef.current.classList.remove("hidden");
  }

  async function HandleLogout() {
    try {
      const res = await axios.post(
        `${Backend_URL}/api/auth/logout`,
        {},
        {
          withCredentials: true,
        }
      );

      localStorage.removeItem("User");

      if (res.status == 200) {
        await checkAuth();
        navigate("/login");
      }
    } catch (err) {
      //console.log(err);
    }
  }

  async function getAllPost() {
    try {
      let res = await axios.get(`${Backend_URL}/api/posts/all`);
      if (res.status == 200) {
        setUploads(res.data.uploads);
      }
    } catch (err) {
      //console.log(err);
    }
  }

  const fetchProfileData = async () => {
    try {
      const res = await axios.get(`${Backend_URL}/api/posts/profile-data`, {
        withCredentials: true,
      });
      setuser(res.data.user);
      setUploads(res.data.uploads);
    } catch (err) {
      //console.error("Error fetching profile data:", err);
    }
  };

  const handleFileSelect = (e) => {
    setFile(Array.from(e.target.files)); // ✅ Convert FileList to a regular array
  };

  const handlePost = async (e) => {
    e.preventDefault();

    if (!file || file.length === 0 || !title || !desc || !category) {
      toast.error(
        "Please fill in all required fields and select at least one file."
      );
      return;
    }

    const formData = new FormData();
    file.forEach((f) => formData.append("files", f));

    formData.append("title", title);
    formData.append("desc", desc);
    formData.append("category", category);

    try {
      setUploadingPost(true);

      const res = await axios.post(
        `${Backend_URL}/api/posts/upload`,
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      setTitle("");
      setFile("");
      setDesc("");

      navigate("/");
    } catch (err) {
      if (err.response && err.response.data) {
        const { error, tip, message } = err.response.data;
        if (error) toast.error(error);
        else if (tip) toast.info(tip);
        else if (message) toast.info(message);
      } else {
        toast.error("Upload failed. Please try again.");
      }
    } finally {
      setUploadingPost(false);
    }
  };

  const HandleDeletePost = async (postId) => {
    try {
      const res = await axios.delete(`${Backend_URL}/api/posts/${postId}`, {
        withCredentials: true,
      });
      toast.success(res.data.message);

      fetchProfileData();
    } catch (err) {
      toast.error("Failed to delete post");
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);
  const authvalues = {
    email,
    setemail,
    password,
    setpassword,
    username,
    setusername,
    loginEmail,
    setloginEmail,
    loginPassword,
    setloginPassword,
    handlesignup,
    handlelogin,
    isAuthenticated,
    setisAuthenticated,
    user,
    setuser,
    checkAuth,
    loading,
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
    fetchProfileData,
    buttonLoading,
    setButtonLoading,
    homeRef,
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
    HandleDeletePost,
    category,
    setCategory,
  };

  return (
    <AuthContext.Provider value={authvalues}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
