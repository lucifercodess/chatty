import React, { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Link } from "react-router-dom";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({

    email: "",
    password: "",
  });
  const { isLogginIn, login } = useAuthStore();

  const handleSubmit = (e) => {
    e.preventDefault();

    login(formData);
  };
  const showPass = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-slate-300 via-slate-500 to-slate-700 p-6">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-8 animate-fadeIn">
        <h1 className="text-2xl font-bold text-center text-gray-800">
         Login
        </h1>
        <p className="text-center text-gray-500 mt-2"></p>

        <form className="mt-6 space-y-5" onSubmit={handleSubmit}>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) => {
                setFormData({ ...formData, email: e.target.value });
              }}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-gray-700 bg-gray-100 focus:ring-2 focus:ring-purple-200 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="relative mt-1">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Create a password"
                value={formData.password}
                onChange={(e) => {
                  setFormData({ ...formData, password: e.target.value });
                }}
                className="block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-gray-700 bg-gray-100 focus:ring-2 focus:ring-purple-200 outline-none pr-16"
              />
              <button
                type="button"
                onClick={showPass}
                className="absolute inset-y-0 right-2 flex items-center px-3 text-sm font-medium text-purple-500 hover:text-purple-700 focus:outline-none"
              >
                {showPassword ? "show" : "hide"}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 text-white bg-slate-600 hover:bg-slate-900 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300"
          >
            Sign Up
          </button>
        </form>

        <p className="mt-4 text-sm text-center text-gray-500">
          Don't have an account?{" "}
          <Link to={"/register"} className="text-slate-500 hover:underline">
            Register
          </Link>
        </p>
      </div>

      <style>
        {`
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .animate-fadeIn {
            animation: fadeIn 0.8s ease-out;
          }
        `}
      </style>
    </div>
  );
};

export default Register;
