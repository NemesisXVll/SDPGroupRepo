import React, { useState, useEffect } from "react";
import emailjs from "emailjs-com";
import loginImg from "../assets/icons/common/appLogo.svg";
import { useLocation, useNavigate } from "react-router-dom";
import UserService from "../utils/userService";
import InputOTP from "./EmailOTP/InputOTP";
import { CiCircleChevLeft } from "react-icons/ci";

const userService = new UserService();

const OTPVerification: React.FC = () => {
  const location = useLocation();
  const user = location.state.user;
  const navigate = useNavigate();

  const [userEmail, setUserEmail] = useState("");
	const [userName, setUserName] = useState("");
  const [otp, setOTP] = useState("");
  const [message, setMessage] = useState("");
  const [generatedOTP, setGeneratedOTP] = useState<string | null>(null); // Store the generated OTP
  const [disabled, setDisabled] = useState(false);
  const [OTPSent, setOTPSent] = useState(false);
  const [timer, setTimer] = useState(0);

	useEffect(() => {
		window.history.pushState(null, "", "/login");
		window.onpopstate = function () {
			window.history.pushState(null, "", "/login");
		};
	}, []);
	useEffect(() => {
		if(userEmail && userName)
		sendOTP(); // Automatically send OTP when component mounts
	}, [OTPSent, userEmail]); // Empty dependency array to run only once

  const generateOTP = (): string => {
    const randomValues = new Uint8Array(6); // 6 bytes for 6 digits

    // Populate the array with random values
    crypto.getRandomValues(randomValues);

    // Map the random values to digits (0-9)
    const otp = randomValues.map((value) => value % 10).join("");

		return otp;
	};
	userService.getUserDataById(user.userId).then((data: any) => {
		setUserEmail(data.email);
		setUserName(data.firstName);
	});

	const sendOTP = async () => {
		try {
			if (disabled) {
				return;
			}
			const interval = setInterval(() => {
				setTimer((prevTimer) => {
					if (prevTimer > 0) {
						return prevTimer - 1;
					} else {
						clearInterval(interval);
						setDisabled(false);
						return 0;
					}
				});
			}, 1000);
			setTimer(60);
			setDisabled(true);
			const newOTP = generateOTP(); // Generate a new OTP
			setGeneratedOTP(newOTP); // Store the generated OTP
			console.log("NEW OTP GEN:", newOTP);
			setOTP(""); // Reset the input field
			const templateParams = {
				to_name: userName,
				to_email: userEmail,
				message: newOTP,
			};

      // await emailjs.send(
      //   "service_3ojecjd",
      //   "template_nsdnz0c",
      //   templateParams,
      //   "6igdyzCgketnFP148"
      // );
    } catch (error) {
      console.error("Failed to send OTP:", error);
      setMessage("Failed to send OTP");
    }
  };

  const verifyOTP = (enteredOTP: any) => {
    console.log("VERIFYING OTP");
    if (enteredOTP == generatedOTP) {
      //CHANGE
      console.log("OTP is correct");
      setMessage("OTP is correct");
      navigate("/home", { state: { user, expanded: true } });
    } else {
      console.log("OTP is incorrect");
      setMessage("Wrong OTP entered");
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
						className="w-8 h-8 hover:text-indigo-600 cursor-pointer"
						onClick={() => navigate("/login", {})}
					></CiCircleChevLeft>
					<div className="flex items-center justify-center">
						<h2 className="text-4xl text-center pl-2 py-2 font-bold font-nunito">
							🔑 OTP&nbsp;
						</h2>
						<h2 className="text-4xl text-center py-2 font-bold font-nunito text-yellow-400">
							Verification&nbsp;
						</h2>
					</div>
					<div className="bg-green-400 h-10 flex justify-center items-center shadow-sm rounded-md">
						<p className="text-sm text-center">
							We've sent a verification code to {userEmail}
						</p>
					</div>
					<InputOTP onOtpChange={(otp) => verifyOTP(otp)} />
					{message && <p className="text-red-500 text-center">{message}</p>}
					<p className="text-sm  mt-2 text-center">Didn't receive OTP code?</p>
					<div className="text-center">
						<a
							className={`text-sm text-indigo-600 hover:underline cursor-pointer ${disabled ? "opacity-50 cursor-wait hover:no-underline" : ""}`}
							onClick={sendOTP}
						>
							{disabled ? `Resend in ${timer} seconds` : "Resend OTP"}
						</a>
					</div>
				</form>
			</div>
		</div>
	);
};

export default OTPVerification;
