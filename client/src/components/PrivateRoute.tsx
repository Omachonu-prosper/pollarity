import React from "react";
import { Navigate, Outlet, useLocation } from "react-router";

function PrivateRoute({ isAuthenticated }: { isAuthenticated: boolean }) {
  const location = useLocation();

  if (!isAuthenticated)
    return <Navigate to="/login" state={{ from: location }} />;

  return <Outlet />;
}

export default PrivateRoute;
