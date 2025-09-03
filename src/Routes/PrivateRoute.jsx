import React, { use } from "react";
import { Navigate, useLocation } from "react-router";
import { AuthContext } from "../Context/AuthContext/AuthContext";

const PrivateRoute = ({ children }) => {
  const location = useLocation();
  const { user, loading } = use(AuthContext);
  if (loading) {
    return <span className="loading loading-infinity loading-xl"></span>;
  }

  if (!user) {
    return <Navigate to="/register" state={location.pathname}></Navigate>;
  }
  return children;
};

export default PrivateRoute;
