import React from "react";
import { useAuthStore } from "../store/useAuthStore";
import { FiSettings } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";
import { BiLogOut } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import Chat from "../assets/chat.gif";

const Navbar = () => {
  const { authUser, logout } = useAuthStore();
  const navigate = useNavigate("");
  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-gray-800 shadow-md">
      {/* Logo Section */}
      <div className="flex items-center space-x-3">
        <Link to = "/">
        <img src={Chat} alt="Logo" className="h-10 w-10 object-cover" />
        </Link>
        <h1 className="text-lg font-bold text-white">hocrux</h1>
      </div>

      {/* Right Section */}
      <div className="flex items-center space-x-6">
        {authUser ? (
          <div className="flex gap-4">
            <Link to ="/profile">
            <CgProfile className="text-2xl text-gray-600 cursor-pointer hover:text-gray-100 transition" />
            </Link>
            
            <Link to ="/settings">
            <FiSettings className="text-2xl text-gray-600 cursor-pointer hover:text-gray-100 transition" />
            </Link>

            <BiLogOut
              className="text-2xl text-gray-600 cursor-pointer hover:text-red-600 transition"
              onClick={logout}
            />
          </div>
        ) : (
          <FiSettings className="text-2xl text-gray-600 cursor-pointer hover:text-gray-100 transition" />
        )}
      </div>
    </nav>
  );
};

export default Navbar;
