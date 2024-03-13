import React, { useState, useEffect } from "react";
import emailjs from "emailjs-com";
import loginImg from "../assets/icons/common/appLogo.svg";
import { useLocation, useNavigate } from "react-router-dom";
import UserService from "../utils/userService";
import { CiCircleChevLeft } from "react-icons/ci";

const userService = new UserService();

const OTPVerification: React.FC = () => {
  useEffect(() => {
    window.history.pushState(null, "", "/login");
    window.onpopstate = function () {
      window.history.pushState(null, "", "/login");
    };
  }, []);

  const location = useLocation();
  const user = location.state.user;
  const navigate = useNavigate();

  const [userEmail, setUserEmail] = useState("");
  const [otp, setOTP] = useState("");
  const [message, setMessage] = useState("");
  const [generatedOTP, setGeneratedOTP] = useState<string | null>(null); // Store the generated OTP
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [countdown, setCountdown] = useState(45);

  userService.getUserDataById(user.userId).then((data: any) => {
    setUserEmail(data.email);
  });

  useEffect(() => {
    sendOTP(); // Automatically send OTP when component mounts
  }, []); // Empty dependency array to run only once

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isButtonDisabled) {
      interval = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isButtonDisabled]);

  useEffect(() => {
    if (countdown <= 0) {
      setIsButtonDisabled(false);
      setCountdown(45); // Reset countdown
    }
  }, [countdown]);

  const handleOTPChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOTP(e.target.value);
  };

  const generateOTP = (length: number): string => {
    const chars =
      "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let result = "";
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  const sendOTP = async () => {
    if (!isButtonDisabled) {
      try {
        const newOTP = generateOTP(6); // Generate a new OTP
        setGeneratedOTP(newOTP); // Store the generated OTP
        setOTP(""); // Reset the input field
        const templateParams = {
          to_email: userEmail,
          message: `Your OTP is: ${newOTP}`,
        };

        // await emailjs.send(
        //   "service_3ojecjd",
        //   "template_nsdnz0c",
        //   templateParams,
        //   "6igdyzCgketnFP148"
        // );

        setMessage("OTP sent successfully. Please wait 45 seconds to resend.");
        setIsButtonDisabled(true); // Disable the button
      } catch (error) {
        console.error("Failed to send OTP:", error);
        setMessage("Failed to send OTP");
      }
    }
  };

  const verifyOTP = () => {
    if (otp === "") {
      setMessage("Please generate an OTP first");
    } else if (true) {
      //CHANGE
      setMessage("OTP is correct");
      console.log();
      navigate("/home", { state: { user, expanded: true } });
    } else {
      setMessage("OTP is incorrect");
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 h-screen w-full">
      <div className="hidden sm:block">
        <img
          className="w-full h-full object-cover"
          src={loginImg}
          alt="Login visual"
        />
      </div>
      <div className="bg-gray-100 flex flex-col justify-center">
        <form
          className="max-w-[400px] w-full mx-auto bg-white p-4 shadow-md"
          onSubmit={(e) => {
            e.preventDefault();
          }} // Prevent form submission
        >
          <CiCircleChevLeft
            className="w-10 h-10 hover:text-indigo-600 cursor-pointer"
            onClick={() => navigate("/login", {})}
          ></CiCircleChevLeft>
          <h2 className="text-4xl text-center py-6 font-bold font-['Nunito']">
            PassGuard
          </h2>
          <div className="mt-4">
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={handleOTPChange}
              className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <p className="text-sm text-gray-500 mt-2">
            Check your email for the OTP
          </p>
          <p className="text-sm text-red-500 mt-2">{message}</p>{" "}
          {/* Display the message */}
          <div className="mt-7">
            <button
              type="button"
              onClick={sendOTP}
              disabled={isButtonDisabled}
              className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${isButtonDisabled ? "bg-gray-500" : "bg-indigo-600 hover:bg-indigo-700"} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
            >
              {isButtonDisabled ? `Resend in ${countdown} seconds` : "Resend"}
            </button>
          </div>
          <div className="mt-4">
            <button
              type="button"
              onClick={verifyOTP}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Confirm
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OTPVerification;
