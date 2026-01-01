import { useState, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { ShopContext } from "../context/ShopContext";

const ForgotPassword = () => {

    const { backendURL, navigate } = useContext(ShopContext)
    const [email, setEmail] = useState("");
    const [step, setStep] = useState(1);
    const [otp, setOtp] = useState("");
    const [password, setPassword] = useState("");

    const sendOtp = async () => {
        const res = await axios.post(
            backendURL + "/api/user/forgot-password-otp",
            { email }
        );

        if (res.data.success) {
            toast.success(res.data.message);
            setStep(2);
        } else {
            toast.error(res.data.message);
        }
    };

    const resetPassword = async () => {
        const res = await axios.post(
            backendURL + "/api/user/reset-password-otp",
            { email, otp, password }
        );

        if (res.data.success) {
            toast.success("Password reset successful");
            navigate("/login")
        } else {
            toast.error(res.data.message);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6">
                {/* header */}
                <h2 className="text-2xl font-semibold text-center text-gray-800 mb-2">
                    {step === 1 ? "Forgot Password" : "Reset Password"}
                </h2>
                <p className="text-sm text-center text-gray-500 mb-6">
                    {step === 1
                        ? "Enter your registered email to receive an OTP"
                        : "Enter OTP and set a new password"}
                </p>

                {/* STEP 1 */}
                {step === 1 && (
                    <div className="space-y-4">
                        <input
                            type="email"
                            placeholder="Email address"
                            className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-black"
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <button
                            onClick={sendOtp}
                            className="w-full bg-black text-white py-2 rounded-lg font-medium hover:bg-gray-800 transition"
                        >
                            Send OTP
                        </button>
                    </div>
                )}

                {/* STEP 2 */}
                {step === 2 && (
                    <div className="space-y-4">
                        <input
                            type="text"
                            placeholder="Enter OTP"
                            className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-black"
                            onChange={(e) => setOtp(e.target.value)}
                        />

                        <input
                            type="password"
                            placeholder="New Password"
                            className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-black"
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <button
                            onClick={resetPassword}
                            className="w-full bg-black text-white py-2 rounded-lg font-medium hover:bg-gray-800 transition"
                        >
                            Reset Password
                        </button>
                    </div>
                )}

                {/* Footer */}
                <p className="text-center text-sm text-gray-500 mt-6">
                    Remember your password?{" "}
                    <span
                        onClick={() => navigate("/login")}
                        className="text-black font-medium cursor-pointer hover:underline"
                    >
                        Login
                    </span>
                </p>
            </div>
        </div>
    );
};

export default ForgotPassword;
