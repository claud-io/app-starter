import React from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../provider/AuthProvider";

const ProtectedRoot = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();

  React.useEffect(() => {
    if (!user) {
      let params = new URLSearchParams();
      params.set("from", location.pathname);
      navigate("/login");
    }
  }, [user]);

  if (!user) {
    return null;
  }

  return <Outlet />;
};

export default ProtectedRoot;
