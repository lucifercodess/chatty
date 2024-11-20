import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { Navigate } from "react-router-dom";

export const useAuthStore = create((set) => ({
  authUser: null,
  isCheckingAuth: true,
  isSigningIn: false,
  isLogginIn: false,
  isUpdatingProfile: false,
  onlineUsers:[],

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data });
    } catch (error) {
      console.log(error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },
  signup: async ( data ) => {
    try {
      set({ isSigningIn: true });
      const res = await axiosInstance.post("/auth/register", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      toast.success(res.data.message);
      set({ authUser: res.data });
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    } finally {
      set({ isSigningIn: false });
    }
  },

  login: async(data)=>{
    set({ isLogginIn: true });
    try{
      const res = await axiosInstance.post("/auth/login", data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      toast.success(res.data.message);
      set({ authUser: res.data });
  
    }catch(error){
      toast.error(error.response.data.message);
      console.log(error);
    }finally{
      set({ isLogginIn: false });
    }
  },

  logout: async()=>{
    try {
      const res = await axiosInstance.post("/auth/logout");
      toast.success(res.data.message);
      set({ authUser: null });
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
  }
  ,
  updateProfile: async(data)=>{
    set({isUpdatingProfile: true});
    try {
      const res = await axiosInstance.put("/auth/profile/update",data);
      set({authUser: res.data});
      toast.success(res.data.message);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }finally{
      set({isUpdatingProfile: false});
    }
  }
}));
