import React, { useState } from "react";
import loginImg from "../assets/icons/common/appLogo.svg";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { SignUp } from "../utils/authService";
import { useNavigate } from "react-router-dom";
import LabelInput from "./Form/LabelInput";
import Button from "./Form/Button";

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

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setState({
      ...state,
      [name]: value,
    });
  };

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

  const handleSignUpClick = (event: any) => {
    event.preventDefault();
    const state = JSON.parse(
      JSON.stringify(Object.fromEntries(new FormData(event.target).entries()))
    );
    console.log(state.email);

    if (password !== confirmPassword) {
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

    if (signUpResult) {
      navigate("/login"); // Navigate to login page after successful signup
    } else {
      // Sign up failed - handle the error, maybe show a message to the user
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
    navigate("/login");
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 h-screen w-full">
      <div className="hidden sm:block">
        <img
          className="w-full h-full object-cover"
          src={loginImg}
          alt="Signup visual"
        />
      </div>
      <div className="bg-gray-100 flex flex-col justify-center">
        <form
          className="max-w-[400px] w-full mx-auto bg-white p-4 shadow-md"
          onSubmit={handleSignUpClick}
        >
          <h2 className="text-4xl font-bold text-center py-6 font-['Nunito']">
            SignUp
          </h2>

          {/* First Name Field */}
          <LabelInput
            required={true}
            type="text"
            value={firstName}
            label="First Name"
            id="firstName"
            placeholder=""
            onChange="handleOnChange"
          ></LabelInput>

          {/* Last Name Field */}
          <LabelInput
            required={true}
            type="text"
            value={lastName}
            label="Last Name"
            id="lastName"
            placeholder=""
            onChange="handleOnChange"
          ></LabelInput>

          {/* Email Field */}
          <LabelInput
            required={true}
            type="email"
            value={email}
            label="Email"
            id="email"
            placeholder=""
            onChange="handleOnChange"
          ></LabelInput>

          {/* Password Field */}
          <LabelInput
            type={showPassword ? "text" : "password"}
            value={password}
            label="Password"
            id="password"
            placeholder=""
            onChange="handleOnChange"
          >
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute translate-x-[21.2rem] translate-y-8"
            >
              {showPassword ? (
                <FiEyeOff size="1.3em" />
              ) : (
                <FiEye size="1.3em" />
              )}
            </button>
          </LabelInput>

          {/* Confirm Password Field */}
          <LabelInput
            required={true}
            type={showConfirmPassword ? "text" : "password"}
            value={confirmPassword}
            label="Confirm Password"
            id="confirmPassword"
            placeholder=""
            onChange="handleOnChange"
          >
            <button
              type="button"
              aria-label="Toggle confirm password visibility"
              onClick={toggleConfirmPasswordVisibility}
              className="absolute translate-x-[21.2rem] translate-y-8"
            >
              {showConfirmPassword ? (
                <FiEyeOff size="1.3em" />
              ) : (
                <FiEye size="1.3em" />
              )}
            </button>
          </LabelInput>

          {/* Error Message */}
          {errorMessage && (
            <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
          )}

          {/* Submit Button */}
          <div className="mt-7">
            <Button type="submit">Create Account</Button>
          </div>

          <p className="text-center mt-8 font-normal font-['Nunito']">
            Already have an account?
            <a
              onClick={handleLoginClick}
              href="#"
              className="text-indigo-600 hover:text-indigo-500 font-normal font-['Nunito']"
            >
              Login
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
