import cloudinary from "../config/cloudinary.config.js";
import { genTokenAndSetCookie } from "../config/jwt.config.js";
import User from "../models/user.model.js";
import bcrypt from 'bcrypt';
export const register = async(req,res)=>{
  const {fullName,email,password} = req.body;
  try {
    if(!fullName || !email || !password){
      return res.status(400).json({code: 0,message: "All fields are required"})
    }
    if(password.length < 6){
      return res.status(400).json({code: 0,message: "Password should be at least 6 characters long"})
    }
    const existingUser = await User.findOne({email});
    if(existingUser){
      return res.status(400).json({code: 0,message: "Email already exists"})
    }
    const hashedPass = await bcrypt.hash(password,10)
    const newUser = new User({fullName,email,password:hashedPass});
    if(newUser){
      genTokenAndSetCookie(newUser._id,res);
      await newUser.save();
      res.status(201).json({code: 1,message: "User registered successfully",user:{
        id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        profilePic: newUser.profilePic,
      }})
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({code: 0,msg: "error in register controller"})
  }
}
export const login = async(req,res)=>{
  const {email,password} = req.body;
  try {
    if(!email || !password){
      return res.status(400).json({code: 0,message: "All fields are required"})
    }
    const user = await User.findOne({email});
    if(!user){
      return res.status(400).json({code: 0,message: "Email  is incorrect"})
    }
    const checkPass = await bcrypt.compare(password,user.password);
    if(!checkPass){
      return res.status(400).json({code: 0,message: "Email or password is incorrect"})
    }
    genTokenAndSetCookie(user._id,res);
    res.status(200).json({code: 1,message: "User logged in successfully",user:{
      id: user._id,
      fullName: user.fullName,
      email: user.email,
      profilePic: user.profilePic,
    }})
  } catch (error) {
    console.log(error);
    return res.status(500).json({code: 0,msg: "error in login controller"})
  }
}

export const logout = async(req,res)=>{
  try {
    res.clearCookie('jwt');
    res.status(200).json({code: 1,message: "User logged out successfully"})
  } catch (error) {
    console.log(error);
    return res.status(500).json({code: 0,msg: "error in logout controller"})
  }
}

export const updateProfile = async(req,res)=>{
  const {profilePic} = req.body;
  const userId = req.user._id;
  try {
    if(!profilePic){
      return res.status(400).json({code: 0,message: "Profile picture is required"})
    }
    const updatedProfilePic = await cloudinary.uploader.upload(profilePic);
    const updatedUser = await User.findByIdAndUpdate(userId,{profilePic: updatedProfilePic.secure_url},{new:true});
    res.status(200).json({code: 1,message: "Profile updated successfully",user:{
      id: updatedUser._id,
      fullName: updatedUser.fullName,
      email: updatedUser.email,
      profilePic: updatedUser.profilePic,
    }})
  } catch (error) {
    console.log(error);
    return res.status(500).json({code: 0,msg: "error in update profile controller"})
  }
}

export const checkAuth = async(req,res)=>{
  try {
    res.status(200).json(req.user);
  } catch (error) {
    console.log(error);
    return res.status(500).json({code: 0,msg: "error in checkAuth controller"})
  }
}