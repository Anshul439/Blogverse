import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";
import CreatePost from "../pages/CreatePost";

export const OnlyAdminPrivateRoute = () => {
  const { currentUser } = useSelector((state) => state.user);
  return currentUser && currentUser.isAdmin ? (
    <Outlet />
  ) : (
    <Navigate to="/sign-in" />
  );
};
