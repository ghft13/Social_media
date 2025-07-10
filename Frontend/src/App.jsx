import react from "react";
import "./index.css";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Profile from "./Pages/Profile";
import PrivateRoute from "./Components/PrivateRoute";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./Context/AuthContext";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CreatePost from "./Pages/CreatePost";

function App() {
  return (
    <>
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Signup />}></Route>
            <Route path="/Login" element={<Login />}></Route>
            <Route path="/About" element={<About />}></Route>
            <Route path="/Profile" element={<Profile />}></Route>
            <Route path="/CreatePost" element={<CreatePost />}></Route>
            <Route
              path="/home"
              element={
                <PrivateRoute>
                  <Home />
                </PrivateRoute>
              }
            ></Route>
          </Routes>
        </AuthProvider>
      </Router>

      <ToastContainer position="top-center" autoClose={2000} />
    </>
  );
}

export default App;
