import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

export const protect = async(req, res, next) =>{
  try {
    const token = req.cookies.jwt;
    if(!token){
      return res.status(401).json({code: 0,message: "Not authenticated"});
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if(!decoded){
      return res.status(401).json({code: 0,message: "Not authenticated"});
    }
    const user = await User.findById(decoded.userId).select("-password");
    if(!user){
      return res.status(401).json({code: 0,message: "Not authenticated"});
    }
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({code: 0,message: error.message});
  }
}