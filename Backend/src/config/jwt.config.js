import jwt from 'jsonwebtoken';


export const genTokenAndSetCookie = async(userId,res)=>{
  try {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '3d' });
    res.cookie('jwt', token, { httpOnly: true, maxAge: 1 * 24 * 60 * 60 * 3600 });
    return token;
  } catch (error) {
    console.error('Error generating token:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
}