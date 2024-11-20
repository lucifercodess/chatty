import express from 'express';
import { protect } from '../middlewares/protect.middleware.js';
import { getMessages, getUserForSidebar, sendMessage } from '../controllers/message.controller.js';


const router = express.Router();


router.get('/users',protect,getUserForSidebar);
router.get('/:id',protect,getMessages);
router.post('/send/:id',protect,sendMessage)

export default router;