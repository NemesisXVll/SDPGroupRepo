import React, { useState } from "react";
import loginImg from "../assets/icons/common/appLogo.svg";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { SignUp } from "../utils/authService";
import { useNavigate } from "react-router-dom";
import LabelInput from "./Form/LabelInput";
import Button from "./Form/Button";
import MPasswdStrength from "./MPasswdStrength";
import { Modal, ModalHeader } from "flowbite-react";
import {FcPrevious} from "react-icons/fc";
import { FaCheckCircle } from "react-icons/fa";

interface State {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  showPassword: boolean;
  showConfirmPassword: boolean;
}

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const [state, setState] = useState<State>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    showPassword: false,
    showConfirmPassword: false,
  });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [openSuccessModal, setOpenSuccessModal] = useState<boolean>(false);

  const togglePasswordVisibility = () => {
    setState((prevState) => ({
      ...prevState,
      showPassword: !prevState.showPassword,
    }));
  };

  const toggleConfirmPasswordVisibility = () => {
    setState((prevState) => ({
      ...prevState,
      showConfirmPassword: !prevState.showConfirmPassword,
    }));
  };

  const handleSignUpClick = async (event: any) => {
    event.preventDefault();
    const state = JSON.parse(
      JSON.stringify(Object.fromEntries(new FormData(event.target).entries()))
    );

    const lettersOnlyRegex = /^[A-Za-z]+$/;
    if (
      !lettersOnlyRegex.test(state.firstName) ||
      !lettersOnlyRegex.test(state.lastName)
    ) {
      setErrorMessage("First and Last Name must contain only letters.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(state.email)) {
      setErrorMessage("Invalid email format.");
      return;
    }

    const passwordRegex =
      /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,}$/;
    if (!passwordRegex.test(state.password)) {
      setErrorMessage(
        "Password must contain at least one uppercase letter, one digit, one special character, and be at least 8 characters long."
      );
      return;
    }

    if (state.password !== state.confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    const signUpResult = SignUp({
      firstName: state.firstName,
      lastName: state.lastName,
      email: state.email,
      masterPassword: state.password,
      confirmPassword: state.confirmPassword,
      salt: "",
      picture: "",
    });

    if (await signUpResult) {
      setOpenSuccessModal(true);
    } else {
      setErrorMessage("Sign up failed. Please try again.");
    }
  };

  const {
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
    showPassword,
    showConfirmPassword,
  } = state;

  function handleLoginClick(): void {
    navigate("/login", { replace: true });
  }

  function handleOnChange(event: any): void {}

  return (
		<div className="grid grid-cols-1 sm:grid-cols-2 h-screen w-full overflow-hidden">
			<div className="hidden sm:block">
				<img
					className="w-full h-full object-cover"
					src={loginImg}
					alt="Signup visual"
				/>
			</div>
			<div className="bg-gray-100 flex flex-col justify-center">
				<form
					className="max-w-[400px] min-w-[400px] w-full mx-auto bg-white p-4 shadow-md"
					onSubmit={handleSignUpClick}
				>
					<CiCircleChevLeft
						className="w-8 h-8 hover:text-indigo-600 cursor-pointer"
						onClick={() => navigate("/login", {})}
					></CiCircleChevLeft>
					<div className="flex items-center justify-center">
						<h2 className="text-4xl text-center py-2 font-bold font-nunito">
							📝 Sign
						</h2>
						<h2 className="text-4xl text-center py-2 font-bold font-nunito text-yellow-400">
							Up&nbsp;
						</h2>
					</div>

					{/* First Name Field */}
					<LabelInput
						required={true}
						type="text"
						value={firstName}
						label="First Name"
						id="firstName"
						placeholder=""
						onChange={handleOnChange}
					></LabelInput>

					{/* Last Name Field */}
					<LabelInput
						required={true}
						type="text"
						value={lastName}
						label="Last Name"
						id="lastName"
						placeholder=""
						onChange={handleOnChange}
					></LabelInput>

					{/* Email Field */}
					<LabelInput
						required={true}
						type="email"
						value={email}
						label="Email"
						id="email"
						placeholder=""
						onChange={handleOnChange}
					></LabelInput>

					{/* Password Field */}
					<MPasswdStrength
						required={true}
						value={password}
						label="Password"
						id="password"
						placeholder=""
						onChange={handleOnChange}
					></MPasswdStrength>

					{/* Confirm Password Field */}
					<LabelInput
						required={true}
						type={showConfirmPassword ? "text" : "password"}
						value={confirmPassword}
						label="Confirm Password"
						id="confirmPassword"
						placeholder=""
						onChange={handleOnChange}
					>
						<div className="">
							{showConfirmPassword ? (
								<FiEyeOff
									onClick={toggleConfirmPasswordVisibility}
									size="1.3em"
									className="ml-1 text-black
                  absolute translate-x-[20.8rem] top-[1.9rem]"
								/>
							) : (
								<FiEye
									onClick={toggleConfirmPasswordVisibility}
									size="1.3em"
									className="ml-1 text-black
              absolute translate-x-[20.8rem] top-[1.9rem]"
								/>
							)}
						</div>
					</LabelInput>

					{/* Error Message */}
					{errorMessage && (
						<p className="text-red-500 text-sm mt-2">{errorMessage}</p>
					)}

					{/* Submit Button */}
					<div className="mt-7">
						<Button type="submit" value="createAccount">
							Create Account
						</Button>
					</div>

					<p className="text-center text-sm text-gray-600 mt-8 font-normal font-['Nunito']">
						Already have an account?
						<a
							onClick={handleLoginClick}
							href="#"
							className="text-indigo-600 text-sm hover:text-indigo-500 font-normal font-['Nunito']"
						>
							&nbsp; Login
						</a>
					</p>
				</form>
			</div>
			<Modal
				dismissible
				show={openSuccessModal}
				size="md"
				popup
				onClose={() => setOpenSuccessModal(false)}
			>
				<ModalHeader></ModalHeader>
				<Modal.Body>
					<div className="flex justify-center p-3">
						<FaCheckCircle className="text-5xl text-green-500" />
					</div>
					<h1 className="flex justify-center">Acount Created Successfully</h1>
				</Modal.Body>
				<div className="mx-6 my-4">
					<Button onClick={() => navigate("/login", {})}>Go To Login</Button>
				</div>
			</Modal>
		</div>
	);
};

export default Signup;
