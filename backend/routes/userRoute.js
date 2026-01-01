import express from 'express';
import { adminLogin, loginUser, registerUser , verifyEmail } from '../controllers/userController.js';

const userRouter = express.Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.post('/admin', adminLogin);
userRouter.get("/verify-email/:token", verifyEmail);



export default userRouter;