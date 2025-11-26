import { Suspense } from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import InitialSusLoading from "../components/Loading/InitialSusLoading";

const RequireAuth = () => {
  const location = useLocation();
  const isAuthenticated = localStorage.getItem("log") === "x";

  if (isAuthenticated === null) {
    return <InitialSusLoading className="h-screen" />;
  }

  if (!isAuthenticated) {
    return (
      <Navigate to="/auth/login" state={{ from: location.pathname }} replace />
    );
  }

  return (
    <Suspense fallback={<InitialSusLoading className="h-screen" />}>
      <Outlet />
    </Suspense>
  );
};
export default RequireAuth;
