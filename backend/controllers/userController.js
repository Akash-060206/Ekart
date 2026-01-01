import crypto from "crypto";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import validator from 'validator';
import userModel from "../models/userModel.js";
import sendEmail from "../utils/sendEmail.js";


const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET)
}


//Route for user login
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email })

        if (!user) {
            return res.json({ success: false, message: "User does not exists" })
        }

        if (!user.isVerified) {
            return res.json({ success: false, message: "Please verify your email first" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.json({ success: false, message: "Invalid credentials" });
        }

        const token = createToken(user._id);
        return res.json({ success: true, token });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })

    }
}


//Route for user register

const registerUser = async (req, res) => {
    try {

        const { name, email, password } = req.body;

        //checkig user already exist or not
        const exists = await userModel.findOne({ email })
        if (exists) {
            return res.json({ success: false, message: "User Already exists" })

        }

        //Validation for email and strong password
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email" })
        }
        if (password.length < 8) {
            return res.json({ success: false, message: "Please enter a strong password" })
        }
        //Hashing user password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        // generate verification token
        const verificationToken = crypto.randomBytes(32).toString("hex");

        // Registering the user in the database with hashed password
        const newUser = new userModel({
            name,
            email,
            password: hashedPassword,
            isVerified: false,
            emailVerificationToken: verificationToken,
            emailVerificationExpires: Date.now() + 24 * 60 * 60 * 1000
        })
        const user = await newUser.save()

        // send verification email
        const verifyLink = `${process.env.FRONTEND_URL}/verify-email/${verificationToken}`;

        await sendEmail({
            to: email,
            subject: "Verify your email",
            text: `Click this link to verify your email: ${verifyLink}`
        });

        res.json({
            success: true,
            message: "Verification email sent. Please check your inbox."
        });

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

const verifyEmail = async (req, res) => {
    try {
        const { token } = req.params;

        const user = await userModel.findOne({
            emailVerificationToken: token,
            emailVerificationExpires: { $gt: Date.now() }
        });

        if (!user) {
            return res.json({ success: false, message: "Invalid or expired link" });
        }

        user.isVerified = true;
        user.emailVerificationToken = undefined;
        user.emailVerificationExpires = undefined;

        await user.save();

        res.json({ success: true, message: "Email verified successfully" });

    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};


// Route for sending OTP

const forgotPasswordOtp = async (req, res) => {
    try {
        const { email } = req.body;

        const user = await userModel.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }

        // Prevent spamming
        if (user.resetOtpExpire && user.resetOtpExpire > Date.now()) {
            return res.json({ success: false, message: "OTP already sent. Please wait.", });
        }

        // Generate 6-digit OTP
        const otp = crypto.randomInt(100000, 999999).toString();

        // Hash OTP
        user.resetOtp = crypto
            .createHash("sha256")
            .update(otp)
            .digest("hex");

        user.resetOtpExpire = Date.now() + 10 * 60 * 1000; // 10 minutes

        await user.save();

        await sendEmail({
            to: user.email,
            subject: "Password Reset OTP",
            text: `Your OTP is ${otp}. It is valid for 10 minutes.`,
        });

        res.json({ success: true, message: "OTP sent successfully" });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};


//  Route for verifying OTP & Reset PASSWORD
const resetPasswordOtp = async (req, res) => {
    try {
        const { email, otp, password } = req.body;

        const hashedOtp = crypto
            .createHash("sha256")
            .update(otp)
            .digest("hex");

        const user = await userModel.findOne({
            email,
            resetOtp: hashedOtp,
            resetOtpExpire: { $gt: Date.now() },
        });

        if (!user) {
            return res.json({
                success: false,
                message: "Invalid or expired OTP",
            });
        }

        const salt = await bcrypt.genSalt(10)
        user.password = await bcrypt.hash(password, salt);
        user.resetOtp = undefined;
        user.resetOtpExpire = undefined;

        await user.save();

        res.json({
            success: true,
            message: "Password reset successful",
        });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};



//Route for admin login

const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body
        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(email + password, process.env.JWT_SECRET);
            res.json({ success: true, token })
        }
        else {
            res.json({ success: false, message: "Invalid Credentials" })
        }
    } catch (error) {

    }
}


export { adminLogin, loginUser, registerUser, verifyEmail, forgotPasswordOtp, resetPasswordOtp };