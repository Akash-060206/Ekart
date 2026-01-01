import express from 'express';
import { adminLogin, loginUser, registerUser , verifyEmail,forgotPasswordOtp, resetPasswordOtp } from '../controllers/userController.js';

const userRouter = express.Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.post('/admin', adminLogin);
userRouter.get("/verify-email/:token", verifyEmail);
userRouter.post("/forgot-password-otp", forgotPasswordOtp);
userRouter.post("/reset-password-otp", resetPasswordOtp);



export default userRouter;