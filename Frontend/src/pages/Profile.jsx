import React, { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { BiCamera } from "react-icons/bi";

const Profile = () => {
  const { updateProfile, isUpdatingProfile, authUser } = useAuthStore();
  const [selectedImage,setSelectedImage] = useState(null);
  const handleImage = async (e) => {

    const file = e.target.files[0];
    if(!file){
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async() => {
      setSelectedImage(reader.result);
      await updateProfile({ profilePic: reader.result });
    };
    
   
  };

  return (
    <div className="flex flex-col items-center justify-center mt-10 p-6  shadow-lg rounded-xl bg-gray-800 w-[600px] mx-auto">
      {/* Profile Header */}
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-white">Profile</h1>
        <h2 className="text-sm text-gray-500">Your Profile Information</h2>
      </div>

      {/* Profile Picture */}
      <div className="relative">
        <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-gray-300 shadow-md">
          <img
            src={selectedImage || authUser?.profilePic || ""}
            alt="Profile"
            className="object-cover w-full h-full"
          />
        </div>
        {/* Camera Icon */}
        <label className="absolute bottom-2 right-2 bg-purple-500 p-2 rounded-full shadow-md cursor-pointer hover:bg-purple-600 transition">
          <BiCamera className="text-white text-xl" />
          <input
            type="file"
            onChange={handleImage}
            className="hidden"
          />
        </label>
      </div>
      <p className="text-sm text-gray-500 mt-3">
        Click on the camera to upload a new profile picture
      </p>

      {/* Profile Details */}
      <div className="mt-8 w-full space-y-6">
        {/* Full Name */}
        <div>
          <label className="block text-sm font-medium text-white">
            Full Name
          </label>
          <input
            type="text"
            value={authUser?.fullName || ""}
            disabled
            className="mt-1 block w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-purple-200 outline-none"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-white">
            Email
          </label>
          <input
            type="text"
            value={authUser?.email || ""}
            disabled
            className="mt-1 block w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-purple-200 outline-none"
          />
        </div>
      </div>

      {/* Account Information */}
      <div className="mt-10 w-full bg-gray-100 p-4 rounded-lg shadow-md">
        <h2 className="text-gray-800 font-semibold mb-4">Account Information</h2>
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Member since:</span>
          <span className="font-medium text-gray-800">
            {authUser?.createdAt || "N/A"}
          </span>
        </div>
        <div className="flex justify-between text-sm mt-2">
          <span className="text-gray-500">Status:</span>
          <span className="font-medium text-green-600">Active</span>
        </div>
      </div>
    </div>
  );
};

export default Profile;
