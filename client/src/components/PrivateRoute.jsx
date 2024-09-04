import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";
import Dashboard from "../pages/Dashboard";

export const PrivateRoute = () => {
  const { currentUser } = useSelector((state) => state.user);
  return currentUser ? <Outlet/> : <Navigate to="/sign-in" />;
};
