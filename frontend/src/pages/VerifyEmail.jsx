import { useParams } from "react-router-dom";
import { useEffect, useContext } from "react";
import axios from "axios";
import { ShopContext } from "../context/ShopContext";
import { toast } from "react-toastify";

const VerifyEmail = () => {
  const { token } = useParams();
  const { navigate, setToken } = useContext(ShopContext);

  useEffect(() => {
    const verify = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/user/verify-email/${token}`
        );

        // Show success message
        toast.success(res.data.message);

        // ENSURE USER IS LOGGED OUT
        localStorage.removeItem("token");
        setToken(null);

        // Small delay so user sees the message
        setTimeout(() => {
          navigate("/login");
        }, 1500);

      } catch (error) {
        toast.error("Verification failed or link expired");

        // redirect anyway
        setTimeout(() => {
          navigate("/login");
        }, 1500);
      }
    };

    verify();
  }, [token, navigate, setToken]);

  return (
    <div className="flex justify-center items-center h-[60vh]">
      <h2 className="text-lg font-medium text-gray-700">
        Verifying your email...
      </h2>
    </div>
  );
};

export default VerifyEmail;

