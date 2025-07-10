    import { Navigate } from "react-router-dom";
    import { useAuth } from "../Context/AuthContext";
    import React from "react";
    function PrivateRoute({ children }) {
    const { isAuthenticated,loading } = useAuth();
 
    if (loading) {
        return <div>Loading...</div>; // Or a spinner
    }
    return isAuthenticated ? children :<Navigate to="/login"/>
    }

    export default PrivateRoute;
