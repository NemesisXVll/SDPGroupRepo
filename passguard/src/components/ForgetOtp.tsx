import React, { useState, useEffect } from "react";
// import emailjs from 'emailjs-com';
import loginImg from "../assets/icons/common/appLogo.svg";
import { useNavigate } from "react-router-dom";

const ForgetOTP: React.FC = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [otp, setOTP] = useState("");
  const [message, setMessage] = useState("");
  const [generatedOTP, setGeneratedOTP] = useState<string | null>(null); // Store the generated OTP

  // useEffect(() => {
  //   sendOTP(); // Automatically send OTP when component mounts
  // }, []); // Empty dependency array to run only once

  const handleOTPChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOTP(e.target.value);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  // add logic to check if email is available or not

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
    try {
      const newOTP = generateOTP(6); // Generate a new OTP
      setGeneratedOTP(newOTP); // Store the generated OTP
      setOTP(""); // Reset the input field
      const templateParams = {
        to_email: email, // Use the entered email
        message: `Your OTP is: ${newOTP}`,
      };

      // await emailjs.send('service_3ojecjd', 'template_nsdnz0c', templateParams, '6igdyzCgketnFP148');

      setMessage("OTP sent successfully");
    } catch (error) {
      console.error("Failed to send OTP:", error);
      setMessage("Failed to send OTP");
    }
  };

  const verifyOTP = () => {
    if (otp === "") {
      setMessage("Please generate an OTP first");
    } else if (true) {
      //CHANGE
      // Compare the entered OTP with the generated OTP
      setMessage("OTP is correct");
      navigate("/reset-password", { replace: true, state: { email } });
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
          <h2 className="text-4xl text-center py-6 font-bold font-['Nunito']">
            PassGuard
          </h2>
          <div className="mt-4">
            <input
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={handleEmailChange}
              className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
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
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Send
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

export default ForgetOTP;
