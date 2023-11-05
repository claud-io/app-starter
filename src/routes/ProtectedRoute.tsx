import React from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks";

const ProtectedRoute = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();

  React.useEffect(() => {
    if (!user) {
      const params = new URLSearchParams();
      params.set("from", location.pathname);
      navigate("/login");
    }
  }, [location.pathname, navigate, user]);

  if (!user) {
    return null;
  }

  return <Outlet />;
};

export default ProtectedRoute;
