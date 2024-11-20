import express from 'express';
import authRoutes from './routes/auth.route.js'
import messageRoute from './routes/message.route.js'
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { connectDb } from './config/db.config.js';
import bodyParser from 'body-parser';


const app = express();
dotenv.config();


app.use(cors({
  credentials: true,
  origin: ['http://localhost:5173'] 
}))
app.use(cookieParser({
  httpOnly: true,
  credentials: true,
}))
app.use(express.json())
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));



app.use("/api/auth",authRoutes)
app.use("/api/message",messageRoute)

app.listen(process.env.PORT,()=>{
  connectDb();
  console.log(`app is running on port ${process.env.PORT}`)
})