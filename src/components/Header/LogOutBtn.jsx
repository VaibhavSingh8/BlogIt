import React from "react";
import { useDispatch } from "react-redux";
import authService from "../../appwriteBackend/auth";
import { logout } from "../../store/authSlice";

function LogOutBtn() {
  const dispatch = useDispatch();

  const handleLogout = () => {
    authService.userLogout().then(() => {
      dispatch(logout());
    });
  };

  return (
    <button className="inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full">
      Logout
    </button>
  );
}

export default LogOutBtn;
