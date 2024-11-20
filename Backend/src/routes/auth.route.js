import express from 'express';
import { checkAuth, login, logout, register, updateProfile } from '../controllers/auth.controller.js';
import { protect } from '../middlewares/protect.middleware.js';



const router = express.Router();


router.post('/register',register)
router.post('/login',login)
router.post('/logout',logout)
router.put('/profile/update',protect,updateProfile)
router.get('/check',protect,checkAuth);

export default router;