import React, { useState } from "react";
import loginImg from "../assets/icons/login/login.jpg";
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
      navigate("/login");
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
    navigate("/login");
  }

  function handleOnChange(event: any): void {
    console.log(event.target.value);
    console.log("hi");
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
          <LabelInput
            required={true}
            type={showPassword ? "text" : "password"}
            value={password}
            label="Password"
            id="password"
            placeholder=""
            onChange={handleOnChange}
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
            onChange={handleOnChange}
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
