import react from "react";
import "./index.css";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Profile from "./Pages/Profile";
import PrivateRoute from "./Components/PrivateRoute";
import Terms from "./Pages/Terms";
import Privacy from "./Pages/Privacy";
import Edit from "./Pages/Edit";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./Context/AuthContext";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CreatePost from "./Pages/CreatePost";
import HomeFallback from "./Components/HomeFallback";
import CommunityRules from "./Pages/CommunityRules";

function App() {
  return (
    <>
      <Router>
        <AuthProvider>
          <Routes>
            <Route
              path="/"
              element={
                <PrivateRoute fallback={<HomeFallback />}>
                  <Home />
                </PrivateRoute>
              }
            ></Route>
            <Route path="/Login" element={<Login />}></Route>
            <Route path="/Signup" element={<Signup />}></Route>
            <Route path="/About" element={<About />}></Route>
            <Route path="/Terms" element={<Terms />}></Route>
            <Route path="/Privacy" element={<Privacy />}></Route>
            <Route path="/Community" element={<CommunityRules />}></Route>
            <Route path="/Edit" element={<Edit />}></Route>

            <Route
              path="/Profile"
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              }
            ></Route>

            <Route
              path="/CreatePost"
              element={
                <PrivateRoute>
                  <CreatePost />
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
