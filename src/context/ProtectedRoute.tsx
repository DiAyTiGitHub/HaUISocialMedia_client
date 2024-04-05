import { PropsWithChildren, useEffect } from "react";
import { useAuth } from "./AuthProvider";
import { Navigate, Outlet, useNavigate } from "react-router-dom";

type ProtectedRouteProps = PropsWithChildren;

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { currentUser, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) navigate("/login", { replace: true });
  }, [navigate, currentUser]);

  return <Outlet />;
};

export default ProtectedRoute;
